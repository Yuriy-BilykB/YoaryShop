import {configureStore} from "@reduxjs/toolkit";
import {categoriesSlice} from "@/redux/slices/categorySlice";

export const store = configureStore({
    reducer: {
        categories: categoriesSlice.reducer,
    },
});