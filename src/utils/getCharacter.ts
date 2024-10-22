import fetch from 'node-fetch';

const API_HASH = process.env.MARVEL_API_HASH;
const PUBLIC_KEY = process.env.MARVEL_PUBLIC_KEY;
const SUPERHERO_API_TOKEN = process.env.SUPERHERO_API_TOKEN;
const MARVEL_API_BASE_URL = "https://gateway.marvel.com:443";
const SUPERHERO_API_BASE_URL = `https://superheroapi.com/api.php/${SUPERHERO_API_TOKEN}`;

export async function getCharacter(id: number, type: string) {
    if (type === 'marvel') {
        try {
            const response = await fetch(`${MARVEL_API_BASE_URL}/v1/public/characters/${id}?apikey=${PUBLIC_KEY}&hash=${API_HASH}&ts=1`);
            const result : any = await response.json();
            if (result.code === 404) {
                return {code: 404};
            }
            return {
                copyRightHTML: result.attributionHTML,
                id: id,
                name: result.data.results?.[0].name,
                descriptions: [result.data.results?.[0].description],
                imageSource: result.data.results?.[0].thumbnail.path + '.' + result.data.results?.[0].thumbnail.extension,
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
            const result : any = await response.json();
            if (result.response !== "success") {
                return {code: 404};
            }
            let placeOfBirth = "";
            let firstAppearance = "";
            if (result.biography["place-of-birth"] !== "-") {
                placeOfBirth = `Place of birth: ${result.biography["place-of-birth"]}\n`;
            }
            if (result.biography["first-appearance"] !== "-") {
                firstAppearance = `First appearance: ${result.biography["first-appearance"]}\n`;
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
