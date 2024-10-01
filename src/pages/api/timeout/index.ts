import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
//   console.log(req.cookies.token);
if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return; 
  }
  if(req.cookies?.token === undefined){
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  res.status(200).json({ message: "Success" });
}
