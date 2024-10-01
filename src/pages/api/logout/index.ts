import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

    res.setHeader(
        'Set-Cookie',
        `token=; Path=/; HttpOnly; SameSite=Strict; Secure; Max-Age=0`
        );

    res.status(200).json({ message: 'Logged out' });

}