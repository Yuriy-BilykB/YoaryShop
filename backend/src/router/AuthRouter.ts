import {Router} from "express";
import AuthController from "../controllers/AuthController";
import {authMiddleware} from "../authMiddleware/authMiddleware";
const router = Router();

router.post('/register', AuthController.registerUser);
router.post('/login', AuthController.loginUser);
router.post("/refresh", AuthController.authMe);
router.post("/logout", authMiddleware ,AuthController.logout)
router.post("/verify-code", AuthController.verifyCode)

export default router;