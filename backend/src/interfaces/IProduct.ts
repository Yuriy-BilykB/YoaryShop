export interface IProduct {
    id: number;
    name: string;
    description: string;
    price: number;
    discount_price: number | null;
    category_id: number;
    brand: string;
    stock: number;
    is_new: boolean;
    is_popular: boolean;
    created_at: Date;
}
