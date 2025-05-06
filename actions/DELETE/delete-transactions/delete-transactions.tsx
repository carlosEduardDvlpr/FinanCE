'use server';

import { db } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { deleteCookies } from '../delete-cookies/delete-cookies';

export async function deleteTransaction({
  transactionId,
}: {
  transactionId: number;
}) {
  try {
    await db.transactions.delete({
      where: { id: transactionId },
    });

    revalidatePath('/');

    return { success: true };
  } catch (error) {
    return { success: false };
  }
}
