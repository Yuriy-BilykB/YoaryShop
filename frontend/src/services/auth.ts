import {IUser, IUserInfo} from "@/interfaces/IUser";
import api from "@/axios/api-services-interceptor";
import {AxiosError} from "axios";

export const registerUser = async (userData: IUser): Promise<IUserInfo> => {
    try {
        const response = await api.post("/auth/register", userData);
        return response.data;
    } catch (error: unknown) {
        const axiosError = error as AxiosError<string>;
        throw new Error(axiosError.response?.data || "User wasn’t registered");
    }
};
export const verifyNumber = async (phoneNumber: string, verificationCode: string) => {
    try {
        const response = await api.post("/auth/verify-code", {phoneNumber, verificationCode});
        return response.data;
    } catch (error) {
        console.log(error)
        throw new Error("Number not confirmed")
    }
};
export const loginUser = async ({identifier, password,}: { identifier: string; password: string; }): Promise<IUserInfo> => {
    try {
        const response = await api.post("/auth/login", {identifier, password});
        return response.data;
    } catch (error) {
        console.log(error)
        throw new Error("User wasn’t registered");
    }
};

export const logoutUser = async () => {
    try {
        await api.post("/auth/logout");
    } catch (error) {
        console.log(error)
        throw new Error("Logout not successful");
    }
};

export const refreshAuth = async (): Promise<IUserInfo> => {
    try {
        const response = await api.post("/auth/refresh");
        return response.data;
    } catch (error) {
        console.log(error)
        throw new Error("Time you session is gone, you need to login again");
    }
};