import React from "react";
import HeadSec from "../components/HeadSec";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Menu from "../components/Menu";
import { image } from "../assets";

const Apply = () => {
  const steps = ["Search", "Wait Approval", "Access Scholarship"];

  return (
    <div className="flex flex-row  text-darkblue   ">
      <div className="">
        <Menu />
      </div>

      <div className="flex flex-col w-[100%] ">
        <div>
          <HeadSec />
        </div>
        <div className="flex flex-row bg-white mx-5 p-10 items-center justify-center gap-8  ">
          <div className="flex flex-col mt-10">
            <div className="flex flex-row">
              <Box sx={{ width: "100%" }}>
                <Stepper activeStep={1} alternativeLabel>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Box>
            </div>
            <div className="flex flex-col items-center gap-10">
              <h1 className="font-bold text-darkblue text-2xl items-start w-full  flex  ">
                Schorlaship Criteria
              </h1>
              <p className=" flex flex-row gap-2 font-semibold">
                Area of study :{" "}
                <span className="">
                  <select className="bg-darkgray rounded-lg text-sm items-center flex flex-col">
                    <option></option>
                    <option>Information Technology</option>
                    <option>Medicine</option>
                    <option>Psychology</option>
                    <option>B.com</option>
                  </select>
                </span>
              </p>
              <div className="flex flex-row gap-10 ">
                <p className=" flex flex-col gap-2 border-b-2 ">
                  <span className="">
                    <select className=" text-sm items-center flex flex-col justify-center text-darkgray w-28 ">
                      <option className="">Year</option>
                      <option>2023</option>
                      <option>2024</option>
                      <option>2025</option>
                      <option>2026</option>
                    </select>
                  </span>
                </p>
                <p className=" flex flex-col gap-2 border-b-2">
                  <span className="">
                    <select className=" text-sm items-center flex flex-col  text-darkgray w-28 ">
                      <option>Major</option>
                      <option>Information Technology</option>
                      <option>Medicine</option>
                      <option>Psychology</option>
                      <option>B.com</option>
                    </select>
                  </span>
                </p>
              </div>
              <div className="flex flex-col w-full  items-center gap-2">
                <h2 className="flex items-start  w-full font-semibold">
                  Gender
                </h2>
                <form className="gap-2 flex w-full  ">
                  <input type="radio" value="male" />
                  <label for="html">Male</label>
                  <input type="radio" value="female" />
                  <label for="html">Female</label>
                  <input type="radio" value="other" />
                  <label for="html">Other</label>
                </form>
              </div>

              <div className="flex flex-row font-semibold  w-full">
                <p className="flex flex-row justify-center items-center gap-3">
                  Minimum Amount Award : ${" "}
                  <span>
                    <select className="bg-darkgray rounded-lg text-sm items-center flex flex-col w-20 ">
                      <option>0</option>
                      <option>100</option>
                      <option>200</option>
                      <option>300</option>
                      <option>400</option>
                    </select>
                  </span>{" "}
                </p>
              </div>

              <div className="flex flex-col w-full  items-center gap-2">
                <h2 className="flex items-start  w-full font-semibold">Type</h2>
                <form className="gap-2 flex w-full font-semibold  ">
                  <input type="radio" value="male" />
                  <label for="html">Renewable Award</label>
                  <input type="radio" value="female" />
                  <label for="html">One time Award</label>
                  <input type="radio" value="other" />
                  <label for="html">Any</label>
                </form>
              </div>

              <div className="">
                {" "}
                <select className=" text-sm items-center flex flex-col  border-b-2 pb-2 justify-center  ">
                  <option>Application deadline</option>
                  <option>100</option>
                  <option>200</option>
                  <option>300</option>
                  <option>400</option>
                </select>
              </div>

              <div className="gap-4 flex flex-row ">
                <button className="bg-white border-2 rounded-2xl px-6 py-1 w-32">
                  Back
                </button>
                <button className="bg-darkblue text-white border-2 rounded-2xl px-6 py-1 w-32">
                  Next Step
                </button>
              </div>
            </div>
          </div>
          <div className="bg-gray h-[100%] rounded-lg text-darkblue gap-20 flex flex-col">
            <div className="pt-20">
              <h1 className="text-[50px] font-bold">12 </h1>
              <p className="font-semibold text-[20px] ">
                Schorlaships match your criteria
              </p>
            </div>

            <img src={image} className="p-2  flex  h-[50%] rounded-3xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Apply;
