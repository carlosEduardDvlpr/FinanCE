'use server';
import bcrypt from 'bcrypt';
import { db } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

interface UserDataProps {
  name: string;
  username: string;
  password: string;
  id: number;
}

export async function updateUser(userData: UserDataProps) {
  try {
    const existingUser = await db.users.findFirst({
      where: {
        username: userData.username,
        NOT: {
          id: userData.id,
        },
      },
    });

    if (existingUser) {
      return {
        success: false,
        message: 'Nome de usuário em uso, defina outro!',
      };
    }

    if (userData.password) {
      const password_hash = await bcrypt.hash(userData.password, 12);
      await db.users.update({
        where: {
          id: userData.id,
        },
        data: {
          name: userData.name,
          password_hash,
          username: userData.username,
        },
      });
    } else {
      await db.users.update({
        where: {
          id: userData.id,
        },
        data: {
          name: userData.name,
          username: userData.username,
        },
      });
    }

    revalidatePath('/perfil');

    return {
      success: true,
      message: 'Usuário atualizado com sucesso!',
    };
  } catch (error) {
    return {
      success: false,
      message: 'Erro interno, tente novamente mais tarde...',
    };
  }
}
