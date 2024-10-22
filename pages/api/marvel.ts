import {getCharacter} from '../../utils/getCharacter';
import type {NextApiRequest, NextApiResponse} from "next"; // assuming the function is placed in utils

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
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const marvelCharacters = await Promise.all(marvelIds.map(item => getCharacter(item.id, "marvel")));
        res.status(200).json({characters: marvelCharacters});
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
}
