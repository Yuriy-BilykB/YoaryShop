"use client";
import { useModal } from "@/components/LayoutComponents/ModalContext/ModalContext";
import { logoutUser } from "@/services/auth";
import { useRouter } from "next/navigation";
import { UserIcon, Mail, Phone, LogOut } from "lucide-react";

const PersonalInfoComponent = () => {
    const { userInfo, logout } = useModal();
    const router = useRouter();

    const handleLogout = async () => {
        await logoutUser();
        localStorage.removeItem("accessToken");
        logout();
        router.push("/");
    };

    return (
        <div className="max-w-3xl mx-auto p-8 bg-white shadow-xl rounded-xl border border-gray-100">
            <div className="flex items-center justify-center mb-8">
                <div className="bg-blue-50 p-4 rounded-full">
                    <UserIcon size={32} className="text-blue-600" />
                </div>
            </div>

            <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">Особиста інформація</h2>

            <div className="space-y-6">
                {/* Info Items */}
                <div className="bg-gray-50 rounded-lg p-4 flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <span className="font-medium text-gray-700">Ім&#39;я</span>
                    </div>
                    <div className="text-gray-900 font-semibold">
                        {"payload" in userInfo ? userInfo.payload.firstName : "—"}
                    </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <span className="font-medium text-gray-700">Прізвище:</span>
                    </div>
                    <div className="text-gray-900 font-semibold">
                        {"payload" in userInfo ? userInfo.payload.lastName : "—"}
                    </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <Mail size={16} className="text-blue-600" />
                        <span className="font-medium text-gray-700">Електронна пошта:</span>
                    </div>
                    <div className="text-gray-900 font-semibold">
                        {"payload" in userInfo ? userInfo.payload.email : "—"}
                    </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <Phone size={16} className="text-blue-600" />
                        <span className="font-medium text-gray-700">Номер телефону:</span>
                    </div>
                    <div className="text-gray-900 font-semibold">
                        {"payload" in userInfo ? userInfo.payload.phone_number : "—"}
                    </div>
                </div>

                <div className="mt-10 pt-6 border-t border-gray-200">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center space-x-2 bg-red-50 hover:bg-red-100 text-red-600 font-medium py-3 px-4 rounded-lg transition-colors duration-200"
                    >
                        <LogOut size={18} />
                        <span>Вихід</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PersonalInfoComponent;