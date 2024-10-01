// pages/api/Ips/[ip].ts
import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, Db } from 'mongodb';

interface ChatItem {
    thread: string;
    // Add other fields here as needed
  }

// Create a new MongoClient
const client = new MongoClient(process.env.NEXT_PUBLIC_MONGODB_URI!);

async function connectToDatabase(): Promise<Db> {
    await client.connect();
    const db = client.db('TalkhealthAI');
    return db;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { uid } = req.body;
    try {
        const db = await connectToDatabase();
        const cursor = await db
            .collection('Chat')
            .find({ user_id: uid });
        const results: Record<string, ChatItem[]> = {};
        await cursor.forEach((item: any) => {
            // Assuming 'thread' exists on the item and is a string
            const thread = item.thread;
            if (!results[thread]) {
                results[thread] = [];
            }
            // Optional: Remove _id or any other cleanup
            delete item._id;
            results[thread].push(item);
        });

        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: 'Unable to connect to database: ' });
    }
}
