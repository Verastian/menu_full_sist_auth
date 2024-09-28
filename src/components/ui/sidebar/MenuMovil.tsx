"use client";
import clsx from "clsx";

import { useSession } from "next-auth/react";
import { IconSelector } from '@/components';
import Link from "next/link";
import { logout } from "@/actions";
import { DataMovil, MenuItem, MovilItem, Nav, Submenu } from "@/interfaces";
import { useState } from "react";


interface Props {
    // isSideMenuOpen: boolean;
    onCloseMenu: () => void;
    data: MovilItem[];

}

export const MenuMovil = ({ onCloseMenu, data }: Props) => {

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

    const [itemSelected, setItemSelected] = useState<number | null>(null);
    return (
        <>
            <div className="my-10 max-w-2xl mx-auto space-y-2 lg:space-y-4" >
                {data
                    .filter(menu => menu.rol.includes(role))
                    .filter(menu => menu.label !== 'sign in' && isAuthenticated || menu.label !== 'logout' && !isAuthenticated)
                    .sort((a, b) => a.order - b.order)
                    .map((menu, index, array) => (
                        <div key={`item-${index}`} className=" bg-white p-1 ">
                            {menu.submenu.length !== 0
                                ?
                                //* WITH SUBMENU
                                <div key={`item-submenu-${index}`}
                                    className="flex items-center cursor-pointer justify-between p-2"
                                    onClick={() => setItemSelected(itemSelected !== index ? index : null)}>
                                    <div className="flex item-center ">
                                        {
                                            menu.icon && <IconSelector
                                                iconName={menu?.icon}
                                                className='transition-colors p-0 h-6 w-6 group-hover:text-orange-400 text-gray-800'
                                            />
                                        }
                                        <span className="ml-3 text-base capitalize">{menu.label}</span>
                                    </div>
                                    <IconSelector
                                        iconName={'down'}
                                        className={clsx(
                                            "transition-all duration-300 p-0 h-6 w-6 group-hover:text-orange-400 text-gray-800 ",
                                            { "rotate-180 ": itemSelected === index }
                                        )}
                                    />
                                </div>
                                :
                                //* WITHOUT SUBMENU
                                <div key={`item-link-${index}`} className="group" onClick={menu.label === 'logout' ? handleLogoutClick : undefined}>
                                    <Link

                                        href={menu.link}
                                        onClick={handleCloseSidebar}
                                        className="flex items-center p-2 hover:bg-gray-100 rounded transition-all cursor-pointer"
                                    >
                                        {
                                            menu.icon && <IconSelector
                                                iconName={menu?.icon}
                                                className='transition-colors p-0 h-6 w-6 group-hover:text-orange-400 text-gray-800'
                                            />
                                        }
                                        <span className="ml-3 text-base capitalize">{menu.label}</span>
                                    </Link>
                                </div>
                            }
                            {
                                menu.submenu.length !== 0 &&
                                <div className="relative overflow-hidden transition-all max-h-0 duration-300" style={{ maxHeight: itemSelected === index ? `${document.getElementById('answer-' + index)?.scrollHeight}px` : '' }}>
                                    <div className="text-gray-700 ml-8 md:ml-10 pl-3 md:pl-4 lg:pl-6 py-2 space-y-2" id={`answer-${index}`}>

                                        {menu.submenu.map((subitem, idx) => (
                                            <Link
                                                key={`item-${idx}`}
                                                href={subitem.link}
                                                onClick={handleCloseSidebar}
                                                className="flex items-center p-2 hover:bg-gray-100 rounded transition-all cursor-pointer"
                                            >
                                                <p className="">{subitem.label}</p>
                                            </Link>
                                        ))}

                                    </div>
                                </div>
                            }
                        </div>
                    ))}
            </div>
        </>
    );
};
