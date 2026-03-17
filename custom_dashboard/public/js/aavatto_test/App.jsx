import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Orders from "./pages/Orders";

const App = () => {
  return (
    <div style={{ border: "4px solid red", minHeight: "500px", width: "100%", background: "#fff" }}>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <h3>Dashboard Section:</h3>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
export { App };
