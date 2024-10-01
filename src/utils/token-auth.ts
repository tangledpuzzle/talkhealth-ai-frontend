import { sign} from 'jsonwebtoken';

export const createAccessToken = (user: any) => {
  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

  if (!accessTokenSecret) {
    throw new Error('ACCESS_TOKEN_SECRET is not defined');
  }

  return sign({ userId: user.id }, accessTokenSecret, {
    expiresIn: '15m',
  });
};

export const createRefreshToken = (user: any) => {
  const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

  if (!refreshTokenSecret) {
    throw new Error('REFRESH_TOKEN_SECRET is not defined');
  }

  return sign({ userId: user.id }, refreshTokenSecret, {
    expiresIn: '7d',
  });
};
