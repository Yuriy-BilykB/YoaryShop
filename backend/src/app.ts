import {UserModel} from "./models/User";
import {ProductModel} from "./models/Product";
import {OrderModel} from "./models/Order";
import {OrderItemModel} from "./models/OrderItem";
import {CategoryModel} from "./models/Category";
import {CartItemModel} from "./models/Cart";
import {ImageModel} from "./models/Image";
import {FilterModel} from "./models/Filter";
import {CategoryFilterModel} from "./models/CategoryFilter";
import {ProductFilterModel} from "./models/ProductFilter";
import {config} from "./config/config";
import { v2 as cloudinary } from 'cloudinary';
import associations from "./models/associations";
associations();
import express from "express";
import {sequelize} from "./db/db";
import cors from "cors";
import ProductRouter from "./router/ProductsRouter";
import CartRouter from "./router/CartRouter";
import FilterRouter from "./router/FilterRouter";
import AuthRouter from "./router/AuthRouter";
import OrderRouter from "./router/OrderRouter";
const app = express();
import cookieParser from "cookie-parser";
app.use(
    cors({
        origin: "https://yoaryshop.delightfulwave-daf5feb2.polandcentral.azurecontainerapps.io",
        credentials: true
    })
);

declare module 'express-serve-static-core' {
    interface Request {
        sessionId?: string;
    }
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use("/", ProductRouter);
app.use("/", CartRouter);
app.use("/", FilterRouter);
app.use("/auth", AuthRouter);
app.use("/", OrderRouter);

cloudinary.config({
    cloud_name: config.CLOUD_NAME,
    api_key: config.CLOUD_API_KEY,
    api_secret: config.CLOUD_API_SECRET
});
(async () => {
    try {
         await cloudinary.api.resources({
            type: 'upload',
            max_results: 100,
        });
    } catch (err) {
        console.error('Помилка при отриманні зображень:', err);
    }
})();


(async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ alter: false });
        console.log("✅ DB connected");
        app.listen(5000, () => {
            console.log("🚀 Server running on port 5000");
        });
    }catch (err) {
        console.error("❌ DB error:", err);
    }
})();
