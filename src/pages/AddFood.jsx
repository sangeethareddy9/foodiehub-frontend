import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function AddFood() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    cuisine: "",
    category: "",
    image: "",
    description: ""
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    await api.post("/foods", formData);

    navigate("/foods");
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Add Food</h2>

        <input
          type="text"
          name="name"
          placeholder="Food Name"
          onChange={handleChange}
        />

        <input
          type="text"
          name="cuisine"
          placeholder="Cuisine"
          onChange={handleChange}
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          onChange={handleChange}
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
        />

        <button className="submit-btn">
          Add Food
        </button>
      </form>
    </div>
  );
}

export default AddFood;