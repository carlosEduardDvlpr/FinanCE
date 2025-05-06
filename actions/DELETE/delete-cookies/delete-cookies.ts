'use server';

import { cookies } from 'next/headers';

const TOKEN_NAME = process.env.TOKEN_NAME;

export async function deleteCookies() {
  const cookieStore = await cookies();

  try {
    cookieStore.delete(TOKEN_NAME as string);
  } catch (error) {
    return {
      success: false,
      message: 'Erro ao deletar cookies!',
    };
  }
}
