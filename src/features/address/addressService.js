import axios from "axios";

const API_URL = "http://localhost:5000/api/delivery-address/";

//Get Address
const getAddress = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  
  return response.data;
};

//Post Address
const createAddress = async (newAddress, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, newAddress, config);

  return response.data;
};

//Put Address
const updateAddress = async (newAddress, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { _id } = newAddress;
  const { alamat, kelurahan, kecamatan, kabupaten, provinsi, detail } =
    newAddress;
  const data = {
    _id,
    alamat,
    kelurahan,
    kecamatan,
    kabupaten,
    provinsi,
    detail,
  };

  const response = await axios.put(API_URL + _id, data, config);

  return response.data;
};

//Put Address
const deleteAddress = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + id, config);

  return response.data;
};

const addressService = {
  getAddress,
  createAddress,
  updateAddress,
  deleteAddress,
};

export default addressService;
