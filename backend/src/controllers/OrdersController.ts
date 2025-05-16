import { NextFunction, Request, Response } from "express";
import { OrderModel } from "../models/Order";
import { OrderItemModel } from "../models/OrderItem";
import {IUser} from "../interfaces/IUser";
interface IUserRequest extends Request {
    user?: IUser;
}
class OrdersController {
    async createOrder(req: IUserRequest, res: Response, next: NextFunction) {
        try {
            const orderPayload = req.body.orderPayload;
            const { session_id } = req.cookies;
            const {
                firstName,
                lastName,
                phone,
                region,
                city,
                warehouse,
                payment,
                comment,
                userId,
                cartItems,
                totalSum
            } = orderPayload;


            if (userId === null && !session_id) {
                res.status(400).json({ message: "Користувач не залогінений і sessionId відсутній." });
                return;
            }

            if (!firstName || !lastName || !phone || !region || !city || !warehouse || !payment) {
                res.status(400).json({ message: "Будь ласка, заповніть усі поля доставки." });
                return;
            }

            if (!Array.isArray(cartItems) || cartItems.length === 0) {
                res.status(400).json({ message: "Кошик не може бути порожнім." });
                return;
            }

            const finalUserId = req.user?.id ? req.user.id : null;
            const finalSessionId = userId === null ? session_id : null;
            const finalRegister = userId === null ? false : true;

            const order = await OrderModel.create({
                userId: finalUserId,
                sessionId: finalSessionId,
                firstName,
                lastName,
                phone,
                region,
                city,
                warehouse,
                payment,
                comment,
                register: finalRegister,
                totalSum,
                isDone: false
            });

            for (const item of cartItems) {
                if (!item.productId || item.quantity < 1) continue;

                await OrderItemModel.create({
                    order_id: order.id,
                    product_id: item.productId,
                    quantity: item.quantity
                });
            }

            res.status(201).json({ message: "Замовлення успішно створено", orderId: order.id });
            return;

        } catch (error) {
            next(error);
        }
    }

    async getOrders (req: IUserRequest, res: Response, next: NextFunction) {
        try {
            const userId = req.user?.id;
            if (!userId){
                res.status(400).json("User id not found");
                return;
            }
            const orders = await OrderModel.findAll({
                where: { userId }
            });
            if (!orders){
                res.status(404).json("This user has not orders yet");
                return;
            }
            res.status(200).json(orders);
            return
        }catch (error) {
            next(error)
        }
    }
}

export default new OrdersController();
