import Image from 'next/image'
import React from 'react'

const Perks = () => {
  return (
    <section
        className="white-background py-8 w-full box-shadow">
        <div
            className="flex items-center justify-between max-w-[1220px] mx-auto">
            <div
                className="flex flex-col items-center justify-center text-center gap-2 max-w-[200px]">
                <Image src="/livrare-icon.png" alt="shipping icon" width={71} height={48}></Image>
                <p className="small-p small-p-bold primary-color">Transport gratuit la comenzile de peste 250 lei</p>
            </div>
            <div
                className="flex flex-col items-center justify-center text-center gap-2 max-w-[200px]">
                <Image src="/garantie.png" alt="shipping icon" width={48} height={48}></Image>
                <p className="small-p small-p-bold primary-color">Garanție gratuită de 36 de luni pentru fiecare produs</p>
            </div>
            <div
                className="flex flex-col items-center justify-center text-center gap-2 max-w-[200px]">
                <Image src="/anulare-comanda-icon.png" alt="shipping icon" width={54} height={48}></Image>
                <p className="small-p small-p-bold primary-color">Anularea comenzii în termen de 30 de zile</p>
            </div>
            <div
                className="flex flex-col items-center justify-center text-center gap-2 max-w-[200px]">
                <Image src="/inlocuire-produse.png" alt="shipping icon" width={48} height={48}></Image>
                <p className="small-p small-p-bold primary-color">Înlocuirea produselor defecte sau returnarea banilor</p>
            </div>
        </div>
    </section>
  )
}

export default Perks