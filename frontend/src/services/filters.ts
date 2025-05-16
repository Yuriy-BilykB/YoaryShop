import {IFilter} from "@/interfaces/IFilter";
import api from "@/axios/api-services-interceptor";

export const getFilters = async (categoryId: number):Promise<IFilter[]> => {
    try {
        const response = await api.get(`/filters?categoryId=${categoryId}`)
        return response.data
    }catch (error) {
        console.log("Filters not found", error)
        return [];
    }
}