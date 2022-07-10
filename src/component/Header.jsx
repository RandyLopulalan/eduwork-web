import { FaCartPlus, FaSignInAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const { user } = useSelector((state) => state.auth);
  const {count} = useSelector(state => state.cart)

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Eduwork-Store</Link>
      </div>
      <ul>
        {user ? (
          <>
            <li>
              {count === 0 ? "" : count}
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
