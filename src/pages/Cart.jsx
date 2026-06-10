import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  clearCart
} from "../features/cartSlice";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);

  const user = JSON.parse(localStorage.getItem("user"));

  const totalPrice = cart.reduce(
    (total, item) => total + Number(item.price),
    0
  );

  async function handleOrder() {
    if (!user) {
      alert("Please login to place order");
      navigate("/login");
      return;
    }

    const orderData = {
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      items: cart,
      totalPrice: totalPrice,
      orderDate: new Date().toLocaleString(),
      status: "Order Placed"
    };

    await api.post("/orders", orderData);

    alert("Order placed successfully!");

    dispatch(clearCart());

    navigate("/my-orders");
  }

  return (
    <div className="cart-container">
      <h1>My Cart</h1>

      {cart.length === 0 ? (
        <div className="empty-favorites">
          <h2>Your cart is empty</h2>
          <p>Add food items from the Foods page.</p>
        </div>
      ) : (
        <>
          <div className="cart-grid">
            {cart.map((item) => (
              <div className="cart-card" key={item.id}>
                <img src={item.image} alt={item.name} />

                <div className="cart-content">
                  <h2>{item.name}</h2>
                  <p>🍽️ {item.cuisine}</p>
                  <p>⭐ {item.rating}</p>
                  <p>💰 ₹{item.price}</p>

                  <button
                    onClick={() =>
                      dispatch(removeFromCart(item.id))
                    }
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="order-box">
            <h2>Total Amount: ₹{totalPrice}</h2>

            <button onClick={handleOrder}>
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;