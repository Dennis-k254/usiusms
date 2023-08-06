// eslint-disable-next-line no-unused-vars
import React from "react";
import HeadSec from "../components/HeadSec";
import Menu from "../components/Menu";
import ScholCard from "../components/ScholCard";
import { useSelector } from "react-redux";

const Apply = () => {
  const scholarships = useSelector((state) => state.schol.scholarships);

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
            {scholarships.map((scholarship, index) => (
  <div key={scholarship.id || index}>
    <ScholCard scholarship={scholarship} />
  </div>
))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Apply;