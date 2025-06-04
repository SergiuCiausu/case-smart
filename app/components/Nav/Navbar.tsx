'use client';

import { useTheme } from '../../context/ThemeContext';
import Link from 'next/link'
import React, { useState } from 'react'
import Image from 'next/image'
import "@/app/globals.css"
import { signIn } from 'next-auth/react';

const Navbar = () => {

  const { isDarkTheme, toggleTheme } = useTheme();
  const [ isAccountClicked, setIsAccountClicked ] = useState<boolean>(false);
  const [ isClicked, setIsClicked] = useState<boolean>(false);

  const handleAccountClick = () => {
    setIsAccountClicked(!isAccountClicked);
  }

  return (
    <nav
      className="primary-background w-full h-12 flex justify-center items-center">
      <div
        className="w-[1220px] flex items-center justify-between gap-8">
        <ul className="flex gap-8">
          <li>
            <Link href="/">
              <p className="nav-text neutral-color pr-5">Logo</p>
            </Link>
          </li>
          <li>
            <div className="flex gap-8">
                <Link href="/produse">
                  <p className="nav-text neutral-color underline decoration-white/0 hover:decoration-[var(--neutral-color)]/100 transition duration-150 ease-in-out">Produse</p>
                </Link>
                <Link href="/resigilate">
                  <p className="nav-text neutral-color underline decoration-white/0 hover:decoration-[var(--neutral-color)]/100 transition duration-150 ease-in-out">Resigilate</p>
                </Link>
                <Link href="/contact">
                  <p className="nav-text neutral-color underline decoration-white/0 hover:decoration-[var(--neutral-color)]/100 transition duration-150 ease-in-out">Contact</p>
                </Link>
            </div>
          </li>
        </ul>
        <form action="" className="h-8 flex py-1.5 neutral-background round-border items-center w-[366px]">
          <Image src="/search-icon.png" alt="Search icon" width={16} height={16} className="my-2 mx-4" style={{ objectFit: "contain" }}></Image>
          <label htmlFor="search-bar"></label>
          <input type="search" name="q" id="search-bar" placeholder="Caută produs" className="search-bar-text primary-color w-full outline-0" required/>
        </form>
        <ul className="flex items-center gap-4">
          <li className="flex items-center gap-2">
            <Image src="/phone-icon.png" alt="Phone icon" width={16} height={20}></Image>
            <p className="nav-text neutral-color">031 333 0308</p>
          </li>
          <li className="flex items-center gap-2">
            <Image src="/phone-icon.png" alt="Phone icon" width={16} height={20}></Image>
            <p className="nav-text neutral-color">0756 785 710</p>
          </li>
        </ul>
        <ul
          className="flex items-center">
          <li>
            <button id="theme-toggle" className="p-2 w-10 h-10" onClick={toggleTheme}><Image src={`${isDarkTheme ? "/theme-switch-dark.png" : "/theme-switch-light.png"}`} alt="theme-toggler" width={24} height={24}></Image></button>
          </li>
          <li>
            <button id="account" className={`p-2 w-10 h-10 ${isAccountClicked ? "primary-hover-background" : "primary-background"} flex items-center justify-center`} onClick={handleAccountClick}><Image src="/account-icon.png" alt="account icon" width={18} height={18}></Image></button>
            {isAccountClicked &&
              <div
                className="absolute top-20 white-background flex flex-col rounded-lg">
                <button className="px-4 py-2 text-left account-btn"><Link href="/client/sign-in">Loghează-te</Link></button>
                <button className="px-4 py-2 text-left account-btn"><Link href="/client/sign-up">Creează cont nou</Link></button>
              </div>
            }
          </li>
          <li>
            <button id="cart" className="p-2 w-10 h-10"><Link href="/checkout/cosul-meu"><Image src="/shopping-cart-icon.png" alt="" width={22} height={18}></Image></Link></button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar