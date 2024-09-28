import { Prisma } from '@prisma/client';
import prisma from '../lib/prisma';
import { initialData } from './seed';
import bcryptjs from 'bcryptjs';

async function main() {

  // 1. Borrar registros previos
  await prisma.user.deleteMany();
  try {
    await Promise.all(
      initialData.users.map(async (user) => {
        const hashedPassword = bcryptjs.hashSync(user.passwordHash, 10);

        await prisma.user.upsert({
          where: { email: user.email },
          update: {},
          create: {
            email: user.email,
            passwordHash: hashedPassword,
            rol: user.rol,
          } as unknown as Prisma.UserCreateInput,
        });
      })
    );

    console.log('Seed ejecutado correctamente');
  } catch (error) {
    console.error('Error durante la ejecución del seed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

(() => {

  if (process.env.NODE_ENV === 'production') return;


  main();
})();