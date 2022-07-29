import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authSlice'
import productReducer from "../features/product/productSlice";
import addressReducer from "../features/address/addressSlice";
import cartReducer from "../features/cart/cartSlice";
import orderReducer from "../features/order/orderSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    address: addressReducer,
    cart: cartReducer,
    order: orderReducer,
  },
});
