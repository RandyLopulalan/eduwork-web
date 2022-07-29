import axios from "axios";
import ListProduct from "./list-product";
import ReactPaginate from 'react-paginate'
import { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProduct } from "../../features/product/productSlice";
import { getAddress } from "../../features/address/addressSlice";
import { getOrder } from "../../features/order/orderSlice";
import { getCart } from "../../features/cart/cartSlice";
import { me } from "../../features/auth/authSlice";
import "./home.css";

const HomePage = ({ setCount }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const { product } = useSelector((state) => state.product);

  const [getTag, setGetTag] = useState([]);
  const [getCategory, setGetCategory] = useState([]);
  const [filterTag, setFilterTag] = useState([]);
  const [filterCategory, setFilterCategory] = useState("");
  const [search, setSearch] = useState("");
  const [pageNumber, setpageNumber] = useState(0);

  // ======================== Pagination ==========================
  const productPerPage = 3;
  const pageVisited = pageNumber * productPerPage;
  const pageCount = Math.ceil(product.length / productPerPage)

  const onPageChange = ({selected}) => {
    setpageNumber(selected)
  }

  // ======================== Get category ==========================
  const getDataCategory = useCallback(async () => {
    const response = await axios.get("http://localhost:5000/api/category");
    setGetCategory(response.data);
  }, []);

  // ========================== Get tag ============================
  const getDataTag = useCallback(async () => {
    const response = await axios.get("http://localhost:5000/api/tag");
    setGetTag(response.data);
  }, []);

  // ======================== Filter Handler ==========================
  const filterHandler = useCallback(() => {
    const data = {
      tag: filterTag,
      category: filterCategory,
      q: search,
    };

    dispatch(getProduct(data));
  }, [dispatch, filterTag, filterCategory, search]);

  // ======================== Category Handler ==========================
  const filterCategoryHandler = async (tags) => {
    if (filterCategory === tags) {
      setFilterCategory("");
    } else {
      setFilterCategory(tags);
    }
  };

  // ======================== Tag Handler ==========================
  const filterTagHandler = (tags) => {
    if (filterTag.includes(tags)) {
      const newData = filterTag.filter((data) => data !== tags);
      setFilterTag((prev) => (prev = newData));
    } else {
      const tag = [...filterTag, tags];
      setFilterTag((prev) => (prev = tag));
    }
  };

  // ======================== search ==========================
  const debounce = (cb, delay = 300) => {
    let timeout;

    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        cb(...args);
      }, delay);
    };
  };

  const searchProduct = debounce((e) => {
    setSearch(e);
  });

  // ======================== useEffect ==========================
  const get = useCallback(() => {
    getDataCategory();
    getDataTag();

    dispatch(me());
    dispatch(getAddress());
    dispatch(getOrder());
    dispatch(getCart());
    setCount((prev) => (prev = cart.length));
  }, [getDataCategory, getDataTag, dispatch, cart.length, setCount]);

  useEffect(() => {
    if (!user) {
      setTimeout(() => {
        navigate("/login");
      }, 8000);
    }
    filterHandler();
    get();
  }, [get, user, navigate, filterHandler]);

  return (
    <div className="container">
      <div className="home-header">
        <input
          type="text"
          placeholder="Search..."
          className="search-product"
          onChange={(e) => searchProduct(e.target.value)}
        />
        <h4 className="tags">
          Category:
          {getCategory.map((categories) => (
            <section key={categories._id}>
              <button
                className={`btn-tags ${
                  filterCategory.includes(categories.name) && "active"
                }`}
                onClick={() => filterCategoryHandler(categories.name)}
              >
                {categories.name}
              </button>
            </section>
          ))}
        </h4>
        <h4 className="tags">
          Tag:
          {getTag.map((tags) => (
            <section key={tags._id}>
              <button
                className={`btn-tags ${
                  filterTag.includes(tags.name) && "active"
                }`}
                onClick={() => filterTagHandler(tags.name)}
              >
                {tags.name}
              </button>
            </section>
          ))}
        </h4>
      </div>
      <ListProduct
        pageVisited={pageVisited}
        productPerPage={productPerPage}
        filterTagHandler={filterTagHandler}
        setCount={setCount}
      />
      <ReactPaginate 
      containerClassName={"pagination-btn"}
      activeClassName={"pagination-btn-active"}
      previousLabel={"Prev"}
      nextLabel={"Next"}
      pageCount={pageCount}
      onPageChange={onPageChange}
      />
    </div>
  );
};

export default HomePage;
