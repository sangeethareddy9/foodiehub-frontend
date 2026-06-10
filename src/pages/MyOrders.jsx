import { useEffect, useState } from "react";
import api from "../services/api";

function MyOrders() {
  const [orders, setOrders] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    getOrders();
  }, []);

  async function getOrders() {
    if (!user) {
      return;
    }

    try {
      const response = await api.get(
        `/orders?userId=${user.id}`
      );

      setOrders(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  if (!user) {
    return (
      <div className="empty-favorites">
        <h2>Please login to view your orders</h2>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <div className="empty-favorites">
          <h2>No orders yet</h2>
          <p>Place an order from your cart.</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div className="order-card" key={order.id}>
              <div className="order-header">
                <h2>Order ID: {order.id}</h2>
                <span>{order.status}</span>
              </div>

              <p>
                <strong>Date:</strong> {order.orderDate}
              </p>

              <p>
                <strong>Total:</strong> ₹{order.totalPrice}
              </p>

              <h3>Ordered Items</h3>

              <div className="order-items">
                {order.items.map((item) => (
                  <div
                    className="order-item"
                    key={item.id}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                    />

                    <div>
                      <h4>{item.name}</h4>
                      <p>{item.cuisine}</p>
                      <p>₹{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyOrders;