import Image from "next/image";
import categoryImg from "../../../../public/category.svg";

import {useModal} from "@/components/LayoutComponents/ModalContext/ModalContext";
import {
    X,
} from "lucide-react";
import CategoryFooter from "@/components/MainPageComponents/Sidebar/CategoryFooter";

const SidePanel = () => {
    const { closeSidePanel, openModalNavbar } = useModal();
    return (
        <div className="fixed inset-0 z-50 flex">
            <div
                className="fixed inset-0 bg-black/70 backdrop-blur-sm"
                onClick={closeSidePanel}
            />
            <div className="relative w-80 bg-white text-white shadow-lg overflow-y-auto">
                <div className="flex items-center bg-black justify-between p-6 border-b border-gray-800">
                    <h1 className="text-2xl font-bold">Yourika</h1>
                    <button
                        onClick={closeSidePanel}
                        className="text-gray-400 hover:text-white transition-colors"
                        aria-label="Close panel"
                    >
                        <X size={20}/>
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    <div>
                        <button
                            className="flex items-center bg-black space-x-3 w-full text-left p-3 hover:bg-gray-800 rounded-md transition-colors" onClick={() => {
                            openModalNavbar();
                            closeSidePanel();
                        }}>
                            <Image src={categoryImg} alt="Категорії" width={24} height={24} className="invert"/>
                            <h2 className="text-lg">Каталог товарів</h2>
                        </button>
                    </div>
                    <CategoryFooter/>
                </div>
            </div>
        </div>
    );
};

export default SidePanel;