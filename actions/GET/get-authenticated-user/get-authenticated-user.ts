'use server';

import { cookies } from 'next/headers';
import { db } from '@/lib/prisma';
import jwt from 'jsonwebtoken';
import { transformeTransactionsAmount } from '../../../helpers/transforme-transactions-amount/transforme-transactions-amount';

const TOKEN_NAME = process.env.TOKEN_NAME;
const SECRET_KEY = process.env.SECRET_KEY;

export async function getAuthenticatedUser() {
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
      user: {
        name: user.name,
        id: user.id,
        username: user.username,
        incomes: transformeTransactionsAmount({
          transactions: user.transactions,
          type: 'income',
        }),
        expenses: transformeTransactionsAmount({
          transactions: user.transactions,
          type: 'expense',
        }),
      },
    };
  } catch (error) {
    cookieStore.delete(TOKEN_NAME);
    return {
      success: false,
      user: null,
    };
  }
}
