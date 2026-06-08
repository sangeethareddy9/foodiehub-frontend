import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

function FoodDetails() {
  const { id } = useParams();

  const [food, setFood] = useState(null);

  useEffect(() => {
    getFood();
  }, []);

  async function getFood() {
    try {
      const response = await api.get(`/foods/${id}`);
      setFood(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  if (!food) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="details">
      <img
        src={food.image}
        alt={food.name}
      />

      <h1>{food.name}</h1>

      <p>{food.description}</p>

      <h3>Cuisine</h3>
      <p>{food.cuisine}</p>

      <h3>Category</h3>
      <p>{food.category}</p>

      <h3>Origin</h3>
      <p>{food.origin}</p>

      <h3>Calories</h3>
      <p>{food.calories}</p>

      <h3>Price</h3>
      <p>₹ {food.price}</p>

      <h3>Rating</h3>
      <p>{food.rating}</p>

      <h3>Famous For</h3>
      <p>{food.famousFor}</p>

      <h3>Ingredients</h3>

      <ul>
        {food.ingredients?.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default FoodDetails;