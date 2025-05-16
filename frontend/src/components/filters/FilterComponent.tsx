"use client";
import { useContext, useEffect, useState } from "react";
import FilterContext from "@/components/filters/FilterContext";
import { getFilters } from "@/services/filters";
import { IFilter } from "@/interfaces/IFilter";

interface IProps {
    categoryId: number;
}

const FilterComponent = ({ categoryId }: IProps) => {
    const context = useContext(FilterContext);
    if (!context) {
        throw new Error("FilterComponent must be used within a FilterProvider");
    }
    const { selectedFilters, setSelectedFilters } = context;
    const [filters, setFilters] = useState<IFilter[]>();

    useEffect(() => {
        const fetchFilters = async () => {
            const filters = await getFilters(categoryId);
            setFilters(filters);
        };
        fetchFilters();
    }, [categoryId]);

    const handleCheckboxChange = (filterId: number, value: string) => {
        setSelectedFilters((prev) => {
            console.log(prev, "PREVVVVVVV")
            const currentValues = prev[filterId] || [];
            console.log(currentValues, "CURRENTTTT VALUES")
            const isSelected = currentValues.includes(value);
            console.log(isSelected, "IS SELECTEEEEEEED")
            return {
                ...prev,
                [filterId]: isSelected
                    ? currentValues.filter((v) => v !== value)
                    : [...currentValues, value],
            };
        });
    };

    return (
        <aside className="w-64 p-4 bg-gray-100 rounded-md shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Фільтри</h2>
            <ul className="space-y-4">
                {filters?.map((filter) => (
                    <li key={filter.id}>
                        <h3 className="font-medium text-gray-700 mb-2">{filter.name}</h3>
                        <ul className="space-y-1 ml-2">
                            {filter.values.map((value: string, index: number) => (
                                <li key={index}>
                                    <label className="flex items-center space-x-2 text-sm text-gray-600">
                                        <input
                                            type="checkbox"
                                            className="accent-blue-600"
                                            checked={selectedFilters[filter.id]?.includes(value) || false}
                                            onChange={() => handleCheckboxChange(filter.id, value)}
                                        />
                                        <span>{value}</span>
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default FilterComponent;
