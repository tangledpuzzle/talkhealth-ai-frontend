import { NextApiRequest, NextApiResponse } from 'next';
import Article from '@/model/Article';
import { connectToDatabase } from '@/utils/MongoConnect';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    if (req.method === 'GET') {
        try {
            await connectToDatabase();
            const articleid = req.query.id;
            const article = await Article.findById(articleid);
            if (!article) {
                res.status(404).json({ error: 'Article not found' });
                return;
            }

            res.status(200).json(article);
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while fetching articles' });
        }
    }
    
    if(req.method === 'POST'){
        try {
            await connectToDatabase();
            const { title, content, cover, author, rating, category, slug, views } = req.body;
            const article = new Article({ title, content, cover, author, rating, category, slug, views });
            const newArticle = await article.save();
            if (!newArticle) {
                res.status(400).json({ error: 'An error occurred while creating article' });
                return;
            }
            res.status(201).json(newArticle);
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while creating article' });
        }
    }
  
}