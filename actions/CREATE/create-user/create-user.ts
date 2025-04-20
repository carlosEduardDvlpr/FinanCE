'use server';

import { db } from '@/lib/prisma';
import { CreateUserProps } from './create-user-type';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';

const SECRET_KEY = process.env.SECRET_KEY;
const TOKEN_NAME = process.env.TOKEN_NAME;

export async function createUser({
  name,
  username,
  password,
}: CreateUserProps) {
  if (!SECRET_KEY || !TOKEN_NAME) {
    return {
      success: false,
      message: 'Erro interno, tente novamente mais tarde...',
    };
  }

  if (!name || !username || !password) {
    return {
      success: false,
      message: 'Campos obrigatórios faltando!',
    };
  }

  try {
    const existingUser = await db.users.findFirst({
      where: {
        username,
      },
    });

    if (existingUser) {
      return {
        success: false,
        message: 'Nome de usuário em uso, defina outro!',
      };
    }

    const password_hash = await bcrypt.hash(password, 12);
    const newUser = await db.users.create({
      data: {
        name,
        password_hash,
        username,
      },
    });

    const tokenJWT = jwt.sign(
      { user: newUser.username, id: newUser.id },
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
      message: 'Usuário cadastrado com sucesso!',
    };
  } catch (error) {
    return {
      success: false,
      message: 'Erro interno, tente novamente mais tarde...',
    };
  }
}
