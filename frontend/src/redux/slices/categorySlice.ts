import { createSlice } from "@reduxjs/toolkit";
import { ICategories } from "@/interfaces/ICategories";
import {fetchCategories} from "@/redux/helpers/categoriesHelpers";

interface CategoryState {
    categories: ICategories[];
    loading: boolean;
    error: string | null;
}

const initialState: CategoryState = {
    categories: [],
    loading: false,
    error: null,
};

export const categoriesSlice = createSlice({
    name: "categoriesSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.categories = action.payload;
                state.loading = false;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const categoriesActions = {
    ...categoriesSlice.actions,
    fetchCategories
};