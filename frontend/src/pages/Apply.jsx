// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import HeadSec from "../components/HeadSec";
import Menu from "../components/Menu";
import ScholCard from "../components/ScholCard";
import { useSelector, useDispatch } from "react-redux";
import { updateGpa } from "../features/scholarshipSlice";
import { getScholarships } from "../features/scholarshipSlice";
import { compareAsc } from "date-fns"; // Import compareAsc

const Apply = () => {
  const [gpaForm, setGpaForm] = useState(false);
  const [gpa, setGpa] = useState("");
  const scholarships = useSelector((state) => state.schol.scholarships);
  const schol = useSelector((state) => state.schol);
  const auth = useSelector((state) => state.auth);

  // Sort scholarships by applicationDeadline in descending order
  const sortedScholarships = [...scholarships].sort((a, b) =>
    compareAsc(new Date(b.applicationDeadline), new Date(a.applicationDeadline))
  );

  const userId = auth._id;

  const dispatch = useDispatch();

  console.log("user", userId);

  useEffect(() => {
    dispatch(getScholarships({ userId }));
    console.log("scholarships", scholarships);
  }, []);

  const handleGpaUpdate = () => {
    setGpaForm(false);
    dispatch(updateGpa({ gpa, userId: auth._id }));
    console.log(gpa);
  };

  useEffect(() => {
    if (schol.error == "Update your gpa to proceed") {
      setGpaForm(true);
    }
  }, [schol.error]);

  return (
    <div className="flex flex-row  text-darkblue  bg-gray ">
      <div className="">
        <Menu />
      </div>

      <div className="flex flex-col  w-full items-center ">
        <div>
          <HeadSec />
        </div>
        <div className="flex flex-row bg-white mx-5 p-10 items-center justify-center gap-8  rounded-2xl ">
          <div className="flex flex-row gap-20 flex-wrap items-center justify-center ">
            <div className="gap-10 flex flex-row flex-wrap items-center justify-center">
              {sortedScholarships.map((scholarship, index) => (
                <div key={scholarship.id || index}>
                  <ScholCard scholarship={scholarship} />
                </div>
              ))}
            </div>
            <form
              className={`${
                gpaForm ? "flex" : "hidden"
              } absolute top-[50vh] bg-white flex-col items-center justify-center gap-10 p-2`}
            >
              <h1 className="underline">Update your GPA</h1>
              <input
                onChange={(e) => {
                  setGpa(e.target.value);
                }}
                type="text"
                placeholder="Update your gpa"
                className="border"
              />
              <button
                className="bg-darkblue text-white rounded px-6 py-2 m-4"
                onClick={handleGpaUpdate}
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Apply;
