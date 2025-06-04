"use client";

import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import Cookies from "js-cookie";
import { useCart } from '@/app/context/CartContext';
import ProdusCard from '../cosul-meu/components/ProdusCard';

const page = () => {

  const { cart, removeFromCart, loadingProds } = useCart();
  const [dateComanda, setDateComanda] = useState<Record<string, string> | null>(null);
  const router = useRouter();

  const [pretTotal, setPretTotal] = useState<number>(0);
  const [cantitateTotala, setCantitateTotala] = useState(Number(localStorage.getItem("cantitateTotala")) || 0);

  const pretLivrare = 14.99 * cart.length;

  const pret = () => {
      let suma = 0;
      cart.map((produs, index) => {
          suma += Math.round((produs.pret - (produs.pret * produs.reducere / 100)) * Number(localStorage.getItem(`cantitate${produs.denumire_produs}-${produs.variants[0].culoare}`)))
      })
      localStorage.setItem("pretProduse", String(suma));
      return suma;
  }

  useEffect(() => {
          setPretTotal(pret());
          setCantitateTotala(Number(localStorage.getItem("cantitateTotala")))
          localStorage.setItem("numarProduse", String(cart.length));
          localStorage.setItem("pretLivrare", String(pretLivrare));
      }, [cart, cantitateTotala]);
  

  useEffect(() => {
    const dateComandaCookie = Cookies.get("dateComanda");
    if (dateComandaCookie) {
      setDateComanda(JSON.parse(dateComandaCookie));
    } else {
      router.push("/checkout/cosul-meu");
    }
  }, [router]);

  const handlePlasareComanda = () => {
    Cookies.remove("dateComanda", { path: "/"});
  }

  return (
    <div>
      <ul>
        {cart.map((produs, index) => (
          <ProdusCard produs={produs} index={index} functieCantitateTotala={setCantitateTotala}/>
        ))}
      </ul>
    </div>
  )
}

export default page