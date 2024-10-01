import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getDataFromToken } from '@/app/utils/getDataFromToken';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const email = getDataFromToken(request);
    if (!email) {
      return NextResponse.json({ error: 'Token is invalid or expired' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const { password, ...userWithoutPassword } = user;
    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error('Error retrieving user:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
