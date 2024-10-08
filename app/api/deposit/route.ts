import { NextRequest, NextResponse } from 'next/server'; 
import { getDataFromToken } from '@/app/utils/getDataFromToken';

import prisma from '@/app/lib/prisma';

export async function POST(request: NextRequest) {
  const { amount } = await request.json();

  // Validate input
  if (typeof amount !== 'number' || amount <= 0) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  try {
    // Find the user by email from the token
    const email = getDataFromToken(request);
    // Check if email is valid
    if (!email) {
      return NextResponse.json({ error: 'Token is invalid or expired' }, { status: 401 });
    }
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Update the user's balance
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { balance: user.balance + amount },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating balance:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
