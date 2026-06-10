import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  const favorites = useSelector(
    (state) => state.favorites
  );

  const cart = useSelector(
    (state) => state.cart
  );

  return (
    <nav>
      <Link to="/">Home</Link>

      <Link to="/foods">Foods</Link>

      <Link to="/favorites">
        Favorites ({favorites.length})
      </Link>

      <Link to="/cart">
        Cart ({cart.length})
      </Link>

      {user && (
        <Link to="/my-orders">
          My Orders
        </Link>
      )}

      {!user && (
        <>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </>
      )}

      {user && <Link to="/logout">Logout</Link>}
    </nav>
  );
}

export default Navbar;