import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../features/cart/cartSlice";
import "./cart.css";

const CartPage = () => {
  const dispatch = useDispatch()
  const {cart, isError, message} = useSelector(state => state.cart)
  console.log(cart);
  
  useEffect(() => {
    if(isError){
      console.error(message);
    }

    dispatch(getCart())

  },[isError, message, dispatch])
  return (
    <div>
      Cart Page
    </div>
  );
};

export default CartPage;
