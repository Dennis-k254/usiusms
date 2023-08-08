import React, { useEffect } from "react";
import { getUsers, toggleAdmin, userDelete } from "../features/authSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import HeadSec from "../components/HeadSec";
import Menu from "../components/Menu";

const MangeUser = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const handleToggleAdmin = (userId) => {
    dispatch(toggleAdmin(userId));
  };
  const handleDelete = (userId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (confirmed) {
      dispatch(userDelete(userId));
    }
  };

  useEffect(() => {
    dispatch(getUsers());
  }, [handleToggleAdmin, userDelete]);

  return (
    <div className="flex flex-row gap-10">
      <Menu />
      <div className="flex flex-col">
        <HeadSec />
        <div className="flex flex-col items-center justify-center w-full mx-4 ">
          <h1 className="font-bold my-4 text-[30px]">Accounts</h1>
          <div className="grid flex-col grid-cols-4 gap-4 mx-2 w-full ">
            {auth.users.map((person, i) => (
              <React.Fragment key={person._id}>
                <div className="">{i + 1}</div>
                <div className="">{person.name}</div>
                <div className="">{person.email}</div>
                <div className="text-blue-800 font-bold flex flex-row items-center gap-4 ">
                  {person.isAdmin ? "True" : "False"}
                  <div className=" border border-black items-center flex px-1 w-[76px] rounded-full   ">
                    <button
                      className={`${
                        person.isAdmin ? "bg-green " : "bg-red-800"
                      } py-2 rounded-full w-[40px] focus:outline-none transition-transform `}
                      onClick={() => handleToggleAdmin(person._id)}
                      style={{
                        transform: person.isAdmin
                          ? "translateX(26px)"
                          : "translateX(0)",
                      }}
                    ></button>
                  </div>
                  <div>
                    <DeleteIcon
                      className="text-green ml-10"
                      onClick={() => handleDelete(person._id)}
                    />
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MangeUser;
