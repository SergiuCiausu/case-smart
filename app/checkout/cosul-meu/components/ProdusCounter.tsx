import { useState, useEffect } from "react";
import "@/app/produs/[prod]/prod.css"

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

const ProductCounter = ({ produs, culoare, onClick }: { produs: Produs, culoare: string, onClick: React.Dispatch<React.SetStateAction<number>> }) => {
    const storageKey = `cantitate${produs.denumire_produs}-${culoare}`;
    const [count, setCount] = useState(1);

    useEffect(() => {
        const storedCount = localStorage.getItem(storageKey);
        setCount(storedCount ? Number(storedCount) : 1);
    }, [storageKey]);

    const updateCount = (newCount: number, add: boolean) => {
        localStorage.setItem("cantitateTotala", String(localStorage.getItem("cantitateTotala") ? (add ? Number(localStorage.getItem("cantitateTotala")) + 1 : Number(localStorage.getItem("cantitateTotala")) - 1) : newCount));
        setCount(newCount);
        onClick(Number(localStorage.getItem("cantitateTotala")))
        localStorage.setItem(storageKey, String(newCount));
    };

    return (
        <div
            className="flex gap-4 items-center buton-nr-produse justify-center buton">
            <button 
                className="cursor-pointer" 
                onClick={() => count > 1 && updateCount(count - 1, false)}
            >
                <p className="buton-nr-produse-butoane primary-color py-3 px-4">-</p>
            </button>
            <p className="nav-text nav-bold accent-color">{count}</p>
            <button 
                className="cursor-pointer" 
                onClick={() => updateCount(count + 1, true)}
            >
                <p className="buton-nr-produse-butoane primary-color py-3 px-4">+</p>
            </button>
        </div>
    );
};

export default ProductCounter;