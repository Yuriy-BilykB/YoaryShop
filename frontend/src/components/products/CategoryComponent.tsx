"use client";
import Link from "next/link";
import {useEffect} from "react";
import {notFound} from "next/navigation";
import {useAppDispatch} from "@/redux/hooks/useAppDispatch";
import {fetchCategories} from "@/redux/helpers/categoriesHelpers";
import {useAppSelector} from "@/redux/hooks/useAppSelector";
import ProductNav from "@/components/products/ProductNav";
const CategoryComponent = ({category}: { category: string }) => {
    const categoryName = category;
    const {categories} = useAppSelector((state) => state.categories);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchCategories())
    }, [dispatch]);


    const parentCategory = categories.find((cat) => cat.name === categoryName);
    console.log()
    if (!parentCategory) {
        notFound();
    }

    const subCategories = categories.filter((cat) => cat.parent_id === parentCategory.id);

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <ProductNav parentCategory={parentCategory.name}/>
            <h1 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-3">
                {parentCategory.name}
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {subCategories.map((sub) => (
                    <Link
                        key={sub.id}
                        href={`/subcategories/${sub.name}`}
                        className="block group"
                    >
                        <div
                            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-md hover:border-blue-300 group-hover:transform group-hover:scale-105">
                            <div className="p-5">
                                <h2 className="text-lg font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
                                    {sub.name}
                                </h2>
                                <div className="mt-2 flex justify-between items-center">
                                    <span className="text-sm text-gray-500">Перейти до категорії</span>
                                    <svg
                                        className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transform group-hover:translate-x-1 transition-all"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M9 5l7 7-7 7"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {subCategories.length === 0 && (
                <div className="bg-gray-50 rounded-lg p-8 text-center">
                    <h3 className="text-xl font-medium text-gray-800 mb-2">Немає підкатегорій</h3>
                    <p className="text-gray-600">У цій категорії поки що немає підкатегорій.</p>
                </div>
            )}
        </div>
    );
};

export default CategoryComponent;