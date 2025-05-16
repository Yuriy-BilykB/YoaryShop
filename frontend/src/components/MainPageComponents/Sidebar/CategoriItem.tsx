"use client"
import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight } from "react-feather";
import {ICategories} from "@/interfaces/ICategories";

export const CategoryItem = ({ category }: { category: ICategories }) => {
    const [isOpen, setIsOpen] = useState(false);
    const hasChildren = category.subcategories && category.subcategories.length > 0;

    return (
        <li>
            <div
                className="text-gray-800 flex items-center justify-between px-4 py-3 hover:text-green-600 cursor-pointer transition duration-100"
                onClick={() => hasChildren && setIsOpen(!isOpen)}
            >
                <Link href={`/category/${category.name}`} className="flex-1">
                    {category.name}
                </Link>
                {hasChildren && (
                    <button className="text-gray-400">
                        {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                    </button>
                )}
            </div>
        </li>

    );
};
