import React from "react";

import { Routes, Route } from "react-router-dom";
import Signup from "./pages/signup/Singup";
import Login from "./pages/login/Login";
import Home from "./pages/homepage/Home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
