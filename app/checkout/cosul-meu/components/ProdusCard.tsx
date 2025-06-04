"use client";

import Link from 'next/link'
import Image from "next/image"
import React, { useEffect } from 'react'

import ProdusCounter from './ProdusCounter'

interface Variant {
    culoare: string,
    img: string
}

interface Produs {
    id: number,
    cod_produs: number,
    denumire_produs: string,
    rating: number,
    img: string,
    reducere: number,
    totalRecenzii: number,
    brand: string,
    categorie: string,
    pret: number,
    descriere_produs: string,
    descriere: string,
    specificatii: string,
    variants: Variant[],
    grup_produs: number,
    url: string,
    cantitate: number
  }

const ProdusCard = ({ produs, index, functieCantitateTotala }: { produs: Produs, index: number, functieCantitateTotala: Dispatch<SetStateAction<number>> }) => {
  return (
    <li
        key={index}
        className="w-[840px] round-border white-background checkout-product-shadow p-8">
            <div></div>
            <div
                className="flex justify-around items-center">
                <div><Image src={produs.variants[0]?.img} alt="Imagine produs" width={170} height={144}></Image></div>
                <div
                    className="flex flex-col gap-2 max-w-[300px]">
                    <Link href={`/produs/${produs.url}`}><h5 className="card-denumire-produs">{produs.denumire_produs}</h5></Link>
                    <div
                        className="flex gap-2 items-center">
                        {produs.variants.map((varianta, index) => (
                            <div
                                key={index}>
                                <input
                                type="checkbox"
                                name={varianta.culoare.toUpperCase()}
                                value={varianta.culoare.toUpperCase()}
                                className={`appearance-none ${varianta.culoare.toUpperCase()} w-4 h-4 circle ${varianta.culoare.toUpperCase() === "ALB" && "white-circle-border"} cursor-pointer`} />
                            </div>
                        ))}
                    </div>
                    <div
                        className="flex flex-col opacity-50">
                        <p className="checkout-cod-produs">Cod produs: {produs.cod_produs}</p>
                        <p className="small-p">Livrare în 6-8 zile lucrătoare</p>
                    </div>
                </div>
                <div>
                    <ProdusCounter produs={produs} culoare={produs.variants[0].culoare} onClick={functieCantitateTotala}/>
                </div>
                <div
                    className="flex flex-col items-end">
                    <p className="checkout-pret-vechi line-through">{produs.pret}.99 lei</p>
                    <p className="checkout-pret accent-color">{Math.round(produs.pret - (produs.pret * produs.reducere / 100)) - 1}.99 lei</p>
                </div>
            </div>  
    </li>
  )
}

export default ProdusCard