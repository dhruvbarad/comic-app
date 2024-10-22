import {getCharacter} from '../../utils/getCharacter';
import type {NextApiRequest, NextApiResponse} from "next"; // assuming the function is placed in utils

const dcIds = [
    {id: 70, name: "Batman"},
    {id: 644, name: "Superman"},
    {id: 38, name: "Aquaman"},
    {id: 720, name: "Wonder Woman"},
    {id: 194, name: "Cyborg"},
    {id: 263, name: "Flash"},
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const dcCharacters = await Promise.all(dcIds.map(item => getCharacter(item.id, "dc")));
        res.status(200).json({characters: dcCharacters});
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
}
