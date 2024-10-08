import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import prisma from '@/app/lib/prisma';

dotenv.config();


export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });
   
    if (!user) {
      return NextResponse.json({ error: 'User not found' });
  }

    if (user && await bcrypt.compare(password, user.password)) {
      const tokenData = {
        id: user.id,
        email: user.email,
      };

      const token = jwt.sign(tokenData, process.env.AUTH_SECRET!, { expiresIn: '1h' });
      const response = NextResponse.json({
        message: 'Login successful',
        success: true,
      });

      response.cookies.set('token', token, {
        httpOnly: true,
      });

      return response;

    } 
    else {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

  } 
    catch (error) {
    console.error('Internal server error:', error); // Log the error for debugging
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
