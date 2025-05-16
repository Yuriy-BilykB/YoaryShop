import {IOrder, IOrderInfo} from "@/interfaces/IOrderInfo";
import api from "@/axios/api-services-interceptor";

export const getOrders = async (): Promise<IOrder[]> => {
  try {
      const response = await api.get("/orders");
      console.log(response)
      return response.data;
  }catch (error) {
      console.log(error)
      return [];
  }
}

export const createOrder = async (orderPayload: IOrderInfo) => {
    try {
        console.log(orderPayload, "ORDER PAYLOAD")
        const response = await api.post("/orders", {orderPayload});
        return response.data
    }catch (error) {
        console.log(error)
        return 0;
    }
};

