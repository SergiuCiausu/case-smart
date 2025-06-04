'use client';

import React, { useEffect, useState } from 'react'
import Header from '../components/Nav/Header'
import ProductPageHeader from './components/ProductPageHeader'
import Filtre from './components/Filtre'
import axios from 'axios'
import Produse from './components/Produse'
import Ordonari from './components/Ordonari';

interface Variant {
    culoare: string,
    img: string
}

interface Produs {
    id: number
    denumire_produs: string,
    rating: number,
    img: string,
    reducere: number,
    totalRecenzii: number
    brand: string,
    categorie: string,
    pret: number,
    variants: Variant[]
}

const page = () => {
    
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [filters, setFilters] = useState<Record<string, (string | number)[]>>({
        pretMin: localStorage.getItem("pretMin") ? [localStorage.getItem("pretMin") as string] : [], 
        pretMax: localStorage.getItem("pretMax") ? [localStorage.getItem("pretMax") as string] : []
    })
    const [isSingleColorFilter, setIsSingleColorFilter] = useState<boolean>(false);
    const [products, setProducts] = useState<Produs[]>([]);

    const handlePretFilterChange = (updatedFilters: Record<string, string | number>) => {
        setFilters(updatedFilters);
    };

    useEffect(() => {
        const incarcaProduse = async () => {
                try {
                    const response = await axios.get("/api/produse", {
                        params: filters
                    })
                    setProducts(response.data);
                } catch (error) {
                    console.error("Error loading products: ", error);
                } finally {
                    setIsLoading(false);
                    filters?.culoare?.length === 1 ? (
                        setIsSingleColorFilter(true)
                    ) : setIsSingleColorFilter(false)
                }
            }
        incarcaProduse();
    }, [filters])
  return (
    <div>
        <Header />
        <ProductPageHeader header="Produse"/>
        <div
            className="flex max-w-[1220px] mx-auto mt-8 gap-5">
            <Filtre onFilterChange={setFilters}/>
            <div
                className="flex-1">
                <div>
                    <Ordonari onPretFilterChange={handlePretFilterChange} activeFilters={filters}/>
                </div>
                {isLoading
                ? 
                    <div
                        role="status"
                        className="w-[1220px] animate-pulse flex-col items-center gap-5">
                        <div
                            className="flex items-center gap-5 mb-5">
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
                        </div>
                        <div className="flex items-center gap-5 mb-5">
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
                        </div>
                    </div>
                : <Produse 
                    produse={products}
                    isSingleFiltruCuloare = {isSingleColorFilter}/>}
            </div>
        </div>
    </div>
  )
}

export default page