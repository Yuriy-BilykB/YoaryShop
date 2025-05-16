import {IProduct} from "@/interfaces/IProduct";
import Image from "next/image";
import {ShoppingCart} from "lucide-react";
import {addProductToCart} from "@/services/cart";
import {useModal} from "@/components/LayoutComponents/ModalContext/ModalContext";
import Link from "next/link";

interface Props {
    product: IProduct;
}

export const ProductCard = ({product}: Props) => {
    const {reloadCart} = useModal();
    const handleAddToCart = async (id: number) => {
        try {
            await addProductToCart(id);
            await reloadCart();
        } catch (err) {
            console.error("Не вдалося додати товар до кошика", err);
        }
    };
    return (
        <div
            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full">
            <div className="relative w-full aspect-square">
                <Link href={`/product/${product.id}`}>
                    <Image
                        src={product.images[0].imageUrl}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                    />
                </Link>
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                    {product.discount_price && (
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
              Знижка
            </span>
                    )}
                    {product.is_new && (
                        <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">
              Новинка
            </span>
                    )}
                    {product.is_popular && (
                        <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded">
              Популярне
            </span>
                    )}
                </div>
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <Link href={`/product/${product.id}`}>
                    <h2 className="text-sm font-semibold mb-2 h-10 line-clamp-2 text-black hover:underline hover:text-red-600 transition-colors duration-200">
                        {product.name}
                    </h2>
                </Link>
                <div className="mb-2 mt-auto">
                    {product.stock > 0 ? (
                        <span className="text-xs text-green-600">В наявності: {product.stock}</span>
                    ) : (
                        <span className="text-xs text-red-600">Немає в наявності</span>
                    )}
                </div>
                <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-black">
            {product.discount_price ?? product.price}₴
          </span>
                    {product.discount_price && (
                        <span className="line-through text-gray-400 text-xs">{product.price}₴</span>
                    )}
                </div>
                <button
                    onClick={() => handleAddToCart(product.id)}
                    className="w-full bg-black text-white py-2 px-4 rounded-md border border-transparent hover:border-black hover:bg-white transition-colors flex items-center justify-center gap-2 group"
                >
                    <ShoppingCart size={16} className="group-hover:text-black transition-colors"/>
                    <span className="group-hover:text-black transition-colors">Додати</span>
                </button>
            </div>
        </div>
    );
};