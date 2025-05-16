"use client";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import {useModal} from "@/components/LayoutComponents/ModalContext/ModalContext";
import Link from "next/link";
import {useAppSelector} from "@/redux/hooks/useAppSelector";
import {useAppDispatch} from "@/redux/hooks/useAppDispatch";
import {fetchCategories} from "@/redux/helpers/categoriesHelpers";

const ModalNavbar = () => {
    const { closeModalNavbar} = useModal();
    const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);
    const {categories} = useAppSelector((state) => state.categories);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchCategories())
    }, [dispatch]);

    const mainCategories = categories?.filter((category) => category.parent_id === null);
    const subCategories = categories?.filter((category) => category.parent_id !== null && category.parent_id === activeCategoryId);

    return (
        <div className="fixed inset-0 z-50 flex">
            <div
                className="fixed inset-0 bg-black/20 backdrop-blur-sm"
                onClick={closeModalNavbar}
            />

            <div className="relative w-1/2 mx-auto mt-[80px] bg-black text-white rounded-lg shadow-lg flex overflow-hidden max-h-[80vh]">
                <div className="absolute top-4 right-4">
                    <button
                        onClick={closeModalNavbar}
                        className="text-gray-400 hover:text-white transition-colors"
                        aria-label="Close modal"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="w-1/2 border-r border-gray-800 overflow-y-auto p-6 space-y-2">
                    <h2 className="text-xl font-bold mb-4">Категорії</h2>
                    <ul className="space-y-2">
                        {mainCategories.map((category) => (
                            <Link key={category.id} href={`/category/${category.name}`} onClick={closeModalNavbar}>
                                <li
                                    className={`p-3 rounded-md cursor-pointer hover:bg-gray-800 transition ${
                                        activeCategoryId === category.id ? "bg-gray-700" : ""
                                    }`}
                                    onMouseEnter={() => setActiveCategoryId(category.id)}
                                >
                                    {category.name}
                                </li>
                            </Link>
                        ))}
                    </ul>
                </div>

                <div className="w-1/2 overflow-y-auto p-6 space-y-2">
                    <h2 className="text-xl font-bold mb-4">Підкатегорії</h2>
                    {subCategories.length > 0 ? (
                        <ul className="space-y-2">
                            {subCategories.map((subcategory) => (
                                <Link key={subcategory.id} href={`/subcategories/${subcategory.name}`} onClick={closeModalNavbar}>
                                    <li
                                        className="p-3 rounded-md cursor-pointer hover:bg-gray-800 transition"
                                    >
                                        {subcategory.name}
                                    </li>
                                </Link>

                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-400">Немає підкатегорій</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ModalNavbar;
