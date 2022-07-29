import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaCartPlus, FaSignInAlt, FaUser } from "react-icons/fa";

function Header({ count }) {
  const { user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Eduwork-Store</Link>
      </div>
      <ul>
        {user ? (
          <>
            {cart.length ? cart.length : count === 0 ? "" : count}
            <li>
              <Link to="/cart">
                <FaCartPlus /> Cart
              </Link>
            </li>
            <li>
              <Link to="/account">
                <FaUser /> Account
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to="/register">
                <FaUser /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
