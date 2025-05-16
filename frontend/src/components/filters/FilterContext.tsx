"use client"
import React, {createContext, useState, ReactNode, useCallback} from "react";

type FilterContext = {
    selectedFilters: { [key: number]: string[] };
    setSelectedFilters: React.Dispatch<React.SetStateAction<{ [key: number]: string[] }>>;
    resetFilters: () => void;
}

const FilterContext = createContext<FilterContext | undefined>(undefined);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
    const [selectedFilters, setSelectedFilters] = useState<{ [key: number]: string[] }>({});
    const resetFilters = useCallback(() => {
        setSelectedFilters({});
    }, []);
    return (
        <FilterContext.Provider value={{ selectedFilters, setSelectedFilters, resetFilters }}>
            {children}
        </FilterContext.Provider>
    );
};

export default FilterContext;
