import {Request, Response, NextFunction} from "express";
import {ErrorHandler} from "../ErrorHandler/ErrorHandler";
import {CategoryModel} from "../models/Category";
import {ProductModel} from "../models/Product";
import {Op, Sequelize} from "sequelize";
import {ImageModel} from "../models/Image";
import {ProductFilterModel} from "../models/ProductFilter";

class ProductController {
    async getAProducts(req: Request, res: Response, next: NextFunction) {
        try {
            const {category_id, offset = 0, limit = 10, ...queryFilters} = req.query;
            let whereCondition: any = {};
            const includeOptions: any[] = [
                {
                    model: ImageModel,
                    as: "images",
                    attributes: ["imageUrl"]
                }
            ];

            Object.entries(queryFilters).forEach(([key, value]) => {
                const match = key.match(/^filters\[(\d+)\]\[\]$/);
                if (match && value) {
                    const filterId = Number(match[1]);

                    includeOptions.push({
                        model: ProductFilterModel,
                        as: "productFilters",
                        required: true,
                        where: {
                            filter_id: filterId,
                            value: Array.isArray(value) ? value : [value]
                        }
                    });
                }
            });

            if (category_id) {
                whereCondition.category_id = Number(category_id);
            }

            const products = await ProductModel.findAll({
                where: whereCondition,
                offset: Number(offset),
                limit: Number(limit),
                include: includeOptions
            });

            res.json({products});
        } catch (error) {
            console.error("Error fetching products", error);
            next(error)
        }
    }

    async getAProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const {id} = await req.params;
            if (!id || isNaN(Number(id))) {
                res.status(400).json({message: "Некоректний або відсутній ID"});
                return
            }

            const includeOptions = [
                {
                    model: ImageModel,
                    as: "images",
                    attributes: ["imageUrl"]
                }
            ];

            const product = await ProductModel.findOne({
                where: {id: Number(id)},
                include: includeOptions
            });

            if (!product) {
                res.status(404).json({message: "Товар не знайдено"});
                return
            }

            res.status(200).json(product);
            return;
        } catch (error) {
            console.error("Помилка при отриманні товару:", error);
            next(error);
        }
    }


    async searchProducts(req: Request, res: Response, next: NextFunction) {
        try {
            const {searchParam, offSet = "0", limit = "5"} = req.query;

            if (!searchParam || typeof searchParam !== "string") {
                res.status(400).json({message: "Invalid search query"});
            }

            const offsetNum = parseInt(offSet as string, 10);
            const limitNum = parseInt(limit as string, 10);

            const products = await ProductModel.findAll({
                where: {
                    [Op.or]: [
                        {name: {[Op.like]: `%${searchParam}%`}},
                        {description: {[Op.like]: `%${searchParam}%`}}
                    ]
                },
                include: [
                    {
                        model: ImageModel,
                        as: "images",
                        attributes: ["imageUrl"]
                    }
                ],
                offset: offsetNum,
                limit: limitNum
            });

            res.status(200).json(products);
        } catch (error) {
            console.error("Error during product search:", error);
            next(error);
        }
    }


    async getCategories(req: Request, res: Response, next: NextFunction) {
        try {
            const categories = await CategoryModel.findAll();
            if (!categories || categories.length === 0) {
                throw ErrorHandler.NotFound("Products not found");
            }

            res.status(200).json(categories);
        } catch (error) {
            next(error);
        }
    }

    async getRecommendationsProducts(req: Request, res: Response, next: NextFunction) {
        try {
            const products = await ProductModel.findAll({
                order: [
                    [Sequelize.literal('RAND()'), 'ASC']
                ],
                limit: 20,
                include: [
                    {
                        model: ImageModel,
                        as: "images",
                        attributes: ["imageUrl"]
                    }
                ]
            });

            if (!products || products.length === 0) {
                throw ErrorHandler.NotFound("Products not found");
            }

            res.status(200).json(products);
        } catch (error) {
            next(error);
        }
    }

    async getPopularOptions(req: Request, res: Response, next: NextFunction) {
        try {
            const limit = Number(req.query.limit) || 20;
            const offset = Number(req.query.offset) || 0;
            const products = await ProductModel.findAll({
                order: [[Sequelize.literal("RAND()"), "ASC"]],
                limit,
                offset,
                include: [{model: ImageModel, as: "images", attributes: ["imageUrl"]}],
            });
            res.status(200).json(products);
        } catch (error) {
            next(error);
        }
    }
}

export default new ProductController();