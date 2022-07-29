import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaCartPlus, FaTags } from "react-icons/fa";
import { getProduct } from "../../features/product/productSlice";
import { updateCart } from "../../features/cart/cartSlice";

const ListProduct = ({ pageVisited, productPerPage, filterTagHandler, setCount }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState(JSON.parse(localStorage.getItem('cart')))
  const { product, isError, message } = useSelector((state) => state.product);

  
  // ======================== Pagination ==========================
  
  const displayProduct = product
    .slice(pageVisited, pageVisited + productPerPage)
    .map((products) => (
      <article key={products._id} className="productCard">
        <img src={products.image_url} alt="" className="img" />
        <section className="productCard-list">
          <section className="tags">
            <FaTags />
            {products.tag.map((list) => (
              <button
                key={products._id + list._id}
                onClick={() => filterTagHandler(list.name)}
                className="btn-tags"
              >
                {list.name}
              </button>
            ))}
          </section>
          <h3>{products.name}</h3>
          <h5>Rp.{products.price}</h5>
          <p>{products.description}</p>
          <button className="btn" onClick={() => updateCartHandler(products)}>
            <FaCartPlus />
          </button>
        </section>
      </article>
    ));

  // ======================== Add Cart ==========================
  const updateCartHandler = (products) => {
    const cart = data ? data : [];

    // check if item already exist
    const itemExist = cart.filter((item) => item.product._id === products._id);

    if (itemExist.length === 0) {
      const newItem = { product: products, qty: 1 };
      const newCart = [...cart, newItem];
      dispatch(updateCart(newCart));
      setData(newCart)
      setCount(prev => prev + 1)
      localStorage.setItem('cart', JSON.stringify(newCart))
    } else {
      alert("item sudah ada di dalam cart");
    }
  };

  // ========================== useEffect ============================
  useEffect(() => {
    if (isError) {
      console.error(message);
    }

    dispatch(getProduct());
    console.log("GET");
  }, [dispatch, isError, message]);

  return (
    <div className="products">
      {displayProduct}
    </div>
  );
};

export default ListProduct;
