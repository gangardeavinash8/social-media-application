import React from "react";
import { Link } from "react-router-dom";
import "./Singup.scss";

function Signup() {
  return (
    <div className="Signup">
      <div className="signup-box">
        <h2 className="heading">Signup</h2>
        <form>
          <label htmlFor="name">Name</label>
          <input type="text" className="name" id="name" />

          <label htmlFor="email">Email</label>
          <input type="emil" className="email" id="email" />

          <label htmlFor="password">Password</label>
          <input type="password" className="password" id="password" />

          <input type="submit" className="submit" />
        </form>

        <p className="subheading">
          Already have an account? <Link to="/login">Log In</Link>{" "}
        </p>
      </div>
    </div>
  );
}

export default Signup;
