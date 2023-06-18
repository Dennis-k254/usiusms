import React from "react";
import Menu from "../components/Menu";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import ReportGmailerrorredOutlinedIcon from "@mui/icons-material/ReportGmailerrorredOutlined";

function Home() {
  return (
    <div className=" flex flex-row   h-[100%] items-start">
      <div className="h-[100%]">
        <Menu />
      </div>
      <div className="flex flex-col justify-around w-[100%] my-10 ">
        <div className=" flex flex-row justify-around w-[100%]">
          <h1 className="text-darkblue font-bold text-[20px]">
            Welcome, Student
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
    </div>
  );
}

export default Home;
