import React from "react";
import { welcome } from "../assets";
import { google } from "../assets";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="flex lg:flex-row flex-col justify-between  ">
      <div className="flex flex-col items-center justify-center gap-10  w-[50vw] p-20">
        <h1 className="font-bold text-[50px] ">WELCOME</h1>
        <p className="text-txtgray ">Please enter your details</p>
        <form className="flex flex-col gap-4 w-full">
          <p className="w-full flex font-bold">Email</p>
          <input
            type="text"
            placeholder="Enter your email"
            className="border-2 p-4 border-gray rounded-xl "
          />
          <p className="w-full flex font-bold">Password</p>
          <input
            type="password"
            placeholder="**********"
            className="border-2 p-4 border-gray rounded-xl"
          />
        </form>

        <div className="flex flex-row w-full justify-between font-semibold">
          <div className="flex flex-row gap-2">
            <input type="checkbox" /> <p>Remember me</p>
          </div>
          <p>Forgot password ? </p>
        </div>

        <div className="w-full ">
          <button className="bg-blue-900  text-white rounded-lg px-4 py-2 w-full">
            Sign in
          </button>
        </div>

        <button className="shadow-lg border-[1px] border-txtgray rounded-xl w-full p-2 flex items-center justify-center ">
          <img src={google} alt="google" className="w-[60px]" /> Sign up with
          Google
        </button>
        <div>
          <p>
            Dont have an account ?{" "}
            <Link className="text-darkblue font-semibold" to="/signup">
              Sign up for free!
            </Link>
          </p>
        </div>
      </div>
      <div>
        <img src={welcome} alt="welcome" className="" />
      </div>
    </div>
  );
};

export default Login;
