'use server';

import { db } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function deleteAccount({ accountId }: { accountId: number }) {
  try {
    await db.transactions.delete({
      where: { id: accountId },
    });

    revalidatePath('/');

    return { success: true };
  } catch (error) {
    return { success: false };
  }
}
