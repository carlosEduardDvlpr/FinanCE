'use server';

import { db } from '@/lib/prisma';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import { GetUSerLoginProps } from './get-user-login-type';

const SECRET_KEY = process.env.SECRET_KEY;
const TOKEN_NAME = process.env.TOKEN_NAME;

export async function getUserLogin({ username, password }: GetUSerLoginProps) {
  if (!SECRET_KEY || !TOKEN_NAME) {
    return {
      success: false,
      message: 'Erro interno, tente novamente mais tarde...',
    };
  }

  if (!username || !password) {
    return {
      success: false,
      message: 'Campos obrigatórios faltando!',
    };
  }

  try {
    const user = await db.users.findFirst({
      where: {
        username,
      },
    });

    if (!user) {
      return {
        success: false,
        message: 'Usuário não encontrado!',
      };
    }

    const isValidPassword = await bcrypt.compare(password, user?.password_hash.trim());

    if (!isValidPassword) {
      return {
        success: false,
        message: 'Usuário não encontrado!',
      };
    }

    const tokenJWT = jwt.sign(
      { user: user.username, id: user.id },
      SECRET_KEY,
      {
        expiresIn: '3d',
      },
    );

    (await cookies()).set(TOKEN_NAME, tokenJWT, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: new Date(Date.now() + 60 * 60 * 24 * 3 * 1000),
      maxAge: 60 * 60 * 24 * 3,
    });

    return {
      success: true,
      message: 'Login realizado com sucesso!',
    };
  } catch (error) {
    return {
      success: false,
      message: 'Erro interno, tente novamente mais tarde...',
    };
  }
}
