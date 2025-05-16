import ProductComponent from "@/components/products/ProductComponent";
import {use} from "react";

type Params = Promise<{ id: string }>;
const Page = ({params}: {params: Params}) => {
    const {id} = use(params);
    return (
        <div>
            <ProductComponent id={id}/>
        </div>
    );
};

export default Page;