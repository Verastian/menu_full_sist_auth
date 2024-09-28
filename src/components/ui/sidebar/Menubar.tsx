"use client";
import clsx from "clsx";

import { useSession } from "next-auth/react";
import { IconSelector } from '@/components';
import Link from "next/link";
import { logout } from "@/actions";
import { Nav } from "@/interfaces";

interface Props {
    // isSideMenuOpen: boolean;
    onCloseMenu: () => void;
    data: Nav[];

}

export const Menubar = ({ onCloseMenu, data }: Props) => {

    const { data: session } = useSession();
    const isAuthenticated = !!session?.user;
    const isAdmin = session?.user.role === "admin";
    const role = session?.user.role ?? '';

    const handleCloseSidebar = () => {
        onCloseMenu();
    };

    const handleLogoutClick = () => {
        logout()
    }

    return (
        <>
            <div className="space-y-4 mt-8">
                {
                    data
                        .filter(menu => menu.rol.includes(role))
                        .filter(menu => menu.text !== 'sign in' && isAuthenticated || menu.text !== 'logout' && !isAuthenticated)
                        .sort((a, b) => a.order - b.order)
                        .map((menu, index, array) => (
                            <div key={`${index + 3}${menu.text}`} >
                                <div className="group" onClick={menu.text === 'logout' ? handleLogoutClick : undefined}>
                                    <Link
                                        href={menu.link}
                                        onClick={handleCloseSidebar}
                                        className="flex items-center p-2 hover:bg-gray-100 rounded transition-all"
                                    >
                                        <IconSelector
                                            iconName={menu.icon}
                                            className='transition-colors p-0 h-6 w-6 group-hover:text-orange-400 text-gray-800'
                                        />
                                        <span className="ml-3 text-base capitalize">{menu.text}</span>
                                    </Link>
                                </div>
                                {menu.order === 2 && index !== array.length - 1 && (
                                    <div className="border-b my-2" />
                                )}
                                {index === array.length - 1 && (
                                    <div className="border-b my-2" />
                                )}
                            </div>
                        ))
                }
            </div>

        </>
    );
};
