import { NextApiRequest, NextApiResponse } from 'next';
import User from '@/model/User';
import { connectToDatabase } from '@/utils/MongoConnect';
import Action from '@/model/Action';

const generateAccessAndRefreshTokens = async (userId: any) => {
    try {
        const user = await User.findById(userId) as any;
        const accessToken = user.generateAccessToken();

        await user.save({ validateBeforeSave: false });

        return { accessToken };
    } catch (error) {
        return { error: 'An error occurred during token generation. Please try again.' };

    }
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    try {

        const { email } = req.body;

        if (!email) {
            res.status(400).json({ error: 'Email  is required' });
            return;
        }

        await connectToDatabase();


        const existedUser = await User.findOne({
            email,
        });
        if (!existedUser) {
            res.status(401).json({ error: 'Invalid email or password' });
            return;
        }

        const createdUser = await User.findById(existedUser._id).select(
            "-password "
        );


        const { accessToken } = await generateAccessAndRefreshTokens(existedUser._id);

        if (!accessToken) {
            res.status(400).json({ error: 'An error occurred during login. Please try again.' });
            return;
        }
        const tokenAge = process.env.MAXTOKENAGE || 86400;
        const newAction = new Action({ uid: email, action: 'SignIn' })
        await newAction.save();

        res.setHeader('Set-Cookie', `token=${accessToken}; Path=/; HttpOnly; SameSite=Strict; Secure; Max-Age=${tokenAge}`);

        res.status(200).json({ user: createdUser, accessToken });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred during login. Please try again.' });
    }
}