import {ICartWithProduct} from "@/interfaces/IProduct";
import {ICategories} from "@/interfaces/ICategories";
import api from "@/axios/api-services-interceptor";

export const getProductsCart = async (): Promise<ICartWithProduct[]> => {
  try {
    const response = await api.get("/cart");
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getCategories = async (): Promise<ICategories[] | []> => {
  try {
    const response = await api.get("/categories");
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const deleteProductFromCart = async (product_id: number) => {
  try {
     return  await api.delete(`/cart/${product_id}`);
  }catch (error) {
    console.error("Помилка при видаленні продукту з кошика", error);
  }
};

// export const clearUsersCart = async (user_id: number | null): Promise<any> => {
//   try {
//     const id = user_id !== null ? user_id : 'guest';
//     return await api.delete(`/cart/${id}`);
//   } catch (error) {
//     console.error("Помилка при очищенні кошика:", error);
//   }
// };

export const updateProductQuantity = async (product_id: number, quantity: number) => {
  try {
     return await api.patch(`/cart/${product_id}`, { quantity });
  }catch (error) {
    console.error("Помилка при видаленні продукту з кошика", error);
  }
};

export const addProductToCart = async (productId: number):Promise<ICartWithProduct> => {
  try {
    console.log(productId)
    const response = await api.post("/cart", {productId});
    return response.data.item;
  }catch (error) {
    console.log(error)
    throw new Error("Product wasn`t added")
  }

};