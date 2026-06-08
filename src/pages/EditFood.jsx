import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function EditFood() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    cuisine: "",
    category: "",
    image: "",
    description: ""
  });

  useEffect(() => {
    getFood();
  }, []);

  async function getFood() {
    const response = await api.get(`/foods/${id}`);
    setFormData(response.data);
  }

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    await api.put(`/foods/${id}`, formData);

    navigate("/foods");
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Edit Food</h2>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="cuisine"
          value={formData.cuisine}
          onChange={handleChange}
        />

        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
        />

        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />

        <button className="submit-btn">
          Update Food
        </button>
      </form>
    </div>
  );
}

export default EditFood;