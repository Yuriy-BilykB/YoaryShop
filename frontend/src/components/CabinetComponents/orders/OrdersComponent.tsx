"use client";
import {useEffect, useState} from "react";
import {getOrders} from "@/services/orders";
import {IOrder} from "@/interfaces/IOrderInfo";
import OrderComponent from "@/components/CabinetComponents/orders/OrderComponent";

const OrdersComponent = () => {
    const [orders, setOrders] = useState<IOrder[]>([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const orders = await getOrders();
                setOrders(orders);
            } catch (error) {
                console.log(error);
            }
        };
        fetchOrders();
    }, []);

    if (orders.length === 0) {
        return <h2>У вас немає замовлень</h2>;
    }

    return (
        <div className="space-y-4">
            {orders.map((order) => (
                <OrderComponent key={order.id} order={order} />
            ))}
        </div>
    );
};

export default OrdersComponent;
