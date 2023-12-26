/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const functions = require("firebase-functions");
const express = require("express");
const path = require("path");
const cors = require('cors');

const rootDirectory = path.resolve(__dirname, '..');
const app = express();

const API_HASH = "636509a4b7fed1fae26f72601899f1db"
const PRIVATE_KEY = "f9b94630aebd18a0d1016bb2aaa09767430ad5ed"
const PUBLIC_KEY = "b0a4bb4ae817de4b460fabd5034dd73c"

app.use(cors({origin: true}));
app.use('/dist', express.static(rootDirectory + '/dist'));
app.use('/assets', express.static(rootDirectory + '/dist/assets'));

const marvelItems = [
    {id: 1009368, name: "Iron Man"},
    {id: 1009220, name: "Captain America"},
    {id: 1009664, name: "Thor"},
    {id: 1009351, name: "Hulk"},
    {id: 1009189, name: "Black Widow"},
    {id: 1009338, name: "Hawkeye"},
    {id: 1009610, name: "Spider-Man (Peter Parker)"},
    {id: 1009718, name: "Wolverine"},
    {id: 1009268, name: "Deadpool"}
]

const starWarsItems = [
    {id: 1, name: "Luke Skywalker"},
]

const marvelCharacters = marvelItems.map(item => getCharacter(item.id, "marvel"));
const starWarsCharacters = starWarsItems.map(item => getCharacter(item.id, "star-wars"));

app.get("/marvel_characters", (req, res) => {
    Promise.all(marvelCharacters)
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
            res.json({"Latest comics": responses.comics, "Movies": responses.movies});
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

app.get("/starwars_characters/:id", (req, res) => {
    getCharacterDetails(req.params.id, "star-wars")
        .then(responses => {
            async function getMovieDetail(url) {
                const response = await fetch(url);
                const result = await response.json();
                return new Object({
                    copyRightHTML: "<a href=\"https://swapi.dev\">Data provided by swapi.dev.</a>",
                    title: result.title,
                    description: result.opening_crawl.replace(/\s+/g, ' ').trim(),
                    imageSource: ""
                });
            }

            const characterMovies = responses.map(url => getMovieDetail(url));

            Promise.all(characterMovies)
                .then(responses => {
                    res.json({Movies: responses});
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

async function getCharacter(id, type) {
    if (type === 'marvel') {
        try {
            const response = await fetch(`https://gateway.marvel.com:443/v1/public/characters/${id}?apikey=${PUBLIC_KEY}&hash=${API_HASH}&ts=1`);
            const result = await response.json();
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

    if (type === 'star-wars') {
        try {
            const response = await fetch(`https://swapi.dev/api/people/${id}`);
            const result = await response.json();
            return {
                copyRightHTML: "<a href=\"https://swapi.dev\">Data provided by swapi.dev.</a>",
                id: id,
                name: result.name,
                description: 'Coming soon',
                imageSource: "",
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
            const responseComics = await fetch(`https://gateway.marvel.com:443/v1/public/characters/${id}/comics?limit=5&apikey=${PUBLIC_KEY}&hash=${API_HASH}&ts=1&orderBy=-focDate`);
            const resultComics = await responseComics.json();
            const comics = resultComics.data.results.map((comic) => new Object({
                copyRightHTML: resultComics.attributionHTML,
                title: comic.title,
                description: comic.description,
                imageSource: comic.thumbnail.path + '.' + comic.thumbnail.extension
            }));

            const movies = resultComics.data.results.map((comic) => new Object({
                copyRightHTML: "",
                title: "",
                description: "",
                imageSource: ""
            }));

            return {comics: comics, movies: movies}
        } catch (error) {
            console.error('Error: ', error);
            throw error;
        }
    }

    if (type === "star-wars") {
        try {
            const response = await fetch(`https://swapi.dev/api/people/${id}/`);
            const result = await response.json();
            return result['films'];

        } catch (error) {
            console.error('Error: ', error);
            throw error;
        }
    }
}

app.get("*", (req, res) => {
    res.send(404).json({data: "Not found"});
});

exports.app = functions.https.onRequest(app);