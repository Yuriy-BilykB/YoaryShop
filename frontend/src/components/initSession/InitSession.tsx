"use client";
import {useEffect} from "react";
import {useModal} from "@/components/LayoutComponents/ModalContext/ModalContext";
import {refreshAuth} from "@/services/auth";
import {setSessionUpdater} from "@/services/sessionService";
import api from "@/axios/api-services-interceptor";

const InitSession = () => {
    const {login, logout, reloadCart, addUserInfo} = useModal();
    useEffect(() => {
        const refreshUser = async () => {
            try {
                const data = await refreshAuth();
                localStorage.setItem("accessToken", data.accessToken);
                addUserInfo(data);
                login();
            }catch (error) {
                console.error("Помилка оновлення токена:", error);
                logout();
            }
        }
        refreshUser();
    }, [addUserInfo, login, logout]);

    useEffect(() => {
        api.get("/init-session");
        reloadCart();
    }, [reloadCart]);
    useEffect(() => {
        setSessionUpdater({ login, logout, addUserInfo });
    }, [addUserInfo, login, logout]);
    return (
        <div>

        </div>
    );
};

export default InitSession;