import {Router} from "express";
import ProductController from "../controllers/ProductController";
const router = Router();

router.get('/categories', ProductController.getCategories);
router.get('/recommendations', ProductController.getRecommendationsProducts);
router.get('/PopularOptions', ProductController.getPopularOptions);
router.get('/products', ProductController.getAProducts);
router.get('/search', ProductController.searchProducts);
router.get('/product/:id', ProductController.getAProduct);
export default router;