import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartService from "./cartService";

//Get cart from localStorage
const cart = JSON.parse(localStorage.getItem("cart"));

const initialState = {
  cart: cart ? cart : [],
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
      const token = thunkAPI.getState().auth.user.token;
      return await cartService.getCart(token);
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
  async (newCart, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await cartService.updateCart(newCart, token);
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
        state.cart = state.cart.filter((list) => list._id !== actions.payload.id)
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
