import React from "react";
import Menu from "../components/Menu";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import ReportGmailerrorredOutlinedIcon from "@mui/icons-material/ReportGmailerrorredOutlined";
import ApprovalIcon from "@mui/icons-material/Approval";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";

function Home() {
  return (
    <div className=" flex flex-row h-[100%] ">
      <div className="h-[100%]">
        <Menu />
      </div>
      <div className="w-[100%]  ">
        <div className="flex flex-col justify-center items-center w-[100%] my-10  gap-20 ">
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

          <div className="flex flex-row flex-wrap items-center justify-around gap-20   p-20 ">
            <div className="bg-white rounded-lg w-[300px] h-[300px] justify-center items-center flex flex-col text-darkblue shadow-lg opacity-70 hover:opacity-95 ">
              <h1 className="font-bold text-[20px] ">Apply schorlaship</h1>

              <ApprovalIcon className="text-[200px]" fontSize="" />
            </div>
            <div className="bg-white rounded-lg w-[300px] h-[300px] justify-center items-center flex flex-col text-darkblue shadow-lg opacity-70 hover:opacity-95  ">
              <h1 className="font-bold text-[20px]">Renew schorlaship</h1>
              <EventRepeatIcon className="text-[200px]" fontSize="" />{" "}
            </div>
            <div className="bg-white rounded-lg w-[300px] h-[300px] justify-center items-center flex flex-col text-darkblue shadow-lg opacity-70 hover:opacity-95 ">
              <h1 className="font-bold text-[20px]">Schorlaship List</h1>
              <LibraryBooksIcon className="text-[200px]" fontSize="" />
            </div>
            <div className="bg-white rounded-lg w-[300px] h-[300px] justify-center items-center flex flex-col text-darkblue shadow-lg opacity-70 hover:opacity-95 ">
              <h1 className="font-bold text-[20px]">Profile</h1>
              <PersonIcon className="text-[200px]" fontSize="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
