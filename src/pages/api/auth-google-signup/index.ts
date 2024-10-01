import { NextApiRequest, NextApiResponse } from 'next';
import User from '@/model/User';
import Action from '@/model/Action';
import { connectToDatabase } from '@/utils/MongoConnect';

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

    const { email, fullName, image } = req.body;

    if (!email || !fullName) {
      res.status(400).json({ error: 'Email and fullName are required' });
      return;
    }
    const password = 'nullPassword';
    await connectToDatabase();


    const existedUser = await User.findOne({
      email,
    });
    if (existedUser) {
      res.status(400).json({ error: 'User with this email already exists' });
      return;
    }

    const user = new User({ email, password, fullName, image });

    const newUser = await user.save();

    if (!newUser) {
      res.status(400).json({ error: 'An error occurred during signup. Please try again.' });
      return;
    }

    const { accessToken } = await generateAccessAndRefreshTokens(newUser._id);

    const createdUser = await User.findById(user._id).select(
      "-password "
    );

    if (!accessToken) {
      res.status(400).json({ error: 'An error occurred during token generation. Please try again.' });
      return;

    }
    const tokenAge = process.env.MAXTOKENAGE || 86400;
    const newAction = new Action({ uid: email, action: 'SignUp' })
    await newAction.save();

    res.setHeader('Set-Cookie', `token=${accessToken}; Path=/; HttpOnly; SameSite=Strict; Secure; Max-Age=${tokenAge}`);


    res.status(201).json({ user: createdUser, accessToken });

  } catch (error) {
    res.status(500).json({
      error: 'An error occurred during signup. Please try again.',
    });
  }
}