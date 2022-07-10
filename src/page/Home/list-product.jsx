import React, { useEffect } from 'react'
import { getProduct } from "../../features/product/productSlice";
import { updateCart } from "../../features/cart/cartSlice";
import { FaCartPlus, FaTags } from "react-icons/fa";
import { useDispatch, useSelector} from "react-redux";

const ListProduct = ({tagFilter, setTagFilter}) => {
    const dispatch = useDispatch();
    const { product, isError, message } = useSelector((state) => state.product);
    
    const updateCartHandler = (products) => {
        //Get user from localStorage
        const {user} = JSON.parse(localStorage.getItem("user"));

        const dataProduct = [{
          name: products.name,
          qty: 1,
          price: products.price,
          user: user,
          product: products
        }]

        console.log(products);
        console.log(user);
        console.log(dataProduct);

        dispatch(updateCart(dataProduct))
    }

    useEffect(() => {
        if (isError) {
          console.error(message);
        }

        dispatch(getProduct());
    
        console.log("GET");
      }, [dispatch, isError, message]);

  return (
    <div className="products">
        {product
    .filter(
      (products) =>
        products.tag.name.toLowerCase().includes(tagFilter.toLowerCase()) ||
        products.category.name.toLowerCase().includes(tagFilter.toLowerCase())
    )
    .map((products) => (
      <article key={products._id} className="productCard">
        <img src={products.image_url} alt="" className="img" />
        <section className="productCard-list">
          <section className="tags">
            <FaTags />
            <button
              onClick={() => setTagFilter(products.tag.name)}
              className="btn-tags"
            >
              {products.tag.name}
            </button>
          </section>
          <h3>{products.name}</h3>
          <h5>Rp.{products.price}</h5>
          <p>{products.description}</p>
          <button className="btn" onClick={() => updateCartHandler(products)}>
            <FaCartPlus />
          </button>
        </section>
      </article>
    ))}
    </div>
  )
}

export default ListProduct