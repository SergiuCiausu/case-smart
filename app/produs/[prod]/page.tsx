'use client';

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Header from '../../components/Nav/Header';
import Image from 'next/image';
import "./prod.css";
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { trackProductVisit } from '../../utils/cookies';
import Cookies from "js-cookie";
import ProductCard from '../../components/ProductCard';
import SliderProduse from './components/SliderProduse';
import Footer from '../../components/Footer/Footer';
import { useCart } from "@/app/context/CartContext";

interface Props {
    params: {prod: string}
}

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

interface Imagini {
  grup_produs: number,
  img1ROSU: string,
  img2ROSU: string,
  img3ROSU: string,
  img4ROSU: string,
  img5ROSU: string,
  img1NEGRU: string,
  img2NEGRU: string,
  img3NEGRU: string,
  img4NEGRU: string,
  img5NEGRU: string,
  img1GALBEN: string,
  img2GALBEN: string,
  img3GALBEN: string,
  img4GALBEN: string,
  img5GALBEN: string,
  img1VERDE: string,
  img2VERDE: string,
  img3VERDE: string,
  img4VERDE: string,
  img5VERDE: string,
  img1ROZ: string,
  img2ROZ: string,
  img3ROZ: string,
  img4ROZ: string,
  img5ROZ: string,
  img1ALBASTRU: string,
  img2ALBASTRU: string,
  img3ALBASTRU: string,
  img4ALBASTRU: string,
  img5ALBASTRU: string,
}

const page = ({ params }: Props) => {

  const { addToCart } = useCart();
  const [loading, setLoading] = useState<boolean>(true)
  const [imgLoading, setImgLoading] = useState<boolean>(true);
  const [produs, setProdus] = useState<Produs[]>([]);
  const [imagini, setImagini] = useState<Imagini[]>([]);
  const [checkedColor, setCheckedColor] = useState<string>(localStorage.getItem(`checkedColor${produs[0]?.denumire_produs}`) || produs[0]?.variants[0].culoare);
  const [culoareImg, setCuloareImg] = useState<string>(produs[0]?.variants[0].culoare);
  const [countProdus, setCountProdus] = useState<number>(1);
  const [produseRecomandate, setProduseRecomandate] = useState<Produs[]>([]);
  const [produseVizitate, setProduseVizitate] = useState<Produs[]>([]);
  const [loadingProduseRecomandate, setLoadingProduseRecomandate] = useState<boolean>(false);
  const [loadingProduseVizitate, setLoadingProduseVizitate] = useState<boolean>(false);
  const { prod } = useParams<{ prod: string }>();
  const pathName = usePathname();

  useEffect(() => {
    const incarcaProdus = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/pagina-produs/${prod}`);
        setProdus(response.data);
      } catch (error) {
        console.log("ERROR ", error);
      } finally {
        setLoading(false);
      }
    }
    incarcaProdus();
  }, [prod])

  useEffect(() => {
    if (produs.length !== 0) {
      const incarcaImagini = async () => {
        try {
          setImgLoading(true)
          if (produs.length > 0) {
            trackProductVisit(produs[0].grup_produs);
            setCuloareImg(localStorage.getItem("checkedColor") || produs[0].variants[0].culoare)
          }
          const imaginiProdus = await axios.get(`/api/pagina-produs/${prod}/imagini-produs/${produs[0].grup_produs}`);
          setImagini(imaginiProdus.data);
        } catch (error) {
          console.log("ERROR 2 ", error);
        } finally {
          setCheckedColor(localStorage.getItem(`checkedColor${produs[0]?.denumire_produs}`) || produs[0]?.variants[0].culoare);
          setImgLoading(false);
        }
      }
      incarcaImagini();
    }
  }, [produs])

  useEffect(() => {
    const incarcaProduseRecomandate = async () => {
      try {
        setLoadingProduseRecomandate(true);
        const produseRecomandate = await axios.get(`/api/pagina-produs/${prod}/recomandate`);
        setProduseRecomandate(produseRecomandate.data);
      } catch (error) {
        console.log("Eroare în încărcarea produselor recomandate: ", error)
      } finally {
        setLoadingProduseRecomandate(false)
      }
    }
    incarcaProduseRecomandate();
  }, [])

  useEffect(() => {
    if (!pathName) return;

    const urlProduseVizitate = Cookies.get("visited_products") || "";

    if (urlProduseVizitate) {
      const incarcaProduseVizitate = async () => {
        try {
          setLoadingProduseVizitate(true);
          const produseVizitateData = await axios.get(`/api/pagina-produs/produse-vizitate`, {
            params: { urls: urlProduseVizitate.slice(1, -1)}
          });
          setProduseVizitate(produseVizitateData.data);
        } catch (error) {
          console.log(error);
        } finally {
          setLoadingProduseVizitate(false);
        }
      }
      incarcaProduseVizitate()
    }
  }, [pathName]);

  if (loading) {
    return <p>Loading...</p>
  }

  const stele = [];

  if (produs.length !== 0) {
    for (let i = 1; i <= 5; i++) {
      stele.push(<span key={i} className={`stea-pagina-produs`}></span>)
    }
  
    if (produs[0].rating > 0) {
      for (let i = 1; i <= produs[0].rating; i+= 1) {
        stele.pop()
        stele.unshift(<span key={i} className={`stea-pagina-produs full`}></span>)
      }
    }
    
    if (Math.round(produs[0].rating) !== produs[0].rating) {
      stele[Math.ceil(produs[0].rating) - 1] = <div><span className="stea-pagina-produs left transparent"></span></div>
    }
  }

  const handleColorInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedColor(event.target.value);
    setCuloareImg(event.target.value);
    localStorage.setItem(`checkedColor${event.target.name}-${event.target.value.toUpperCase()}`, event.target.value);
  }

  return (
    produs.length !== 0 &&
    <div>
      <Header />
      <section
        className="white-background w-full">
        <section
          className="w-[1220px] mx-auto pt-16">
            <section> 
              <div
                className="flex justify-between">
                <h3
                  className="black-color">
                  {produs[0].denumire_produs}
                </h3>
                <p
                  className="nav-text nav-bold black-color opacity-50 ml-32">
                  Cod produs: {produs[0].cod_produs}
                </p>
              </div>
              <div
                className="flex gap-2 items-center">
                <div
                  className={`flex gap-2 ${Math.round(produs[0].rating) !== produs[0].rating ? "mr-4" : ""}`}>
                  {stele}
                </div>
                <div
                  className="mb-1 accent-color">
                  {produs[0].totalRecenzii} {produs[0].totalRecenzii > 19 ? "de recenzii" : `${produs[0].totalRecenzii === 1 ? "recenzie" : "recenzii"}`} | {!produs[0].totalRecenzii ? <Link href="/" className="underline underline-offset-2"> Adaugă recenzie</Link> : <Link href="/" className="underline underline-offset-2">{`Citește ${produs[0].totalRecenzii === 1 ? "recenzie" : "recenzii"}`}</Link>}
                </div>
              </div>
            </section>
            <section
              className="flex mt-2">
              {imgLoading 
              ? 
                <div
                  role="status"
                  className="w-[625px] animate-pulse flex gap-5 mr-5">
                    <div
                      className="flex flex-col gap-5">
                      <div
                          className="h-[75px] bg-gray-300 round-border w-[75px] flex items-center justify-center">
                              <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                  <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                              </svg>
                      </div>
                      <div
                          className="h-[75px] bg-gray-300 round-border w-[75px] flex items-center justify-center">
                              <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                  <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                              </svg>
                      </div>
                      <div
                          className="h-[75px] bg-gray-300 round-border w-[75px] flex items-center justify-center">
                              <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                  <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                              </svg>
                      </div>
                      <div
                          className="h-[75px] bg-gray-300 round-border w-[75px] flex items-center justify-center">
                              <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                  <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                              </svg>
                      </div>
                    </div>
                    <div>
                      <div
                          className="h-[510px] bg-gray-300 round-border w-[510px] flex items-center justify-center">
                              <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                  <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                              </svg>
                      </div>
                    </div>
                </div>
              :
                <div>
                    {imagini?.map((categorieImagini) => (
                      Object.keys(categorieImagini).map((culoare: string, colorIndex: number) => (
                        culoare.replace("imagini", "") === culoareImg &&
                        <div
                          className="flex flex-row-reverse justify-end">
                          {categorieImagini[culoare].map((img: string, indexImg: number) => (
                              (indexImg === 0) && (
                                <div
                                  className="w-[550px] h-[550px]">
                                  <Image 
                                    src={img}
                                    alt={`product image ${indexImg + 1}`}
                                    width={1500}
                                    height={1500}
                                    style={{
                                      objectFit: "cover"
                                    }}
                                  />
                                </div>
                              )))}
                              <div
                                className="w-[75px] flex flex-col gap-4 pt-4">
                                {categorieImagini[culoare].map((img: string, indexImg: number) => (
                                  <div
                                    className="flex flex-col">
                                      {(indexImg !== 0 && culoare.replace("imagini", "") === culoareImg) && (
                                        <div key={`${colorIndex}-${indexImg}`} className="w-[75px] h-[75px]">
                                          <Image
                                            src={img}
                                            alt={`product image ${indexImg + 1}`}
                                            width={75}
                                            height={75}
                                          />
                                        </div>
                                      )}
                                  </div>
                                ))}
                              </div>
                            </div>
                              )
                          )))}
                </div>
              }
              <section
                className="w-full flex flex-col gap-8">
                <div
                  className="flex justify-between">
                    <div
                      className="flex flex-col">
                      <p
                        className="pagina-produs-pret-vechi line-through">
                          {produs[0].pret - 1}.99 RON
                      </p>
                      <p
                        className="pagina-produs-pret accent-color">
                          {produs[0].pret - Math.round((produs[0].pret * produs[0].reducere) / 100) - 1}.99 RON
                      </p>
                    </div>
                    <div>
                        <button className="p-1"><Image src="/fav-icon.png" alt="favorite icon" width={25} height={24}></Image></button>
                    </div>
                </div>
                <div
                  className="flex flex-col gap-2">
                    <p
                      className="pagina-produs-subheading primary-color">
                      Descriere produs:
                    </p>
                    <p>
                      {produs[0].descriere_produs}
                    </p>
                </div>
                <div
                  className="flex flex-row-reverse justify-between">
                  <div
                    className="flex flex-col gap-2">
                    <p
                      className="pagina-produs-subheading primary-color">
                      Selectează culoarea:
                    </p>
                    <form
                      className="flex gap-2">
                      {produs[0].variants.map((varianta, index) => (
                        <input
                          type="checkbox"
                          name={produs[0].denumire_produs}
                          value={varianta.culoare.toUpperCase()}
                          checked={varianta.culoare.toUpperCase() === localStorage.getItem(`checkedColor${produs[0]?.denumire_produs}-${varianta.culoare.toUpperCase()}`)}
                          onChange={handleColorInputChange}
                          className={`appearance-none ${varianta.culoare.toUpperCase()} w-4 h-4 circle ${varianta.culoare.toUpperCase() === "ALB" && "white-circle-border"} cursor-pointer ${varianta.culoare.toUpperCase() === checkedColor && "pagina-produs-color-circle-checked"}`} />
                      ))}
                    </form>
                  </div>
                  <div
                    className="flex flex-col gap-2">
                    <div
                      className="flex flex-col gap-2">
                      <p
                        className="pagina-produs-subheading primary-color">
                        Numărul de produse dorit:
                      </p>
                      <div
                        className="flex gap-4 items-center buton-nr-produse justify-center buton">
                        <button
                          className="cursor-pointer"
                          onClick={() => countProdus > 1 && setCountProdus(countProdus - 1)}>
                          <p className="buton-nr-produse-butoane primary-color py-3 px-4">-</p>
                        </button>
                        <p className="nav-text nav-bold accent-color">
                          {countProdus}
                        </p>
                        <button
                          className="cursor-pointer"
                          onClick={() => setCountProdus(countProdus + 1)}>
                          <p className="buton-nr-produse-butoane primary-color py-3 px-4">+</p>
                        </button>
                      </div>
                    </div>
                    <p className="livrare-text">Livrare în 6-8 zile lucrătoare</p>
                  </div>
                </div>
                <div
                  className="flex flex-col gap-2">
                  <div
                    className="flex gap-2 items-center">
                    <Image
                      src="/info-icon.png"
                      alt="info icon"
                      width={16}
                      height={18}></Image>
                      <p className="livrare-text">Livrare gratuită la comenzile de <strong>peste 250 de lei</strong></p>
                  </div>
                  <button
                    className="flex items-center adauga-in-cos-buton cursor-pointer py-4 px-6 gap-4 round-border buton"
                    onClick={() => addToCart(produs[0], countProdus, checkedColor)}>
                    <Image
                      src="/shopping-cart-icon.png"
                      alt="shopping cart icon"
                      width={32}
                      height={27}></Image>
                      <p className="btn-xl-text neutral-color">Adaugă în coș</p>
                  </button>
                </div>
              </section>
            </section>
        </section>
        <SliderProduse
          header="Produse similare recomandate"
          produse={produseRecomandate.filter(product => product.grup_produs !== produs[0].grup_produs)}
          loadingVar={loadingProduseRecomandate}
        />
        <section
          className="w-[1220px] flex flex-col mx-auto gap-8 pt-16">
            <h3>Descriere</h3>
            <div
              className="pagina-produs-text-box w-full p-8">
              <p>{produs[0].descriere}</p>
            </div>
        </section>
        <section
          className="w-[1220px] flex flex-col mx-auto gap-8 pt-16">
            <h3>Specificații</h3>
            <div
              className="pagina-produs-text-box w-full p-8">
              <p>{produs[0].specificatii}</p>
            </div>
        </section>
        <section
          className="w-[1220px] flex flex-col mx-auto gap-8 pt-16">
            <h3>Recenzii</h3>
            <div
              className="w-full p-8">
              {produs[0].totalRecenzii !== 0 && <p>Recenzie</p>}
            </div>
        </section>
          {produseVizitate.length > 1
          ? 
          <section
            className="flex flex-col mx-auto justify-center w-[1364px] pt-16 gap-8 mb-8 pb-16">
            <SliderProduse
              header="Ultima dată te-a interesat"
              produse={produseVizitate.filter(product => product.grup_produs !== produs[0].grup_produs)}
              loadingVar={loadingProduseVizitate}
            />
          </section>
          : ""}
      </section>
      <Footer />
    </div>
  )
}

export default page