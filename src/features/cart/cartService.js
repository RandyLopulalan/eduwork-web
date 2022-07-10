import axios from "axios";

const API_URL = "http://localhost:5000/api/cart";

//Get cart
const getCart = async () => {
  const response = await axios.get(API_URL);
  
  return response.data;
};

//Put cart
const updateCart = async (dataProduct) => {
  const response = await axios.put(API_URL, dataProduct);
  
  return response.data;
};

const cartService = {
  getCart,
  updateCart
};

export default cartService