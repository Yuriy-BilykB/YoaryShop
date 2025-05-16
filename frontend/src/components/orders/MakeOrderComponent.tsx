"use client"
import {useModal} from "@/components/LayoutComponents/ModalContext/ModalContext";
import {MinusCircle, PlusCircle, ShoppingCart, Trash2} from "lucide-react";
import DetailOrderBar from "@/components/orders/DetailOrderBar";
import BillSideBar from "@/components/orders/BillSideBar";
import {deleteProductFromCart, updateProductQuantity} from "@/services/cart";
import {useState} from "react";
import Image from "next/image";

const MakeOrderComponent = () => {
    const {productsCart, setProductsCart} = useModal();
    const [isOrdered, setIsOrdered] = useState<boolean>(false);
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


    const total = productsCart.reduce((sum, item) => {
        return sum + (item.product.price * item.quantity);
    }, 0);

    return (
        <>
                <div className="flex justify-items-center flex-col space-y-6 p-4 bg-white rounded-lg shadow-sm">
                    <div className="flex flex-col">
                        <ul className="space-y-4 max-h-[50vh] overflow-y-auto pr-2 -mr-2">
                            {productsCart.map((item) => (
                                <li
                                    key={item.product.id}
                                    className="flex justify-between items-center border border-gray-100 rounded-lg p-3 hover:shadow-sm transition-shadow duration-200"
                                >
                                    <div className="flex items-center space-x-3">
                                        <div className="bg-gray-100 w-16 h-16 rounded-md flex items-center justify-center overflow-hidden">
                                            {item.product.images.length > 0 && item.product.images[0].imageUrl ? (
                                                <Image
                                                    width={10}
                                                    height={10}
                                                    src={item.product.images[0].imageUrl}
                                                    alt={item.product.name}
                                                    className="w-full h-full object-contain"
                                                />
                                            ) : (
                                                <ShoppingCart className="w-6 h-6 text-gray-400" />
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
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-100 flex justify-center gap-6">
                        <DetailOrderBar
                            setIsOrdered={setIsOrdered}
                        />
                        {
                            !isOrdered ?  <BillSideBar total={total} deliverySum={"120"} /> : null
                        }

                    </div>
                </div>
        </>
    );
};

export default MakeOrderComponent;