'use client';

import { useState } from 'react';
import { NewPasswordForm } from '@/components';
import { titleFont } from '@/config/fonts';
import clsx from 'clsx';

export default function ResetPasswordPage() {


    return (
        <div>
            <div className={clsx(
                "w-full sm:w-fit sm:min-w-[550px] h-fit px-10 rounded-2xl",
                " border border-zinc-300 dark:border-zinc-700 shadow-xl",
                "bg-zinc-50  dark:bg-zinc-800",
                "py-16 sm:px-16"
            )}>

                <h1 className={`${titleFont.className} whitespace-pre text-4xl mb-14`}>Restablecer Contraseña</h1>
                <NewPasswordForm />
            </div>
            {/* <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="password"
                    placeholder="Nueva contraseña"
                    {...register("password", { required: "Este campo es obligatorio" })}
                />
                {errors.password && <span>{errors.password.message}</span>}

                <input
                    type="password"
                    placeholder="Confirmar nueva contraseña"
                    {...register("confirmPassword", {
                        required: "Este campo es obligatorio",
                        validate: (val: string) => {
                            if (watch('password') != val) {
                                return "Las contraseñas no coinciden";
                            }
                        },
                    })}
                />
                {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}

                <button type="submit">Restablecer Contraseña</button>
            </form> */}
            {/* {message && <p>{message}</p>} */}
        </div>
    );
}