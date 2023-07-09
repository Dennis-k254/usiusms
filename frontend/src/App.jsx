import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Apply from "./pages/Apply";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import ScholCollection from "./pages/ScholCollection";

function App() {
  return (
    <div className="App flex-1 overflow-x-hidden hide-scrollbar  flex-col-reverse  h-[100vh]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/scholarships" element={<ScholCollection />} />
      </Routes>
    </div>
  );
}

export default App;
