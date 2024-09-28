"use client";
import { useEffect, useState } from 'react';

import { useUIStore } from "@/store";
import { getLocalData } from '@/actions';
import clsx from 'clsx';
import { useScreenSize, useScrollPosition } from '@/hooks';
import { NotificationsButton, ThemeToggle, UserMenu } from '@/components';


export const TopMenu = () => {
  const isSearchOpen = useUIStore((state) => state.isSearchOpen);
  const [loaded, setLoaded] = useState(false);
  const screen = useScreenSize();
  const scrollPosition = useScrollPosition()



  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getLocalData();
        const { dataMenu } = data
        // const { menu }: DataMenu = dataMenu
        // setMenuData(menu);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setLoaded(true);
  }, [])

  // if (!loaded) {
  //   return <div>Loading...</div>;
  // }
  return (

    <div className={clsx(
      "border-b border-zinc-200 dark:border-zinc-700",
      "transition-all duration-300 relative",
      { "sticky top-0 z-20 bg-back-blur": scrollPosition > 0 && !isSearchOpen },
    )}>
      <nav className="container mx-auto flex py-1 px-5 justify-between items-center w-full">
        <h1>LOGONAME</h1>
        <div className='space-x-3 p-2'>
          {!loaded ?
            <>
              {Array.from({ length: 3 }, (_, index) => (
                <button disabled key={index} className="w-10 h-10 bg-zinc-200 dark:bg-zinc-800 animate-pulse rounded-full ">
                  <div className="relative w-full h-full group">
                    <div className="w-full h-full">
                      <div className="absolute w-full h-full flex items-center justify-center text-2xl">
                        <div className="h-6 w-6"></div>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </>
            :
            <>
              <NotificationsButton />
              <ThemeToggle />
              <UserMenu />
            </>
          }
        </div>
      </nav >
    </div >


  );
};
