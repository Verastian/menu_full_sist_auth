"use client";

import clsx from "clsx";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";

import { resetPassword } from '@/actions';
import { useEffect, useState } from "react";
import { Input } from "@/components";
import { useFormStatus } from "react-dom";
import { useSearchParams, useRouter } from "next/navigation";

type FormInputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  confirmation: string;
};
interface ResetPasswordInputs {
  password: string;
  confirmPassword: string;
}
export const NewPasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [token, setToken] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const { register, handleSubmit, formState: { errors }, watch } = useForm<ResetPasswordInputs>();

  useEffect(() => {
    setToken(searchParams.get('token'));
  }, [searchParams]);

  const onSubmit: SubmitHandler<ResetPasswordInputs> = async (data) => {
    if (!token) {
      setMessage('Token inválido');
      return;
    }

    const result = await resetPassword(token, data.password);

    if (result === 'Success') {
      setMessage('Contraseña restablecida con éxito. Redirigiendo al inicio de sesión...');
      setTimeout(() => router.push('/auth/login'), 3000);
    } else {
      setMessage('Error al restablecer la contraseña. Por favor, inténtalo de nuevo.');
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-10">
      <Input
        iconName="lock"
        placeholder="nueva contraseña"
        typeName='password'
        inputClassName="text-sm"
        error={errors.password?.message}
        {...register("password", { required: "Este campo es obligatorio" })}
      />
      <Input
        iconName="lock"
        placeholder="confirmar contraseña"
        typeName='password'
        inputClassName="text-sm"
        error={errors.password?.message}
        {...register("confirmPassword", {
          required: "Este campo es obligatorio",
          validate: (val: string) => {
            if (watch('password') != val) {
              return "Las contraseñas no coinciden";
            }
          },
        })}
      />
      {message &&
        <span className="text-red-500">{message} </span>
      }


      <ConfirmButton />

      {/* divisor l ine */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-zinc-300 dark:border-zinc-700"></div>
        <div className="px-2 border-zinc-950 dark:tex-zinc-100 ">O</div>
        <div className="flex-1 border-t border-zinc-300 dark:border-zinc-700"></div>
      </div>

      <div className='flex justify-between'>
        <Link href="/auth/forgot" className="primary-link text-center">
          ¿Olvidaste la contraseña?
        </Link>
        <Link href="/auth/login" className="primary-link text-center">
          Iniciar sesión
        </Link>
      </div>
    </form>
  );
};

function ConfirmButton() {
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
      Crear nueva contraseña
    </button>
  );
}