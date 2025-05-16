import {Router} from "express";
import FilterController from "../controllers/FilterController";
const router = Router();

router.get("/filters", FilterController.getFiltersByCategory);

export default router;