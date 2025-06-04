import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {

    const footer = [
        {
            categorie: "Navigație",
            linkuri: ["Acasă", "Produse", "Resigilate", "Echipă", "Clienții noștri", "Cariere", "Parteneriate"]
        },
        {
            categorie: "Produse",
            linkuri: ["Întrerupătoare cu touch", "Prize cu ramă de sticlă", "Pachete întrerupător și priză", "Prize media", "Telecomenzi", "Smart home", "Parteneriate"]
        },
        {
            categorie: "Resurse clienți",
            linkuri: ["Instrucțiuni instalare și sincronizare", "Tutoriale produse Livolo", "Scheme electrice și video", "Certificate de calitate", "Doze recomandate", "Becuri dimabile compatibile", "Produse și garanție", "Descarcă catalogul", "Blog"]
        },
        {
            categorie: "Suport",
            linkuri: ["Termeni și condiții", "Politica de confidențialitate", "Politica de cookies", "Modalități de plată", "Politica de retur", "Metode de livrare", "Întrebări frecvente", "ANPC", "Contact"]
        }
    ]

  return (
    <footer
        className="w-full white-background flex flex-col items-center">
        <div
            className="w-[1220px] flex gap-8 py-8 justify-between">
            <div
                className="flex flex-col gap-4">
                <p
                    className="footer-category-label black-color">
                    Case smart
                </p>
                <div
                    className="flex flex-col">
                    <p className="nav-text primary-color">Strada Viitorului, nr. 123</p>
                    <p className="nav-text primary-color">București, Sector 3</p>
                    <p className="nav-text primary-color">Cod poștal 123456</p>
                </div>
                <div
                    className="flex flex-col gap-1">
                        <div
                            className="flex gap-2">
                            <Image src="/phone-icon-footer.png" alt="phone icon" width={14} height={18}></Image>
                            <p className="nav-text primary-color">031 333 0308</p>
                        </div>
                        <div
                            className="flex gap-2">
                            <Image src="/phone-icon-footer.png" alt="phone icon" width={14} height={18}></Image>
                            <p className="nav-text primary-color">0756 785 710</p>
                        </div>
                </div>
                <div
                    className="flex flex-col gap-2">
                    <p
                        className="nav-text primary-color">
                        Program L-V 9-17
                    </p>
                    <button id="footer-cta-btn" className="btn-s-text white-color px-4 py-2 rounded-lg"><Link href="/">Discută cu un consultant</Link></button>
                </div>
            </div>
            <div
                className="flex gap-8">
                {footer.map((rubrica, index) => (
                    <div
                        key={index}>
                        <p
                            className="footer-category-label black-color mb-4">
                            {rubrica.categorie}
                        </p>
                        <ul>
                            {rubrica.linkuri.map((link, index) => (
                                <li
                                    key={index}>
                                    <Link href="/" className="nav-text primary-color">{link}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
        <div
            className="neutral-background w-full h-12">
        </div>
    </footer>
  )
}

export default Footer