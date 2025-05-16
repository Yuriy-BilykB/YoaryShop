export interface ICartItem {
    id: number;
    user_id: number | null;
    session_id: string | null;
    product_id: number;
    quantity: number;
    created_at: Date;
}