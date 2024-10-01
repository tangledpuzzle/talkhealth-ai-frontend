import { MongoClient } from "mongodb";
const url = process.env.NEXT_PUBLIC_MONGODB_URI||""
const clientPromise = MongoClient.connect(url);

export default clientPromise;