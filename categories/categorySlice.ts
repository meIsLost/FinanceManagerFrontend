import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CategoriesAPI } from "./CategoriesAPI";
import { CategoryEntity } from "./CategoryEntity";

export const fetchCategories = createAsyncThunk(
  "categories/fetchAll",
  async (thunkAPI) => {
    return await CategoriesAPI.getCategories();
  }
);

export const createCategory = createAsyncThunk(
  "categories/create",
  async (category: CategoryEntity, thunkAPI) => {
    try {
      const state: any = thunkAPI.getState();
      console.log("Full Redux state:", state);

      const token = state.user.token;
      return await CategoriesAPI.createCategories(category, token);
    } catch (error: any) {
      console.error("createCategory error", error);

      // You can inspect this in the console
      const message =
        error?.response?.data?.message ||
        error.message ||
        "Something went wrong";

      return thunkAPI.rejectWithValue(message);
    }
  }
);

interface CategoryState {
  categories: CategoryEntity[];
  errormessage: string;
}

const initialState: CategoryState = {
  categories: [],
  errormessage: "",
};

// Then, handle actions in your reducers:
const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      // Add user to the state array
      console.log("payload", action.payload);

      state.categories = action.payload;
    }),
      builder.addCase(createCategory.fulfilled, (state, action) => {
        // Add user to the state array
        console.log("payload", action.payload);

        state.categories.push(action.payload); // action.payload is the new category
        state.errormessage = "";
      });
    builder.addCase(createCategory.rejected, (state, action) => {
      // Add user to the state array
      console.log("payload", action.payload);

      state.errormessage = "Error creating category";
    });
  },
});

export default categorySlice.reducer;
