'use server';

import { db } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { deleteCookies } from '../delete-cookies/delete-cookies';

export async function deleteAccount({ accountId }: { accountId: number }) {
  try {
    await db.users.delete({
      where: { id: accountId },
    });
    await deleteCookies();

    revalidatePath('/');

    return { success: true };
  } catch (error) {
    return { success: false };
  }
}
