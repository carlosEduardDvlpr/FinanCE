'use server';

import { cookies } from 'next/headers';
import { db } from '@/lib/prisma';
import jwt from 'jsonwebtoken';

export async function getAuthenticatedUser() {
  const TOKEN_NAME = process.env.TOKEN_NAME;
  const SECRET_KEY = process.env.SECRET_KEY;

  if (!TOKEN_NAME || !SECRET_KEY) {
    return {
      success: false,
      user: null,
    };
  }

  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_NAME)?.value;

  if (!token) {
    return {
      success: false,
      user: null,
    };
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as {
      id: number;
      user: string;
    };

    if (!decoded?.id || !decoded?.user) {
      cookieStore.delete(TOKEN_NAME);
      return {
        success: false,
        user: null,
      };
    }

    const user = await db.users.findFirst({
      where: {
        id: decoded.id,
        username: decoded.user,
      },
      select: {
        id: true,
        username: true,
        name: true,
        transactions: true,
      },
    });

    if (!user) {
      return {
        success: false,
        user: null,
      };
    }

    return {
      success: true,
      user,
    };
  } catch (error) {
    cookieStore.delete(TOKEN_NAME);
    return {
      success: false,
      user: null,
    };
  }
}
