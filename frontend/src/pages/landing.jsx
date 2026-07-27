import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="landingPageContainer">
      <nav>
        <div className="navHeader">
          <h2>Video Call</h2>
        </div>

        <div className="navlist">
          <p>Join as Guest</p>
          <p>Register</p>
          <Link to="/auth" style={{ textDecoration: "none", color: "inherit" }}>
            <p>Login</p>
          </Link>
        </div>
      </nav>

      <div className="landingMainContainer">
        <div>
          <h1>
            <span style={{ color: "#ff9839" }}>Connect</span> With Your Loved
            Once
          </h1>

          <p>Cover Distance By Video Call</p>

          <div role="button">
            <Link to={"/auth"}>Get Started</Link>
          </div>
        </div>

        <div>
          <img src="/mobile.png" alt="" />
        </div>
      </div>
    </div>
  );
}