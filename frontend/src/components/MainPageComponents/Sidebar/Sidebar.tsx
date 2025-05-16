"use client";
import { SidebarContent } from "@/components/MainPageComponents/Sidebar/SidebarContent";
import {useAppSelector} from "@/redux/hooks/useAppSelector";
import {useAppDispatch} from "@/redux/hooks/useAppDispatch";
import {useEffect} from "react";
import {fetchCategories} from "@/redux/helpers/categoriesHelpers";

const Sidebar = () => {
    const {categories} = useAppSelector((state) => state.categories);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchCategories())
    }, [dispatch]);
    const mainCategories = categories.filter((category) => category.parent_id === null);

    return (
        <aside className="h-full w-75 min-h-screen border-r border-gray-300 w-60">
            <SidebarContent categories={mainCategories}/>
        </aside>

    );
};

export default Sidebar;
