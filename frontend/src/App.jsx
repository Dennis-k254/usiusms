import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Apply from "./pages/Apply";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import AdminDash from "./pages/AdminDash";
import ScholCollection from "./pages/ScholCollection";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MangeUsers from "./pages/ManageUsers";
import Profile from "./pages/Profile";
import ReqResPass from "./pages/ReqResPass";
import ResetPass from "./pages/ResetPass";

function App() {
  return (
    <div className="App flex-1 overflow-x-hidden hide-scrollbar  flex-col-reverse  h-[100vh]">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDash />} />
        <Route path="/scholarships" element={<ScholCollection />} />
        <Route path="/users" element={<MangeUsers />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/reqrespass" element={<ReqResPass />} />
        <Route path="/reset-password-confirmation" element={<ResetPass />} />
      </Routes>
    </div>
  );
}

export default App;
