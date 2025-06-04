'use client';

import React, { useEffect, useState } from 'react'
import "@/app/globals.css"

interface ProductFilterProps {
    onFilterChange: (filters: Record<string, (string | number)[]>) => void
}

const Filtre: React.FC<ProductFilterProps> = ({ onFilterChange }) => {

    const [filters, setFilters] = useState<Record<string, (string | number)[]>>({})
    const [selectedValues, setSelectedValues] = useState<string[]>([]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked } = event.target;
        setSelectedValues((prev) => 
            checked
            ? [...prev, value]
            : prev.filter((v) => v !== value)
        );
        setFilters((prevFilters) => {
            const updatedFilters = { ...prevFilters };

            if (checked) {
                if (!updatedFilters[name]) {
                    updatedFilters[name] = [];
                } 
                if (!updatedFilters[name].includes(value.toUpperCase())) {
                    updatedFilters[name].push(value.toUpperCase());
                }
            } else {
                updatedFilters[name] = updatedFilters[name]?.filter(
                    (val) => val !== value.toUpperCase()
                );
                if (updatedFilters[name]?.length === 0) {
                    delete updatedFilters[name];
                }
            }
            onFilterChange(updatedFilters);
            return updatedFilters;
        });
    }


    const isFilterApplied = (category: string) => {
        return filters[category] && filters[category].length > 0;
    };

    const handleStergeFiltre = (category: string) => {
        setSelectedValues(selectedValues.splice(selectedValues.indexOf(category), 1));

        for (const key in filters) {
            if (filters[key].some(item => category.includes(item))) {
                delete filters[key];
            }
        }

        setFilters({...filters});
        return filters;
    }

    useEffect(() => {
        onFilterChange(filters);
    }, [filters]);

    const filtre = [
        {
            id: 0,
            nume: "Brand",
            tipuri: ["LIVOLO", "LUXION", "OWON", "SONOFF", "TELLUR"]
        },
        {
            id: 1,
            nume: "Culoare",
            tipuri: ["ROSU", "NEGRU", "GALBEN", "ROZ", "VERDE", "ALBASTRU"]
        },
        {
            id: 2,
            nume: "Tip Întrerupător",
            tipuri: ["SIMPLU", "DUBLU", "TRIPLU", "CVADRUPLU"]
        }
    ]

  return (
    <div>
        {filtre.map((filtru, index) => (
            <div
                key={index}
                className="white-background round-border p-8 mb-4 w-[265px] flex justify-between">
                    <div>
                        <p
                            className="filtre-header primary-color mb-4">
                            {filtru.nume}
                        </p>
                        <form 
                            action=""
                            className="flex flex-col gap-1">
                            {filtru.tipuri.map((tip, index) => (
                                <div
                                    key={index}>
                                    <label htmlFor={`${tip.toLowerCase()}`} className="flex items-center gap-2 category-radio">
                                        <input id={`${tip.toLowerCase()}`} 
                                            type="checkbox" 
                                            name={`${filtru.nume.toLowerCase().replace(/\s+/g, "_")}`} 
                                            value={`${tip.charAt(0) + tip.slice(1,tip.length).toLowerCase()}`} 
                                            checked={selectedValues.includes(`${tip.charAt(0) + tip.slice(1,tip.length).toLowerCase()}`)} 
                                            onChange={handleChange} 
                                            className={`primary-color appearance-none ${selectedValues.includes(`${tip.charAt(0) + tip.slice(1,tip.length).toLowerCase()}`) ? "filtru-input filtru-input-checked" : "filtru-input"}`}/>
                                            <p 
                                                className={`${selectedValues.includes(`${tip.charAt(0) + tip.slice(1,tip.length).toLowerCase()}`) ? "accent-color nav-bold" : "primary-color nav-text"} select-none`}>
                                                    {`${tip.charAt(0) + tip.slice(1,tip.length).toLowerCase()}`}
                                            </p>
                                    </label>
                                </div>
                            ))}
                        </form>
                    </div>
                    {isFilterApplied(filtru.nume.toLowerCase())
                    &&
                        <div>
                            <button className="sterge-filtre-text primary-color" onClick={() => filtru.tipuri.map((tip) => handleStergeFiltre(tip))}>Șterge filtrele</button>
                        </div>}
            </div>
        ))}
        
    </div>
  )
}

export default Filtre