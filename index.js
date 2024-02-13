/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const express = require("express");
const path = require("path");
const cors = require('cors');
require('dotenv').config();

const app = express();

const API_HASH = process.env.MARVEL_API_HASH;
const PUBLIC_KEY = process.env.MARVEL_PUBLIC_KEY;
const SUPERHERO_API_TOKEN = process.env.SUPERHERO_API_TOKEN;

const MARVEL_API_BASE_URL = "https://gateway.marvel.com:443";
const SUPERHERO_API_BASE_URL = `https://superheroapi.com/api.php/${SUPERHERO_API_TOKEN}`;

app.use(cors({origin: true}));
app.use(express.static(path.join(__dirname, 'dist')));

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

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', '/index.html'));
});

app.get("/marvel", (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', '/index.html'));
});

app.get("/star-wars", (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', '/index.html'));
});

app.get("/dc", (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', '/index.html'));
});

app.get("/marvel/:id", (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', '/index.html'));
});

app.get("/star-wars/:id", (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', '/index.html'));
});

app.get("/dc/:id", (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', '/index.html'));
});

app.get("/api/marvel_characters", (req, res) => {
    Promise.all(marvelCharacters)
        .then(responses => {
            res.json({"characters": responses});
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

app.get("/api/starwars_characters", (req, res) => {
    Promise.all(starWarsCharacters)
        .then(responses => {
            res.json({"characters": responses});
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

app.get("/api/dc_characters", (req, res) => {
    Promise.all(dcCharacters)
        .then(responses => {
            res.json({"characters": responses});
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

app.get("/api/marvel_characters/:id", (req, res) => {
    getCharacterDetails(req.params.id, "marvel")
        .then(responses => {
            res.json({"Latest comics": responses.comics});
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

app.get("/api/starwars_characters/:id", (req, res) => {
    getCharacterDetails(req.params.id, "star-wars")
        .then(responses => {
            res.json({"Stats": responses.stats});
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

app.get("/api/dc_characters/:id", (req, res) => {
    getCharacterDetails(req.params.id, "dc")
        .then(responses => {
            res.json({"Stats": responses.stats});
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
                descriptions: [result.data.results[0].description],
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
            let placeOfBirth = ""
            let firstAppearance = ""
            if (result.biography["place-of-birth"] !== "-") {
                placeOfBirth = `Place of birth: ${result.biography["place-of-birth"]}\n`
            }
            if (result.biography["first-appearance"] !== "-") {
                firstAppearance = `First appearance: ${result.biography["first-appearance"]}\n`
            }
            return {
                copyRightHTML: "<a href=\"https://superheroapi.com\">Data provided by superheroapi.com</a>",
                id: id,
                name: result.name,
                descriptions: [placeOfBirth, firstAppearance],
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
                descriptions: [comic.description],
                imageSource: comic.thumbnail.path + '.' + comic.thumbnail.extension
            }));

            return {comics: comics}
        } catch (error) {
            console.error('Error: ', error);
            throw error;
        }
    }

    if (type === "dc" || type === "star-wars") {
        try {
            const response = await fetch(`${SUPERHERO_API_BASE_URL}/${id}`);
            const result = await response.json();
            if (result.response !== "success") {
                return {code: 404};
            }
            const intelligence = new Object({
                copyRightHTML: "<a href=\"https://superheroapi.com\">Data provided by superheroapi.com</a>",
                title: "Intelligence",
                descriptions: [result.powerstats.intelligence],
                imageSource: ""
            })
            const strength = new Object({
                copyRightHTML: "<a href=\"https://superheroapi.com\">Data provided by superheroapi.com</a>",
                title: "Strength",
                descriptions: [result.powerstats.strength],
                imageSource: ""
            })
            const speed = new Object({
                copyRightHTML: "<a href=\"https://superheroapi.com\">Data provided by superheroapi.com</a>",
                title: "Speed",
                descriptions: [result.powerstats.speed],
                imageSource: ""
            })
            const stats = [intelligence, strength, speed];

            return {stats: stats}
        } catch (error) {
            console.error('Error: ', error);
            throw error;
        }
    }
}

app.listen(process.env.PORT || 3000, () => {
    console.log("Listening on: http://localhost:" + process.env.PORT);
});
