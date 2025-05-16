'use client'
import { Facebook, Instagram, Twitter } from "lucide-react";
import Image from "next/image";
import cartImg from "../../../../public/cart.svg";
import compareImg from "../../../../public/compare.svg";
import parcelImg from "../../../../public/images/parcel-tracker.svg";
import accountImg from "../../../../public/account.svg";
import { useModal } from "@/components/LayoutComponents/ModalContext/ModalContext";
import Link from "next/link";
import React from "react";

const loggedInActions = [
    {
        label: "Кошик",
        icon: cartImg,
        onClickType: "cart",
        href: null
    },
    {
        label: "Списки порівнянь",
        icon: compareImg,
        href: "/"
    },
    {
        label: "Відстежити посилку",
        icon: parcelImg,
        href: "/cabinet/tracking"
    },
    {
        label: "Гаманець",
        icon: parcelImg,
        href: "/cabinet/tracking"
    }
];

const companyLinks = [
    "Про нас",
    "Умови використання сайту",
    "Вакансії",
    "Контакти",
    "Всі категорії"
];

const helpLinks = [
    "Доставка та оплата",
    "Кредит",
    "Гарантія",
    "Повернення товару",
    "Сервісні центри"
];

const CategoryFooter = () => {
    const { openLoginWindow, closeSidePanel, openCart, isLogin, userInfo } = useModal();

    const handleClickLogin = () => {
        openLoginWindow();
        closeSidePanel();
    }

    const handleClickCart = () => {
        openCart();
        closeSidePanel();
    }

    return (
        <div className="space-y-6">
            {isLogin ? (
                <Link href="/cabinet/personal-information">
                    <div className="flex items-center space-x-4 p-4 rounded-md bg-white shadow">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <Image src={accountImg} alt="Account" width={32} height={32} className="invert" />
                        </div>
                        <div className="flex flex-col">
                            <p className="text-sm font-medium text-gray-900">
                                {"payload" in userInfo && userInfo.payload.firstName}{" "}
                                {"payload" in userInfo && userInfo.payload.lastName}
                            </p>
                            <p className="text-sm text-gray-500">
                                {"payload" in userInfo && userInfo.payload.email}
                            </p>
                        </div>
                    </div>
                </Link>
            ) : (
                <div className="text-center space-y-4 bg-gray-200 p-4 rounded-md">
                    <h4 className="text-sm text-black">
                        Увійдіть, щоб отримувати рекомендації, персональні бонуси і знижки.
                    </h4>
                    <button
                        onClick={handleClickLogin}
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-400 transition-colors font-medium">
                        Увійдіть в особистий кабінет
                    </button>
                </div>
            )}

            {/* App Links */}
            <div className="border-t border-gray-300 pt-4">
                <h3 className="font-bold text-black mb-2">Завантажуйте наші застосунки</h3>
                <div className="flex space-x-3">
                    {["Google Play", "App Store"].map((label, index) => (
                        <a key={index} href="#" className="bg-gray-800 hover:bg-gray-700 transition-colors p-2 rounded-md text-white">
                            {label}
                        </a>
                    ))}
                </div>
            </div>

            {/* Social Links */}
            <div className="border-t border-gray-300 pt-4">
                <h3 className="font-medium text-black mb-2">Ми в соціальних мережах</h3>
                <div className="flex space-x-3">
                    {[Facebook, Instagram, Twitter].map((Icon, index) => (
                        <a key={index} href="#" className="bg-gray-800 hover:bg-gray-700 transition-colors p-2 rounded-full">
                            <Icon size={20} className="text-white" />
                        </a>
                    ))}
                </div>
            </div>

            {/* Logged In Buttons */}
            {isLogin && (
                <div className="space-y-1 border-t border-gray-300 pt-4">
                    {loggedInActions.map(({ label, icon, href, onClickType }, index) => {
                        const content = (
                            <>
                                <Image
                                    src={icon}
                                    alt={label}
                                    width={24}
                                    height={24}
                                    className="grayscale brightness-0 opacity-70 group-hover:invert transition"
                                />
                                <p className="text-gray-400 group-hover:text-white transition">{label}</p>
                            </>
                        );

                        const btnProps = {
                            className: "group flex items-center space-x-3 w-full text-left p-3 hover:bg-gray-800 rounded-md transition-colors"
                        };

                        if (onClickType === "cart") {
                            return (
                                <button key={index} {...btnProps} onClick={handleClickCart}>
                                    {content}
                                </button>
                            );
                        } else {
                            if (href){
                                return (
                                    <Link key={index}  href={href}>
                                        <button {...btnProps}>{content}</button>
                                    </Link>
                                );
                            }
                        }
                    })}
                </div>
            )}

            {/* Company Info */}
            <div className="border-t border-gray-300 pt-4">
                <h3 className="font-bold text-black mb-2">Інформація про компанію</h3>
                <div className="grid grid-cols-1 gap-3 text-sm text-black">
                    {companyLinks.map((text, index) => (
                        <a key={index} href="#" className="hover:underline transition-colors">
                            {text}
                        </a>
                    ))}
                </div>
            </div>

            {/* Help Section */}
            <div className="border-t border-gray-300 pt-4">
                <h3 className="font-bold text-black mb-2">Допомога</h3>
                <div className="grid grid-cols-1 gap-3 text-sm text-black">
                    {helpLinks.map((text, index) => (
                        <a key={index} href="#" className="hover:underline transition-colors">
                            {text}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategoryFooter;
