import { useEffect, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import ListProduct from "./list-product";
import "./home.css";
import { getProduct } from "../../features/product/productSlice";

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [getTag, setGetTag] = useState([]);
  const [getCategory, setGetCategory] = useState([]);
  const [tagFilter, setTagFilter] = useState("");

  const getDataCategory = useCallback(async () => {
    const response = await axios.get("http://localhost:5000/api/category");
    setGetCategory(response.data);
  }, []);

  const getDataTag = useCallback(async () => {
    const response = await axios.get("http://localhost:5000/api/tag");
    setGetTag(response.data);
  }, []);

  const tagHandler = (tags) => {
    if (tagFilter !== tags) {
      setTagFilter(tags);
    } else {
      setTagFilter("");
    }

    !tagFilter && dispatch(getProduct());

  };

  useEffect(() => {
    if (!user) {
      setTimeout(() => {
        navigate("/login");
      }, 8000);
    }

    getDataCategory();

    getDataTag();
  }, [user, navigate, getDataCategory, getDataTag]);

  return (
    <div className="container">
      <div className="home-header">
        <input type="text" placeholder="Search..." className="search-product" />
        <h4 className="tags">
          Category:
          {getCategory.map((categories) => (
            <section key={categories._id}>
              <button
                className={`btn-tags ${
                  categories.name === tagFilter && "active"
                }`}
                onClick={() => tagHandler(categories.name)}
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
                className={`btn-tags ${tags.name === tagFilter && "active"}`}
                onClick={() => tagHandler(tags.name)}
              >
                {tags.name}
              </button>
            </section>
          ))}
        </h4>
      </div>
      <ListProduct tagFilter={tagFilter} setTagFilter={setTagFilter} />
    </div>
  );
};

export default HomePage;
