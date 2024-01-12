/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const functions = require("firebase-functions");
const express = require("express");
const path = require("path");
const cors = require('cors');
require('dotenv').config();

const rootDirectory = path.resolve(__dirname, '..');
const app = express();

const API_HASH = process.env.MARVEL_API_HASH;
const PUBLIC_KEY = process.env.MARVEL_PUBLIC_KEY;
const SUPERHERO_API_TOKEN = process.env.SUPERHERO_API_TOKEN;

const MARVEL_API_BASE_URL = "https://gateway.marvel.com:443";
const SUPERHERO_API_BASE_URL = `https://superheroapi.com/api.php/${SUPERHERO_API_TOKEN}`;

app.use(cors({origin: true}));
app.use('/dist', express.static(rootDirectory + '/dist'));
app.use('/assets', express.static(rootDirectory + '/dist/assets'));

const marvelIds = [
    {id: 1009368, name: "Iron Man"},
    {id: 1009220, name: "Captain America"},
    {id: 1009664, name: "Thor"},
    {id: 1009351, name: "Hulk"},
    {id: 1009189, name: "Black Widow"},
    {id: 1009338, name: "Hawkeye"},
    {id: 1009610, name: "Spider-Man (Peter Parker)"},
    {id: 1009718, name: "Wolverine"},
    {id: 1009268, name: "Deadpool"},
    {id: 1009407, name: "Loki"},
    {id: 1009187, name: "Black Panther"},
    {id: 1010801, name: "Ant-Man (Scott Lang)"}
]

const starWarsIds = [
    {id: 418, name: "Luke Skywalker"},
    {id: 208, name: "Darth Vader"},
    {id: 729, name: "Yoda"},
    {id: 307, name: "Han Solo"},
    {id: 127, name: "Boba Fett"},
]

const dcIds = [
    {id: 70, name: "Batman"},
    {id: 644, name: "Superman"},
    {id: 38, name: "Aquaman"},
    {id: 720, name: "Wonder Woman"},
    {id: 194, name: "Cyborg"},
    {id: 263, name: "Flash"},
]

const marvelCharacters = marvelIds.map(item => getCharacter(item.id, "marvel"));
const starWarsCharacters = starWarsIds.map(item => getCharacter(item.id, "star-wars"));
const dcCharacters = dcIds.map(item => getCharacter(item.id, "dc"));

app.get("/marvel_characters", (req, res) => {
    Promise.all(marvelCharacters)
        .then(responses => {
            res.json({"characters": responses});
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

app.get("/starwars_characters", (req, res) => {
    Promise.all(starWarsCharacters)
        .then(responses => {
            res.json({"characters": responses});
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

app.get("/dc_characters", (req, res) => {
    Promise.all(dcCharacters)
        .then(responses => {
            res.json({"characters": responses});
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

app.get("/marvel_characters/:id", (req, res) => {
    getCharacterDetails(req.params.id, "marvel")
        .then(responses => {
            res.json({"Latest comics": responses.comics});
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

app.get("/starwars_characters/:id", (req, res) => {
    getCharacterDetails(req.params.id, "star-wars")
        .then(() => {
            res.json({code: 404});
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

app.get("/dc_characters/:id", (req, res) => {
    getCharacterDetails(req.params.id, "dc")
        .then(() => {
            res.json({code: 404});
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

async function getCharacter(id, type) {
    if (type === 'marvel') {
        try {
            const response = await fetch(`${MARVEL_API_BASE_URL}/v1/public/characters/${id}?apikey=${PUBLIC_KEY}&hash=${API_HASH}&ts=1`);
            const result = await response.json();
            if (result.code === 404) {
                return {code: 404};
            }
            return {
                copyRightHTML: result.attributionHTML,
                id: id,
                name: result.data.results[0].name,
                description: result.data.results[0].description,
                imageSource: result.data.results[0].thumbnail.path + '.' + result.data.results[0].thumbnail.extension,
                type: type
            };
        } catch (error) {
            console.error('Error: ', error);
            throw error;
        }
    }

    if (type === 'dc' || type === "star-wars") {
        try {
            const response = await fetch(`${SUPERHERO_API_BASE_URL}/${id}`);
            const result = await response.json();
            if (result.response !== "success") {
                return {code: 404};
            }
            return {
                copyRightHTML: "<a href=\"https://superheroapi.com\">Data provided by superheroapi.com</a>",
                id: id,
                name: result.name,
                description: "",
                imageSource: result.image.url,
                type: type
            };
        } catch (error) {
            console.error('Error: ', error);
            throw error;
        }
    }
}

async function getCharacterDetails(id, type) {
    if (type === "marvel") {
        try {
            const responseComics = await fetch(`${MARVEL_API_BASE_URL}/v1/public/characters/${id}/comics?limit=5&apikey=${PUBLIC_KEY}&hash=${API_HASH}&ts=1&orderBy=-focDate`);
            const resultComics = await responseComics.json();
            if (resultComics.data.results.length === 0) {
                return {code: 404}
            }
            const comics = resultComics.data.results.map((comic) => new Object({
                copyRightHTML: resultComics.attributionHTML,
                title: comic.title,
                description: comic.description,
                imageSource: comic.thumbnail.path + '.' + comic.thumbnail.extension
            }));

            return {comics: comics}
        } catch (error) {
            console.error('Error: ', error);
            throw error;
        }
    }

    if (type === "dc" || type === "star-wars") {
        //TODO: From superheroapi, form a components listing details
    }
}

app.get("*", (req, res) => {
    res.send(404).json({data: "Not found"});
});

exports.app = functions.https.onRequest(app);