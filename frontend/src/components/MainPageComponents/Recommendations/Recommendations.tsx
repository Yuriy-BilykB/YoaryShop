"use client";
import {useState, useEffect} from "react";
import {getRecommendationsProducts} from "@/services/products";
import {IProduct} from "@/interfaces/IProduct";
import {ProductCard} from "@/components/MainPageComponents/Recommendations/ProductCard";
import Link from "next/link";

const Recommendations = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [amountProducts, setAmountProducts] = useState(12);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getProducts = async () => {
            setIsLoading(true);
            try {
                const products = await getRecommendationsProducts();
                setProducts(products);
            } catch (error) {
                console.error("Failed to fetch recommended products:", error);
            } finally {
                setIsLoading(false);
            }
        };
        getProducts();
    }, []);

    const visibleProducts = products.slice(0, amountProducts);

    return (
        <section className="bg-gray-50 py-8 px-4 md:px-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Рекомендовані товари</h2>
                    <Link href={"/all-products"} className="text-sm text-blue-600 hover:underline">
                        Переглянути всі
                    </Link>
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                        {[...Array(12)].map((_, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-lg h-72 animate-pulse"
                            />
                        ))}
                    </div>
                ) : (
                    <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                        {visibleProducts.map((product) => (
                            <li key={product.id}>
                                <ProductCard key={product.id} product={product}/>
                            </li>
                        ))}
                    </ul>
                )}

                {!isLoading && amountProducts < products.length && (
                    <div className="text-center mt-8">
                        <button
                            onClick={() => setAmountProducts((prev) => prev + 12)}
                            className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition"
                        >
                            Показати ще
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Recommendations;