import { NextApiRequest, NextApiResponse } from "next";
import Article from "@/model/Article";
import { connectToDatabase } from "@/utils/MongoConnect";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  if (req.method === "GET") {
    try {
      await connectToDatabase();
      const articles = await Article.find({});
      if (!articles) {
        res.status(404).json({ error: "Articles not found" });
        return;
      }

      res.status(200).json(articles);
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while fetching articles" });
    }
  }
}
