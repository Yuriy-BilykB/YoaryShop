"use client";
import { searchProducts } from "@/services/products";
import { useEffect, useState } from "react";
import { IProduct } from "@/interfaces/IProduct";
import Link from "next/link";
import { ProductCard } from "@/components/MainPageComponents/Recommendations/ProductCard";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks/useAppSelector";
import { useAppDispatch } from "@/redux/hooks/useAppDispatch";
import { fetchCategories } from "@/redux/helpers/categoriesHelpers";

type Props = {
    searchParams: string;
};

const SearchComponent = ({ searchParams }: Props) => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasMoreProducts, setHasMoreProducts] = useState(true);
    const [offset, setOffset] = useState<number>(0);
    const dispatch = useAppDispatch();
    const limit = 5;
    const router = useRouter();
    const searchStroke = decodeURI(searchParams).trim();
    const { categories } = useAppSelector((state) => state.categories);

    // Обробка категорій
    useEffect(() => {
        const fetchedCategories = async () => {
            await dispatch(fetchCategories());
        };

        fetchedCategories();
    }, [dispatch]);

    useEffect(() => {
        if (categories.length > 0 && searchStroke) {
            const subCategories = categories.filter((category) => category.parent_id !== null);
            const lowerSearch = searchStroke.toLowerCase();
            const matchedCategory = subCategories.find((cat) => cat.name.toLowerCase().includes(lowerSearch));

            if (matchedCategory) {
                router.push(`/subcategories/${encodeURIComponent(matchedCategory.name)}`);
            }
        }
    }, [categories, searchStroke, router]);

    // Завантаження товарів
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true);
                const newProducts = await searchProducts(searchParams, offset, limit);
                setProducts((prev) => (offset === 0 ? newProducts : [...prev, ...newProducts]));
                if (newProducts.length < limit) {
                    setHasMoreProducts(false);
                }
            } catch (error) {
                console.error("Error loading products:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (searchStroke) {
            fetchProducts();
        }
    }, [offset, searchParams, searchStroke]);

    const loadMore = () => {
        setOffset((prev) => prev + limit);
    };

    return (
        <section className="bg-white py-8 rounded-lg">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8 px-4">
                    <h2 className="text-2xl font-bold text-gray-900">Рекомендовані товари</h2>
                    <Link
                        href={"/all-products"}
                        className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center transition-colors"
                    >
                        Переглянути всі
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                    </Link>
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-4">
                        {[...Array(10)].map((_, index) => (
                            <div key={index} className="bg-gray-100 rounded-lg shadow-sm h-64 animate-pulse">
                                <div className="h-40 bg-gray-200 rounded-t-lg"></div>
                                <div className="p-3">
                                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : products.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-4">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 px-4">
                        <div className="bg-gray-50 rounded-lg p-8 max-w-md mx-auto">
                            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
                            </svg>
                            <h3 className="text-xl font-medium text-gray-900 mb-2">Товари не знайдено</h3>
                            <p className="text-gray-600">У даній категорії немає товарів або відбулася помилка під час завантаження.</p>
                        </div>
                    </div>
                )}

                {!isLoading && hasMoreProducts && products.length > 0 && (
                    <div className="text-center mt-10 mb-2">
                        <button
                            onClick={loadMore}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-medium transition-colors duration-200 shadow-sm flex items-center mx-auto"
                        >
                            <span>Показати ще</span>
                            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>
                    </div>
                )}

                {!hasMoreProducts && !isLoading && products.length > 0 && (
                    <div className="text-center mt-8 text-gray-500 pb-4">
                        <span className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium">Усі товари завантажено</span>
                    </div>
                )}
            </div>
        </section>
    );
};

export default SearchComponent;
