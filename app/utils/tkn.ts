// utils/auth.ts
import jwt from 'jsonwebtoken';

interface DecodedToken {
  id: string; 
}

export const verifyToken = (token: string): DecodedToken | null => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;
  } catch (error) {
    return null;
  }
};
