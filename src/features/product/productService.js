import axios from "axios";

const API_URL = "http://localhost:5000/api/products";

//Get Product
const getProduct = async () => {
  const response = await axios.get(API_URL);
  
  return response.data.data;
};

const productService = {
  getProduct,
};

export default productService