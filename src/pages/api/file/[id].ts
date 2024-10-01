// /pages/api/file.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { S3Client, GetObjectCommand, GetObjectCommandOutput } from "@aws-sdk/client-s3";
// This function might need to be implemented or adjusted based on your application logic

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { id } = req.query;

  const s3client = new S3Client({
    region: process.env.NEXT_PUBLIC_AUTH_AWS_REGION,
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_AUTH_AWS_ACCESS_KEY_ID || "",
      secretAccessKey:
        process.env.NEXT_PUBLIC_AUTH_AWS_SECRET_ACCESS_KEY ||
        "",
    },
  });

  const s3Key = id as string;

  const getObjectParams = {
    Bucket: 'pdfimageupload',
    Key: s3Key,
  };
  const command = new GetObjectCommand(getObjectParams);

  try {
    const { Body, ContentType }: any = await s3client.send(command);

    if (!Body) {
      res.status(404).json({ error: "Image not found" });
      return;
    }

    // Set correct Content-Type for the image
    res.setHeader('Content-Type', ContentType || 'image/jpeg'); // Defaulting to JPEG; adjust based on your actual image types.

    // Stream the image data directly to the response if Body is a Readable stream.
    Body.pipe(res);
  } catch (err) {
    console.error("Error fetching file:", err);
    res.status(500).json({ error: "Failed to fetch the file from S3" });
  }
}