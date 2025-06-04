import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

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
    cantitate: number,
    culoare: string
}

type CartContextType = {
  cart: Produs[];
  loadingProds: boolean;
  addToCart: (product: Produs, cantitate: number, culoare: string) => void;
  removeFromCart: (id: number) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode}) => {

    const [cart, setCart] = useState<Produs[]>([]);
    const [loadingProds, setLoadingProds] = useState(true)

    useEffect(() => {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
          setCart(JSON.parse(savedCart));
        }
        setLoadingProds(false);
      }, []);
      
    useEffect(() => {
        if (!loadingProds) {
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    }, [cart, loadingProds]);

    const addToCart = (product: Produs, cantitate: number, culoare: string) => {
        localStorage.setItem("cantitateTotala", String(localStorage.getItem("cantitateTotala") ? Number(localStorage.getItem("cantitateTotala")) + cantitate : cantitate));
        setCart((prev) => {
            const existaProdus = prev.find((item) => item.id === product.id && item.culoare === culoare);
            if (existaProdus) {
                    localStorage.setItem(`cantitate${product.denumire_produs}-${culoare}`, String(Number(localStorage.getItem(`cantitate${product.denumire_produs}-${culoare}`)) + cantitate));
                    return prev.map((item) => 
                        item.cod_produs === product.cod_produs 
                        ? { ...item, cantitate: item.cantitate + cantitate }
                        : item
                    );
            } else {
                localStorage.setItem(`cantitate${product.denumire_produs}-${culoare}`, String(cantitate));
                return [
                    ...prev, 
                    { 
                        ...product, 
                        cantitate, 
                        variants: [{ culoare, img: `/${product.url}-${culoare}.png` }] 
                    }
                ];
            }
                
        })
    }

    const removeFromCart = (id: number) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    }

  return (
    <CartContext.Provider value={{ cart, loadingProds, addToCart, removeFromCart}}>
        {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
      throw new Error("useCart must be used within a CartProvider");
    }
    return context;
  };