import Sidebar from "@/components/MainPageComponents/Sidebar/Sidebar";
import React from "react";
import PopularGoods from "@/components/MainPageComponents/PopularGoods/PopularGoods";
import Recommendations from "@/components/MainPageComponents/Recommendations/Recommendations";
import BestOptions from "@/components/MainPageComponents/BestOffers/BestOptions";

export default function Home() {
    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar/>
            <main className="w-full lg:w-6/6 px-4 py-6 flex flex-col items-center">
                <PopularGoods/>
                <Recommendations/>
                <BestOptions/>
            </main>
        </div>);
}