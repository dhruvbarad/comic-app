// @ts-ignore
import clientPromise from "./mongo";

export async function getAllComicIds(collection: string) {
  try {
    // @ts-ignore
    const client = await clientPromise;
    const db = client.db("comics");
    const docs = await db.collection(collection).find({}).toArray();
    return docs.map(((doc: { id: any; }) => doc.id));
  } catch (e) {
    console.error("" + e);
    return [];
  }
}
