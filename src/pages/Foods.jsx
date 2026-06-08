import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import FoodCard from "../components/FoodCard";

function Foods() {
  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    getFoods();
  }, []);

  async function getFoods() {
    try {
      const response = await api.get("/foods");
      setFoods(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteFood(id) {
    try {
      await api.delete(`/foods/${id}`);

      setFoods(
        foods.filter((food) => food.id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  }

  let filteredFoods = foods.filter((food) =>
    food.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (cuisine !== "") {
    filteredFoods = filteredFoods.filter(
      (food) => food.cuisine === cuisine
    );
  }

  if (sort === "rating") {
    filteredFoods = [...filteredFoods].sort(
      (a, b) => b.rating - a.rating
    );
  }

  if (sort === "price-low") {
    filteredFoods = [...filteredFoods].sort(
      (a, b) => a.price - b.price
    );
  }

  if (sort === "price-high") {
    filteredFoods = [...filteredFoods].sort(
      (a, b) => b.price - a.price
    );
  }

  return (
    <>
      <h1>Popular Foods</h1>

      <Link to="/add-food" className="add-btn">
        Add Food
      </Link>

      <div className="filter-box">
        <input
          type="text"
          placeholder="Search food..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}
        >
          <option value="">All Cuisines</option>
          <option value="Indian">Indian</option>
          <option value="Italian">Italian</option>
          <option value="American">American</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sort</option>
          <option value="rating">
            Rating High to Low
          </option>
          <option value="price-low">
            Price Low to High
          </option>
          <option value="price-high">
            Price High to Low
          </option>
        </select>
      </div>

      <div className="foods">
        {filteredFoods.map((food) => (
          <FoodCard
            key={food.id}
            food={food}
            onDelete={deleteFood}
          />
        ))}
      </div>
    </>
  );
}

export default Foods;