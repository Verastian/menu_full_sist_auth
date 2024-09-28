'use server'
import bcryptjs from 'bcryptjs'
import prisma from '@/lib/prisma';
import { createTransport } from 'nodemailer';
import crypto from 'crypto';

// Configuración de Nodemailer con Mailtrap
const transporter = createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS
  }
});

export async function requestPassword(
  prevState: string | undefined,
  formData: FormData,
) {
  const email = formData.get('email') as string;

  try {
    // Verificar si el usuario existe
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return 'UserNotFound';
    }

    // Generar token único
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hora de validez

    // Guardar token en la base de datos
    await prisma.user.update({
      where: { email },
      data: { resetToken, resetTokenExpiry }
    });

    // Enviar email
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?token=${resetToken}`;
    await transporter.sendMail({
      from: '"Tu Aplicación" <noreply@tuapp.com>',
      to: email,
      subject: "Recuperación de contraseña",
      html: `
        <p>Has solicitado restablecer tu contraseña.</p>
        <p>Haz clic en el siguiente enlace para crear una nueva contraseña:</p>
        <a href="${resetUrl}">Restablecer contraseña</a>
        <p>Este enlace expirará en 1 hora.</p>
        <p>Si no solicitaste este cambio, ignora este mensaje.</p>
      `
    });

    return 'EmailSent';

  } catch (error) {
    console.error(error);
    return 'Error';
  }
}

export async function resetPassword(token: string, newPassword: string) {
  try {
    // Buscar usuario con token válido
    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: { gt: new Date() }
      }
    });

    if (!user) {
      return 'InvalidToken';
    }

    // Actualizar contraseña y limpiar token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordHash: bcryptjs.hashSync(newPassword), // hashear 
        resetToken: null,
        resetTokenExpiry: null
      }
    });

    return 'Success';

  } catch (error) {
    console.error(error);
    return 'Error';
  }
}