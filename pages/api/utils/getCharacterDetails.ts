import fetch from "node-fetch";

const SUPERHERO_API_TOKEN = process.env.SUPERHERO_API_TOKEN;
const SUPERHERO_API_BASE_URL = `https://superheroapi.com/api.php/${SUPERHERO_API_TOKEN}`;

export default async function getCharacterDetails(id: number, type: string) {
    try {
        const response = await fetch(`${SUPERHERO_API_BASE_URL}/${id}`);
        const result: any = await response.json();
        if (result.response !== "success") {
            return {code: 404};
        }
        result["copyRightHTML"] = '<a href="https://superheroapi.com">Data provided by superheroapi.com</a>';
        result["type"] = type;
        return result;
    } catch (error) {
        throw error;
    }
}
