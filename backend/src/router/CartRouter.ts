import {Router} from "express";
import CartController from "../controllers/CartController";
import {checkAuthOptional} from "../authMiddleware/checkAuthOptional";
const router = Router();

router.post('/cart',checkAuthOptional, CartController.addProductToCart);
router.get('/cart', checkAuthOptional, CartController.getCartsProducts);
router.get('/init-session', CartController.initSession);
router.delete('/cart/:product_id', CartController.deleteProductFromCart);
router.patch('/cart/:product_id', CartController.updateCartItem);
router.delete('/cart/:user_id', CartController.clearUsersCart);
export default router;