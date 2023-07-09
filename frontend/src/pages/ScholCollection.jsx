import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Menu from "../components/Menu";
import HeadSec from "../components/HeadSec";
import ScholCard from "../components/ScholCard";

const ScholCollection = () => {
  const scholarships = useSelector((state) => state.schol.scholarships);

  const dispatch = useDispatch();

  const [showForm, setShowForm] = useState(false);
  const [institutional, setInstitutional] = useState(false);
  const [external, setExternal] = useState(false);
  const [sports, setSports] = useState(false);
  const [diversity, setDiversity] = useState(false);

  const handleAddButtonClick = () => {
    setShowForm(true);
  };

  const handleFormSubmit = (formData) => {
    // Handle form submission logic here
    console.log(formData);
    setShowForm(false);
  };

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setInstitutional(selectedValue === "institutional");
    setExternal(selectedValue === "external");
    setSports(selectedValue === "sports");
    setDiversity(selectedValue === "diversity");
  };

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
              className="m-8 bg-darkblue text-white w-28"
              onClick={handleAddButtonClick}
            >
              ADD
            </button>
          </div>

          <div className="flex flex-row gap-20 flex-wrap items-center justify-center ">
            {showForm ? (
              <div className="flex flex-col justify-center">
                <div>
                  <h1>Scholarship Name</h1>
                  <select onChange={handleSelectChange}>
                    <option>Select</option>
                    <option value="institutional">
                      Institutional Scholarship
                    </option>
                    <option value="external">External Scholarship</option>
                    <option value="sports">Sports Scholarship</option>
                    <option value="diversity">Diversity Scholarship</option>
                  </select>
                </div>
                <div>
                  <h1>Category</h1>
                  <select>
                    <option>Select</option>
                    {institutional ? (
                      <>
                        <option>Full</option> <option>Partial</option>{" "}
                      </>
                    ) : external ? (
                      <>
                        <option>MaterCard Foundation</option>{" "}
                        <option>Educational Trustfund</option>{" "}
                      </>
                    ) : diversity ? (
                      <>
                        {" "}
                        <option>Underprivillaged Communities</option>{" "}
                        <option>Physically Challenged</option>{" "}
                      </>
                    ) : null}
                  </select>
                </div>

                <button
                  onClick={handleFormSubmit}
                  className="m-8 bg-darkblue text-white w-28 py-8"
                >
                  SUBMIT
                </button>
              </div>
            ) : (
              <div className="flex flex-row gap-20 flex-wrap items-center justify-center">
                <div className="gap-10 flex flex-row">
                  {scholarships.map((scholarship) => (
                    <div key={scholarship.id}>
                      <ScholCard scholarship={scholarship} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScholCollection;
