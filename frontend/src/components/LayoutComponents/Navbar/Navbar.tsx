"use client";
import Image from "next/image";
import accountImg from "../../../../public/account.svg";
import burgerImg from "../../../../public/burger.svg";
import cartImg from "../../../../public/cart.svg";
import categoryImg from "../../../../public/category.svg";
import compareImg from "../../../../public/compare.svg";
import logoImg from "../../../../public/logo.svg";
import loupeImg from "../../../../public/loupe.svg";
import micImg from "../../../../public/mic.svg";
import list from "../../../../public/images/list.svg"
import {useModal} from "@/components/LayoutComponents/ModalContext/ModalContext";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";

const Navbar = () => {
    const router = useRouter();
    const [searchParams, setSearchParams] = useState<string>("")
    const [cartCount, setCartCount] = useState(0);
    const {
        openModalNavbar,
        openSidePanel,
        openLoginWindow,
        openCart,
        productsCart,
        isLogin,
    } = useModal();
    useEffect(() => {
        const total = productsCart.reduce((total, item) => total + item.quantity, 0);
        setCartCount(total);
    }, [productsCart]);
    const handleSearch = async () => {
        if (!searchParams.trim()) return;
        router.push(`/search/${encodeURIComponent(searchParams)}`);
    };
    const handleText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchParams(e.target.value)
    }

    return (
        <nav className="w-full bg-black text-white sticky top-0 z-50 shadow-md">
            <div className="container mx-auto px-2">
                <div className="flex items-center justify-between py-4">
                    <div className="flex items-center space-x-4">
                        <button className="p-2 hover:bg-gray-800 rounded-md transition" onClick={openSidePanel}>
                            <Image src={burgerImg} alt="Menu" width={24} height={24} className="invert"/>
                        </button>
                        <Link href={"/"}>
                            <div className="flex items-center space-x-2">
                                <Image src={logoImg} alt="Logo" width={36} height={36} className="invert"/>
                                <span className="font-bold text-xl hidden md:block">YOARYSHOP</span>
                            </div>
                        </Link>

                    </div>
                    <div className="hidden md:flex flex-1 justify-center items-center gap-8 mx-6">
                        <div className="flex items-center space-x-2">
                        <button
                                className="flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-md hover:bg-gray-700 transition"
                                onClick={openModalNavbar}>
                                <span>Categories</span>
                                <Image src={categoryImg} alt="Categories" width={16} height={16} className="invert"/>
                            </button>
                        </div>

                        <div className="relative flex-1 max-w-2xl">
                            <div className="flex items-center bg-gray-800 rounded-md overflow-hidden">
                                <div className="px-3 py-2">
                                    <Image src={loupeImg} alt="Search" width={18} height={18} className="invert"/>
                                </div>
                                <input
                                    value={searchParams}
                                    onChange={handleText}
                                    type="text"
                                    name="search"
                                    placeholder="Search products..."
                                    className="bg-gray-800 text-white px-2 py-2 flex-1 focus:outline-none"
                                />
                                <div className="px-3 py-2">
                                    <Image src={micImg} alt="Voice search" width={18} height={18} className="invert"/>
                                </div>
                                <button onClick={handleSearch}
                                        className="bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 transition">
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center space-x-6">
                        {
                            isLogin ? (
                                <Link href={'/cabinet/orders'}>
                                <button
                                        className="hidden sm:block relative hover:text-gray-300 transition">
                                    <Image src={list} alt="Account" width={24} height={24} className="invert"/>
                                </button>
                                </Link>
                            ) : (
                                    <button
                                        onClick={openLoginWindow}
                                        className="hidden sm:block relative hover:text-gray-300 transition">
                                        <Image src={accountImg} alt="Account" width={24} height={24}
                                               className="invert"/>
                                    </button>
                            )
                        }
                        <button className="hidden sm:block relative hover:text-gray-300 transition">
                            <Image src={compareImg} alt="Compare" width={24} height={24} className="invert"/>
                            <span
                                className="absolute -top-2 -right-2 bg-blue-600 text-xs rounded-full w-5 h-5 flex items-center justify-center">0</span>
                        </button>
                        <button onClick={openCart} className="relative hover:text-gray-300 transition">
                            <Image src={cartImg} alt="Cart" width={24} height={24} className="invert"/>
                            <span
                                className="absolute -top-2 -right-2 bg-blue-600 text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                {cartCount}
                            </span>
                        </button>
                    </div>
                </div>

                <div className="md:hidden pb-4">
                    <div className="flex items-center bg-gray-800 rounded-md overflow-hidden">
                        <div className="px-3 py-2">
                            <Image src={loupeImg} alt="Search" width={18} height={18} className="invert"/>
                        </div>
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="bg-gray-800 text-white px-2 py-2 flex-1 focus:outline-none"
                        />
                        <div className="px-3 py-2">
                            <Image src={micImg} alt="Voice search" width={18} height={18} className="invert"/>
                        </div>
                        <button className="bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 transition">
                            Search
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;