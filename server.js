const express = require("express");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();
const app = express();
const port = process.env.SERVER_PORT;

/**
 *
 * @type {Connection}
 */
// const dbconn = mysql.createConnection({
//     host: process.env.DATABASE_HOST,
//     user: process.env.DATABASE_USERNAME,
//     password: process.env.DATABASE_PASSWORD,
//     database: process.env.DATABASE_NAME,
//     port: process.env.DATABASE_PORT
// });
//
// dbconn.connect(function (err) {
//     if (err) {
//         throw err;
//     }
//     console.log("Connected to Database");
// });

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

app.use('/dist', express.static(__dirname + '/dist'));
app.use('/assets', express.static(__dirname + '/dist/assets'));
app.use('/characters', express.static(__dirname + '/dist/characters'));
app.use('/comics', express.static(__dirname + '/dist/comics'));

/**
 *
 * @type:
 */
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

const marvelCharacters = marvelItems.map(item => getCharacter(item.id, "marvel"));

/**
 *
 */
app.get("/marvel_characters", (req, res) => {
    /**
     *
     * @type {Promise<{imageSource: string, name, description, id, type}>[]}
     */
    Promise.all(marvelCharacters)
        .then(responses => {
            res.json({"characters": responses});
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

/**
 *
 */
app.get(`/marvel_characters/:id`, (req, res) => {
    getCharacterDetails(req.params.id, "marvel")
        .then(responses => {
            res.json({"Latest comics": responses.comics, "Movies": responses.movies});
        })
        .catch(error => {
            console.error('Error:', error);
        });
});
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.get("/marvel", (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.get("/star-wars", (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.get("/marvel/:id", (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});


/**
 *
 * @param id
 * @param type
 * @returns {Promise<{imageSource: string, name, description, id, type}>}
 */
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
}

/**
 *
 * @param id
 * @param type
 * @returns {Promise<*>}
 */
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
}

/**
 *
 */
app.get('*', (req, res) => {
    res.sendStatus(404);
});