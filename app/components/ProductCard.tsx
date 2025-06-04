"use client";

import Image from 'next/image'
import React, { useState } from 'react'
import "@/app/globals.css"
import Link from 'next/link';

interface Variant {
  culoare: string,
  img: string
}

const ProductCard = ({ title, rating, src, pret, reducere, totalRecenzii, isVisible, variants, isSingleFiltruCuloare, url }: { title: string, rating: number, src: string, pret: number, reducere: number, totalRecenzii: number, isVisible?: boolean, variants: Variant[], isSingleFiltruCuloare?: boolean, url: string}) => {

  const [img, setImg] = useState<string>(src);;

  const stele = [];

  for (let i = 1; i <= 5; i++) {
    stele.push(<span key={i} className={`stea`}></span>)
  }

  if (rating > 0) {
    for (let i = 1; i <= rating; i+= 1) {
      stele.pop()
      stele.unshift(<span key={i} className={`stea full`}></span>)
    }
  }
  
  if (Math.round(rating) !== rating) {
    stele[Math.ceil(rating) - 1] = <div><span className="stea left transparent"></span></div>
  }

  const handleOnMouseOverColorIcon = (img: string) => {
    setImg(img);
  }

  return (
    <Link 
      href={`/produs/${url}`}
      className="rounded-t-2xl flex flex-col">
      <div
        className="rounded-t-2xl">
        <Image
          src={!isSingleFiltruCuloare && img ? img : src}
          alt="imagine produs"
          width={300}
          height={300}
          style={{
            objectFit: "cover",
            maxHeight: "280px",
          }}></Image>
      </div>
      
        <div
          className={`p-4 white-background flex flex-col gap-4 ${isVisible ? "box-shadow": ""} rounded-b-2xl`}>
          <div
            className="flex flex-col gap-2">
            <p
              className="card-denumire-produs black-color">
              {title}
            </p>
            <div
              className={`flex items-center ${Math.round(rating) !== rating ? "gap-4" : "gap-1"} h-4`}>
                <div
                  className="flex">
                  {stele}
                </div>
                <div
                  className="flex">
                  <p
                    className="card-link accent-color flex gap-1">
                    {totalRecenzii} {totalRecenzii > 19 ? "de recenzii" : `${totalRecenzii === 1 ? "recenzie" : "recenzii"}`} | {!totalRecenzii ? <Link href="/" className="underline underline-offset-2"> Adaugă recenzie</Link> : <Link href="/" className="underline underline-offset-2">{`Citește ${totalRecenzii === 1 ? "recenzie" : "recenzii"}`}</Link>}
                  </p>
                </div>
            </div>
          </div>
          <div
            className="flex items-end gap-3">
            <div
              className="flex flex-col">
              <p
                className="card-pret-vechi black-color line-through">
                  {pret - 1}.99 Lei
              </p>
              <p
                className="card-pret accent-color">
                  {pret - Math.round(reducere * pret / 100) - 1}.99 Lei
              </p>
              </div>
              <div
                className="flex items-center gap-3 mb-1">
                {!isSingleFiltruCuloare &&
                variants.map((varianta, index) => (
                  <button
                    key={index}
                    className={`color-icon ${varianta.culoare} cursor-default`}
                    onMouseOver={() => handleOnMouseOverColorIcon(varianta.img)}>
                  </button>
                ))}
              </div>
          </div>
          <button
            className="flex px-4 py-2 gap-2 cta-btn w-[160px] btn-round">
            <Image
              src="/shopping-cart-icon.png"
              alt="shopping cart icon"
              width={18}
              height={13}
              style={{
                objectFit: "contain"
              }}></Image>
            <p
              className="btn-m-text neutral-color">
              Adaugă în coș
            </p>
          </button>
        </div>
    </Link>
  )
}

export default ProductCard