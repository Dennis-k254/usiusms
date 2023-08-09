import React from "react";
import { useSelector } from "react-redux";
import HeadSec from "../components/HeadSec";
import Menu from "../components/Menu";
import { Link } from "react-router-dom";

const Profile = () => {
  const auth = useSelector((state) => state.auth);

  return (
    <div className="flex flex-row gap-10 text-darkblue ">
      <Menu />
      <div className="flex flex-col items-center  w-full pr-20">
        <HeadSec />
        <h1 className="font-bold text-[40px] ">User Information </h1>
        <div className="flex flex-col gap-10 w-full">
          <p className="font-bold border-b-2 ">
            {auth.isAdmin ? "Admin" : "Student"}
          </p>
          <p className="border-b-2 font-bold">
            Name : <span>{auth.name}</span>
          </p>
          <p className="border-b-2 font-bold">
            Email : <span>{auth.email}</span>
          </p>
        </div>
        <Link to="/reqrespass">
          <button className="bg-darkblue text-white rounded px-6 py-2 m-4 mt-10">
            Reset Password
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Profile;
