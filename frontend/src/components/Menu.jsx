import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import ApprovalIcon from "@mui/icons-material/Approval";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { logo } from "../assets";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  

  return (
    <div className="bg-darkblue rounded-r-2xl flex flex-col text-white w-[200px] items-center gap-32 h-[130vh] ">
      <img
        src={logo}
        alt="schorlaship_logo"
        className="bg-gray rounded-full py-2 px-3 mt-28"
      />
      <ul className="flex flex-col gap-2 cursor-pointer text-[14px]">
        <Link to="/">
          {" "}
          <li className="flex flex-row gap-2">
            <HomeIcon />
            Dashboard
          </li>
        </Link>

        {/* Can only be seen by the student*/}

        {auth.isAdmin ? null : (
          <Link to="/apply">
            {" "}
            <li className="flex flex-row gap-2">
              <ApprovalIcon />
              Apply Scholarship
            </li>
          </Link>
        )}

        {/* Can only be seen by the student*/}

        {auth.isAdmin ? null : (
          <li className="flex flex-row gap-2">
            <EventRepeatIcon />
            Renew Scholarship
          </li>
        )}

        <Link to="/scholarships">
          <li className="flex flex-row gap-2">
            <LibraryBooksIcon />
            Scholarship Collection
          </li>
        </Link>

        <li className="flex flex-row gap-2">
          <PersonIcon />
          Profile
        </li>
        <Link to="/login">
          <li className="flex flex-row gap-2" onClick={handleLogout}>
            <LogoutIcon />
            {auth._id ? <p>Logout</p> : <p>Login</p>}
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default Menu;
