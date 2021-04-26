import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Authentication Home Page</h1>
      <Link to="/register" class="btn btn-warning" id="login" role="button">
        Register/Login
      </Link>
    </div>
  );
};

export default Home;
