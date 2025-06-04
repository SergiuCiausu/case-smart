"use client";

import Header from '@/app/components/Nav/Header'
import React from 'react'
import Image from "next/image";
import "@/app/globals.css"
import "./auth.css"
import { signIn } from 'next-auth/react';

const page = () => {
  return (
    <div>
        <Header />
        <section
            className="w-[1220px] white-background mx-auto py-16 flex flex-col items-center gap-8">
                <h3 className="text-center">Loghează-te</h3>
                <div
                    className="w-[400px] flex flex-col gap-8">
                    <button
                        className="flex items-center justify-center gap-4 google-auth-btn py-3 rounded-lg w-full"
                        onClick={() => signIn("google", { callbackUrl: "/" })}>
                        <Image src="/google-logo.png" alt="google logo" width={48} height={48}></Image>
                        <p className="google-auth-btn-text">Continuă cu contul Google</p>
                    </button>
                    <div
                        className="flex items-center whitespace-nowrap gap-4">
                        <div className="auth-separator w-full"></div>
                        <p className="text-gray-400">Sau logheză-te cu contul tău mai jos:</p>
                        <div className="auth-separator w-full"></div>
                    </div>
                    <form 
                        action=""
                        className="flex flex-col gap-4">
                        <input type="email" name="email" placeholder="Email-ul tău" className="py-2 pl-4 auth-input rounded-lg"/>
                        <input type="password" name="password" placeholder="Parola ta" className="py-2 pl-4 auth-input rounded-lg"/>
                        <button type="submit" className="py-4 auth-in-btn-text rounded-lg">Loghează-te</button>
                    </form>
                </div>
                <button className="new-account-btn-text text-gray-400">Sau creează un cont nou aici</button>
        </section>
    </div>
  )
}

export default page