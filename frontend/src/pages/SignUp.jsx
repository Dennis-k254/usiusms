import React from "react";
import { login } from "../assets";
import GoogleIcon from "@mui/icons-material/Google";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import { Link } from "react-router-dom";
import { google } from "../assets";

const SignUp = () => {
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
            />

            <input
              type="text"
              placeholder="Email Adress"
              className=" bg-transparent border-b-[1px] pb-3 border-txtgray"
            />

            <input
              type="password"
              placeholder="Password"
              className=" bg-transparent border-b-[1px] pb-3 border-txtgray"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className=" bg-transparent border-b-[1px] pb-3 border-txtgray"
            />
          </form>

          <div className="flex flex-row items-start  ">
            <form className="gap-2 flex w-full font-semibold   ">
              <h1>Role:</h1>
              <input type="radio" value="students" />
              <label htmlFor="html">Students</label>
              <input type="radio" value="finance" />
              <label htmlFor="html">Finance</label>
              <input type="radio" value="admin" />
              <label htmlFor="html">Admin</label>
            </form>
          </div>
          <div>
            <button className="bg-blue-900  text-white rounded-lg px-4 py-2 w-full">
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
