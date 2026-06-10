import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addFavorite } from "../features/favoriteSlice";
import { addToCart } from "../features/cartSlice";

function FoodCard({ food, onDelete }) {
  const dispatch = useDispatch();

  function handleFavorite() {
  dispatch(addFavorite(food));
  alert("❤️ Added to Favorites");
    }

  function handleCart() {
    dispatch(addToCart(food));
    alert("Food added to cart!");
  }

  return (
    <div className="card">
      <img src={food.image} alt={food.name} />

      <h3>{food.name}</h3>

      <p>{food.cuisine}</p>
      <p>{food.category}</p>
      <p>⭐ {food.rating}</p>
      <p>₹ {food.price}</p>

      <button
        className="favorite-btn"
        onClick={handleFavorite}
      >
        ❤ Add To Favorites
      </button>

      <button
        className="cart-btn"
        onClick={handleCart}
      >
        🛒 Add To Cart
      </button>

      <div className="card-actions">
        <Link
          className="view-btn"
          to={`/foods/${food.id}`}
        >
          View
        </Link>

        <Link
          className="edit-btn"
          to={`/edit-food/${food.id}`}
        >
          Edit
        </Link>

        <button
          className="delete-btn"
          onClick={() => onDelete(food.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default FoodCard;