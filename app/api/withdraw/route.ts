import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getDataFromToken } from '@/app/utils/getDataFromToken';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const { amount } = await request.json(); // Get the amount from the request body

  // Validate input
  if (typeof amount !== 'number' || amount <= 0) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  try {
    // Get the email from the token
    const email = getDataFromToken(request);
    // Check if email is valid
    if (!email) {
      return NextResponse.json({ error: 'Token is invalid or expired' }, { status: 401 });
    }
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check if user has enough balance
    if (user.balance < amount) {
      return NextResponse.json({ error: 'Insufficient balance' }, { status: 400 });
    }

    // Update the user's balance
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { balance: user.balance - amount },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
