import CategoryComponent from "@/components/products/CategoryComponent";
import {use} from "react";

type Params = Promise<{ category: string }>;
const Page = ({ params }: {params: Params}) => {
    const { category }: { category: string } = use(params);
    const decodedCategorySlug = decodeURIComponent(category);
    return (
        <CategoryComponent category={decodedCategorySlug} />
    );
};
export default Page;
