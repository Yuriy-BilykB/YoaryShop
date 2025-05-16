import {IProduct} from "@/interfaces/IProduct";
import api from "@/axios/api-services-interceptor";

export const getProducts = async (category_id: number, offset: number, limit: number, filters?: { [key: number]: string[] }):Promise<IProduct[]> => {
    const params = new URLSearchParams();
    params.append("offset", offset.toString());
    params.append("category_id", category_id.toString());
    params.append("limit", limit.toString());
    if (filters && Object.keys(filters).length > 0) {
        Object.entries(filters).forEach(([filterId, values]) => {
            values.forEach((value) => {
                params.append(`filters[${filterId}][]`, value);
            });
        });
    }

    const response = await api.get(`/products`, { params });
    return response.data.products;
};

export const getProductById = async (id: string): Promise<IProduct> => {
    try {
        const response = await api.get(`/product/${id}`);
        return response.data;
    } catch (error) {
        console.error("Помилка при завантаженні продукту:", error);
        throw new Error("Не вдалося завантажити продукт");
    }
};

export const getRecommendationsProducts= async ():Promise<IProduct[]> => {
    const response = await api.get("/recommendations");
    return response.data
};

export const getBestOptions = async (limit: number, offset: number) => {
  try {
      const response = await api.get(`/PopularOptions?limit=${limit}&offset=${offset}`);
      return response.data;
  }catch (error) {
      console.log(error)
  }
};

export const searchProducts = async (searchParam: string, offSet: number, limit: number):Promise<IProduct[]> => {
    try {
        const params = new URLSearchParams();
        params.append("searchParam", searchParam.toString())
        params.append("offSet", offSet.toString())
        params.append("limit", limit.toString())
        const response = await api.get("/search", {params});
        return response.data;
    }catch (error) {
        console.log(error);
        return [];
    }
}