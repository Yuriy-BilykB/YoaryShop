import {Request, Response, NextFunction} from "express";
import {ErrorHandler} from "../ErrorHandler/ErrorHandler";
import {v1 as uuidv4} from "uuid";
import {CartItemModel} from "../models/Cart";
import {ProductModel} from "../models/Product";
import {ImageModel} from "../models/Image";
import {IUser} from "../interfaces/IUser";

interface IUserRequest extends Request {
    user?: IUser;
}
class CartController {

    initSession(req: Request, res: Response) {
        let {session_id} = req.cookies;

        if (!session_id) {
            session_id = uuidv4();
            res.cookie('session_id', session_id, {
                httpOnly: true,
                sameSite: 'lax',
                secure: process.env.NODE_ENV === 'production',
                maxAge: 1000 * 60 * 60 * 24 * 7,
            });
        }
        res.status(200).json({session_id});
    }

    async addProductToCart(req: IUserRequest, res: Response, next: NextFunction): Promise<any> {
        try {
            let {session_id} = req.cookies;
            const {productId} = req.body;
            const user_id = req.user?.id
            if (!productId) {
                res.status(400).json({message: "Product ID is required"});
                return
            }

            if (!session_id) {
                session_id = uuidv4();
                res.cookie('session_id', session_id, {
                    httpOnly: true,
                    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 тиждень
                });
            }

            const isLoggedIn = !!user_id;


            const whereClause = isLoggedIn
                ? {user_id, product_id: productId}
                : {session_id, product_id: productId};

            const existingItem = await CartItemModel.findOne({where: whereClause});

            let item;

            if (existingItem) {
                existingItem.quantity += 1;
                await existingItem.save();
                item = existingItem;
            } else {
                item = await CartItemModel.create({
                    user_id: isLoggedIn ? user_id : null,
                    session_id: isLoggedIn ? null : session_id,
                    product_id: productId,
                    quantity: 1,
                });
            }
            res.status(200).json({message: "Product added to cart", item});
            return

        } catch (error) {
            console.log(error)
        }
    }

    async getCartsProducts(req: IUserRequest, res: Response, next: NextFunction) {
        try {
            const {session_id} = req.cookies;
            const user_id = req.user?.id
            if (!user_id && !session_id) {
                res.status(400).json({message: "User not logged in and no session ID provided"});
                return
            }
            const whereClause = user_id
                ? {user_id}
                : {session_id};

            const products = await CartItemModel.findAll({
                where: whereClause,
                include: [
                    {
                        model: ProductModel,
                        as: "product",
                        include: [
                            {
                                model: ImageModel,
                                as: "images",
                                attributes: ["imageUrl"]
                            }
                        ]
                    }
                ]
            });

            if (!products) {
                throw ErrorHandler.BadRequest("Session ID is missing or invalid");
            }

            res.status(200).json(products);
        } catch (error) {
            next(error);
        }
    }

    async deleteProductFromCart(req: Request, res: Response, next: NextFunction) {
        try {
            const {product_id} = req.params;

            const existingItem = await CartItemModel.findOne({
                where: {product_id},
            });

            if (!existingItem) {
                res.status(404).json({message: "Товар не знайдено у кошику"});
                return
            }

            await existingItem.destroy();

            res.status(200).json({message: "Товар видалено з кошика"});
            return

        } catch (error) {
            console.error("Помилка видалення:", error);
            res.status(500).json({message: "Внутрішня помилка сервера"});
            return
        }
    }

    async clearUsersCart(req: Request, res: Response) {
        try {
            const {user_id} = req.params;

            if (user_id && user_id !== 'guest') {
                const existingItems = await CartItemModel.findAll({where: {user_id}});

                if (!existingItems.length) {
                    res.status(404).json({message: "Товар не знайдено у кошику користувача"});
                    return
                }

                await Promise.all(existingItems.map(item => item.destroy()));
                res.status(200).json({message: "Кошик користувача очищено"});
                return

            } else {
                const {session_id} = req.cookies;

                if (!session_id) {
                    res.status(400).json({message: "Сесія не знайдена"});
                    return
                }

                const existingItems = await CartItemModel.findAll({where: {session_id}});

                if (!existingItems.length) {
                    res.status(404).json({message: "Кошик гостя порожній"});
                    return
                }

                await Promise.all(existingItems.map(item => item.destroy()));
                res.status(200).json({message: "Кошик гостя очищено"});
                return
            }

        } catch (error) {
            console.error("Помилка при очищенні кошика:", error);
            res.status(500).json({message: "Внутрішня помилка сервера"});
            return
        }
    }


    async updateCartItem(req: Request, res: Response) {
        const {product_id} = req.params;
        const {quantity} = req.body;

        const cartItem = await CartItemModel.findOne({where: {product_id}});

        if (!cartItem) {
            res.status(404).json({message: "Товар не знайдено"});
            return
        }

        cartItem.quantity = quantity;
        await cartItem.save();
        res.status(200).json({message: "Кількість оновлено", cartItem});
        return
    }


}

export default new CartController();