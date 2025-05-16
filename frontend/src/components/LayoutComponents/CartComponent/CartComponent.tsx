"use client";

import { Fragment, useEffect, useState } from "react";
import { useModal } from "@/components/LayoutComponents/ModalContext/ModalContext";
import { Dialog, Transition } from "@headlessui/react";
import {deleteProductFromCart, getProductsCart, updateProductQuantity} from "@/services/cart";
import { X, ShoppingCart, MinusCircle, PlusCircle, Trash2, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const CartComponent = () => {
    const { closeCart, isOpenCart } = useModal();
    const { productsCart, setProductsCart } = useModal();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    console.log(productsCart, "PRODUCTS FROOOOM CART");
    useEffect(() => {
        const fetchProductsCart = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await getProductsCart();
                setProductsCart(response);
            } catch (error) {
                console.error("Error fetching cart products:", error);
                setError("Не вдалося завантажити товари кошика.");
            } finally {
                setIsLoading(false);
            }
        };

        if (isOpenCart) {
            fetchProductsCart();
        }
    }, [isOpenCart, setProductsCart]);



    const handleDelete = async (productId: number) => {
        await deleteProductFromCart(productId);
        setProductsCart(productsCart.filter(item => item.product.id !== productId));
    };
    const handleQuantityChange = async (productId: number, newQuantity: number) => {
        if (!productsCart) return;

        if (newQuantity < 1) {
            await deleteProductFromCart(productId);
            setProductsCart(productsCart.filter(item => item.product.id !== productId));
        } else {
            await updateProductQuantity(productId, newQuantity);
            const updatedProducts = productsCart.map(item =>
                item.product.id === productId
                    ? { ...item, quantity: newQuantity }
                    : item
            );
            setProductsCart(updatedProducts);
        }
    };
    const renderCartContent = () => {
        if (isLoading) {
            return (
                <div className="flex flex-col items-center justify-center py-8">
                    <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-4" />
                    <p className="text-gray-600">Завантаження кошика...</p>
                </div>
            );
        }

        if (error) {
            return (
                <div className="text-center py-8">
                    <p className="text-red-500 mb-4">{error}</p>
                    <button
                        onClick={() => setIsLoading(true)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                    >
                        Спробувати знову
                    </button>
                </div>
            );
        }

        if (!productsCart || productsCart.length === 0) {
            return (
                <div className="flex flex-col items-center justify-center py-12">
                    <div className="bg-gray-100 p-4 rounded-full mb-4">
                        <ShoppingCart className="w-12 h-12 text-gray-400" />
                    </div>
                    <p className="text-gray-700 text-lg font-medium">Ваш кошик порожній</p>
                    <p className="text-gray-500 text-sm mt-2 max-w-xs text-center">
                        Додайте товари до кошика, щоб продовжити покупки
                    </p>
                </div>
            );
        }

        return (
            <ul className="space-y-4 max-h-[50vh] overflow-y-auto pr-2 -mr-2">
                {productsCart.map((item) => (
                    <li
                        key={item.product.id}
                        className="flex justify-between items-center border border-gray-100 rounded-lg p-3 hover:shadow-sm transition-shadow duration-200"
                    >
                        <div className="flex items-center space-x-3">
                            <div
                                className="bg-gray-100 w-16 h-16 rounded-md flex items-center justify-center overflow-hidden">
                                {item.product.images.length > 0 && item.product.images[0].imageUrl ? (
                                    <Image
                                        src={item.product.images[0].imageUrl}
                                        alt={item.product.name}
                                        width={5}
                                        height={5}
                                        className="w-full h-full object-contain"
                                    />
                                ) : (
                                    <ShoppingCart className="w-6 h-6 text-gray-400"/>
                                )}
                            </div>

                            <div>
                                <p className="text-gray-800 font-medium line-clamp-1">{item.product.name}</p>
                                <p className="text-blue-600 font-semibold text-sm">{item.product.price} грн</p>
                            </div>
                        </div>

                        <div className="flex flex-col items-end space-y-2">
                            <div className="flex items-center space-x-2 bg-gray-50 rounded-md px-1">
                                <button
                                    className="text-gray-500 hover:text-blue-600 transition-colors"
                                    onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                                >
                                    <MinusCircle className="w-5 h-5" />
                                </button>
                                <span className="text-gray-800 font-medium min-w-8 text-center">
                                    {item.quantity}
                                </span>
                                <button
                                    className="text-gray-500 hover:text-blue-600 transition-colors"
                                    onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                                >
                                    <PlusCircle className="w-5 h-5" />
                                </button>
                            </div>

                            <button
                                className="text-red-400 hover:text-red-600 transition-colors"
                                onClick={() => handleDelete(item.product.id)}
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        );
    };

    const renderFooter = () => {
        if (!productsCart || productsCart.length === 0) {
            return (
                <button
                    type="button"
                    onClick={closeCart}
                    className="mt-6 w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
                >
                    Продовжити покупки
                </button>
            );
        }

        const total = productsCart.reduce((sum, item) => {
            return sum + (item.product.price * item.quantity);
        }, 0);

        const itemCount = productsCart.reduce((count, item) => count + item.quantity, 0);

        return (
            <div className="mt-6 space-y-4">
                <div className="bg-gray-50 p-4 rounded-md">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600">Кількість товарів:</span>
                        <span className="text-gray-800 font-medium">{itemCount} шт.</span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                        <span className="font-semibold text-lg">Всього:</span>
                        <span className="font-bold text-lg text-blue-700">{Math.round(total)} грн</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <button
                        type="button"
                        onClick={closeCart}
                        className="bg-gray-100 text-gray-800 py-3 rounded-md hover:bg-gray-200 transition-colors duration-200 font-medium"
                    >
                        Закрити
                    </button>
                    <Link href={"/order"}>
                        <button
                            type="button"
                            onClick={closeCart}
                            className="bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
                        >
                            Оформити
                        </button>
                    </Link>

                </div>
            </div>
        );
    };

    return (
        <Transition appear show={isOpenCart} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={closeCart}>
                {/* Background overlay */}
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-xl bg-white p-6 text-left align-middle shadow-2xl transition-all">
                                <div className="flex justify-between items-center mb-5 pb-3 border-b">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-xl font-semibold leading-6 text-gray-900 flex items-center"
                                    >
                                        <ShoppingCart className="w-5 h-5 mr-2 text-blue-600" />
                                        Ваш кошик
                                    </Dialog.Title>
                                    <button
                                        className="text-gray-400 hover:text-gray-600 focus:outline-none hover:bg-gray-100 p-1 rounded-full transition-colors"
                                        onClick={closeCart}
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                </div>

                                <div className="mt-3">
                                    {renderCartContent()}
                                </div>

                                {renderFooter()}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default CartComponent;