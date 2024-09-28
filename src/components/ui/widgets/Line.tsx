'use client'
import clsx from 'clsx';
import React, { FC, MouseEvent, ReactNode } from 'react'


interface Props {
    children: ReactNode;
    color?: 'orange' | 'black' | 'gray';
    size?: 'small' | 'normal' | 'large';
    active?: boolean;
    posTop?: string;
}
export const Line = ({ children, color = 'orange', size = 'normal', active = false, posTop = 'after:top-[40px]' }: Props) => {
    const handleHover = (e: MouseEvent<HTMLSpanElement>) => {
        e.stopPropagation();
        const target = e.currentTarget;
        const child = target.firstChild as HTMLElement;
        child.classList.add('hover:after:w-full');
        child.classList.add('hover:after:left-0');
        child.classList.remove('hover:after:right-auto');
    };

    const sizeVariant = {
        small: 'after:h-[1px]',
        normal: 'after:h-[2px]',
        large: 'after:h-[4px]',
    }
    const colorVariant = {
        orange: 'after:from-orange-600 after:to-orange-400',
        black: 'after:from-black after:to-gray-800',
        gray: 'after:from-gray-600 after:to-gray-400',
    }



    return (
        <span
            className={clsx(
                'group after:bg-current inline-block relative transition-all duration-[0.3s] ease-in after:content-[\'\']',
                // 'after:w-0',
                sizeVariant[size],
                'after:absolute',
                'after:transition-all',
                'after:duration-500',
                'after:ease-[cubic-bezier(0.25,0.8,0.25,1)]',
                'after:delay-[0s]',
                'after:left-auto',
                'after:right-0',
                // 'after:top-10',
                // `after:top-[40px]`,
                posTop,
                'dynamic-after-width',
                'hover:after:w-full',
                'hover:after:left-0',
                'hover:after:right-auto',
                `after:bg-gradient-to-l`,
                colorVariant[color],
                { "after:w-full": active },
                { "after:w-0": !active },
            )}
            onMouseEnter={handleHover}
        >
            {children}
        </span>
    );
};
