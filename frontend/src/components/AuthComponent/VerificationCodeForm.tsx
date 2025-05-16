import React, {useState, useEffect} from "react";
import {verifyNumber, registerUser, loginUser} from "@/services/auth";
import {toast} from "react-toastify";
import {Dialog, Transition} from "@headlessui/react";
import {Fragment} from "react";
import {X, AlertCircle} from "lucide-react";
import {useModal} from "@/components/LayoutComponents/ModalContext/ModalContext";
import {useRouter} from "next/navigation";
import {IUser} from "@/interfaces/IUser";

interface VerificationCodeFormProps {
    userData?: IUser;
    identifier?: string;
    password?: string;
    isLogin?: boolean;
}

const VerificationCodeForm: React.FC<VerificationCodeFormProps> = ({
                                                                       identifier,
                                                                       password,
                                                                       userData,
                                                                       isLogin = false
                                                                   }) => {
    const router = useRouter();
    const {closeRegisterWindow, closeLoginWindow, login, addUserInfo} = useModal();
    const [verificationCode, setVerificationCode] = useState<string>("");
    const [timeLeft, setTimeLeft] = useState<number>(60);
    const [isResendDisabled, setIsResendDisabled] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        if (timeLeft <= 0) {
            setIsResendDisabled(false);
            return;
        }

        const timer = setTimeout(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [timeLeft]);

    const handleDigitChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value;
        if (value === '') {
            // Видалили символ
            const newCode = verificationCode.split('');
            newCode[index] = '';
            setVerificationCode(newCode.join(''));
            return;
        }
        if (/^\d+$/.test(value)) {
            const newCode = verificationCode.split('');
            newCode[index] = value.slice(-1);
            setVerificationCode(newCode.join(''));

            const nextInput = document.getElementById(`digit-${index + 1}`);
            if (nextInput && value) {
                (nextInput as HTMLInputElement).focus();
            }
        }
    };


    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && !verificationCode[index]) {
            // Focus previous input on backspace if current input is empty
            const prevInput = document.getElementById(`digit-${index - 1}`);
            if (prevInput) {
                e.preventDefault();
                (prevInput as HTMLInputElement).focus();
            }
        } else if (e.key === 'ArrowLeft') {
            const prevInput = document.getElementById(`digit-${index - 1}`);
            if (prevInput) {
                e.preventDefault();
                (prevInput as HTMLInputElement).focus();
            }
        } else if (e.key === 'ArrowRight') {
            const nextInput = document.getElementById(`digit-${index + 1}`);
            if (nextInput) {
                e.preventDefault();
                (nextInput as HTMLInputElement).focus();
            }
        }
    };
    const phoneNumber = identifier;

    const handleVerifyCode = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        try {
            if (isLogin) {
                if (!phoneNumber) {
                    return;
                }
                console.log(identifier, "GOOOOOOOOOOOOOOSE")
                const result = await verifyNumber(phoneNumber, verificationCode);
                addUserInfo(result)
                console.log(result, "RESULT")
                login();
                toast.success("Номер успішно підтверджено!");
                setVerificationCode("");
                router.push("/");
                closeLoginWindow();

            } else {
                if (!userData) {
                    return;
                }
                const result = await verifyNumber(userData.phoneNumber, verificationCode);
                localStorage.setItem("accessToken", result.accessToken);
                addUserInfo(result)
                console.log(result, "RESULT")
                login();
                toast.success("Номер успішно підтверджено!");
                setVerificationCode("");
                router.push("/");
                closeRegisterWindow();
            }

        } catch (error) {
            console.error(error);
            setError("Невірний код підтвердження. Будь ласка, спробуйте ще раз.");
            toast.error("Помилка підтвердження коду");
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendCode = async () => {
        setIsLoading(true);
        try {
            if (isLogin) {
                if (!password || !identifier) {
                    return;
                }
                await loginUser({identifier, password,});
                setVerificationCode("");
            } else {
                if (!userData) {
                    return
                }
                await registerUser(userData);
                setVerificationCode("");
            }
            toast.success("Новий код підтвердження надіслано!");
            setTimeLeft(60);
            setIsResendDisabled(true);
        } catch (error) {
            console.error(error);
            toast.error("Помилка при надсиланні нового коду");
        } finally {
            setIsLoading(false);
        }
    };
    const handleClickCloseWindows = () => {
        closeLoginWindow();
        closeRegisterWindow();
    }
    return (
        <Transition appear show={true} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={handleClickCloseWindows}>
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
                                        Підтвердження номеру телефону
                                    </Dialog.Title>
                                    <button
                                        type="button"
                                        onClick={handleClickCloseWindows}
                                        className="text-gray-400 hover:text-gray-500 transition-colors"
                                    >
                                        <X size={20}/>
                                    </button>
                                </div>

                                <div className="p-6">
                                    <div className="mb-6 text-center">
                                        <p className="text-gray-700 mb-2">
                                            Ми надіслали код підтвердження на номер
                                        </p>
                                        <p className="font-medium text-gray-900">
                                            {isLogin ? identifier : userData ? userData.phoneNumber : "Невідомий номер"}
                                        </p>
                                    </div>

                                    {error && (
                                        <div
                                            className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-start">
                                            <AlertCircle size={20} className="text-red-500 mr-2 mt-0.5 flex-shrink-0"/>
                                            <p className="text-sm text-red-700">{error}</p>
                                        </div>
                                    )}

                                    <form onSubmit={handleVerifyCode} className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
                                                Введіть 6-значний код підтвердження
                                            </label>
                                            <div className="flex justify-center gap-2">
                                                {[0, 1, 2, 3, 4, 5].map((index) => (
                                                    <input
                                                        key={index}
                                                        id={`digit-${index}`}
                                                        type="text"
                                                        maxLength={1}
                                                        value={verificationCode[index] || ''}
                                                        onChange={(e) => handleDigitChange(e, index)}
                                                        onKeyDown={(e) => handleKeyDown(e, index)}
                                                        className="w-12 h-12 text-center text-xl font-medium border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
                                                        required
                                                    />
                                                ))}
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={verificationCode.length !== 6 || isLoading}
                                            className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                                        >
                                            {isLoading ? "Завантаження..." : "Підтвердити"}
                                        </button>
                                    </form>

                                    <div className="mt-6 text-center">
                                        <p className="text-sm text-gray-600 mb-2">
                                            Не отримали код?
                                        </p>
                                        <button
                                            type="button"
                                            onClick={handleResendCode}
                                            disabled={isResendDisabled || isLoading}
                                            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500 disabled:text-gray-400 disabled:cursor-not-allowed"
                                        >
                                            {isResendDisabled
                                                ? `Надіслати повторно через ${timeLeft} сек`
                                                : "Надіслати повторно"}
                                        </button>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default VerificationCodeForm;