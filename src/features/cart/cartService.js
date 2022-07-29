import axios from "axios";

const API_URL = "http://localhost:5000/api/cart";

//Get cart
const getCart = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

//Put cart
const updateCart = async (newCart, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL, newCart, config);

  return response.data;
};

const cartService = {
  getCart,
  updateCart,
};

export default cartService;
