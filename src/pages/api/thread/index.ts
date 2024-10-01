// pages/api/threads.ts
import { MongoClient } from "mongodb";
import type { NextApiRequest, NextApiResponse } from 'next';

const mongoUrl = process.env.NEXT_PUBLIC_MONGODB_URI as string;
const client = new MongoClient(mongoUrl);

// Connecting to the database outside of the request handler for efficiency.
// This utilizes connection pooling.
async function connectToDatabase() {
  await client.connect();
  const db = client.db("TalkhealthAI"); // Replace with your actual database name
  return db.collection("Chat"); // Replace with your actual collection name
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const collection = await connectToDatabase();
  if (req.method === 'DELETE') {
    const { threadId } = req.body;
    try {
      await collection.deleteMany({ thread: threadId });

      return res.status(200).json({ message: 'Thread deleted successfully.' });

    } catch (error) {
      return res.status(500).json({ error: 'Error occured while deleting thread' });
    }
  } else if (req.method === 'PUT') {
    const { threadId, newName } = req.body;
    try {
      const lastDoc = await collection.find({ thread: threadId }).sort({ date: -1 }).limit(1).toArray();

      if (lastDoc.length === 0) {
        return res.status(404).json({ error: 'Thread not found' });
      }
      // Assuming `_id` is the unique identifier of the documents
      const lastDocId = lastDoc[0]._id;
      const prompts = lastDoc[0].prompts.split("; ");
      prompts[prompts.length - 1] = `"${newName}"`;

      // Join the array back into a string
      const updatedString = prompts.join('; ');
      

      // Update the last document
      const result = await collection.updateOne(
        { _id: lastDocId },
        { $set: { prompts: updatedString } }
      );
      if (result.matchedCount === 0) {
        return res.status(404).json({ error: 'Thread not found' });
      }

      if (result.modifiedCount === 1) {
        return res.status(200).json({ message: 'Thread renamed successfully.' });
      } else {
        // Document was found but not modified, possibly because newName equals the old name
        return res.status(200).json({ message: 'No changes made to the document.' });
      }
    } catch (error) {
      return res.status(500).json({ error: 'Error occured while updating thread name' });
    }
  } else {
    res.setHeader('Allow', ['DELETE', 'PUT']);
    res.status(405).send(`Method ${req.method} Not Allowed`);
  }
}
