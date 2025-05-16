import type { NextApiRequest, NextApiResponse } from "next";
import { getAllComicIds } from "./utils/getFromDB";
import { getCharacter } from "./utils/getCharacter";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const marvelIds = await getAllComicIds("marvel");
    const marvelCharacters = await Promise.all(
      marvelIds.map((id: number) => getCharacter(id, "marvel"))
    );
    res.status(200).json(marvelCharacters);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
