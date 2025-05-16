import {CartItemModel} from "../models/Cart";

class CartRepo {
    async mergeCartAfterLogin(user_id: number, session_id: string) {
        if (!user_id || !session_id) return;

        const sessionCartItems = await CartItemModel.findAll({ where: { session_id } });

        for (const sessionItem of sessionCartItems) {
            const existingItem = await CartItemModel.findOne({
                where: { user_id, product_id: sessionItem.product_id }
            });

            if (existingItem) {
                existingItem.quantity += sessionItem.quantity;
                await existingItem.save();
                await sessionItem.destroy();
            } else {
                sessionItem.user_id = user_id;
                sessionItem.session_id = null;
                await sessionItem.save();
            }
        }
    }

}

export default new CartRepo();