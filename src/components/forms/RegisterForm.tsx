"use client";

import clsx from "clsx";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";

import { login, registerUser } from "@/actions";
import { useState } from "react";
import { Checkbox, Input } from "@/components";
import { useFormStatus } from "react-dom";

type FormInputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  confirmation: string;
};

export const RegisterForm = () => {
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {

    setMessage("");
    const { email, password, confirmation } = data;

    // Server action
    const resp = await registerUser({ email, password, confirmation });

    if (!resp.ok) {
      setMessage(resp.message);
      return;
    }
    await login({ email, password });
    window.location.replace("/");
  };
  // Observamos el valor del campo "password"
  const password = watch("password");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-10">
      <Input
        iconName="atsign"
        placeholder="Email de Registro"
        typeName='email'
        inputClassName="text-sm"
        error={errors.email?.message}
        {...register("email", { required: "El email es obligatorio", pattern: /^\S+@\S+$/i })}
      />
      <Input
        iconName="lock"
        placeholder="Contraseña"
        typeName='password'
        inputClassName="text-sm"
        error={errors.password?.message}
        {...register("password", {
          required: "La contraseña es obligatoria",
          minLength: {
            value: 6,
            message: "La contraseña debe tener al menos 6 caracteres",
          },
        })}
      />
      <Input
        iconName="lock"
        placeholder="repetir Contraseña"
        typeName='password'
        inputClassName="text-sm"
        {...register("confirmPassword", {
          required: "Confirma tu contraseña",
          validate: (value) =>
            value === password || "Las contraseñas no coinciden", // Validación personalizada
        })}
        error={errors.confirmPassword?.message}
      />

      {message &&
        <span className="text-red-500">{message} </span>
      }


      <Checkbox
        label="I confirm that have read, consent and agree to Term of Use and Privacy Policy"
        value="yes"
        {...register("confirmation", {
          required: "Debes aceptar los términos y condiciones",
        })}
        error={errors.confirmation?.message}
      />


      <RegisterButton />

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

function RegisterButton() {
  const { pending } = useFormStatus();
  console.log('CLICK REGISTER BUTTON ')
  return (
    <button
      type="submit"
      className={clsx({
        "btn-primary": !pending,
        "btn-disabled": pending
      })}
      disabled={pending}
    >
      Crear cuenta
    </button>
  );
}