import React from 'react'

const Hero = () => {
  return (
    <section
        id="hero-section"
        className="w-full flex items-center justify-center">
        <div
            className="max-w-[550px]">
            <h1
                className="neutral-color mb-4">
                Nu rata reducerile de până la <span className="accent-color">52%</span>!
            </h1>
            <p
                className="neutral-color mb-8">
                Campania prețurilor mici se desfășoară în perioada 3-9 martie 2025. Reducerile se aplică pe o gamă largă de produse, 
                incluzând <span className="bold">întrerupătoarele cu touch, prize de multe tipuri, hub-uri smart și telecomenzi.</span>
            </p>
            <button
                id="hero-btn"
                className="px-10 py-4 round-border">
                    <p className="btn-xl-text neutral-color">Vezi reduceri</p>
            </button>
        </div>
        <div
            className="w-[670px]">
        </div>
    </section>
  )
}

export default Hero