import React from "react";
import { Link } from "react-router-dom";
import '../UserStyle/UserHome.css'; 

const HomePage = () => {
  return (
    <div className="container">
      <div className="home">
        <h1>Discover the Best Food and Dining Experiences</h1>
        <p>Join a community of foodies sharing their favorite meals and restaurants.</p>
        <div className="buttons">
          <Link to="/log" className="button">
            Sign In
          </Link>
          <Link to="/reg" className="button">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
