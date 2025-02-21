import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className="home-container">
      <div className={`home-text ${animate ? "animate" : ""}`}>
        <h1>GESTOR</h1>
        <h1>ALIEN</h1>
        <h1>OMNITRIX</h1>
      </div>
      <button className={`home-button ${animate ? "animate" : ""}`} onClick={() => navigate("/login")}>
        Iniciar
      </button>
    </div>
  );
}

export default Home;
