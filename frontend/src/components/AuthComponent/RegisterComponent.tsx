"use client";
import {Dialog, Transition} from "@headlessui/react";
import React, {Fragment, useState} from "react";
import {useModal} from "@/components/LayoutComponents/ModalContext/ModalContext";
import {X, Mail, Lock, Eye, EyeOff, User, Phone} from "lucide-react";
import {IUser} from "@/interfaces/IUser";
import {registerUser} from "@/services/auth";
import {toast} from "react-toastify";
import VerificationCodeForm from "@/components/AuthComponent/VerificationCodeForm";

const RegisterComponent = () => {
    const {isOpenRegisterWindow, closeRegisterWindow, openLoginWindow} = useModal();
    const [isCodeSent, setIsCodeSent] = useState<boolean>(false);
    const [userData, setUserData] = useState<IUser>({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setUserData(prev => ({...prev, [name]: value}));
    };

    const handleChangeAuthType = () => {
        closeRegisterWindow();
        openLoginWindow();
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await registerUser(userData);
            setIsCodeSent(true);
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message || "Помилка сервера");
        }
    };
    const passwordsMatch = userData.password === userData.confirmPassword || userData.confirmPassword === "";

    return (
        <div>
            {isCodeSent ? <VerificationCodeForm userData={userData}/> : (
                <Transition appear show={isOpenRegisterWindow} as={Fragment}>
                    <Dialog as="div" className="relative z-50" onClose={closeRegisterWindow}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-blue-900/20 backdrop-blur-sm"/>
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
                                    <Dialog.Panel
                                        className="w-full max-w-md transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl transition-all">
                                        {/* Header */}
                                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                                            <Dialog.Title as="h3" className="text-xl font-bold text-gray-900">
                                                Створити новий акаунт
                                            </Dialog.Title>
                                            <button
                                                type="button"
                                                onClick={closeRegisterWindow}
                                                className="text-gray-400 hover:text-gray-500 transition-colors"
                                            >
                                                <X size={20}/>
                                            </button>
                                        </div>

                                        <form onSubmit={handleSubmit} className="p-6 max-h-[70vh] overflow-y-auto">
                                            <div className="space-y-4">
                                                {/* First Name field */}
                                                <div>
                                                    <label htmlFor="firstName"
                                                           className="block text-sm font-medium text-gray-700 mb-1">
                                                        Ім&#39;я
                                                    </label>
                                                    <div className="relative">
                                                        <div
                                                            className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                            <User size={18} className="text-gray-400"/>
                                                        </div>
                                                        <input
                                                            id="firstName"
                                                            type="text"
                                                            name="firstName"
                                                            value={userData.firstName}
                                                            onChange={handleChange}
                                                            required
                                                            className="block w-full pl-10 py-2 pr-3 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm text-gray-900"
                                                            placeholder="Іван"
                                                        />
                                                    </div>
                                                </div>

                                                <div>
                                                    <label htmlFor="lastName"
                                                           className="block text-sm font-medium text-gray-700 mb-1">
                                                        Прізвище
                                                    </label>
                                                    <div className="relative">
                                                        <div
                                                            className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                            <User size={18} className="text-gray-400"/>
                                                        </div>
                                                        <input
                                                            id="lastName"
                                                            type="text"
                                                            name="lastName"
                                                            value={userData.lastName}
                                                            onChange={handleChange}
                                                            required
                                                            className="block w-full pl-10 py-2 pr-3 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm text-gray-900"
                                                            placeholder="Петренко"
                                                        />
                                                    </div>
                                                </div>

                                                <div>
                                                    <label htmlFor="phoneNumber"
                                                           className="block text-sm font-medium text-gray-700 mb-1">
                                                        Номер телефону
                                                    </label>
                                                    <div className="relative">
                                                        <div
                                                            className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                            <Phone size={18} className="text-gray-400"/>
                                                        </div>
                                                        <input
                                                            id="phoneNumber"
                                                            type="tel"
                                                            name="phoneNumber"
                                                            value={userData.phoneNumber}
                                                            onChange={handleChange}
                                                            required
                                                            className="block w-full pl-10 py-2 pr-3 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm text-gray-900"
                                                            placeholder="+380 XX XXX XX XX"
                                                        />
                                                    </div>
                                                </div>

                                                <div>
                                                    <label htmlFor="email"
                                                           className="block text-sm font-medium text-gray-700 mb-1">
                                                        Email
                                                    </label>
                                                    <div className="relative">
                                                        <div
                                                            className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                            <Mail size={18} className="text-gray-400"/>
                                                        </div>
                                                        <input
                                                            id="email"
                                                            type="email"
                                                            name="email"
                                                            value={userData.email}
                                                            onChange={handleChange}
                                                            required
                                                            className="block w-full pl-10 py-2 pr-3 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm text-gray-900"
                                                            placeholder="your.email@example.com"
                                                        />
                                                    </div>
                                                </div>

                                                <div>
                                                    <label htmlFor="password"
                                                           className="block text-sm font-medium text-gray-700 mb-1">
                                                        Пароль
                                                    </label>
                                                    <div className="relative">
                                                        <div
                                                            className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                            <Lock size={18} className="text-gray-400"/>
                                                        </div>
                                                        <input
                                                            id="password"
                                                            type={showPassword ? "text" : "password"}
                                                            name="password"
                                                            value={userData.password}
                                                            onChange={handleChange}
                                                            required
                                                            className="block w-full pl-10 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm text-gray-900"
                                                            placeholder="••••••••"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => setShowPassword(!showPassword)}
                                                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                                        >
                                                            {showPassword ? (
                                                                <EyeOff size={18}
                                                                        className="text-gray-400 hover:text-gray-500"/>
                                                            ) : (
                                                                <Eye size={18}
                                                                     className="text-gray-400 hover:text-gray-500"/>
                                                            )}
                                                        </button>
                                                    </div>
                                                </div>

                                                <div>
                                                    <label htmlFor="confirmPassword"
                                                           className="block text-sm font-medium text-gray-700 mb-1">
                                                        Підтвердження паролю
                                                    </label>
                                                    <div className="relative">
                                                        <div
                                                            className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                            <Lock size={18} className="text-gray-400"/>
                                                        </div>
                                                        <input
                                                            id="confirmPassword"
                                                            type={showConfirmPassword ? "text" : "password"}
                                                            name="confirmPassword"
                                                            value={userData.confirmPassword}
                                                            onChange={handleChange}
                                                            required
                                                            className={`block w-full pl-10 py-2 pr-10 border ${
                                                                passwordsMatch ? "border-gray-300" : "border-red-500"
                                                            } rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm text-gray-900`}
                                                            placeholder="••••••••"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                                        >
                                                            {showConfirmPassword ? (
                                                                <EyeOff size={18}
                                                                        className="text-gray-400 hover:text-gray-500"/>
                                                            ) : (
                                                                <Eye size={18}
                                                                     className="text-gray-400 hover:text-gray-500"/>
                                                            )}
                                                        </button>
                                                    </div>
                                                    {!passwordsMatch && userData.confirmPassword !== "" && (
                                                        <p className="mt-1 text-sm text-red-600">Паролі не
                                                            співпадають</p>
                                                    )}
                                                </div>

                                                <div className="flex items-start">
                                                    <div className="flex items-center h-5">
                                                        <input
                                                            id="terms"
                                                            type="checkbox"
                                                            checked={agreeToTerms}
                                                            onChange={() => setAgreeToTerms(!agreeToTerms)}
                                                            required
                                                            className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                                                        />
                                                    </div>
                                                    <div className="ml-3 text-sm">
                                                        <label htmlFor="terms" className="text-gray-700">
                                                            Я погоджуюсь з{" "}
                                                            <a href="#" className="text-blue-600 hover:text-blue-500">
                                                                умовами використання
                                                            </a>{" "}
                                                            та{" "}
                                                            <a href="#" className="text-blue-600 hover:text-blue-500">
                                                                політикою конфіденційності
                                                            </a>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-6">
                                                <button
                                                    type="submit"
                                                    disabled={!passwordsMatch}
                                                    className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                                                >
                                                    Зареєструватися
                                                </button>
                                            </div>
                                        </form>

                                        {/* Footer */}
                                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-center">
                                            <p className="text-sm text-gray-600">
                                                Вже маєте акаунт?{" "}
                                                <button onClick={handleChangeAuthType}
                                                        className="font-medium text-blue-600 hover:text-blue-500">
                                                    Увійти
                                                </button>
                                            </p>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            )
            }
        </div>

    );
};

export default RegisterComponent;