"use client";
import axios from "axios";
import { refreshAuth } from "@/services/auth";
import { getSessionUpdater } from "@/services/sessionService";
const backendUrl = "/api";

console.log(backendUrl, "GOOOOOOOOOOOOOOOO")
const apiClient = axios.create({
    baseURL: backendUrl,
    withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

let didTryRefresh = false;

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const { response, config } = error;

        const isLogoutRoute = config?.url?.includes("/logout");

        if (
            response?.status === 401 &&
            !config._retry &&
            !isLogoutRoute &&
            !didTryRefresh
        ) {
            config._retry = true;
            didTryRefresh = true;

            try {
                const refreshResponse = await refreshAuth();
                const { login, addUserInfo } = getSessionUpdater();
                addUserInfo(refreshResponse);
                login();

                config.headers.Authorization = `Bearer ${refreshResponse.accessToken}`;
                return apiClient(config);
            } catch (err) {
                const { logout } = getSessionUpdater();
                logout();
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient;
