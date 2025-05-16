"use client";
import {useEffect, useState} from "react";
import {useModal} from "@/components/LayoutComponents/ModalContext/ModalContext";
const BillSideBar = ({ deliverySum }: { total: number, deliverySum: string }) => {
    const {productsCart} = useModal();
    const [totalSum, setTotalSum] = useState<number>();
    useEffect(() => {
        const total = productsCart.reduce((total, item) => total + item.product.price, 0);
        setTotalSum(total);
    }, [productsCart]);
    return (
        <div className="bg-white rounded-lg p-4 border border-gray-100">
            <div className="flex flex-col space-y-4">
                <div className="pb-3 border-b border-gray-100">
                    <h1 className="text-lg font-semibold text-gray-800">Сума до оплати:
                        <span className="text-blue-600 ml-1">{totalSum} грн</span>
                    </h1>
                </div>
                <div className="pt-1">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Доставка</h3>
                    <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-600">Доставка посилки:</p>
                        <p className="font-medium text-gray-800">{deliverySum} грн</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BillSideBar;