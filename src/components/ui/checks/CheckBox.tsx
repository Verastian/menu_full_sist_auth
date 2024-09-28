'use client'
import { forwardRef, InputHTMLAttributes, useEffect, useState } from 'react';
import clsx from 'clsx';
import { IconSelector } from '@/components';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    value: string;
    error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
    ({
        label,
        value,
        error,
        ...rest
    },
        ref

    ) => {
        const [isChecked, setIsChecked] = useState(false);

        useEffect(() => {
            if (isChecked) {
                setIsChecked(false)
            }
        }, [])

        const { name } = rest
        return (
            <div className="my-8">
                <div className="flex items-center">
                    <div className="group relative flex items-center mr-2" onClick={() => setIsChecked(!isChecked)}>
                        <input
                            type="checkbox"
                            id={`${name}${value}`}
                            value={value}
                            checked={isChecked}
                            className="absolute h-8 w-8 opacity-0 z-10"
                            ref={ref}
                            {...rest}
                        />
                        <div
                            className={clsx(
                                'mr-2 flex h-6 w-6 items-center justify-center rounded-md border p-1',
                                'duration-300 ease-in-out transition-all',
                                {
                                    'orange-group ': isChecked,
                                    'border-zinc-400 group-hover:border-zinc-700 dark:border-zinc-700 group-hover:dark:border-zinc-500 ': !isChecked
                                }
                            )}
                        >
                            <IconSelector
                                iconName={'check'}
                                className={clsx(' p-0 h-6 w-6 text-light z-0',
                                    { 'animate-fade-in': isChecked, 'animate-fade-out': !isChecked }
                                )}
                            />
                        </div>
                    </div>
                    <label className="text-sm text-light cursor-pointer" onClick={() => setIsChecked(!isChecked)}>
                        <span>{label}</span>
                    </label>
                </div>
                {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
            </div>
        );
    }
);
//  nombre al componente en las devtools
Checkbox.displayName = "Checkbox";
