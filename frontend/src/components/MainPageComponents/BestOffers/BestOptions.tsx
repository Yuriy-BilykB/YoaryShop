"use client";

import {useState, useEffect, useCallback} from "react";
import { IProduct } from "@/interfaces/IProduct";
import { getBestOptions } from "@/services/products";
import { ProductCard } from "@/components/MainPageComponents/Recommendations/ProductCard";

const BestOptions = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [offset, setOffset] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const limit = 20;

    const loadMore = useCallback(async () => {
        setIsLoading(true);
        try {
            const newProducts = await getBestOptions(limit, offset);
            setProducts((prev) => {
                const existingIds = new Set(prev.map((p) => p.id));
                const filtered = newProducts.filter((p: IProduct) => !existingIds.has(p.id));
                return [...prev, ...filtered];
            });
            setOffset((prev) => prev + limit);
        } catch (error) {
            console.error("Помилка при завантаженні товарів:", error);
        } finally {
            setIsLoading(false);
        }
    }, [limit, offset]);


    useEffect(() => {
        loadMore();
    }, []);

    return (
        <section className="bg-gray-50 py-8 px-4 md:px-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Популярні товари</h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                <div className="text-center mt-8">
                    <button
                        onClick={loadMore}
                        className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition"
                        disabled={isLoading}
                    >
                        {isLoading ? "Завантаження..." : "Показати ще"}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default BestOptions;
