import Link from "next/link";
import Image from "next/image";
import homeImg from "../../../public/home.svg";

type propsType = {
    parentCategory: string,
    subCategory?: string
}
const ProductNav = ({parentCategory, subCategory}: propsType) => {
    return (
        <nav className="flex items-center mb-6 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600 transition-colors flex items-center">
                <Image src={homeImg} alt="home" width={24} height={24} className="hover:opacity-80"/>
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            {parentCategory && (
                <>
                    <Link
                        href={`/category/${parentCategory}`}
                        className="hover:text-blue-600 transition-colors font-medium"
                    >
                        {parentCategory}
                    </Link>
                    <span className="mx-2 text-gray-400">/</span>
                </>
            )}
            <Link
                href={`/subcategories/${subCategory}`}
                className="text-blue-600 font-medium"
                aria-current="page"
            >
                {subCategory}
            </Link>
        </nav>
    );
};

export default ProductNav;