export interface ICartItem {
    productId: number | undefined;
    quantity: number;
    sessionId: string | undefined;
}

export interface IOrderInfo {
    lastName: string;
    firstName: string;
    phone: string;
    region: string;
    city: string;
    warehouse: string;
    payment: string;
    comment: string;
    register: boolean;
    userId: number | null;
    totalSum: number
    cartItems: ICartItem[];
}


export interface IOrder {
    id: number;
    firstName: string;
    lastName: string;
    phone: string;
    region: string;
    city: string;
    warehouse: string;
    payment: string;
    comment: string;
    register: boolean;
    userId: number | null;
    isDone: boolean;
    totalSum: number;
    sessionId: string | null;
}