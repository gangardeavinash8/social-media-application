import React from "react";
import "./Login.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import { axiosClient } from "../../utils/axiosClient";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try{
    const result = await axiosClient.post("/auth/login", {
      email,
      password,
    }); //login request is a post request

    
    console.log(result);
  }

  catch(err){
    console.log(err);
  }

    
  }

  return (
    <div className="Login">
      <div className="login-box">
        <h2 className="heading">Login</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="emil"
            className="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <input type="submit" className="submit" />
        </form>

        <p className="subheading">
          Do not have an account? <Link to="/signup">Signup</Link>{" "}
        </p>
      </div>
    </div>
  );
}

export default Login;
