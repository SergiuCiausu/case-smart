import ProductCard from '@/app/components/ProductCard'
import React from 'react'

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

interface ProduseProps {
    produse: Produs[]
}

const Produse: React.FC<ProduseProps> = ({ produse, isSingleFiltruCuloare }: {produse: Produs, isSingleFiltruCuloare: boolean}) => {
  return (
    <div
        className="grid grid-cols-3 gap-5">
        {produse.length > 0
        ? produse.map((produs) => (
                <ProductCard 
                    key={produs.id}
                    title={produs.denumire_produs}
                    rating={produs.rating}
                    src={produs.img}
                    pret={produs.pret}
                    reducere={produs.reducere}
                    totalRecenzii={produs.totalRecenzii}
                    variants={produs.variants}
                    isSingleFiltruCuloare={isSingleFiltruCuloare}
                />
            ))
        : <p>Not found</p>
        }
    </div>
  )
}

export default Produse