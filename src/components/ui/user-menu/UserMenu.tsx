'use client'
import React, { useState, useRef, FC, useEffect, useCallback } from 'react';
import clsx from 'clsx';
import { useOutsideClick } from '@/hooks';
import { MenuItem } from '@/interfaces';
import { useSession, signOut } from "next-auth/react";
import { IconSelector } from '@/components';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface UserMenuProps { }

export const UserMenu: FC<UserMenuProps> = () => {
    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const router = useRouter();
    const { data: session } = useSession();
    const isAuthenticated = !!session?.user;
    const role = session?.user?.rol ?? '';
    const userImage = 'https://randomuser.me/api/portraits/men/32.jpg';
    const registrationDate = 'October 2022';
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [animationComplete, setAnimationComplete] = useState(true);
    const [notifications, setNotifications] = useState(false);
    const [hidden, setHidden] = useState(true);

    const menuItems: MenuItem[] = [
        {
            text: 'profile',
            link: '/profile',
            icon: 'user',
            rol: ['admin', 'user'],
            order: 1,
        },
        {
            text: 'customize',
            link: '/customize',
            icon: 'customize',
            rol: ['admin', 'user'],
            order: 2,
        },
        {
            text: isAuthenticated ? 'logout' : 'sign in',
            link: isAuthenticated ? undefined : '/auth/login',
            icon: isAuthenticated ? 'logout' : 'login',
            rol: ['guest', 'user', 'admin', ''],
            order: 3,
        },
    ];

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 500);
        return () => clearTimeout(timer);
    }, []);

    const handleOutsideClick = useCallback(() => {
        if (isOpen) {
            setIsOpen(false);
        }
    }, [isOpen]);

    useOutsideClick([menuRef, buttonRef], handleOutsideClick, animationComplete);

    const toggleMenu = useCallback((event: React.MouseEvent) => {
        event.stopPropagation();
        setIsOpen(prev => !prev);
    }, []);

    const handleItemClick = (item: MenuItem) => {
        if (item.text === 'logout') {
            signOut();
        } else if (item.link) {
            router.push(item.link);
        }
        setIsOpen(false);
    };
    useEffect(() => {
        if (isOpen) setHidden(false)
    }, [isOpen]);

    const handleAnimationEnd = (event: { animationName: any; }) => {
        const animationName = event.animationName;
        setAnimationComplete(true)
        if (animationName === 'swing-out-top-bck') setHidden(true);

    };
    const handleAnimationStart = () => {
        setAnimationComplete(false)
    };

    return (
        <div className="relative inline-block text-left">
            <button
                ref={buttonRef}
                onClick={toggleMenu}
                className={clsx(
                    'group transition-all duration-300 flex items-center space-x-2 rounded-full',
                    ' hover:bg-zinc-300 dark:hover:bg-zinc-700 focus:outline-none',
                    'bg-zinc-200 dark:bg-zinc-800'
                )}
                aria-expanded={isOpen}
                aria-haspopup="true"
            >
                {isAuthenticated ?
                    <Image
                        src={userImage}
                        width={100}
                        height={100}
                        alt="User avatar"
                        className="w-10 h-10 rounded-full"
                    /> :
                    <div>
                        <IconSelector
                            iconName={'user'}
                            className=' p-2 h-10 w-10  group-hover:text-orange-500 text-zinc-500'
                        />
                    </div>
                }
                {notifications && <div className="relative">
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        0
                    </span>
                </div>}
            </button>

            <div
                ref={menuRef}
                className={clsx(
                    'absolute z-40 top-14 right-0 mt-2 w-56 bg-white dark:bg-zinc-800 rounded-2xl',
                    ' shadow-lg ring-1 ring-black ring-opacity-5',
                    'border border-zinc-200 dark:border-zinc-700',
                    { 'hidden': hidden },
                    { 'animate-swing-out-top-bck ': !isOpen, 'animate-swing-in-top-fwd': isOpen }
                )}
                onAnimationEnd={handleAnimationEnd}
                onAnimationStart={handleAnimationStart}
            >
                {isLoading ? (
                    <div className="flex justify-center items-center h-32">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-zinc-900 dark:border-zinc-100"></div>
                    </div>
                ) : (
                    <>
                        {
                            isAuthenticated &&
                            <div className="p-4 border-b border-zinc-200 dark:border-zinc-700">
                                <div className="flex items-center">

                                    <Image
                                        src={userImage}
                                        width={100}
                                        height={100}
                                        alt="User avatar"
                                        className="w-10 h-10 rounded-full"
                                    />
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-zinc-900 dark:text-white">
                                            {session?.user.email}
                                        </p>
                                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                            Joined {registrationDate}
                                        </p>
                                    </div>

                                </div>
                            </div>
                        }
                        <div className={clsx('h-full', { 'py-2': menuItems.length === 1 })}>
                            {menuItems
                                .filter(menu => menu.rol.includes(role))
                                .filter(menu => isAuthenticated ? menu.text !== 'sign in' : menu.text !== 'logout')
                                .sort((a, b) => a.order - b.order)
                                .map((item, index) => (
                                    <button
                                        key={item.text + index}
                                        onClick={() => handleItemClick(item)}
                                        className={clsx(
                                            'group flex items-center w-full px-4 text-sm ',
                                            ' text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700',
                                            'transition-all ',
                                            { 'rounded-b-2xl': menuItems.length - 1 === index },
                                            {
                                                'py-4 rounded-2xl': item.text.toLowerCase() === 'sign in',
                                                'py-2 ': item.text.toLowerCase() !== 'sign in'
                                            },

                                        )}
                                    >
                                        <IconSelector
                                            iconName={item.icon}
                                            className='transition-colors p-0 h-6 w-6 group-hover:text-orange-400 text-zinc-200'
                                        />
                                        <span className="ml-3 text-sm capitalize">{item.text}</span>
                                    </button>
                                ))}
                        </div>
                    </>
                )}
            </div>

        </div>
    );
};