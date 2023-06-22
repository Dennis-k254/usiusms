import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Apply from "./pages/Apply";
import Login from "./pages/Login";

function App() {
  return (
    <div className="App flex-1 overflow-x-hidden hide-scrollbar  flex-col-reverse ">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
