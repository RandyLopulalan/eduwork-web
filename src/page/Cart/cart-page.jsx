import React, { useState, useEffect } from "react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAddress } from "../../features/address/addressSlice";
import {  updateCart } from "../../features/cart/cartSlice";
import "./cart.css";

const CartPage = ({setCount}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState(JSON.parse(localStorage.getItem("cart")));
  const { cart, isError, message } = useSelector((state) => state.cart);

  const storage = JSON.parse(localStorage.getItem("cart"))
  let harga = data.map((data) => data.product.price * data.qty);
  let total = harga.reduce((a, b) => a + b, 0);
  let qty;

  // ========================== Delete cart ============================
  const deleteHandler = async (items) => {
    //redux cart state
    const newCart = await cart.filter((item) => item.product._id !== items.product._id);
    dispatch(updateCart(newCart));

    //localstorage cart state
    const newData = await data.filter((item) => item.product._id !== items.product._id);
    setData(newData);
    localStorage.setItem("cart", JSON.stringify(newData));
    setCount(prev => prev - 1)
  };

  // ====================== Increment qty cart ========================
  const cartIncrement = (items) => {
    qty = items.qty + 1;
    const editLocal = storage.find((item) => item.product._id === items.product._id);
    editLocal.qty = qty;
    setData(storage);
    localStorage.setItem("cart", JSON.stringify(storage));
  };

  // ====================== Decrement qty cart ========================
  const cartDecrement = (items) => {
    if (items.qty <= 1) return;
    qty = items.qty - 1;
    const editLocal = storage.find((item) => item.product._id === items.product._id);
    editLocal.qty = qty;
    setData(storage);
    localStorage.setItem("cart", JSON.stringify(storage));
  };   
  
  // ========================== PesanHandler ============================
  const pesanHandler = () => {
    navigate('/checkout')
    dispatch(updateCart(data))
  }

  // ========================== useEffect ============================
  const dataAddress = useCallback(() => {
    dispatch(getAddress());
  },[dispatch])

  useEffect(() => {
    if (isError) console.error(message);
    
    
    dataAddress()
    // return () => {
    //   
    //   console.log('save cart');
    // }
  }, [dataAddress, isError, message]);

  return (
    <div className="cart">
      <h2>Keranjang belanja</h2>

      <section className="cart-header">
        <p>Gambar</p>
        <p>Item</p>
        <p>Harga</p>
        <p>Qty</p>
      </section>

      {data.length > 0 ? (
        <>
          {data.map((items) => (
            <article
              key={items.product._id + Math.floor(Math.random() * 100)}
              className="cart-list"
            >
              <img src={items.product.image_url} alt="" className="cart-img" />
              <section className="cart-list-data">
                <h3>{items.product.name}</h3>
              </section>
              <section className="cart-list-data">
                <h5>Rp.{items.product.price}</h5>
              </section>
              <section className="cart-list-data">
                <button onClick={() => cartDecrement(items)}>-</button>
                <h5>Qty : {(qty = items.qty)}</h5>
                <button onClick={() => cartIncrement(items)}>+</button>
                <br />
                <button onClick={() => deleteHandler(items)}>hapus</button>
              </section>
            </article>
          ))}
          <section className="cart-total">
            <h2>Sub Total: Rp {total}</h2>
            <button className="btn" onClick={() => pesanHandler()}>
            {/* <button className="btn" onClick={() => navigate('/checkout')}> */}
              Pesan
            </button>
          </section>
        </>
      ) : (
        <h1>Cart Kosong</h1>
      )}
    </div>
  );
};

export default CartPage;
