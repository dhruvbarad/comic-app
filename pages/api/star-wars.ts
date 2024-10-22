import {getCharacter} from '../../utils/getCharacter';
import type {NextApiRequest, NextApiResponse} from "next"; // assuming the function is placed in utils

const starWarsIds = [
    {id: 418, name: "Luke Skywalker"},
    {id: 208, name: "Darth Vader"},
    {id: 729, name: "Yoda"},
    {id: 307, name: "Han Solo"},
    {id: 127, name: "Boba Fett"},
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const starWarsCharacters = await Promise.all(starWarsIds.map(item => getCharacter(item.id, "star-wars")));
        res.status(200).json({characters: starWarsCharacters});
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
}
