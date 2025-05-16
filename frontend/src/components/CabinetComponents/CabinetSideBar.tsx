"use client";

import { useModal } from "@/components/LayoutComponents/ModalContext/ModalContext";
import Image from "next/image";
import Link from "next/link";

import cartImg from "../../../public/cart.svg";
import compareImg from "../../../public/compare.svg";
import parcelImg from "../../../public/images/parcel-tracker.svg";
import accountImg from "../../../public/account.svg";
import wallet from "../../../public/images/wallet.svg";
import list from "../../../public/images/list.svg";

const CabinetSideBar = () => {
    const { closeSidePanel, openCart, userInfo } = useModal();
    const handleClickCart = () => {
        openCart();
        closeSidePanel();
    };

    const menuItems = [
        {
            id: "orders",
            icon: list,
            label: "Замовлення",
            href: "/cabinet/orders",
            type: "link"
        },
        {
            id: "cart",
            icon: cartImg,
            label: "Кошик",
            onClick: handleClickCart,
            type: "button"
        },
        {
            id: "compare",
            icon: compareImg,
            label: "Списки порівнянь",
            href: "/",
            type: "link"
        },
        {
            id: "tracking",
            icon: parcelImg,
            label: "Відстежити посилку",
            href: "/cabinet/tracking",
            type: "link"
        },
        {
            id: "wallet",
            icon: wallet,
            label: "Гаманець",
            href: "/cabinet/wallet",
            type: "link"
        },
    ];

    const isUser = "payload" in userInfo;
    const firstName = isUser ? userInfo.payload.firstName : "";
    const lastName = isUser ? userInfo.payload.lastName : "";
    const email = isUser ? userInfo.payload.email : "";

    return (
        <div className="flex flex-col h-full">
            <Link href="/cabinet/personal-information">
                <div className="bg-gradient-to-r from-blue-700 to-indigo-800 p-5 rounded-lg mb-6 transition-transform hover:scale-[1.02] cursor-pointer shadow-lg">
                    <div className="flex items-center mb-4">
                        <div className="bg-white p-2 rounded-full">
                            <Image
                                src={accountImg}
                                alt="Account"
                                width={24}
                                height={24}
                                className="text-blue-700"
                            />
                        </div>
                        <span className="ml-3 font-semibold text-lg text-white">Мій аккаунт</span>
                    </div>

                    {isUser ? (
                        <div className="text-white">
                            <p className="font-medium text-lg">{firstName} {lastName}</p>
                            <p className="text-blue-100 text-sm mt-1">{email}</p>
                        </div>
                    ) : (
                        <div className="text-white">
                            <p className="font-medium">Увійти в аккаунт</p>
                        </div>
                    )}
                </div>
            </Link>

            {/* Navigation menu */}
            <div className="space-y-2">
                {menuItems.map((item) => (
                    item.type === "button" ? (
                        <button
                            key={item.id}
                            onClick={item.onClick}
                            className="flex items-center w-full p-3 rounded-lg text-gray-700 hover:bg-gray-200 hover:text-blue-700 transition-all group"
                        >
                            <div className="bg-blue-100 p-2 rounded-lg group-hover:bg-blue-200 transition-colors">
                                <Image
                                    src={item.icon}
                                    alt={item.label}
                                    width={20}
                                    height={20}
                                    className="text-blue-700"
                                />
                            </div>
                            <span className="ml-3 font-medium">{item.label}</span>
                        </button>
                    ) : item.href ? (
                        <Link
                            key={item.id}
                            href={item.href}
                            className="flex items-center w-full p-3 rounded-lg text-gray-700 hover:bg-gray-200 hover:text-blue-700 transition-all group"
                        >
                            <div className="bg-blue-100 p-2 rounded-lg group-hover:bg-blue-200 transition-colors">
                                <Image
                                    src={item.icon}
                                    alt={item.label}
                                    width={20}
                                    height={20}
                                    className="text-blue-700"
                                />
                            </div>
                            <span className="ml-3 font-medium">{item.label}</span>
                        </Link>
                    ) : null
                ))}
            </div>
        </div>
    );
};

export default CabinetSideBar;