import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useCallback, useState } from "react";
import { logout, me, reset } from "../../features/auth/authSlice";
import Profile from "./profile";
import Order from "./order";
import Address from "./address";
import AddressForm from "./address-form";
import "./account-page.css";
import { useEffect } from "react";
import { getAddress } from "../../features/address/addressSlice";
import { getOrder } from "../../features/order/orderSlice";

const AccountPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [listSelect, setListSelect] = useState("Profile");

  // ==================== Display page ======================
  const dataList = [
    {
      id: "Profile",
      page: <Profile />,
    },
    {
      id: "Order",
      page: <Order />,
    },
    {
      id: "Address",
      page: <Address setListSelect={setListSelect} />,
    },
    {
      id: "AddressForm",
      page: <AddressForm />,
    },
  ];

  let display = "";
  dataList.map((e) => (e.id === listSelect ? (display = e.page) : e));


  // =================== Logout handler =====================
  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  // =================== useEffect =====================
  const get = useCallback(() => {
    dispatch(me());
    dispatch(getAddress());
    dispatch(getOrder());
  }, [dispatch]);

  useEffect(() => {
    get()
  },[get])

  return (
    <div className="account-page">
      <div className="account-list">
        <ul>
          <li
            onClick={() => setListSelect("Profile")}
            className={listSelect === "Profile" ? "active" : ""}
          >
            Profile
          </li>
          <li
            onClick={() => setListSelect("Address")}
            className={
              listSelect === "Address"
                ? "active"
                : listSelect === "AddressForm"
                ? "active"
                : ""
            }
          >
            Address
          </li>
          <li
            onClick={() => setListSelect("Order")}
            className={listSelect === "Order" ? "active" : ""}
          >
            Order
          </li>
          <button className="btn" onClick={onLogout}>
            <FaSignOutAlt /> Logout
          </button>
        </ul>
      </div>
      <div className="account-data">{display}</div>
    </div>
  );
};

export default AccountPage;
