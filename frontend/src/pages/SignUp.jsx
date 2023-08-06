import React, { useState } from "react";
import { login } from "../assets";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import GoogleIcon from "@mui/icons-material/Google";
import { google } from "../assets";
import { registerUser } from "../features/authSlice";

const SignUp = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPass: "",
    gpa: 0.0, // Initialize GPA to 0.0 for new users
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(user));
  };

  const confirmPass = () => {
    const isMatching = user.password === user.confirmPass && user.password.length > 3;
    return isMatching;
  };

  const handleGPAChange = (e) => {
    setUser({
      ...user,
      gpa: parseFloat(e.target.value),
    });
  };

  return (
    <div className="flex lg:flex-row flex-col  justify-between items-center h-[100vh]">
      <div>
        <img className="" src={login} />
      </div>

      <div className="flex flex-col lg:w-[50%] gap-10">
        <div className="flex flex-col items-center gap-2">
          <h1 className="flex  fon-bold text-[30px] font-bold w-full">
            Create Account
          </h1>
          <button className="shadow-lg rounded-md w-[200px] p-2 flex items-center ">
            <img src={google} alt="google" className="w-[40px]" /> Sign up with
            Google
          </button>
          <p className="text-txtgray">
            -{""}OR{""}-
          </p>
        </div>
        <div className="flex flex-col w-full gap-10 px-20 ">
          <form className="flex flex-col w-full gap-4">
            <input
              type="text"
              placeholder="Full Name"
              className=" bg-transparent border-b-[1px] pb-3  border-txtgray"
              onChange={(e) => {
                setUser({ ...user, name: e.target.value });
              }}
            />

            <input
              type="text"
              placeholder="Email Adress"
              className=" bg-transparent border-b-[1px] pb-3 border-txtgray"
              onChange={(e) => {
                setUser({ ...user, email: e.target.value });
              }}
            />

            <input
              type="password"
              placeholder="Password"
              className=" bg-transparent border-b-[1px] pb-3 border-txtgray"
              onChange={(e) => {
                confirmPass();
                setUser({ ...user, password: e.target.value });
              }}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className=" bg-transparent border-b-[1px] pb-3 border-txtgray"
              onChange={(e) => {
                confirmPass();
                setUser({ ...user, confirmPass: e.target.value });
              }}
            />

            <div>
              <label>GPA:</label>
              <input
                type="number"
                step="0.01"
                value={user.gpa}
                onChange={handleGPAChange}
              />
            </div>
          </form>

          {confirmPass() ? (
            <p className="text-style: italic mb-4 font-bold text-green">
              It's a match, proceed.
            </p>
          ) : user.confirmPass.length < 3 ? null : (
            <p className="text-style: italic mb-4 font-bold text-red-800">
              Passwords don't match
            </p>
          )}

          <div>
            <button
              className="bg-blue-900  text-white rounded-lg px-4 py-2 w-full"
              onClick={handleSubmit}
            >
              Create Account
            </button>
          </div>
          <div className="flex">
            <p className="text-txtgray">
              Already have an account?{" "}
              <Link className="text-darkblue" to="/login">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
