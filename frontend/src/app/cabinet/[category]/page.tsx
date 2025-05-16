import PersonalInfoComponent from "@/components/CabinetComponents/PersonalInfoComponent";
import OrdersComponent from "@/components/CabinetComponents/orders/OrdersComponent";
import TrackingComponent from "@/components/CabinetComponents/TrackingComponent";
import WalletComponent from "@/components/CabinetComponents/WalletComponent";
import {use} from "react";

type Params = Promise<{ category: string }>;
const Page = ({ params }: {params: Params}) => {
    const { category }: { category: string } = use(params);
    switch (category) {
        case "orders":
            return <OrdersComponent/>;
        case "tracking":
            return <TrackingComponent/>;
        case "wallet":
            return <WalletComponent/>;
        case "personal-information":
            return <PersonalInfoComponent />;
        default:
            return <div>Сторінку не знайдено</div>;
    }
};

export default Page;
