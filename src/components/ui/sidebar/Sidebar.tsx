"use client";
import clsx from "clsx";
import { useUIStore } from "@/store";
import { Children, ReactNode, useEffect, useState } from "react";
import { Menubar } from './Menubar';
import { getLocalData } from "@/actions";
import { CommerceInfo, DataMenubar, DataMovil, MovilItem, Nav, Redirect, SocialMediaLink, } from "@/interfaces";
import { IconSelector, MenuMovil } from '@/components';
import Link from "next/link";
import { useScreenSize } from "@/hooks";

export const Sidebar = () => {

  const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen);
  const sideMenuContent = useUIStore((state) => state.sideMenuContent);
  const closeMenu = useUIStore((state) => state.closeSideMenu);
  const [redirectData, setRedirectData] = useState<Redirect[]>([]);
  const [navData, setNavData] = useState<Nav[]>([]);
  const [allDataMenu, setAllDataMenu] = useState<MovilItem[]>([]);
  const [btnSocialMediaData, setBtnSocialMediaData] = useState<SocialMediaLink[]>([]);
  const [logoImg, setLogoImg] = useState<string>('');
  const [shortTextData, setShortTextData] = useState<string>('');
  const [hidden, setHidden] = useState(true);
  const screen = useScreenSize();
  const isSm = screen('xs', 'sm')
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getLocalData();
        const { dataSidebar, dataMovil } = data
        const { navMovil }: DataMovil = dataMovil
        const { nav, commerceInfo, redirect }: DataMenubar = dataSidebar
        const { logo, shortText, btnSocialMedia }: CommerceInfo = commerceInfo
        setRedirectData(redirect);
        setAllDataMenu(navMovil);
        setNavData(nav);
        setLogoImg(logo);
        setBtnSocialMediaData(btnSocialMedia);
        setShortTextData(shortText);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);



  useEffect(() => {
    if (isSideMenuOpen) setHidden(false)
  }, [isSideMenuOpen]);


  const handleAnimationEnd = (event: { animationName: any; }) => {
    const animationName = event.animationName;
    if (animationName === 'fade-out') setHidden(true);

  };

  const typeCard = sideMenuContent ?? '';
  let component;

  switch (sideMenuContent) {
    case 'menubar':
      component = <Menubar onCloseMenu={closeMenu} data={navData || []} />;
      break;
    case 'menu-movil':
      component = <MenuMovil onCloseMenu={closeMenu} data={allDataMenu || []} />;
      break;
  }

  useEffect(() => {

  }, [])

  const handleCloseSidebar = () => {
    closeMenu();
  };

  return (
    <div>
      {/* BACK BLACK AND BLUR*/}
      <div
        onClick={closeMenu}
        className={clsx(" fixed top-0 left-0 w-screen h-screen z-30 backdrop-blur-sm bg-black bg-opacity-65",
          { 'hidden': hidden || isSideMenuOpen === null },
          { "animate-fade-in  ": isSideMenuOpen },
          { "animate-fade-out ": !isSideMenuOpen }
        )}
        onAnimationEnd={handleAnimationEnd}
      />
      {/* MENU SIDEBAR */}
      <nav className={clsx(
        "fixed p-5 right-0 top-0 w-full sm:w-[500px] h-screen bg-white",
        " z-40 shadow-2xl transform transition-all duration-300",
        "flex flex-col justify-between",
        { "animate-slide-out-right": !isSideMenuOpen },
        { "animate-slide-in-right": isSideMenuOpen },
        { 'hidden': isSideMenuOpen === null },
      )}>
        <div className="absolute top-5 right-5 cursor-pointer" onClick={handleCloseSidebar}>
          <IconSelector iconName={'close'}
            className='transition-colors p-0 h-8 w-8 group-hover:text-orange-400 text-gray-800 ' />
        </div>
        <div>{component}</div>

        <div className="w-full">
          {
            ['menubar'].includes(typeCard) &&
            <div className="mx-auto w-fit">
              <div className="pt-6 ">

              </div>
              {!isSm &&
                <div className="w-72 p-4 text-center">
                  <span className="">{shortTextData}</span>
                </div>
              }
            </div>
          }

          <div className="md:max-h-[32rem] overflow-y-auto">
          </div>

          <div className="mt-6 flex mx-auto w-fit">
            <div className="py-5 sm:row-span-2 flex w-full space-x-5 justify-center sm:justify-start">
              {btnSocialMediaData?.map((button, index) => (
                <Link key={index} href={button.link}>
                  <div key={index} >
                    <IconSelector iconName={button.label} className='transition-colors p-0 h-6 w-6 hover:text-orange-400 text-gray-800 ' />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex justify-around pt-4">
            {redirectData.map((redirect, index) => (
              <Link key={`${index}${redirect.text}`} href={redirect.link}>
                <span className="transition-colors text-gray-800 underline font-semibold hover:text-orange-400">{redirect.text}</span>
              </Link>

            ))}
          </div>

        </div>
      </nav>

    </div>


  );
};
