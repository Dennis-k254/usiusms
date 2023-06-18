import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import ApprovalIcon from "@mui/icons-material/Approval";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";

const Menu = () => {
  return (
    <div className=" bg-darkblue h-[100%] rounded-r-2xl justify-center flex flex-col text-white w-[200px] items-center ">
      <ul className="flex flex-col gap-2 cursor-pointer">
        <li className="flex flex-row gap-2">
          <HomeIcon />
          Dashboard
        </li>
        <li className="flex flex-row gap-2">
          <ApprovalIcon />
          Apply Schorlaship
        </li>
        <li className="flex flex-row gap-2">
          <EventRepeatIcon />
          Renew Schorlaship
        </li>
        <li className="flex flex-row gap-2">
          <LibraryBooksIcon />
          Schorlaship Collection
        </li>
        <li className="flex flex-row gap-2">
          <PersonIcon />
          Profile
        </li>
        <li className="flex flex-row gap-2">
          <LogoutIcon />
          Logout
        </li>
      </ul>
    </div>
  );
};

export default Menu;
