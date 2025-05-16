"use client";
import { useEffect, useState } from "react";
import { IProduct } from "@/interfaces/IProduct";
import { getProductById } from "@/services/products";
import {useAppSelector} from "@/redux/hooks/useAppSelector";
import {useAppDispatch} from "@/redux/hooks/useAppDispatch";
import {fetchCategories} from "@/redux/helpers/categoriesHelpers";
import ProductNav from "@/components/products/ProductNav";
import Image from "next/image";
const ProductComponent = ({ id }: { id: string }) => {
    const [product, setProduct] = useState<IProduct | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const {categories} = useAppSelector((state) => state.categories);
    let parentCategory = null;
    const subCategory = categories.find((cat) => cat.id === product?.category_id);

    if (subCategory) {
        parentCategory = categories.find((cat) => cat.id === subCategory.parent_id);
    }
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchCategories())
    }, [dispatch]);
    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            setError(false);
            try {
                const productData = await getProductById(id);
                setProduct(productData);
            } catch (error) {
                console.error("Помилка завантаження продукту", error);
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-16">
                <div className="animate-pulse flex flex-col w-full max-w-2xl">
                    <div className="h-8 bg-gray-200 rounded-md w-3/4 mb-6"></div>
                    <div className="h-4 bg-gray-200 rounded-md w-full mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded-md w-5/6 mb-4"></div>
                    <div className="h-24 bg-gray-200 rounded-md w-full mb-4"></div>
                    <div className="flex space-x-4">
                        <div className="h-24 w-24 bg-gray-200 rounded-md"></div>
                        <div className="h-24 w-24 bg-gray-200 rounded-md"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="flex items-center justify-center py-16">
                <div className="text-center max-w-md p-6 bg-red-50 rounded-lg shadow-sm">
                    <h1 className="text-xl font-semibold text-red-600">Продукт не знайдено</h1>
                    <p className="mt-2 text-gray-600">
                        Виникла помилка при завантаженні продукту або він більше не доступний.
                    </p>
                </div>
            </div>
        );
    }

    const discountPercentage = product.discount_price
        ? Math.round((1 - product.discount_price / product.price) * 100)
        : 0;
    if (!subCategory || !parentCategory) {
        return <div>Категорії не знайдено</div>;
    }
    return (
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm overflow-hidden">

            <ProductNav parentCategory={parentCategory.name} subCategory={subCategory.name} />
            <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{product.name}</h1>
                    <div className="mt-4 md:mt-0 flex items-center space-x-4">
                        {product.is_new && (
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                Новинка
                            </span>
                        )}
                        {product.is_popular && (
                            <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                Популярний
                            </span>
                        )}
                    </div>
                </div>

                <div className="mb-8">
                    {product.images && product.images.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {product.images.map((image, index) => (
                                <div key={index} className="relative group">
                                    <Image
                                        width={300}
                                        height={92}
                                        src={image.imageUrl}
                                        alt={`${product.name} - зображення ${index + 1}`}
                                        className="w-full h-48 object-cover rounded-lg shadow-md transition duration-300 group-hover:shadow-lg"
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-gray-100 rounded-lg p-8 text-center">
                            <p className="text-gray-500">Зображень немає</p>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-4">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-2">Опис</h2>
                            <p className="text-gray-700 leading-relaxed">{product.description}</p>
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-2">Характеристики</h2>
                            <div className="bg-gray-50 rounded-lg p-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="flex items-center">
                                        <span className="text-gray-600 font-medium">Бренд:</span>
                                        <span className="ml-2 text-gray-900">{product.brand}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="text-gray-600 font-medium">Категорія:</span>
                                        <span className="ml-2 text-gray-900">{product.category_id}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="text-gray-600 font-medium">В наявності:</span>
                                        <span
                                            className={`ml-2 ${
                                                product.stock > 10
                                                    ? "text-green-600"
                                                    : product.stock > 0
                                                        ? "text-yellow-600"
                                                        : "text-red-600"
                                            }`}
                                        >
                                            {product.stock} шт.
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="text-gray-600 font-medium">Дата додавання:</span>
                                        <span className="ml-2 text-gray-900">
                                            {new Date(product.created_at).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Ціна</h2>
                        {product.discount_price ? (
                            <div className="space-y-2">
                                <div className="flex items-center">
                                    <span className="text-gray-500 line-through text-lg">{product.price} грн</span>
                                    <span className="ml-2 bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded">
                                        -{discountPercentage}%
                                    </span>
                                </div>
                                <div className="text-2xl font-bold text-green-600">
                                    {product.discount_price} грн
                                </div>
                            </div>
                        ) : (
                            <div className="text-2xl font-bold text-gray-900">{product.price} грн</div>
                        )}

                        <div className="mt-6">
                            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-300">
                                Додати до кошика
                            </button>
                            <button className="w-full mt-3 border border-gray-300 hover:border-gray-400 bg-white text-gray-700 font-medium py-3 px-4 rounded-lg transition duration-300">
                                Додати до улюблених
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductComponent;
