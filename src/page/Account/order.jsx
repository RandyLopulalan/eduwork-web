import ReactPaginate from 'react-paginate'
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "../../features/order/orderSlice";

const Order = () => {
  const dispatch = useDispatch();
  const { order } = useSelector((state) => state.order);
  const [pageNumber, setpageNumber] = useState(0);

  const totalOrder = (items) => {
    const fee = items.delivery_fee;
    const item = items.order_item.map((data) => data.price * data.qty);
    const itemTotal = item.reduce((a, b) => a + b, 0);
    const grandTotal = itemTotal + fee;
    return grandTotal;
  };

  // ======================== Pagination ==========================
  const orderPerPage = 3;
  const pageVisited = pageNumber * orderPerPage;
  const pageCount = Math.ceil(order.data.length / orderPerPage);

  const displayOrder = order.data
  .slice(pageVisited, pageVisited + orderPerPage)
  .map((list) => (
    <section key={list._id} className="order-list-data">
      <article className="order-list-data-data">
        <p>{list._id}</p>
        <p>Rp.{totalOrder(list)}</p>
        <p>{list.status}</p>
      </article>

      <article className="order-list-item-header">
        <h4>item :</h4>

        <div className="order-list-data-header">
          <p>Nama Item</p>
          <p>Harga</p>
          <p>Qty</p>
        </div>

        {list.order_item.map((data) => {
          return (
            <article
              key={list._id + data._id}
              className="order-list-item"
            >
              <p>{data.name}</p>
              <p>Rp.{data.price}</p>
              <p>{data.qty}</p>
            </article>
          );
        })}
      </article>
    </section>
  ));

  const onPageChange = ({ selected }) => {
    setpageNumber(selected);
  };

  // ======================== useEffect ==========================
  useEffect(() => {
    dispatch(getOrder());
  }, [dispatch]);

  return (
    <section className='order'>
      <h1>Order List</h1>

      <div className="order-list-header">
        <h4>Order id</h4>
        <h4>Total</h4>
        <h4>Status</h4>
      </div>
      {displayOrder}
      <section>
        <ReactPaginate
          containerClassName={"pagination-btn order-btn"}
          activeClassName={"pagination-btn-active"}
          previousLabel={"Prev"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={onPageChange}
        />
      </section>
    </section>
  );
};

export default Order;
