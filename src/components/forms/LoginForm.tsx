'use client';

import { useEffect } from 'react';
import Link from "next/link";
import { useForm, SubmitHandler } from 'react-hook-form';
import { IoInformationOutline } from "react-icons/io5";
import clsx from 'clsx';
import { Checkbox, Input } from '@/components';
import { authenticate } from "@/actions"; // Acción de autenticación
import { useFormState, useFormStatus } from 'react-dom';

interface LoginFormInputs {
  email: string;
  passwordHash: string;
  rememberMe: boolean;
}

export const LoginForm = () => {
  const { register, handleSubmit, formState: { errors }, setError } = useForm<LoginFormInputs>();
  const [state, dispatch] = useFormState(authenticate, undefined); // autenticar al usuario

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      // Convertir los datos del formulario en un objeto FormData
      const formData = new FormData();
      formData.append('email', data.email);
      formData.append('passwordHash', data.passwordHash);
      formData.append('rememberMe', data.rememberMe ? 'true' : 'false');

      // Llamar al dispatch con el FormData
      console.log(formData)
      await dispatch(formData);
    } catch (error) {
      setError('email', {
        type: 'manual',
        message: 'Credenciales incorrectas',
      });
    }
  };


  useEffect(() => {
    if (state === 'Success') {
      window.location.replace('/');
    }
  }, [state]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-10">
      {/* Input del email */}
      <Input
        iconName="atsign"
        placeholder="Email de Registro"
        typeName='email'
        inputClassName="text-sm"
        error={errors.email?.message} // Muestra error si existe
        {...register("email", {
          required: "El email es obligatorio",
          pattern: {
            value: /^\S+@\S+$/i,
            message: "Formato de email incorrecto"
          }
        })}
      />

      {/* Input de la contraseña */}
      <Input
        iconName="lock"
        placeholder="Contraseña"
        typeName='password'
        inputClassName="text-sm"
        error={errors.passwordHash?.message} // Muestra error si existe
        {...register("passwordHash", {
          required: "La contraseña es obligatoria",
          minLength: {
            value: 6,
            message: "La contraseña debe tener al menos 6 caracteres"
          }
        })}
      />

      {/* Mostrar error de credenciales inválidas */}
      {state === "CredentialsSignin" && (
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          <div className="flex flex-row mb-2">
            <IoInformationOutline className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">
              Credenciales no son correctas
            </p>
          </div>
        </div>
      )}

      {/* Checkbox para recordar sesión */}
      <Checkbox
        label="Recordarme"
        value="rememberMe"
        {...register("rememberMe")}
      />

      {/* Botón para iniciar sesión */}
      <LoginButton />
      {/* Divisor visual */}
      <div className="flex items-center">
        <div className="flex-1 border-t border-zinc-300 dark:border-zinc-700"></div>
        <div className="px-2 border-zinc-950 dark:text-zinc-100 ">O</div>
        <div className="flex-1 border-t border-zinc-300 dark:border-zinc-700"></div>
      </div>

      {/* Enlaces para otras acciones */}
      <div className='flex justify-between'>
        <Link href="/auth/forgot" className="primary-link text-center">
          ¿Olvidaste la contraseña?
        </Link>
        <Link href="/auth/new-account" className="primary-link text-center">
          Crear una nueva cuenta
        </Link>
      </div>
    </form>
  );
};

// Componente del botón de inicio de sesión
function LoginButton() {
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
      Ingresar
    </button>
  );
}

