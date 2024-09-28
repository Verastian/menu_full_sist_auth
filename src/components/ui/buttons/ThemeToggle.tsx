'use client'
import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { IconSelector } from '../icons/IconSelector';

export const ThemeToggle = () => {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => setMounted(true), []);

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    if (!mounted) return null;

    return (
        <button
            onClick={toggleTheme}
            className="w-10 h-10 bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-full "
        >
            <div className="relative w-full h-full group">
                {/* Card container */}
                <div
                    className={`card-inner w-full h-full transition-transform duration-500 transform ${theme === 'dark' ? 'rotate-y-180' : ''
                        }`}
                >
                    {/* Front (🌙) */}
                    <div className="card-front absolute w-full h-full flex items-center justify-center text-2xl">
                        <IconSelector
                            iconName={'moon'}
                            className='transition-colors duration-300 p-0 h-6 w-6 group-hover:text-orange-500 text-zinc-600'
                        />
                    </div>
                    {/* Back (🌞) */}
                    <div className="card-back absolute w-full h-full flex items-center justify-center text-2xl rotate-y-180">
                        <IconSelector
                            iconName={'sun'}
                            className='transition-colors p-0 h-6 w-6 group-hover:text-orange-500 text-yellow-400'
                        />
                    </div>
                </div>
            </div>
        </button>
    );
};
