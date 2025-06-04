import React from 'react'
import Header from './components/Nav/Header'
import Hero from './components/Hero/Hero'
import SectiuneProduse from './components/Cele mai mari reduceri/SectiuneProduse'
import Categorii from './components/Categorii Produse/Categorii'
import Recomandări from './components/Recomandări/Recomandări'
import Footer from './components/Footer/Footer'

const page = () => {
  return (
    <div>
        <Header />
        <Hero />
        <div
            className="mt-16 flex flex-col gap-16 items-center">
            <SectiuneProduse header="Cele mai mari reduceri" />
            <Categorii />
            <SectiuneProduse header="Ultimele noutăți" />
            <Recomandări />
            <Footer />
        </div>
    </div>
  )
}

export default page