'use server';

import { db } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { CreateTransactionProps } from './create-transaction-type';

export async function createTransaction({
  amount,
  description,
  type,
  category,
  user_id,
}: CreateTransactionProps) {
  const date = new Date();

  try {
    await db.transactions.create({
      data: {
        amount,
        date,
        description,
        type,
        category,
        user_id,
      },
    });

    revalidatePath('/');
    return { success: true, message: 'Transação registrada!' };
  } catch (error) {
    return { success: false, message: 'Erro, tente novamente mais tarde...' };
  }
}
