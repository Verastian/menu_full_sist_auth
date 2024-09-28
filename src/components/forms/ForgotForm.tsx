'use client';

import { useEffect, useState } from 'react';
import Link from "next/link";
import { useForm, SubmitHandler } from 'react-hook-form';
import clsx from 'clsx';
import { Input } from '@/components';
import { requestPassword } from "@/actions";
import { useFormState, useFormStatus } from 'react-dom';

interface ForgotFormInputs {
  email: string;
}

export const ForgotForm = () => {
  const { register, handleSubmit, formState: { errors }, setError } = useForm<ForgotFormInputs>();
  const [state, dispatch] = useFormState(requestPassword, undefined);
  const [message, setMessage] = useState('');

  const onSubmit: SubmitHandler<ForgotFormInputs> = async (data) => {
    const formData = new FormData();
    formData.append('email', data.email);
    await dispatch(formData);
  };

  useEffect(() => {
    if (state === 'EmailSent') {
      setMessage('Se ha enviado un correo electrónico con instrucciones para restablecer tu contraseña.');
    } else if (state === 'UserNotFound') {
      setError('email', {
        type: 'manual',
        message: 'No se encontró ninguna cuenta con este correo electrónico.',
      });
    } else if (state === 'Error') {
      setMessage('Ocurrió un error. Por favor, inténtalo de nuevo más tarde.');
    }
  }, [state, setError]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-10">
      <Input
        iconName="atsign"
        placeholder="Email de Registro"
        typeName='email'
        inputClassName="text-sm"
        error={errors.email?.message}
        {...register("email", {
          required: "El email es obligatorio",
          pattern: {
            value: /^\S+@\S+$/i,
            message: "Formato de email incorrecto"
          }
        })}
      />
      <span className='italic text-sm text-zinc-800 dark:text-zinc-300'>* Un correo de confirmación será enviado a tu cuenta de email</span>
      <ForgotButton />
      {message && <p className="text-center text-green-600">{message}</p>}
      <div className="flex items-center">
        <div className="flex-1 border-t border-zinc-300 dark:border-zinc-700"></div>
        <div className="px-2 border-zinc-950 dark:text-zinc-100 ">O</div>
        <div className="flex-1 border-t border-zinc-300 dark:border-zinc-700"></div>
      </div>
      <div className='flex justify-between'>
        <Link href="/auth/new-account" className="primary-link text-center">
          Crear una nueva cuenta
        </Link>
        <Link href="/auth/login" className="primary-link text-center">
          Iniciar sesión
        </Link>
      </div>
    </form>
  );
};

function ForgotButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={clsx({
        "btn-primary": !pending,
        "btn-disabled": pending
      })}
      disabled={pending}
    >
      Recuperar cuenta
    </button>
  );
}