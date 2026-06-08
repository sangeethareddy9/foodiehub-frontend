import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="hero">
      <div className="hero-content">
        <h1>🍽️ FoodieHub</h1>

        <p>
          Discover tasty foods, explore cuisines, and manage
          your favorite dishes in one place.
        </p>

        <Link to="/foods" className="hero-btn">
          Explore Foods
        </Link>
      </div>
    </div>
  );
}

export default Home;