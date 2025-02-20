import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="/app">
      <img className="h-11" src="/icon.png" alt="Ben 100 logo" />
    </Link>
  );
}

export default Logo;
