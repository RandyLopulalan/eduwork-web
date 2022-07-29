import React, { useState } from "react";
import Invoice from "./invoice";
import Konfirmasi from "./konfirmasi";
import PickAddress from "./pick-address";
import './checkout.css'

const CheckoutPage = ({setCount}) => {
  const [addressSelect, setAddressSelect] = useState("")
  const [listSelect, setListSelect] = useState("PickAddress")

  // ==================== Display page ======================
  const dataList = [
    {
      id: "PickAddress",
      page: <PickAddress setListSelect={setListSelect} setAddressSelect={setAddressSelect} addressSelect={addressSelect}/>,
    },
    {
      id: "Konfirmasi",
      page: <Konfirmasi setListSelect={setListSelect} addressSelect={addressSelect} setCount={setCount}/>,
    },
    {
      id: "Invoice",
      page: <Invoice />,
    },
  ];

  let display = "";
  dataList.map((e) => (e.id === listSelect ? (display = e.page) : e));
  
  return (
  <div>
    <h1>Checkout</h1>
    {display}
  </div>);
};

export default CheckoutPage;
