const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const rootDirectory = path.resolve(__dirname, '..');

dotenv.config();
const app = express();
const port = process.env.SERVER_PORT;

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

app.use('/dist', express.static(rootDirectory + '/dist'));
app.use('/assets', express.static(rootDirectory + '/dist/assets'));
app.use('/characters', express.static(rootDirectory + '/dist/characters'));
app.use('/comics', express.static(rootDirectory + '/dist/comics'));

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

app.get(`/marvel_characters/:id`, (req, res) => {
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

app.get(`/starwars_characters/:id`, (req, res) => {
    getCharacterDetails(req.params.id, "star-wars")
        .then(responses => {
            async function getMovieDetail(url) {
                const response = await fetch(url);
                const result = await response.json();
                return new Object({
                    copyRightHTML: "<a href=\"https://swapi.dev\">Data provided by swapi.dev.</a>",
                    title: result.title,
                    description: result.opening_crawl.replace(/\s+/g, ' ').trim(),
                    imageSource: "http://localhost:3000/dist/star-wars.png"
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

app.get("/", (req, res) => {
    res.sendFile(path.join(rootDirectory, 'dist', 'index.html'));
});

app.get("/marvel", (req, res) => {
    res.sendFile(path.join(rootDirectory, 'dist', 'index.html'));
});

app.get("/marvel/:id", (req, res) => {
    res.sendFile(path.join(rootDirectory, 'dist', 'index.html'));
});

app.get("/star-wars", (req, res) => {
    res.sendFile(path.join(rootDirectory, 'dist', 'index.html'));
});

app.get("/star-wars/:id", (req, res) => {
    res.sendFile(path.join(rootDirectory, 'dist', 'index.html'));
});

async function getCharacter(id, type) {

    if (type === 'marvel') {
        try {
            const response = await fetch(`https://gateway.marvel.com:443/v1/public/characters/${id}?apikey=b0a4bb4ae817de4b460fabd5034dd73c&hash=${process.env.API_HASH}&ts=1`);
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
                description: `Born: ${result.birth_year} Height: ${result.height}`,
                imageSource: "http://localhost:3000/dist/star-wars.png",
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
            const responseComics = await fetch(`https://gateway.marvel.com:443/v1/public/characters/${id}/comics?limit=5&apikey=b0a4bb4ae817de4b460fabd5034dd73c&hash=${process.env.API_HASH}&ts=1&orderBy=-focDate`);
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

app.get('*', (req, res) => {
    res.sendStatus(404);
});