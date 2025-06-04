import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const ProductNavbar = ({ active }: { active?: boolean }) => {
  return (
    <section
        className="neutral-background w-[1220px] mx-auto flex items-center justify-between">
        <div 
            className="product-nav-background">  
            <Link
                href="/produse/intrerupatoare-touch"
                className="flex flex-col items-center justify-center gap-2 px-6 py-8 ">
                <Image src="/intrerupatoare-touch.png" alt="" width={48} height={48}></Image>
                <p className={`nav-bold primary-color text-center ${ active ? "active" : ""}`}>Întrerupătoare cu touch</p>
            </Link>
        </div>
        <div 
            className="product-nav-background">  
            <Link
                href="/produse/intrerupatoare-touch"
                className="flex flex-col items-center justify-center gap-2 px-6 py-8 ">
                <Image src="/priza.png" alt="" width={48} height={48}></Image>
                <p className={`nav-bold primary-color text-center ${ active ? "active" : ""}`}>Prize cu ramă de sticlă</p>
            </Link>
        </div>
        <div 
            className="product-nav-background">  
            <Link
                href="/produse/intrerupatoare-touch"
                className="flex flex-col items-center justify-center gap-2 px-6 py-8 ">
                <Image src="/intrerupator-si-priza.png" alt="" width={98} height={48}></Image>
                <p className={`nav-bold primary-color text-center ${ active ? "active" : ""}`}>Pachete întrerupător și priză</p>
            </Link>
        </div>
        <div 
            className="product-nav-background">  
            <Link
                href="/produse/intrerupatoare-touch"
                className="flex flex-col items-center justify-center gap-2 px-6 py-8 ">
                <Image src="/prize-media.png" alt="" width={48} height={48}></Image>
                <p className={`nav-bold primary-color text-center ${ active ? "active" : ""}`}>Prize media</p>
            </Link>
        </div>
        <div 
            className="product-nav-background">  
            <Link
                href="/produse/intrerupatoare-touch"
                className="flex flex-col items-center justify-center gap-2 px-6 py-8">
                <Image src="/telecomanda.png" alt="" width={110} height={48}></Image>
                <p className={`nav-bold primary-color text-center ${ active ? "active" : ""}`}>Telecomenzi</p>
            </Link>
        </div>
        <div 
            className="product-nav-background">  
            <Link
                href="/produse/intrerupatoare-touch"
                className="flex flex-col items-center justify-center gap-2 px-6 py-8 ">
                <Image src="/smart-home.png" alt="" width={54} height={48}></Image>
                <p className={`nav-bold primary-color text-center ${ active ? "active" : ""}`}>Smart home</p>
            </Link>
        </div>
        <div 
            className="product-nav-background">  
            <Link
                href="/produse/intrerupatoare-touch"
                className="flex flex-col items-center justify-center gap-2 px-6 py-8 ">
                <Image src="/configurare-diy.png" alt="" width={98} height={48}></Image>
                <p className={`nav-bold primary-color text-center ${ active ? "active" : ""}`}>Configurări DIY</p>
            </Link>
        </div>
    </section>
  )
}

export default ProductNavbar