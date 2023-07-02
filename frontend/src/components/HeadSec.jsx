import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import ReportGmailerrorredOutlinedIcon from "@mui/icons-material/ReportGmailerrorredOutlined";
import LogoutIcon from "@mui/icons-material/Logout";

import { useDispatch, useSelector } from "react-redux";

const HeadSec = () => {
  const auth = useSelector((state) => state.auth);
  return (
    <div className="flex flex-col justify-center items-center w-[100%] my-10  gap-20">
      <div className=" flex flex-row justify-between w-[100%] gap-40">
        <h1 className="text-darkblue font-bold text-[20px]">
          Welcome, Student {auth.name}
        </h1>
        <div className="bg-white p-2 rounded-full flex flex-row text-blue-200 gap-12 items-center ">
          <div className="flex flex-row bg-transblue rounded-full mx-4 items-center justify-center px-2 ">
            <SearchIcon />
            <input
              type="text"
              placeholder="search"
              className="bg-transparent "
            ></input>
          </div>
          <div className="flex flex-row">
            <NotificationsNoneIcon />
            <ReportGmailerrorredOutlinedIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeadSec;
