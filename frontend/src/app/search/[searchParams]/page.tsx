import SearchComponent from "@/components/SearchComponent/SearchComponent";
import {use} from "react";

type Params = Promise<{ searchParams: string }>;
const Page = ({ params }: {params: Params}) => {
    const {searchParams} = use(params);
    return (
        <div>
           <SearchComponent searchParams={searchParams}/>
        </div>
    );
};
export default Page;
