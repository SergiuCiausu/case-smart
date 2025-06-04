'use client';

import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { Range } from "react-range"

interface Ordonare {
    label: string,
    valoare: string
}

interface ProductFilterProps {
    onPretFilterChange: (filters: Record<string, string | number>) => void;
    activeFilters: Record<string, string | number>;
}

const Ordonari: React.FC<ProductFilterProps> = ({ onPretFilterChange, activeFilters }) => {

    const [limitePreturi, setLimitePreturi] = useState<number[]>([]);
    const [valoriPret, setValoriPret] = useState<number[]>([1,1000]);
    const [selectedOption, setSelectedOption] = useState<string>("");
    const [isRecent, setIsRecent] = useState<boolean>(localStorage.getItem("isRecent") === "false" ? false : true );
    const [isVechi, setIsVechi] = useState<boolean>(localStorage.getItem("isVechi") === "false" ? false : true );
    const [isVizualizateSelectedOption, setIsVizualizateSelectedOption] = useState<boolean>(false);
    const [isVizualizateClosed, setIsVizualizateClosed] = useState<boolean>(true);
    const [isPreturiClosed, setIsPreturiClosed] = useState<boolean>(true);
    const [isPretFiltrat, setIsPretFiltrat] = useState<boolean>(false);

    useEffect(() => {
        const incarcaLimitePret = async () => {
            try {
                const response = await axios.get("/api/produse/limite-pret");
                const { pretMin, pretMax } = response.data;
                setLimitePreturi([pretMin, pretMax]);

                const popVal = localStorage.getItem("Populare");
                const putinVal = localStorage.getItem("Putin vizualizate");
                if (localStorage.getItem("isRecent") === "true") {
                    setSelectedOption("asc")
                } else if (localStorage.getItem("isVechi") === "true") {
                    setSelectedOption("desc");
                } else if (popVal) {
                    setSelectedOption("asc");
                    setIsVizualizateSelectedOption(true);
                } else if (putinVal) {
                    setSelectedOption("desc");
                    setIsVizualizateSelectedOption(true);
                } else {
                    setSelectedOption("");
                    setIsVizualizateSelectedOption(false);
                }
            } catch (error) {
                console.log("Error loading products: ", error);
            } finally {
                console.log(selectedOption);
                const { orderBy, ...restFilters } = activeFilters;
                const ordineFilters = { orderBy: { id: selectedOption } };
                onPretFilterChange({ ...restFilters, ...ordineFilters });
            }
        }
        incarcaLimitePret();
    }, [selectedOption]);

    useEffect(() => {
        if (!localStorage.getItem("pretMin") && !localStorage.getItem("pretMax")) {
            if (limitePreturi.length > 0) {
                setValoriPret([...limitePreturi]);
            }
        } else if (!localStorage.getItem("pretMin")) {
            if (limitePreturi.length > 0) {
                setValoriPret([limitePreturi[0], Number(localStorage.getItem("pretMax"))]);
            }
        } else if (!localStorage.getItem("pretMax")) {
            if (limitePreturi.length > 0) {
                setValoriPret([Number(localStorage.getItem("pretMin")), limitePreturi[1]]);
            }
        } else {
            setValoriPret([Number(localStorage.getItem("pretMin")), Number(localStorage.getItem("pretMax"))]);
        }
        if (!localStorage.getItem("isPretFiltrat")) {
            setIsPretFiltrat(false);
        } else if (localStorage.getItem("isPretFiltrat") === "true") {
            setIsPretFiltrat(true);
        }
        
    }, [limitePreturi])

    const toggleOpenClose = () => {
        setIsVizualizateClosed(!isVizualizateClosed);
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let newSelectedOption = event.target.value;
        if (selectedOption !== newSelectedOption) {
            setSelectedOption(newSelectedOption);
            
            if (newSelectedOption === "asc") {
                localStorage.setItem("Populare", newSelectedOption);
                localStorage.setItem("Putin vizualizate", "");
            } else if (newSelectedOption === "desc") {
                localStorage.setItem("Putin vizualizate", newSelectedOption);
                localStorage.setItem("Populare", "");
            }
            
            setIsVizualizateSelectedOption(true);
        } else {
            newSelectedOption = "asc";
            setSelectedOption(""); 
            localStorage.setItem("Populare", "");
            localStorage.setItem("Putin vizualizate", "");
            setIsVizualizateSelectedOption(false);
        }
    
        event.preventDefault();
    
        const { orderBy, ...restFilters } = activeFilters;
        const ordineFilters = { orderBy: { id: newSelectedOption } };
        onPretFilterChange({ ...restFilters, ...ordineFilters });
    
        return newSelectedOption;
    }

    const handlePretMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let pret = Number(event.target.value);
        setValoriPret([pret, valoriPret[1]]);
        if (!isPretFiltrat) {
            setIsPretFiltrat(true);
        }
    }

    const handlePretMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let pret = Number(event.target.value);
        setValoriPret([valoriPret[0], pret]);
        if (!isPretFiltrat) {
            setIsPretFiltrat(true);
        }
    }

    const handlePretSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        
        event.preventDefault()

        let min = Math.max(valoriPret[0], limitePreturi[0]);
        let max = Math.min(valoriPret[1], limitePreturi[1]);

        if (min > max) {
            max = min;
        }

        setValoriPret([min, max]);

        const isFiltered = min !== limitePreturi[0] || max !== limitePreturi[1];
        setIsPretFiltrat(isFiltered);

        localStorage.setItem("isPretFiltrat", String(isFiltered));
        localStorage.setItem("pretMin", String(min));
        localStorage.setItem("pretMax", String(max));
  
        const pretFilters = { pretMin: min, pretMax: max}
        const updatedFilters = { ...activeFilters, ...pretFilters };
        onPretFilterChange(updatedFilters);  

        return pretFilters;
    } 

    const handleRangeChange = (newValues: number[]) => {
        const [minValue, maxValue] = newValues;
        const [minLimit, maxLimit] = limitePreturi;

        const validMin = Math.max(minValue, minLimit);
        const validMax = Math.min(maxValue, maxLimit);

        setValoriPret([validMin, validMax]);

        const isFiltered = validMin !== limitePreturi[0] || validMax !== limitePreturi[1];
        setIsPretFiltrat(isFiltered);

        localStorage.setItem("isPretFiltrat", String(isFiltered));
        localStorage.setItem("pretMin", String(validMin));
        localStorage.setItem("pretMax", String(validMax));
    }

    const togglePretOpenClose = () => {
        setIsPreturiClosed(!isPreturiClosed);
    }

    const toggleRecent = () => {
        setIsRecent((prev) => {
            const newState = !prev;
            setIsVechi(false);
    
            const { orderBy, ...restFilters } = activeFilters;
            const updatedOrder = newState ? { orderBy: { id: "asc" } } : {};
            onPretFilterChange({ ...restFilters, ...updatedOrder });
    
            localStorage.setItem("isVechi", "false");
            localStorage.setItem("isRecent", String(newState));

            return newState;
        });
    }

    const toggleVechi = () => {
        setIsVechi((prev) => {
            const newState = !prev;
            setIsRecent(false);
    
            const { orderBy, ...restFilters } = activeFilters;
            const updatedOrder = newState ? { orderBy: { id: "desc" } } : {};
            onPretFilterChange({ ...restFilters, ...updatedOrder });
    
            localStorage.setItem("isVechi", String(newState));
            localStorage.setItem("isRecent", "false");

            return newState;
        });
    }

    const handleStergeFiltrePret = () => {
        setValoriPret([limitePreturi[0], limitePreturi[1]]);
    }

    const ordonari = [
        {
            nume: "Vizualizate",
            tipuri: [
                {
                    label: "Cele mai populare",
                    valoare: "asc"
                },
                {
                    label: "Cele mai puțin vizionate",
                    valoare: "desc"
                }
            ]
        },
        {
            nume: "Recent",
            isRecent: isRecent,
            function: toggleRecent,
            tipuri: [
                {
                    label: "Cele mai recente",
                    valoare: "asc"
                }
            ]
        },
        {
            nume: "Vechi",
            isVechi: isVechi,
            function: toggleVechi,
            tipuri: [
                {
                    label: "Cele mai vechi",
                    valoare: "asc"
                }
            ]
        },
        // {
        //     nume: "Selectează preț",
        //     tipuri: [
        //         {
        //             label: "Cele mai vechi",
        //             valoare: "asc"
        //         }
        //     ]
        // }
    ]

  return (
    <div>
        <div
            className="flex gap-5 mb-5 items-center">
            <div>
                <button
                    className="flex items-center px-8 py-3 white-background gap-2 cursor-pointer rounded-lg"
                    onClick={toggleOpenClose}>
                    <p className={`${isVizualizateSelectedOption ? "accent-color" : "primary-color"} filtre-header`}>Vizualizate</p>
                    <Image
                        src={`/arrow-filter-${isVizualizateClosed ? "closed" : "opened"}-${isVizualizateSelectedOption ? "active" : "inactive"}.png`}
                        alt="dropdown icon"
                        width={10}
                        height={6}
                    ></Image>
                </button>
                {!isVizualizateClosed 
                    && 
                    <form
                        className="white-background p-4 w-[170px] rounded-lg flex flex-col gap-1 absolute">
                        {ordonari[0].tipuri.map((ordonare: Ordonare, index: number) => (
                            <label key={index} htmlFor={ordonare.valoare} className="flex category-radio">
                                <input type="checkbox" name="Vizualizate" id={ordonare.valoare} value={ordonare.valoare} onChange={handleInputChange} checked={selectedOption === ordonare.valoare} className="appearance-none select-none"/>
                                    <p className={`${selectedOption === ordonare.valoare ? "accent-color nav-bold" : "primary-color nav-text"} select-none`}>
                                        {ordonare.label}
                                    </p>
                            </label>
                        ))}
                    </form>}
            </div>
            <div
                className="flex gap-5">
                {ordonari.map((ordonare, index: number) => (
                    index !== 0 
                    ? 
                        <button
                            className="cursor-pointer white-background rounded-lg px-8 py-3 text-center"
                            onClick={ordonare.function}>
                            <p className={`${ordonare[`is${ordonare.nume}`] ? "accent-color": "primary-color"} filtre-header`}>{ordonare.tipuri[0].label}</p>
                        </button>
                    : ""
                ))}
            </div>
            <div> 
                <button
                    className="cursor-pointer white-background rounded-lg px-8 py-3 text-center flex items-center gap-2"
                    onClick={togglePretOpenClose}>
                        <p className={`${isPretFiltrat ? "accent-color" : "primary-color"} filtre-header`}>Selectează prețul</p>
                        <Image
                            src={`/arrow-filter-${isPreturiClosed ? "closed" : "opened"}-${isPretFiltrat ? "active" : "inactive"}.png`}
                            alt="dropdown icon"
                            width={10}
                            height={6}
                        ></Image>
                </button>
                {!isPreturiClosed
                ?
                <form
                    className="absolute white-background px-8 py-3 w-[223px] rounded-lg overflow-hidden box-border"
                    style={{
                        clipPath: "inset(0 0 0 0)"
                    }}
                    onSubmit={handlePretSubmit}>
                    <div
                        className="flex flex-wrap items-center gap-2">
                        <label
                            className="primary-color nav-text flex flex-col gap-1">
                            Setează preț minim:
                            <input name="pretMin" id="pretMin" value={valoriPret[0]} onChange={handlePretMinChange} min={limitePreturi[0]} max={valoriPret[1]} className="nav-bold w-[64px] visible-input-text-border p-0.5 pl-2"/>
                        </label>
                        <label
                            className="primary-color nav-text flex flex-col gap-1">
                            Setează preț maxim:
                            <input name="pretMax" id="pretMax" value={valoriPret[1]} onChange={handlePretMaxChange} min={valoriPret[0]} max={limitePreturi[1]} className="nav-bold w-[64px] visible-input-text-border p-0.5 pl-2"/>
                        </label>
                    </div>
                    <div
                        className="my-4">
                        <Range 
                            step={10}
                            min={limitePreturi[0]}
                            max={limitePreturi[1]}
                            values={valoriPret}
                            onChange={handleRangeChange}
                            allowOverlap={true}
                            renderTrack={({ props, children }) => (
                                <div
                                    {...props}
                                    style={{ height: "6px", background: "#ddd", borderRadius: "3px", width: "100%", position: "relative" }}>
                                        {children}
                                </div>
                            )}
                            renderThumb={({ props }) => (
                                <div {...props} className="cursor-pointer" style={{ height: "16px", width: "16px", background: `${isPretFiltrat ? "var(--accent-color)" : "var(--primary-color)"}`, borderRadius: "50%", position: "absolute" }}></div>
                            )}/>
                    </div>
                    <button type="submit" className="filtre-submit-button-background px-4 pt-2 pb-3 neutral-color rounded-lg mb-1">Aplică filtre</button>
                    {isPretFiltrat
                    &&
                        <div>
                            <button className="sterge-filtre-text primary-color" onClick={handleStergeFiltrePret}>Șterge filtrele</button>
                        </div>}
                </form>
                : ""}
                    
                
            </div>
        </div>
    </div>
  )
}

export default Ordonari