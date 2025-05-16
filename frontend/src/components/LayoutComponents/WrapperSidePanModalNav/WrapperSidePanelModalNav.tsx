"use client"
import SidePannel from "@/components/LayoutComponents/SidePannel/SidePannel";
import ModalNavbar from "@/components/LayoutComponents/ModalNavbar/ModalNavbar";
import {useModal} from "@/components/LayoutComponents/ModalContext/ModalContext";
import CartComponent from "@/components/LayoutComponents/CartComponent/CartComponent";
import LoginComponent from "@/components/AuthComponent/LoginComponent";
import RegisterComponent from "@/components/AuthComponent/RegisterComponent";

const WrapperSidePanelModalNav = () => {
    const { isOpenModalNavbar, isOpenSidePanel, isOpenLoginWindow, isOpenCart, isOpenRegisterWindow } = useModal();

    return (
        <div>
            {
                isOpenModalNavbar && <ModalNavbar/>
            }
            {
                isOpenSidePanel && <SidePannel/>
            }
            {
                isOpenLoginWindow && <LoginComponent/>
            }
            {
                isOpenRegisterWindow && <RegisterComponent/>
            }
            {
                isOpenCart && <CartComponent/>
            }


        </div>
    );
};

export default WrapperSidePanelModalNav;