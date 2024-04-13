import React from "react";
import { axiosClient } from "../../utils/axiosClient";
import { useEffect } from "react";

function Home() {
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const response = await axiosClient.get("/post/all");
    console.log(" got the response", response);
  }

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}

export default Home;
