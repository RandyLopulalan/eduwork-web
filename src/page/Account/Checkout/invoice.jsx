import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getInvoice } from "../../../features/order/orderSlice";

const Invoice = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { invoice, id } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getInvoice(id));
  }, [dispatch, id]);

  return (
    <div>
      Invoice
      <div className="invoice">
        {invoice ? (
          <>
            {invoice.map((data) => (
              <section key={data._id} className="invoice-list">
                <article className="invoice-list-data">
                  <p>Status</p>
                  <p>{data.payment_status}</p>
                </article>
                <article className="invoice-list-data">
                  <p>Order Id</p>
                  <p>{data._id}</p>
                </article >
                <article className="invoice-list-data">
                  <p>Total Amount</p>
                  <p>{data.total}</p>
                </article>
                <article className="invoice-list-data">
                  <p>Billed to</p>
                  <span>
                    <p>{`${data.user.full_name}, ${data.user.email}`}</p>
                    <p>{`${data.delivery_address.kelurahan}, ${data.delivery_address.kecamatan}, ${data.delivery_address.kabupaten}, ${data.delivery_address.provinsi}, ${data.delivery_address.detail}`}</p>
                  </span>
                </article>
                <article className="invoice-list-data">
                  <p>Payment to</p>
                  <span>
                  <p>test</p>
                  <p>test@gmail.com</p>
                  <p>BCA</p>
                  <p>xxxxx-xxxxxx-333-34</p>
                  </span>
                </article>
                <article></article>
              </section>
            ))}
          </>
        ) : (
          <p></p>
        )}
      </div>
      <div className="invoice-btn">
      <button className="btn" onClick={() => navigate("/")}>Main Menu</button>
      <button className="btn" onClick={() => navigate("/account")}>Account</button>
      </div>
    </div>
  );
};

export default Invoice;
