import Menu from "../components/Menu";
import ApprovalIcon from "@mui/icons-material/Approval";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import PersonIcon from "@mui/icons-material/Person";
import HeadSec from "../components/HeadSec";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getScholarships } from "../features/scholarshipSlice";
import { useNavigate } from "react-router-dom";

function Home() {
  const auth = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const handleMangeUsers = () => {
    navigate("/users");
  };

  const handleToProfile = () => {
    navigate("/profile");
  };

  return (
    <div className="flex flex-row  h-[100vh]">
      <div className="">
        <Menu />
      </div>
      <div className=" items-center flex flex-col  w-full ">
        <div className="flex flex-col ">
          <HeadSec />

          {/*Rendering homapage icons depending on the user's privillages */}

          {auth.isAdmin ? (
            <>
              {/*Admin */}
              <div className="flex flex-row flex-wrap gap-12 items-center justify-center">
                {" "}
                <Link to="/scholarships">
                  <div className="bg-white rounded-lg w-[250px] h-[250px] justify-center items-center flex flex-col text-darkblue shadow-lg opacity-70 hover:opacity-95 ">
                    <h1 className="font-bold text-[20px]">
                      Scholarship Collection
                    </h1>
                    <LibraryBooksIcon className="text-[200px]" fontSize="" />
                  </div>
                </Link>
                <div
                  className="bg-white rounded-lg w-[250px] h-[250px] justify-center items-center flex flex-col text-darkblue shadow-lg opacity-70 hover:opacity-95 "
                  onClick={handleToProfile}
                >
                  {" "}
                  <h1 className="font-bold text-[20px]">Profile</h1>
                  <PersonIcon className="text-[200px]" fontSize="" />
                </div>
                <div
                  className="bg-white rounded-lg w-[250px] h-[250px] justify-center items-center flex flex-col text-darkblue shadow-lg opacity-70 hover:opacity-95 "
                  onClick={handleMangeUsers}
                >
                  <h1 className="font-bold text-[20px]">Manage users</h1>

                  <PersonIcon className="text-[200px]" fontSize="" />
                </div>
              </div>
            </>
          ) : (
            <>
              {/*User */}
              <div className="flex flex-row flex-wrap items-center justify-around gap-20 max-w-[800px] p-20">
                <Link to="/apply">
                  {" "}
                  {/* Add the Link component here */}
                  <div className="bg-white rounded-lg w-[250px] h-[250px] justify-center items-center flex flex-col text-darkblue shadow-lg opacity-70 hover:opacity-95">
                    <h1 className="font-bold text-[20px]">Apply Scholarship</h1>
                    <ApprovalIcon className="text-[200px]" fontSize="" />
                  </div>
                </Link>
                <div className="bg-white rounded-lg w-[250px] h-[250px] justify-center items-center flex flex-col text-darkblue shadow-lg opacity-70 hover:opacity-95  ">
                  <h1 className="font-bold text-[20px]">Renew Scholarship</h1>
                  <EventRepeatIcon className="text-[200px]" fontSize="" />{" "}
                </div>

                <Link to="/scholarships">
                  <div className="bg-white rounded-lg w-[250px] h-[250px] justify-center items-center flex flex-col text-darkblue shadow-lg opacity-70 hover:opacity-95 ">
                    <h1 className="font-bold text-[20px]">
                      Scholarship Collection
                    </h1>
                    <LibraryBooksIcon className="text-[200px]" fontSize="" />
                  </div>
                </Link>
                <Link to="/profile">
                  <div className="bg-white rounded-lg w-[250px] h-[250px] justify-center items-center flex flex-col text-darkblue shadow-lg opacity-70 hover:opacity-95 ">
                    <h1 className="font-bold text-[20px]">Profile</h1>
                    <PersonIcon className="text-[200px]" fontSize="" />
                  </div>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
