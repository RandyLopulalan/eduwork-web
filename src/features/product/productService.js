import axios from "axios";

const API_URL = "http://localhost:5000/api/products";

//Get Product
const getProduct = async (data) => {
  let response;
  if (!data) {
    response = await axios.get(API_URL);
  } else {
    const tag = data.tag;
    const category = data.category;
    const q = data.q;
    const req = `?${q && `q=${q}&`}${tag.map((a) => `tag=${a}&`)}${category && `category=${category}`}`;

    response = await axios.get(API_URL + req.replace(",", ""));
  }

  return response.data.data;
};

const productService = {
  getProduct,
};

export default productService;
