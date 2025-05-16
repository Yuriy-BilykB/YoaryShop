import {Request, Response, NextFunction} from "express";
import {FilterModel} from "../models/Filter";
import {ProductModel} from "../models/Product";

class FilterController {
    async getFiltersByCategory(req: Request, res: Response, next: NextFunction) {
        try {
            const {categoryId} = req.query;
            const filters = await FilterModel.findAll({
                include: [
                    {
                        association: "categories",
                        where: { id: categoryId },
                        attributes: []
                    },
                    {
                        association: "filterValues",
                        include: [
                            {
                                model: ProductModel,
                                as: "product",
                                where: { category_id: categoryId },
                                attributes: []
                            }
                        ],
                        attributes: ["value"]
                    }
                ],
                attributes: ["id", "name"]
            });

            const result = filters.map(filter => ({
                id: filter.id,
                name: filter.name,
                values: Array.from(new Set(filter.filterValues?.map((v: any) => v.value)))
            }));

             res.status(200).json(result);
        }catch (error) {
            next(error)
        }

    }
}
export default new FilterController();