import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddressList from "./address-list";

const Address = ({ setListSelect }) => {
  const navigate = useNavigate();
  const { address } = useSelector((state) => state.address);

  return (
    <div>
      {address ? (
        <AddressList />
      ) : (
        <h2>
          tidak ada alamat{" "}
          <span
            className="click"
            onClick={() =>
              navigate("/address-form", setListSelect("AddressForm"))
            }
          >
            klik untuk menambah alamat
          </span>
        </h2>
      )}
    </div>
  );
};

export default Address;
