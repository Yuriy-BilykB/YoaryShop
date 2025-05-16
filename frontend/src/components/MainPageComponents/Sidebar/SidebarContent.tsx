"use client";
import { CategoryItem } from "@/components/MainPageComponents/Sidebar/CategoriItem";
import { ICategories } from "@/interfaces/ICategories";
import CategoryFooter from "@/components/MainPageComponents/Sidebar/CategoryFooter";
import Link from "next/link";
import React from "react";

export const SidebarContent = ({ categories }: { categories: ICategories[] }) => {
    const staticLinks = [
        { label: "Львів", href: "#" },
        { label: "Львів обл., Львів р-н.", href: "#" },
        { label: "Чат з YOARYSHOP", href: "#" },
        { label: "Магазини YOARYSHOP", href: "#" },
    ];

    return (
        <div className="h-full w-70 text-black overflow-y-auto px-2">
            <ul className="py-2">
                {categories?.map((category) => (
                    <CategoryItem key={category.id} category={category}/>
                ))}
            </ul>

            <div className="space-y-2">
                {staticLinks.map((link, idx) => (
                    <Link
                        key={idx}
                        href={link.href}
                        className="text-gray-800 block text-sm px-4 py-2 rounded hover:text-green-600 transition-colors"
                    >
                        {link.label}
                    </Link>
                ))}
            </div>

            {/* ⬇️ Полоска перед футером */}
            <div className="border-t border-gray-300 pt-4 mt-4">
                <CategoryFooter/>
            </div>
        </div>
    );
};
