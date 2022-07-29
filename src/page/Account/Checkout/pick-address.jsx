import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PickAddress = ({ setListSelect, setAddressSelect, addressSelect }) => {
  const navigate = useNavigate();
  const { address } = useSelector((state) => state.address);

  const addressHandler = (data) => {
    setAddressSelect((prev) => (prev = data._id));
  };

  return (
    <div>
      Select Delivery Address
      <div className="delivery-address">
        <section className="delivery-address-header">
          <p>Address</p>
          <p>Detail</p>
        </section>

        {address.map((data) => (
          <form
            key={data._id}
            className={
              data._id === addressSelect
                ? "delivery-address-list checked"
                : "delivery-address-list"
            }
          >
            <section className="delivery-address-data">
              <input
                type="radio"
                checked={data._id === addressSelect ? true : false}
                onChange={() => addressHandler(data)}
              />
              <p>{data.alamat}</p>
            </section>
            <section>
              <p>{`${data.kelurahan}, ${data.kecamatan}, ${data.kabupaten}, ${data.provinsi}, ${data.detail}`}</p>
            </section>
          </form>
        ))}
      </div>
      <div className="invoice-btn">
        <button className="btn" onClick={() => navigate("/cart")}>Cancel</button>
        <button className="btn" onClick={() => setListSelect("Konfirmasi")}>Next</button>
      </div>
    </div>
  );
};

export default PickAddress;
