import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./component/Header";
import { Account, Cart, Home, Login, Register } from "./page";

function App() {
  return (
    <>
       <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/account" element={<Account />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
