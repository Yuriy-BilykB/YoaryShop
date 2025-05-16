import SubCategoryComponent from "@/components/products/SubCategoryComponent";
import {use} from "react";
type Params = Promise<{subCategorySlug: string}>;
const Page = ({params}: {params: Params}) => {
    const { subCategorySlug } = use(params) ;
    const decodedCategorySlug = decodeURIComponent(subCategorySlug);
    console.log(decodedCategorySlug)
    return (
        <SubCategoryComponent subCategory={decodedCategorySlug} />
    );
};

export default Page;