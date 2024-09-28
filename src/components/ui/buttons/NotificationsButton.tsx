'use client'
import React, { useEffect, useState } from 'react'
import { IconSelector } from '../icons/IconSelector';
import { useSession } from 'next-auth/react';

export const NotificationsButton = () => {

    const [mounted, setMounted] = useState(false);
    const [notifications, setNotifications] = useState(true);
    const { data: session } = useSession();
    const isAuthenticated = !!session?.user;
    useEffect(() => setMounted(true), []);

    const toggleNotifications = () => {

    };

    if (!mounted) return null;

    if (!isAuthenticated) return null;

    return (
        <>
            <button
                onClick={toggleNotifications}
                className="w-10 h-10 bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-full "
            >
                <div className="relative w-full h-full group">
                    <div
                        className={`w-full h-full`}
                    >
                        <div className="absolute w-full h-full flex items-center justify-center text-2xl">
                            <IconSelector
                                iconName={'bell'}
                                className='transition-colors duration-300 p-0 h-6 w-6 group-hover:text-orange-500 text-zinc-600'
                            />
                        </div>
                    </div>
                </div>
                {notifications && <div className="relative">
                    <span className="absolute -top-3 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        0
                    </span>
                </div>}
            </button>


        </>
    )
}
