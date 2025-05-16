export interface Iimages {
	imageUrl: string;
}
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
	images: Iimages[]

}

export interface ICartWithProduct {
	session_id: string;
	product_id: number;
	quantity: number;
	product: IProduct;
}