"use client";
import ProductsComponent from "@/components/products/ProductsComponent";
import Link from "next/link";
import FilterComponent from "@/components/filters/FilterComponent";
import {useEffect} from "react";
import {useAppSelector} from "@/redux/hooks/useAppSelector";
import {useAppDispatch} from "@/redux/hooks/useAppDispatch";
import {fetchCategories} from "@/redux/helpers/categoriesHelpers";
import ProductNav from "@/components/products/ProductNav";

const SubCategoryComponent = ({subCategory}: { subCategory: string }) => {
    const {categories} = useAppSelector((state) => state.categories);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchCategories())
    }, [dispatch]);
    let categorySub = null;
    if (subCategory) {
        categorySub = categories.find((cat) => cat.name === subCategory);
    }
    let parentCategory = null;
    if (categorySub){
        parentCategory = categories.find((cat) => cat.id === categorySub.parent_id);

    }

    if (!parentCategory) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-8 text-center">
                <div className="p-8 bg-red-50 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold text-red-600">Категорія не знайдена</h2>
                    <p className="mt-2 text-gray-600">Перевірте URL або поверніться на головну сторінку</p>
                    <Link href="/"
                          className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                        На головну
                    </Link>
                </div>
            </div>
        );
    }
    if (!categorySub || !parentCategory) {
        return <div>Категорії не знайдено</div>;
    }
    return (
        <div className="w-[90%] mx-auto py-6">
            <ProductNav parentCategory={parentCategory.name} subCategory={categorySub.name}/>
            <h1 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-3">
                {subCategory}
            </h1>

            <div className="flex">
                <div className="w-64">
                    <FilterComponent categoryId={categorySub.id}/>
                </div>

                <div className="flex-1">
                    <ProductsComponent id={categorySub.id}/>
                </div>
            </div>
        </div>
    );
};

export default SubCategoryComponent;
