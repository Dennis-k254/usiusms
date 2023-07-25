import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Menu from "../components/Menu";
import HeadSec from "../components/HeadSec";
import ScholCard from "../components/ScholCard";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  createScholarship,
  getScholarships,
  getUserScholarships,
} from "../features/scholarshipSlice";
import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined";

const ScholCollection = () => {
  const scholarships = useSelector((state) => state.schol.scholarships);
  const userScholarships = useSelector((state) => state.schol.userScholarships);
  const auth = useSelector((state) => state.auth);

  const [selectedDate, setSelectedDate] = useState(null);
  const [newScholarship, setNewScholarship] = useState({
    scholarshipName: "",
    category: "",
    applicationDeadline: "",
  });

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setNewScholarship({
      ...newScholarship,
      applicationDeadline: date,
    });
  };

  const dispatch = useDispatch();

  const [showForm, setShowForm] = useState(false);
  const [institutional, setInstitutional] = useState(false);
  const [external, setExternal] = useState(false);
  const [sports, setSports] = useState(false);
  const [diversity, setDiversity] = useState(false);
  const [full, setFull] = useState(false);
  const [partial, setPartial] = useState(false);
  const [physicall, setPhysicall] = useState(false);
  const [underprivilleged, setUnderprivilleged] = useState(false);
  const [educational, setEducational] = useState(false);
  const [masterCard, setMasterCard] = useState(false);

  const handleAddButtonClick = () => {
    setShowForm(true);
  };

  const handleFormSubmit = () => {
    // Scholarship submission logic
    dispatch(createScholarship(newScholarship))
      .then(() => {
        setShowForm(false);
        setNewScholarship({
          scholarshipName: "",
          category: "",
          applicationDeadline: "",
        });
        setSelectedDate(null);
        dispatch(getScholarships());
      })
      .catch((error) => {
        console.log("Error creating scholarship:", error);
      });
    console.log(newScholarship);
    setShowForm(false);
  };

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;

    setInstitutional(selectedValue === "Institutional");
    setExternal(selectedValue === "External");
    setSports(selectedValue === "Sports");
    setDiversity(selectedValue === "Diversity");
    setNewScholarship({
      ...newScholarship,
      scholarshipName: selectedValue,
    });
  };

  const handleCategoryChange = (event) => {
    const categoryValue = event.target.value;

    setFull(categoryValue === "Full");
    setPartial(categoryValue === "Partial");
    setEducational(categoryValue === "Educational Trustfund");
    setUnderprivilleged(categoryValue === "Underprivilleged Communities");
    setMasterCard(categoryValue === "Mater Card");
    setPhysicall(categoryValue === "Physically Challenged");

    setNewScholarship({
      ...newScholarship,
      category: categoryValue,
    });
  };

  useEffect(() => {
    dispatch(getUserScholarships({ userId: auth._id }));
    console.log("sueer", userScholarships);
  });

  return (
    <div className="flex flex-row bg-gray ">
      <div>
        <Menu />
      </div>
      <div className="  flex flex-col w-full mx-8 ">
        <div>
          <HeadSec />
        </div>
        <div className="bg-white rounded-lg min-h-[80vh] flex flex-col items-center text-darkblue font-bold">
          <div className="flex flex-row justify-around w-full">
            <h1 className="w-full flex text-[30px] p-10">
              Scholarship Collection
            </h1>
            <button
              className={`${
                auth.isAdmin ? "m-8 bg-darkblue text-white w-28" : "hidden"
              }`}
              onClick={handleAddButtonClick}
            >
              ADD
            </button>
          </div>

          <div className="flex flex-row gap-20 flex-wrap items-center justify-center ">
            {showForm ? (
              <div className="flex flex-col justify-center ">
                <div className="gap-2 flex flex-col ">
                  <h1>Scholarship Name</h1>
                  <select
                    onChange={handleSelectChange}
                    className="flex flex-col border-2"
                  >
                    <option>Select</option>
                    <option value="Institutional">
                      Institutional Scholarship
                    </option>
                    <option value="External">External Scholarship</option>
                    <option value="Sports">Sports Scholarship</option>
                    <option value="Diversity">Diversity Scholarship</option>
                  </select>
                </div>
                <div className="gap-2 flex flex-col">
                  <h1>Category</h1>
                  <select
                    className="flex flex-col border-2"
                    onChange={handleCategoryChange}
                  >
                    <option>Select</option>
                    {institutional ? (
                      <>
                        <option value="Full">Full</option>
                        <option value="Partial">Partial</option>{" "}
                      </>
                    ) : external ? (
                      <>
                        <option value="Matercard Foundation">
                          MaterCard Foundation
                        </option>
                        <option value="Educational Trustfund">
                          Educational Trustfund
                        </option>{" "}
                      </>
                    ) : diversity ? (
                      <>
                        {" "}
                        <option value="Underprivilleged Communities">
                          Underprivilleged Communities
                        </option>{" "}
                        <option value="Physically Challenged">
                          Physically Challenged
                        </option>{" "}
                      </>
                    ) : null}
                  </select>
                </div>
                <div className="gap-2 flex flex-col w-full">
                  <h1>Application Deadline</h1>
                  <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="dd/MM/yyyy"
                    placeholderText={
                      selectedDate
                        ? selectedDate.toLocaleDateString()
                        : "Select Date"
                    }
                    className=" flex flex-col border-2 w-full"
                  />
                </div>

                <button
                  onClick={handleFormSubmit}
                  className="m-8 bg-darkblue text-white w-28 py-8"
                >
                  SUBMIT
                </button>
              </div>
            ) : auth.isAdmin ? (
              <div className="flex flex-row gap-20 flex-wrap items-center justify-center ">
                <div className="gap-10 flex flex-row flex-wrap items-center justify-center">
                  {scholarships.map((scholarship) => (
                    <div key={scholarship.id}>
                      <ScholCard scholarship={scholarship} />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-row flex-wrap gap-10 m-4">
                {userScholarships.scholarships.map((scholarships) => (
                  <>
                    <div className="flex flex-col items-center justify-center bg-gray rounded-lg p-10">
                      <FolderOpenOutlinedIcon
                        className="text-[100px]"
                        fontSize=""
                      />
                      <p>{scholarships.scholarship.scholarshipName}</p>
                      <p>{scholarships.category}</p>
                      <p>{scholarships.status}</p>
                    </div>
                  </>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScholCollection;
