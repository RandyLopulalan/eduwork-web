import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Account, Cart, Home, Login, Register } from "./page";
import Header from "./component/Header";
import AddressForm from "./page/Account/address-form";
import CheckoutPage from "./page/Account/Checkout/checkout-page";
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <div className="container">
          <Header count={count}/>
          <Routes>
            <Route path="/" element={<Home setCount={setCount}/>} />
            <Route path="/cart" element={<Cart setCount={setCount}/>} />
            <Route path="/account" element={<Account />} />
            <Route path="/checkout" element={<CheckoutPage setCount={setCount}/>} />
            <Route path="/account/address-form" element={<AddressForm />} />
            <Route path="/account/address-form/:id" element={<AddressForm />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
