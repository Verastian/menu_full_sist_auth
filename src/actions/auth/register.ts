'use server';

import prisma from '@/lib/prisma';
import bcryptjs from 'bcryptjs'

type RegisterProps = {
  confirmation: string, email: string, password: string
}

export const registerUser = async ({ confirmation, email, password }: RegisterProps) => {
  try {

    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        passwordHash: bcryptjs.hashSync(password),
      },
      select: {
        id: true,
        email: true,
      }
    })

    return {
      ok: true,
      user: user,
      message: 'Usuario creado'
    }

  } catch (error) {
    console.log(error);

    return {
      ok: false,
      message: 'No se pudo crear el usuario'
    }
  }



}