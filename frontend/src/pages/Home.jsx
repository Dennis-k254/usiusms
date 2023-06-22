import Menu from "../components/Menu";
import ApprovalIcon from "@mui/icons-material/Approval";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import PersonIcon from "@mui/icons-material/Person";
import HeadSec from "../components/HeadSec";


function Home() {
  return (
    <div className=" flex flex-row h-[100%] ">
      <div className="h-[100%]">
        <Menu />
      </div>
      <div className="w-[100%] ">
        <div className="flex flex-col justify-center items-center w-[100%] my-10  gap-20 ">
          <HeadSec />

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
