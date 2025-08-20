import type {NextApiRequest, NextApiResponse} from "next";
import {getCharacter} from "./utils/getCharacter";
import {getAllComicIds} from "./utils/getFromDB";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const dcIds = await getAllComicIds("dc");
        const dcCharacters = await Promise.all(
            dcIds.map((id: number) => getCharacter(id, "dc"))
        );
        res.status(200).json(dcCharacters);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({error: "Internal Server Error"});
    }
}
