import type {NextApiRequest, NextApiResponse} from "next";
import {getAllComicIds} from "./utils/getFromDB";
import {getCharacter} from "./utils/getCharacter";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const starWarsIds = await getAllComicIds("star-wars");
        const starWarsCharacters = await Promise.all(
            starWarsIds.map((id: number) => getCharacter(id, "star-wars"))
        );
        res.status(200).json(starWarsCharacters);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({error: "Internal Server Error"});
    }
}
