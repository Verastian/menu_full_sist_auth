"use client";

import React, { forwardRef, InputHTMLAttributes } from "react";
import clsx from "clsx";
import { IconSelector } from "@/components";

interface InputWithIconProps extends InputHTMLAttributes<HTMLInputElement> {
    iconName: string;
    containerClassName?: string;
    inputClassName?: string;
    iconClassName?: string;
    placeholder?: string;
    value?: string;
    typeName: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
}

//forwardRef para pasar refs al input
export const Input = forwardRef<HTMLInputElement, InputWithIconProps>(
    (
        {
            iconName,
            containerClassName,
            inputClassName,
            iconClassName,
            placeholder = "Enter your email",
            value,
            typeName = "text",
            onChange,
            error,
            ...rest
        },
        ref
    ) => {

        console.log('ERROR2: ', error)
        return (
            <div className={clsx("group mb-2", containerClassName)}>
                <div
                    className={clsx(
                        "relative flex items-center rounded-md border duration-300 ease-in-out",
                        error
                            ? "border-red-500"
                            : "border-zinc-300 hover:border-zinc-400 dark:border-zinc-500 hover:dark:border-zinc-400",
                        "group-focus-within:border-orange-700 group-hover:transition-all group-focus:transition-all"
                    )}
                >
                    <IconSelector
                        iconName={iconName}
                        className={clsx(
                            "mx-2 p-0 h-6 w-6 text-light duration-500 ease-in-out transition-all",
                            error
                                ? "text-red-500"
                                : "group-focus-within:text-orange-600 group-hover:text-orange-600",
                            iconClassName
                        )}
                    />
                    <input
                        className={clsx(
                            "w-full rounded-r-md bg-zinc-100 dark:bg-zinc-900 border-0 p-4 text-sm focus:outline-none",
                            error && "focus:border-red-500",
                            inputClassName
                        )}
                        type={typeName}
                        placeholder={placeholder}
                        value={value}
                        onChange={onChange}
                        ref={ref} // Pasar el ref al input
                        {...rest} // Se pasan todas las props registradas por react-hook-form
                    />
                </div>
                {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
            </div>
        );
    }
);

//  nombre al componente en las devtools
Input.displayName = "Input";
