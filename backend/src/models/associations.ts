import { ProductModel } from "./Product";
import { CategoryModel } from "./Category";
import { CartItemModel } from "./Cart";
import { UserModel } from "./User";
import { OrderModel } from "./Order";
import {OrderItemModel} from "./OrderItem";
import { ImageModel } from "./Image";
import { FilterModel } from "./Filter";
import { CategoryFilterModel } from "./CategoryFilter";
import { ProductFilterModel } from "./ProductFilter";

export default function associations() {
    ProductModel.belongsTo(CategoryModel, {
        foreignKey: "category_id",
        as: "category"
    });
    CategoryModel.hasMany(ProductModel, {
        foreignKey: "category_id",
        as: "products"
    });
    CartItemModel.belongsTo(ProductModel, {
        foreignKey: "product_id",
        as: "product"
    });
    CartItemModel.belongsTo(UserModel, {
        foreignKey: "user_id",
        as: "user"
    });
    ProductModel.hasMany(ImageModel, {
        foreignKey: "productId",
        as: "images"
    });
    ImageModel.belongsTo(ProductModel, {
        foreignKey: "productId",
        as: "product"
    });
    CategoryModel.belongsToMany(FilterModel, {
        through: CategoryFilterModel,
        foreignKey: "category_id",
        otherKey: "filter_id",
        as: "filters"
    });

    FilterModel.belongsToMany(CategoryModel, {
        through: CategoryFilterModel,
        foreignKey: "filter_id",
        otherKey: "category_id",
        as: "categories"
    });
    ProductModel.hasMany(ProductFilterModel, {
        foreignKey: "product_id",
        as: "productFilters"
    });
    ProductFilterModel.belongsTo(ProductModel, {
        foreignKey: "product_id",
        as: "product"
    });

    FilterModel.hasMany(ProductFilterModel, {
        foreignKey: "filter_id",
        as: "filterValues"
    });
    ProductFilterModel.belongsTo(FilterModel, {
        foreignKey: "filter_id",
        as: "filter"
    });

    OrderModel.belongsTo(UserModel, {
        foreignKey: "userId",
        as: "user"
    });
    UserModel.hasMany(OrderModel, {
        foreignKey: "userId",
        as: "orders"
    });

    OrderModel.hasMany(OrderItemModel, {
        foreignKey: "order_id",
        as: "items"
    });

    OrderItemModel.belongsTo(OrderModel, {
        foreignKey: "order_id",
        as: "order"
    });
    OrderItemModel.belongsTo(ProductModel, {
        foreignKey: "product_id",
        as: "product"
    });
    ProductModel.hasMany(OrderItemModel, {
        foreignKey: "product_id",
        as: "orderItems"
    });

}
