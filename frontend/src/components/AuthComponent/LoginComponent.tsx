"use client";
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { useModal } from "@/components/LayoutComponents/ModalContext/ModalContext";
import { X, Mail, Lock, Eye, EyeOff } from "lucide-react";
import {loginUser} from "@/services/auth";
import VerificationCodeForm from "@/components/AuthComponent/VerificationCodeForm";
import {useRouter} from "next/navigation";
import {toast} from "react-toastify";

const LoginComponent = () => {
    const { isOpenLoginWindow, closeLoginWindow, openRegisterWindow, login, addUserInfo} = useModal();
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [isCodeSent, setIsCodeSent] = useState<boolean>(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const result = await loginUser({ identifier, password });
            if (result?.accessToken && result?.payload) {
                localStorage.setItem("accessToken", result.accessToken);
                addUserInfo(result);
                login();
                router.push("/");
                closeLoginWindow();
            }
            else {
                setIsCodeSent(true);
            }
        } catch (error: any) {
            console.error(error.message);
            toast.error(error.message || "Помилка сервера");
        }
    };
    const handleChangeAuthType = () => {
        closeLoginWindow();
        openRegisterWindow();
    }
    return (
        <div>
            {
                isCodeSent ? <VerificationCodeForm identifier={identifier} isLogin={true} password={password}/> :
                    ( <Transition appear show={isOpenLoginWindow} as={Fragment}>
                    <Dialog as="div" className="relative z-50" onClose={closeLoginWindow}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-blue-900/20 backdrop-blur-sm" />
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
                                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl transition-all">
                                        {/* Header */}
                                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                                            <Dialog.Title as="h3" className="text-xl font-bold text-gray-900">
                                                Увійти в особистий кабінет
                                            </Dialog.Title>
                                            <button
                                                type="button"
                                                onClick={closeLoginWindow}
                                                className="text-gray-400 hover:text-gray-500 transition-colors"
                                            >
                                                <X size={20} />
                                            </button>
                                        </div>

                                        <form onSubmit={handleSubmit} className="p-6">
                                            <div className="space-y-4">
                                                {/* Email field */}
                                                <div>
                                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                                        Email
                                                    </label>
                                                    <div className="relative">
                                                        <div
                                                            className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                            <Mail size={18} className="text-gray-400"/>
                                                        </div>
                                                        <input
                                                            id="identifier"
                                                            type="text"
                                                            value={identifier}
                                                            onChange={(e) => setIdentifier(e.target.value)}
                                                            required
                                                            className="block w-full pl-10 py-2 pr-3 border ..."
                                                            placeholder="Email або номер телефону"
                                                        />
                                                    </div>
                                                </div>

                                                <div>
                                                    <div className="flex items-center justify-between mb-1">
                                                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                                            Пароль
                                                        </label>
                                                        <a href="#" className="text-sm text-blue-600 hover:text-blue-500">
                                                            Забули пароль?
                                                        </a>
                                                    </div>
                                                    <div className="relative">
                                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                            <Lock size={18} className="text-gray-400" />
                                                        </div>
                                                        <input
                                                            id="password"
                                                            type={showPassword ? "text" : "password"}
                                                            value={password}
                                                            onChange={(e) => setPassword(e.target.value)}
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
                                                                <EyeOff size={18} className="text-gray-400 hover:text-gray-500" />
                                                            ) : (
                                                                <Eye size={18} className="text-gray-400 hover:text-gray-500" />
                                                            )}
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Remember me checkbox */}
                                                <div className="flex items-center">
                                                    <input
                                                        id="remember_me"
                                                        type="checkbox"
                                                        checked={rememberMe}
                                                        onChange={() => setRememberMe(!rememberMe)}
                                                        className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                                                    />
                                                    <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-700">
                                                        Запам&#39;ятати мене
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="mt-6">
                                                <button
                                                    type="submit"
                                                    className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors"
                                                >
                                                    Увійти
                                                </button>
                                            </div>
                                        </form>

                                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-center">
                                            <p className="text-sm text-gray-600">
                                                Ще не маєте акаунту?{" "}
                                                <button onClick={handleChangeAuthType} className="font-medium text-blue-600 hover:text-blue-500">
                                                    Зареєструватися
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

export default LoginComponent;