import getCharacterDetails from '../../../utils/getCharacterDetails';
import type {NextApiRequest, NextApiResponse} from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {id} = req.query;

    try {
        const responses: any = await getCharacterDetails(Number(id), "marvel");
        res.status(200).json(responses);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
}
