"use client";

import Header from "@/app/components/Nav/Header";
import ProductPageHeader from "@/app/produse/components/ProductPageHeader";
import Link from "next/link";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import React, { useState } from 'react'
import Cookies from "js-cookie";
import Footer from "@/app/components/Footer/Footer";

interface DateClient {
    nume: string,
    prenume: string,
    strada: string,
    numarul: string,
    bloc: string,
    localitate: string,
    judet: string,
    cod_postal: string,
    CIF: string,
    denumire_firma: string,
    strada_adresa_livrare: string,
    numar_adresa_livrare: string,
    bloc_adresa_livrare: string,
    localitate_adresa_livrare: string,
    judet_adresa_livrare: string,
    cod_postal_adresa_livrare: string,
    metoda_livrare: string,
    metoda_plata: string,
    numar_card: string,
    nume_card: string,
    data_expirare_card: string,
    cvv_card: string,
}

const page = () => {

    const router = useRouter();

    const [isFirmaChecked, setIsFirmaChecked] = useState<boolean>(false);
    const [isLivrareAltaAdresa, setIsLivrareAltaAdresa] = useState<boolean>(false);
    const [isPlataCard, setIsPlataCard] = useState<boolean>(false);
    const [cardNumber, setCardNumber] = useState<string>("");
    const [dataExpirare, setDataExpirare] = useState<string>("");
    const [hasTyped, setHasTyped] = useState<boolean>(false);
    const [inputErrorMessage, setInputErrorMessage] = useState<string>("");

    const pretProduse = Number(localStorage.getItem("pretProduse")) || 0;
    const pretLivrare = Number(localStorage.getItem("pretLivrare")) || 0;
    const numarProduse = Number(localStorage.getItem("numarProduse")) || 1;

    if (pretProduse <= 0) {
        redirect("/checkout/cosul-meu");
    }

    const handleCardNumberInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value;
    
        value = value.replace(/\D/g, "");
    
        const formattedValue = value.replace(/(\d{4})(?=\d)/g, "$1 ");

        setCardNumber(formattedValue);
      };

    const handleDataExpirareInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value;

        value = value.replace(/\D/g, "");

        const formattedValue = value.replace(/(\d{2})(?=\d)/g, "$1/");

        setDataExpirare(formattedValue);
    }

    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>, isValid: boolean) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const dateComanda = Object.fromEntries(formData.entries());

        Cookies.set("dateComanda", JSON.stringify(dateComanda), { expires: 7, path: "/" });

        router.push("/checkout/plaseaza-comanda");
    }

  return (
    <div>
        <Header />
        <ProductPageHeader header="Livrare și plată"/>
        <form action="" className="flex gap-5 w-[1220px] mx-auto mb-16 mt-8">
            <div
                className="w-[840px] flex flex-col">

                <fieldset
                    className="flex flex-col gap-4">

                    <legend className="filtre-header mb-4 mt-8 black-color">
                        Datele clientului
                    </legend>

                    <div
                        className="flex gap-5">

                        <label htmlFor="nume" className="sr-only">Numele clientului</label>
                        <input type="text" name="nume" placeholder="Nume" required/>

                        <label htmlFor="prenume" className="sr-only">Prenumele clientului</label>
                        <input type="text" name="prenume" placeholder="Prenume" required/>

                    </div>
                    
                    <div
                        className="flex gap-5">

                        <label htmlFor="email" className="sr-only">Email-ul clientului</label>
                        <input type="email" name="email" placeholder="Email" required/>

                        <label htmlFor="telefon" className="sr-only">Numărul de telefon al clientului</label>
                        <input type="tel" name="telefon" placeholder="Număr de telefon *" required/>

                    </div>

                </fieldset>

                <p className="small-p opacity-50 mt-2 select-none">* Vei primi doar SMS-uri gratuite cu privire la statusul comenzii</p>

                <fieldset
                    className="flex flex-col gap-4">

                    <legend className="filtre-header mb-4 mt-8 black-color">
                        Adresa clientului
                    </legend>

                    <div
                        className="flex gap-5">

                        <div
                            className="flex-66">
                            <label htmlFor="strada" className="sr-only">Strada</label>
                            <input type="text" name="strada" id="strada" placeholder="Strada" required/>
                        </div>
                        
                        <div
                            className="flex-33">
                            <label htmlFor="numar" className="sr-only">Numărul</label>
                            <input type="text" name="numar" id="numar" inputMode="numeric" placeholder="Numărul (ex.: 10)" required/>
                        </div>
                    </div>

                    <div
                        className="flex gap-5">

                        <div
                            className="flex-33">
                            <label htmlFor="bloc" className="sr-only">Bloc, scară, apartament</label>
                            <input type="text" name="bloc" id="bloc" placeholder="Bl., sc., apt." required/>
                        </div>
                        
                        <div
                            className="flex-66">
                            <label htmlFor="localitate" className="sr-only">Localitate</label>
                            <input type="text" name="localitate" id="localitate" placeholder="Localitate" required/>
                        </div>
                        
                    </div>

                    <div
                        className="flex gap-5">

                        <div
                            className="flex-66">
                            <label htmlFor="judet" className="sr-only">Județ</label>
                            <input type="text" name="judet" id="judet" placeholder="Județ" required/>
                        </div>
                        
                        <div
                            className="flex-33">
                            <label htmlFor="cod_postal" className="sr-only">Cod poștal</label>
                            <input type="text" name="cod_postal" id="cod_postal" inputMode="numeric" placeholder="Cod poștal" pattern="^\d{6}$" maxLength={6} required/>
                        </div>
                        
                    </div>  

                </fieldset>

                <div
                    className="flex flex-col gap-1 mt-8">

                    <div
                        className="flex gap-3 items-center">
                        <input type="checkbox" name="firma" className="appearance-none livrare-checkbox" onChange={() => setIsFirmaChecked(!isFirmaChecked)}/><p className={`${isFirmaChecked ? "bold primary-color" : "black-color"} p select-none`}>Comand în calitate de firmă (factură TVA)</p>
                    </div>
                    

                    {
                        isFirmaChecked &&
                        <fieldset
                            className="flex gap-5 mb-4">
                            <legend className="filtre-header my-4 black-color">
                                Detalii factură TVA
                            </legend>
                            <label htmlFor="CIF" className="sr-only">CIF</label>
                            <input type="text" name="CIF" inputMode="numeric" placeholder="CIF" required/>

                            <label htmlFor="nume_firma" className="sr-only">Denumirea firmei</label>
                            <input type="text" name="nume_firma" placeholder="Denumirea firmei" required/>
                        </fieldset>
                    }

                    <div
                        className="flex gap-3 items-center">
                        <input type="checkbox" name="livrare-alta-adresa "className="appearance-none livrare-checkbox" onChange={() => setIsLivrareAltaAdresa(!isLivrareAltaAdresa)}/><p className={`${isLivrareAltaAdresa ? "bold primary-color" : "black-color"} p select-none`}>Livrare la o altă adresă</p>
                    </div>
                    

                    {
                        isLivrareAltaAdresa &&
                        <fieldset
                        className="flex flex-col gap-5 mb-4">

                            <legend className="filtre-header my-4 black-color">
                                Adresa de livrare
                            </legend>

                            <div
                                className="flex gap-5">

                                <div
                                    className="flex-66">
                                    <label htmlFor="strada_alta_adresa" className="sr-only">Strada</label>
                                    <input type="text" name="strada_alta_adresa" id="strada_alta_adresa" placeholder="Strada" required/>
                                </div>
                                
                                <div
                                    className="flex-33">
                                    <label htmlFor="numar_alta_adresa" className="sr-only">Numărul</label>
                                    <input type="text" name="numar_alta_adresa" id="numar_alta_adresa" inputMode="numeric" placeholder="Numărul (ex.: 10)" required/>
                                </div>
                            </div>

                            <div
                                className="flex gap-5">

                                <div
                                    className="flex-33">
                                    <label htmlFor="bloc_alta_adresa" className="sr-only">Bloc, scară, apartament</label>
                                    <input type="text" name="bloc_alta_adresa" id="bloc_alta_adresa" placeholder="Bl., sc., apt." required/>
                                </div>
                                
                                <div
                                    className="flex-66">
                                    <label htmlFor="localitate_alta_adresa" className="sr-only">Localitate</label>
                                    <input type="text" name="localitate_alta_adresa" id="localitate_alta_adresa" placeholder="Localitate" required/>
                                </div>
                                
                            </div>

                            <div
                                className="flex gap-5">

                                <div
                                    className="flex-66">
                                    <label htmlFor="judet_alta_adresa" className="sr-only">Județ</label>
                                    <input type="text" name="judet_alta_adresa" id="judet_alta_adresa" placeholder="Județ" required/>
                                </div>
                                
                                <div
                                    className="flex-33">
                                    <label htmlFor="cod_postal_alta_adresa" className="sr-only">Cod poștal</label>
                                    <input type="text" name="cod_postal_alta_adresa" id="cod_postal_alta_adresa" inputMode="numeric" placeholder="Cod poștal" pattern="^\d{6}$" maxLength={6} required/>
                                </div>
                                
                            </div>  

                        </fieldset>
                    }

                </div>
                
                <fieldset>

                    <legend className="filtre-header mb-4 mt-8 black-color">
                        Metoda de livrare
                    </legend>

                    <div
                        className="white-background checkout-product-shadow round-border p-8 flex flex-col gap-4">

                        <div className="flex justify-between items-center h-[32px]">

                            <div
                                className="flex items-center gap-2">
                                <input type="radio" name="curier" id="gls-curier" className="appearance-none" required/><p className="black-color">GLS Curier</p>
                            </div>

                            <div
                                className="flex items-center gap-4">
                                <p className="green-color">0.00 lei</p>
                                <Image src="/gls-logo.png" alt="gls-logo" width={32} height={32}></Image>
                            </div>
                        </div>

                        <div
                            className="flex justify-between items-center h-[32px]">

                            <div
                                className="flex items-center gap-2">
                                <input type="radio" name="curier" id="gls-parcel-locker" className="appearance-none" required/><p className="black-color">GLS Parcel Locker</p>
                            </div>

                            <div
                                className="flex items-center gap-4">
                                <p className="green-color">0.00 lei</p>
                                <Image src="/gls-logo.png" alt="gls-logo" width={32} height={32}></Image>
                            </div>

                        </div>
                        
                        <div
                            className="flex justify-between items-center h-[32px]">

                            <div
                                className="flex items-center gap-2">
                                <input type="radio" name="curier" id="sameday-easybox" className="appearance-none" required/><p className="black-color">Sameday Easybox</p> 
                            </div>

                            <div
                                className="flex items-center gap-4">
                                <p className="green-color">0.00 lei</p>
                                <Image src="/easybox-logo.png" alt="gls-logo" width={32} height={32}></Image>
                            </div>

                        </div>
                        
                        <div
                            className="flex justify-between items-center h-[32px]">

                            <div
                                className="flex items-center gap-2">
                                <input type="radio" name="curier" id="easybox-cargus" className="appearance-none" required/><p className="black-color">Urgent Cargus</p> 
                            </div>

                            <div
                                className="flex items-center gap-4">
                                <p className="green-color">0.00 lei</p>
                                <Image src="/cargus-logo.png" alt="cargus-logo" width={32} height={32}></Image>
                            </div>

                        </div>
                        
                        <div
                            className="flex justify-between items-center h-[32px]">

                            <div
                                className="flex items-center gap-2">
                                <input type="radio" name="curier" id="cargus-pick-up" className="appearance-none" required/><p className="black-color">Cargus Pick-up</p> 
                            </div>

                            <div
                                className="flex items-center gap-4">
                                <p className="green-color">0.00 lei</p>
                                <Image src="/cargus-logo.png" alt="cargus-logo" width={32} height={32}></Image>
                            </div>
                        </div>
                        
                    </div>
                    

                </fieldset>

                <fieldset>

                    <legend className="filtre-header mb-4 mt-8 black-color">
                        Metoda de plată
                    </legend>

                    <div
                        className="white-background checkout-product-shadow round-border p-8 flex flex-col gap-4">

                        <div
                            className="flex justify-between items-center h-fit">

                            <div
                                className="flex items-center gap-2">
                                <input type="radio" name="plata" className="appearance-none" onChange={() => setIsPlataCard(!isPlataCard)} required/><p className="black-color">Plată cu cardul</p> 
                            </div>

                            <div
                                className="flex items-center gap-4">

                                <p className="green-color">0.00 lei</p>
                                <div
                                    className="flex items-center gap-1">
                                    <Image src="/mastercard-logo.png" alt="mastercard-logo" width={20} height={12}></Image>
                                    <Image src="/visa-logo.png" alt="visa-logo" width={20} height={20}></Image>
                                </div>
                                
                            </div>
                        
                        </div>

                        { isPlataCard &&
                            <div
                                className="flex flex-col gap-4 mt-2">

                                <div
                                    className="flex gap-5">
                                    <label htmlFor="numar-card" className="sr-only">Numărul cardului</label>
                                    <input type="text" name="numar-card" placeholder="1234 5678 9012 3456" autoComplete="cc-number" value={cardNumber} onChange={handleCardNumberInputChange} maxLength={19} required/>

                                    <label htmlFor="nume-card" className="sr-only">Numele de pe card</label>
                                    <input type="text" name="nume-card" placeholder="Ex.: Alexandra Popescu" required/>
                                </div>
                                
                                <div
                                    className="flex gap-5">
                                    <label htmlFor="data-expirare" className="sr-only">Data expirării cardului</label>
                                    <input type="text" name="data-expirare" placeholder="MM/YY" value={dataExpirare} onChange={handleDataExpirareInputChange} maxLength={5} required/>

                                    <label htmlFor="cvv" className="sr-only">CVV / CVC</label>
                                    <input type="text" name="cvv" placeholder="CVV / CVC" maxLength={3} required/>
                                </div>
                                

                            </div>
                        }

                        <div
                            className="flex justify-between items-center h-[32px]">

                            <div
                                className="flex items-center gap-2">
                                <input type="radio" name="plata" className="appearance-none" onChange={() => setIsPlataCard(false)} required/><p className="black-color">Google Pay</p> 
                            </div>

                            <div
                                className="flex items-center gap-4">
                                <p className="green-color">0.00 lei</p>
                                <div
                                    className="pay-capsule round-border flex items-center justify-center">
                                    <Image src="/google-pay.png" alt="google-pay-logo" width={24} height={16}></Image>
                                </div>
                                
                            </div>
                            
                        </div>

                        <div
                            className="flex justify-between items-center h-[32px]">
                            <div
                                className="flex items-center gap-2">
                                <input type="radio" name="plata" className="appearance-none" onChange={() => setIsPlataCard(false)} required/><p className="black-color">Apple Pay</p> 
                            </div>
                            <div
                                className="flex items-center gap-4">
                                <p className="green-color">0.00 lei</p>
                                <div
                                    className="pay-capsule round-border flex items-center justify-center">
                                    <Image src="/apple-pay-logo.png" alt="apple-pay-logo" width={24} height={16}></Image>
                                </div>
                            </div>
                            
                        </div>

                        <div
                            className="flex justify-between items-center h-[32px]">

                            <div
                                className="flex items-center gap-2">
                                <input type="radio" name="plata" className="appearance-none" onChange={() => setIsPlataCard(false)} required/><p className="black-color">Plată la livrare (ramburs)</p> 
                            </div>

                            <div
                                className="flex items-center gap-4">
                                <p className="green-color">11.00 lei</p>
                                <div
                                    className="w-8 h-8 flex items-center justify-center">
                                    <Image src="/ramburs-icon.png" alt="ramburs-icon" width={24} height={24}></Image>
                                </div>
                            </div>
                            
                        </div>

                    </div>
                </fieldset>
            </div>
                <div
                    className="flex-1 flex flex-col gap-5">
                    <div
                        className="p-8 white-background round-border checkout-product-shadow flex flex-col gap-10 h-fit">
                        <div
                            className="flex flex-col gap-8">
                            <div
                                className="flex flex-col gap-4">
                                <p className="card-denumire-produs">Sumar comandă</p>
                                <div>
                                    <div className="flex justify-between">
                                        <p className="checkout-cod-produs">Cost produse:</p>
                                        <p className="checkout-cod-produs">{pretProduse - 1}.{99 - numarProduse + 1} lei</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p className="checkout-cod-produs">Cost livrare:</p>
                                        <p className="checkout-cod-produs">{pretLivrare} lei</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p className="checkout-labele-comanda">Total de plată: </p>
                                <p className="checkout-pret-final">{(pretProduse + pretLivrare - 0.01 * numarProduse).toFixed(2)} lei</p>
                            </div>
                        </div>
                        <button>
                            <Link href="/checkout/livrare-plata" className="round-border checkout-btn-background w-full flex items-center gap-4 py-4 justify-center relative">
                                <div className="absolute left-0 h-full accent-background w-8 checkout-btn-design-border-radius"></div>
                                <p className="btn-l-text neutral-color ">Continuă</p>
                                <Image src="/forward-arrows.png" alt="Next step icon" width={18} height={12}></Image>
                            </Link>
                        </button>
                    </div>
                    <div
                        className="white-background checkout-product-shadow flex flex-col gap-4 p-8 round-border">
                        <p className="card-denumire-produs">Adaugă cod reducere</p>
                        <input type="text" name="cod-reducere" placeholder="Cod reducere" className="cod-reducere"/>
                    </div>
                </div>
        </form>
        <Footer />
    </div>
  )
}

export default page