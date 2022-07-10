import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartService from "./cartService";

const initialState = {
  cart: [],
  count: 0,
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: "",
};

// GET cart
export const getCart = createAsyncThunk(
  "cart/get",
  async (_, thunkAPI) => {
    try {
      return await cartService.getCart();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// PUT cart
export const updateCart = createAsyncThunk(
  "cart/update",
  async (dataProduct, thunkAPI) => {
    try {
      return await cartService.updateCart(dataProduct);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    reset: (state) => {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCart.fulfilled, (state, actions) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cart = actions.payload;
      })
      .addCase(getCart.rejected, (state, actions) => {
        state.isLoading = false;
        state.isError = true;
        state.message = actions.payload;
      })
      .addCase(updateCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCart.fulfilled, (state, actions) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cart = state.cart.map((products) => products._id === actions.payload.id ? {...actions.payload} : products)
      })
      .addCase(updateCart.rejected, (state, actions) => {
        state.isLoading = false;
        state.isError = true;
        state.message = actions.payload;
      })
  },
});

export const { reset } = cartSlice.actions;

export default cartSlice.reducer;
