import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Categorii = () => {
  return (
    <section
        className="flex justify-between gap-5 max-w-[1220px] mx-auto">
        <Link 
            href="/"
            className="flex flex-col gap-5">
            <div className="round-border box-shadow"><Image src="/Product category card intrerupatoare.png" alt="categorie produs" width={290} height={132}></Image></div>
            <div className="round-border box-shadow"><Image src="/Product category card prize media.png" alt="categorie produs" width={290} height={132}></Image></div>
        </Link>
        <Link 
            href="/"
            className="flex flex-col gap-5">
            <div className="round-border box-shadow"><Image src="/Product category card prize.png" alt="categorie produs" width={290} height={132}></Image></div>
            <div className="round-border box-shadow"><Image src="/Product category telecomenzi.png" alt="categorie produs" width={290} height={132}></Image></div>
        </Link>
        <Link 
            href="/"
            className="flex flex-col gap-5">
            <div className="round-border box-shadow"><Image src="/Product category card intrerupator priza.png" alt="categorie produs" width={290} height={132}></Image></div>
            <div className="round-border box-shadow"><Image src="/Product category smart home.png" alt="categorie produs" width={290} height={132}></Image></div>
        </Link>
        <Link href="/" className="round-border box-shadow"><Image src="/Product category configurare diy.png" alt="categorie produs" width={309} height={284}></Image></Link>
    </section>
  )
}

export default Categorii