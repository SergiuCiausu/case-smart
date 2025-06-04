'use client';

import React, { useEffect, useState } from 'react'
import ProductCard from '../ProductCard'
import Image from 'next/image';
import axios from 'axios';

interface Variant {
    culoare: string,
    img: string
}


interface ProduseProps {
    id: number;
    denumire_produs: string;
    rating: number;
    img: string;
    pret: number;
    reducere: number;
    totalRecenzii: number,
    url: string,
    variants: Variant[]
}

const SectiuneProduse = ({ header }: { header: string }) => {

    const [currentProductIndex, setCurrentProductIndex] = useState(0);
    const [data, setData] = useState<ProduseProps[]>([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
    
        const produse = async () => {
          try {
            const response = await axios.get("/api/recomandari-produse");
            setData(response.data);
            
          } catch (error) {
            setError("Eroare în procesarea datelor");
          } finally {
            setIsLoading(false);
          }
        };
    
        produse();
      }, [])

    const totalProducts = data.length;
    const visibleProducts= 4;

    const moveProductsLeft = () => {
        setCurrentProductIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    }

    const moveProductsRight = () => {
        setCurrentProductIndex((prevIndex) => Math.min(prevIndex + 1, totalProducts - visibleProducts))
    }


  return (
    <section
        className="flex flex-col mx-auto w-[1364px] h-full">
        <h3
            className={`black-color mb-8 ml-[72px]`}>
            {header}
        </h3>
        <div 
            className="flex items-stretch gap-5 h-full"
            style={{
                overflow: "hidden"
            }}>
            <div
                className="flex-1 flex items-center justify-center neutral-background z-10">
                <button className={`flex items-center justify-center rounded-lg white-background px-5 py-4 w-[52px] h-[52px] ${currentProductIndex === 0 ? "opacity-0" : ""}`} onClick={moveProductsLeft}><Image src="/arrow-icon-purple-left.png" alt="arrow" width={20} height={12}></Image></button>
            </div>
            { isLoading
            ?
                <div
                    role="status"
                    className="flex w-[1220px] mx-auto gap-5 animate-pulse">
                        <div
                            className="h-[504px] bg-gray-300 round-border w-[290px] flex items-center justify-center">
                                <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                                </svg>
                        </div>
                        <div
                            className="h-[504px] bg-gray-300 round-border w-[290px] flex items-center justify-center">
                                <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                                </svg>
                        </div>
                        <div
                            className="h-[504px] bg-gray-300 round-border w-[290px] flex items-center justify-center">
                                <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                                </svg>
                        </div>
                        <div
                            className="h-[504px] bg-gray-300 round-border w-[290px] flex items-center justify-center">
                                <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                                </svg>
                        </div>
                    <span className="sr-only">Loading...</span>
                </div>
            : 
                <div
                    className="flex w-[1220px] mx-auto gap-5 transition-transform duration-150"
                    style={{
                        transform: `translateX(${-(currentProductIndex * 310)}px)`
                    }}>
                    {data.map((produs: ProduseProps, index: number) => (
                        <div
                            key={index}
                            className="shrink-0 w-[290px]">
                            
                            <ProductCard 
                                title={produs.denumire_produs}
                                rating={produs.rating}
                                src={produs.img}
                                pret={produs.pret}
                                reducere={produs.reducere}
                                totalRecenzii={produs.totalRecenzii}
                                variants={produs.variants}
                                isVisible= {currentProductIndex + 1 > produs.id ? false : true}
                                url={produs.url}
                            />
                        </div>
                        ))
                    }
                </div>}
            
            <div
                className="flex-1 flex items-center justify-center neutral-background z-10">
                <button className={`flex items-center justify-center rounded-lg white-background px-5 py-4 w-[52px] h-[52px] ${currentProductIndex === totalProducts - 4 ? "opacity-0" : ""}`} onClick={moveProductsRight}><Image src="/arrow-icon-purple-right.jpg" alt="arrow" width={20} height={12}></Image></button>
            </div>
        </div>

    </section>
  )
}

export default SectiuneProduse