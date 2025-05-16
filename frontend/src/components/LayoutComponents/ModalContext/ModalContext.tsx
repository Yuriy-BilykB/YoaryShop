"use client";
import {createContext, ReactNode, useCallback, useContext, useState} from "react";
import {ICartWithProduct} from "@/interfaces/IProduct";
import {IUserInfo} from "@/interfaces/IUser"
import {getProductsCart} from "@/services/cart";
type ModalContextType = {
    isOpenModalNavbar: boolean;
    openModalNavbar: () => void;
    closeModalNavbar: () => void;
    isOpenSidePanel: boolean;
    openSidePanel: () => void;
    closeSidePanel: () => void;
    isOpenLoginWindow: boolean;
    openLoginWindow: () => void;
    closeLoginWindow: () => void;
    isOpenRegisterWindow: boolean;
    openRegisterWindow: () => void;
    closeRegisterWindow: () => void;
    isOpenCart: boolean;
    openCart: () => void;
    closeCart: () => void;
    clearCart: () => void;
    setProductsCart: (products: ICartWithProduct[]) => void;
    productsCart: ICartWithProduct[];
    reloadCart: () => Promise<void>;
    isLogin: boolean;
    login: () => void;
    logout: () => void;
    isOpenAccount: boolean;
    openAccount: () => void;
    closeAccount: () => void;
    userInfo: IUserInfo | object;
    addUserInfo: (info: IUserInfo) => void;};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({children}: {children: ReactNode}) => {
    const [isOpenModalNavbar, setIsOpenModalNavbar] = useState(false);
    const [isOpenSidePanel, setIsOpenSidePanel] = useState(false);
    const [isOpenLoginWindow, setIsOpenLoginWindow] = useState(false);
    const [isOpenRegisterWindow, setIsOpenRegisterWindow] = useState(false);
    const [isOpenCart, setIsOpenCart] = useState(false);
    const [productsCart, setProductsCart] = useState<ICartWithProduct[]>([]);
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const [isOpenAccount, setIsOpenAccount] = useState<boolean>(false);
    const [userInfo, setUserInfo] = useState<IUserInfo | object>({});

    const addUserInfo = useCallback((info: IUserInfo) => setUserInfo(info), []);
    const login = useCallback(() => setIsLogin(true), []);
    const logout = useCallback(() => setIsLogin(false), []);

    const openModalNavbar = useCallback(() => setIsOpenModalNavbar(true), []);
    const closeModalNavbar = useCallback(() => setIsOpenModalNavbar(false), []);

    const openSidePanel = useCallback(() => setIsOpenSidePanel(true), []);
    const closeSidePanel = useCallback(() => setIsOpenSidePanel(false), []);

    const openLoginWindow = useCallback(() => setIsOpenLoginWindow(true), []);
    const closeLoginWindow = useCallback(() => setIsOpenLoginWindow(false), []);

    const openRegisterWindow = useCallback(() => setIsOpenRegisterWindow(true), []);
    const closeRegisterWindow = useCallback(() => setIsOpenRegisterWindow(false), []);

    const openCart = useCallback(() => setIsOpenCart(true), []);
    const closeCart = useCallback(() => setIsOpenCart(false), []);
    const clearCart = useCallback(() => setProductsCart([]), []);

    const reloadCart = useCallback(async () => {
        try {
            const response = await getProductsCart();
            setProductsCart(response);
        } catch (error) {
            console.error("Не вдалося оновити кошик:", error);
        }
    }, []);

    const openAccount = useCallback(() => setIsOpenAccount(true), []);
    const closeAccount = useCallback(() => setIsOpenAccount(false), []);
    return (
        <ModalContext.Provider value={{
            isOpenModalNavbar,
            openModalNavbar,
            closeModalNavbar,
            isOpenSidePanel,
            openSidePanel,
            closeSidePanel,
            isOpenLoginWindow,
            closeLoginWindow,
            openLoginWindow,
            isOpenRegisterWindow,
            closeRegisterWindow,
            openRegisterWindow,
            isOpenCart,
            openCart,
            closeCart,
            productsCart,
            setProductsCart,
            reloadCart,
            isLogin,
            login,
            logout,
            isOpenAccount,
            openAccount,
            closeAccount,
            userInfo,
            addUserInfo,
            clearCart
        }}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error("useModal must be used within a ModalProvider");
    }
    return context;
};

