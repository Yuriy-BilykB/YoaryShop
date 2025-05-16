import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCategories } from "@/services/cart";

export const fetchCategories = createAsyncThunk(
    "categories/fetchCategories",
    async (_, { rejectWithValue }) => {
        try {
            const categories = await getCategories();
            return categories;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);