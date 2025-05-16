import {Router} from "express";
import OrdersController from "../controllers/OrdersController";
import {checkAuthOptional} from "../authMiddleware/checkAuthOptional";
import {authMiddleware} from "../authMiddleware/authMiddleware";

const router = Router();

router.post("/orders", checkAuthOptional ,OrdersController.createOrder);
router.get("/orders", authMiddleware ,OrdersController.getOrders);

export default router;