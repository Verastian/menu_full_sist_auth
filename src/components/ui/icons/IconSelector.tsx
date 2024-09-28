'use client'
import React from 'react';
import {
  IoInformationOutline,
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoLinkedin,
  IoSearchOutline,
  IoCartOutline,
  IoCloseOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoHomeOutline,
  IoShirtOutline,
  IoRocketOutline,
  IoTicketOutline,
  IoStorefrontOutline,
  IoSettingsOutline,
  IoBagCheckOutline,
  IoPricetagsOutline,
  IoHeartOutline,
  IoHeart,
  IoTrashBinOutline,
  IoEye,
  IoChevronDownOutline,
  IoChevronUpOutline,
  IoChevronForward,
  IoChevronBack,
  IoMoonOutline,
  IoSunnyOutline,
  IoLockOpenOutline,
  IoCheckmarkSharp,
} from 'react-icons/io5';
import { FaXTwitter, FaBarsStaggered, FaCartPlus, FaTruckArrowRight } from 'react-icons/fa6';
import { BiCustomize } from "react-icons/bi";
import { FiAtSign } from "react-icons/fi";
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { CiGrid41, CiGrid2H, CiViewList, CiFilter, CiDeliveryTruck, CiBoxes } from "react-icons/ci";
import { PiBell, PiHandCoinsThin, PiArchiveBoxThin, PiHoodieThin, PiShirtFoldedThin, PiPantsThin, PiBaseballCapThin, PiFootprintsThin, PiDotsThree } from "react-icons/pi";
import { PiArrowsLeftRightLight } from "react-icons/pi";

import { NextComponentType } from 'next';
import { IconContext } from "react-icons";
interface Props {
  iconName: string;
  className?: string;
}

const iconMapping: { [key: string]: NextComponentType } = {
  about: IoRocketOutline,
  addcart: FaCartPlus,
  arrowrightleft: PiArrowsLeftRightLight,
  atsign: FiAtSign,
  bars: FaBarsStaggered,
  bag: IoBagCheckOutline,
  bell: PiBell,
  box: PiArchiveBoxThin,
  cart: IoCartOutline,
  categories: IoPricetagsOutline,
  check: IoCheckmarkSharp,
  close: IoCloseOutline,
  customize: BiCustomize,
  down: IoChevronDownOutline,
  facebook: IoLogoFacebook,
  fillheart: IoHeart,
  filleye: IoEye,
  filltruck: FaTruckArrowRight,
  filter: CiFilter,
  grid: CiGrid41,
  gridlg: CiGrid2H,
  hat: PiBaseballCapThin,
  handcoins: PiHandCoinsThin,
  heart: IoHeartOutline,
  home: IoHomeOutline,
  hoodie: PiHoodieThin,
  information: IoInformationOutline,
  instagram: IoLogoInstagram,
  linkedin: IoLogoLinkedin,
  list: CiViewList,
  lock: IoLockOpenOutline,
  login: IoLogInOutline,
  logout: IoLogOutOutline,
  left: IoChevronForward,
  more: PiDotsThree,
  moon: IoMoonOutline,
  pants: PiPantsThin,
  product: IoShirtOutline,
  right: IoChevronBack,
  settings: IoSettingsOutline,
  search: IoSearchOutline,
  shirt: PiShirtFoldedThin,
  shoes: PiFootprintsThin,
  store: IoStorefrontOutline,
  sun: IoSunnyOutline,
  ticket: IoTicketOutline,
  trash: IoTrashBinOutline,
  truck: CiDeliveryTruck,
  twitter: FaXTwitter,
  up: IoChevronUpOutline,
  users: IoPeopleOutline,
  user: IoPersonOutline,
  // add ...
};

export const IconSelector = ({ iconName, className }: Props) => {
  const SelectedIcon = iconMapping[iconName.toLowerCase()];

  if (!SelectedIcon) {
    console.error(`Icon '${iconName}' not found. Please check your icon name.`);
    return null;
  }
  return (
    <>
      <IconContext.Provider value={{ className: `${className}` }}>
        <SelectedIcon />
      </IconContext.Provider>
    </>
  );
};

