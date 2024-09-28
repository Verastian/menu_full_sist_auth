'use client'
import clsx from 'clsx'
import { titleFont } from '@/config/fonts';

import { usePathname } from 'next/navigation'


interface Props {
    headTitle: string;
    className?: string;
    isLine?: boolean;
    lineDark?: boolean;
}

export const HeadTitle = ({ headTitle, className, isLine = false, lineDark = false }: Props) => {
    const path = usePathname();

    return (
        <>
            <div className={clsx("mb-2 sm:p-0 flex flex-col justify-center items-center space-y-10 mt-10",
                { [`${className}`]: className }
            )}>
                <h1 className={`${titleFont.className} antialiased text-5xl font-semibold capitalize`}>
                    {headTitle}
                </h1>

                <div className='pt-5'>
                    {isLine &&
                        <div className={clsx("border-b-2",
                            { " border-b-gray-100": lineDark },
                            { " border-b-gray-800": !lineDark },
                        )} />
                    }
                </div>
            </div>
        </>
    )
}
