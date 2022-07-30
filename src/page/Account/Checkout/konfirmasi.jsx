import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { updateCart } from "../../../features/cart/cartSlice";
import { createOrder } from "../../../features/order/orderSlice";

const Konfirmasi = ({ setListSelect, addressSelect, setCount }) => {
  const dispatch = useDispatch();
  const { address } = useSelector((state) => state.address);

  const storage = JSON.parse(localStorage.getItem("cart"));
  const harga = storage.map((data) => data.product.price * data.qty);
  const total = harga.reduce((a, b) => a + b, 0);

  // ======================== Pesan / Order ==========================
  const findAddress = address.find((data) => data._id === addressSelect);
  const order = { delivery_fee: 2000, delivery_address: findAddress._id };

  const pesanHandler = () => {
    dispatch(createOrder(order));

    //reset cart state to empty
    const newdata = [];
    dispatch(updateCart(newdata));
    localStorage.setItem("cart", JSON.stringify(newdata));
    setListSelect("Invoice");
    setCount(0);
  };

  return (
    <div>
      Konfirmasi
      <section className="invoice">
        <section className="invoice-list">
          
          <article className="invoice-list-data">
            <p>Alamat</p>
            {[findAddress].map(
              (data) =>
              <span key={data._id}>
                {`${data.alamat}, ${data.kelurahan}, ${data.kecamatan}, ${data.kabupaten}, ${data.provinsi}, ${data.detail}`}
              </span>
            )}
          </article>

          <article className="invoice-list-data">
            <p>Sub total</p>
            {`Rp.${total}`}
          </article>

          <article className="invoice-list-data">
            <p>Ongkir</p>
            {`Rp.${order.delivery_fee}`}
          </article>

          <article className="invoice-list-data">
            <h3>Total</h3>
            <h3>{`Rp.${order.delivery_fee + total}`}</h3>
          </article>
        </section>
      </section>
      <section className="invoice-btn">
        <button className="btn" onClick={() => setListSelect("PickAddress")}>
          Previos
        </button>
        <button className="btn" onClick={() => pesanHandler()}>
          Order
        </button>
      </section>
    </div>
  );
};

export default Konfirmasi;
