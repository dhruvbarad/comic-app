import fetch from 'node-fetch';

const API_HASH = process.env.MARVEL_API_HASH;
const PUBLIC_KEY = process.env.MARVEL_PUBLIC_KEY;
const SUPERHERO_API_TOKEN = process.env.SUPERHERO_API_TOKEN;
const MARVEL_API_BASE_URL = "https://gateway.marvel.com:443";
const SUPERHERO_API_BASE_URL = `https://superheroapi.com/api.php/${SUPERHERO_API_TOKEN}`;

export default async function getCharacterDetails(id: number, type: string) {
    if (type === "marvel") {
        try {
            const response = await fetch(`${MARVEL_API_BASE_URL}/v1/public/characters/${id}/comics?limit=5&apikey=${PUBLIC_KEY}&hash=${API_HASH}&ts=1&orderBy=-focDate`);
            const result: any = await response.json();
            if (result.data.results.length === 0) {
                return {code: 404}
            }
            const comics = result.data.results.map((comic: any) => new Object({
                copyRightHTML: result.attributionHTML,
                title: comic.title,
                descriptions: [comic.description],
                imageSource: comic.thumbnail.path + '.' + comic.thumbnail.extension
            }))
            return {"Latest Comics": comics}
        } catch (error) {
            console.error('Error: ', error);
            throw error;
        }
    }

    if (type === "dc" || type === "star-wars") {
        try {
            const response = await fetch(`${SUPERHERO_API_BASE_URL}/${id}`);
            const result: any = await response.json();
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
            return {
                "Intelligence": intelligence,
                "Strength": strength,
                "Speed": speed
            }
        } catch (error) {
            console.error('Error: ', error);
            throw error;
        }
    }
}
