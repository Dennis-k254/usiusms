import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestPasswordReset } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

const ReqResPass = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const requestPasswordResetStatus = useSelector(
    (state) => state.auth.requestPasswordResetStatus
  );

  const [email, setEmail] = useState("");

  const handleRequestPasswordReset = (e) => {
    e.preventDefault();

    if (requestPasswordResetStatus == "success") {
      console.log("email sent");
    } else {
      null;
    }

    dispatch(requestPasswordReset(email));
  };

  return (
    <div className="bg-white h-[100%] flex flex-col justify-center  items-center gap-4">
      <div className="flex flex-col items-center justify-center">
        {requestPasswordResetStatus === "success" && (
          <div className="flex flex-col font-bold mb-5 text-yellow-500 items-center justify-center px-10 ">
            <div className="flex flex-col font-bold mb-5 items-center justify-center ">
              <p>Email with instruction sent,check your span folder </p>
            </div>
          </div>
        )}
        {requestPasswordResetStatus === "rejected" && (
          <div className="font-bold mb-5 text-red ">
            <div className="font-bold mb-5 px-10">
              <p>Something went wrong, try again! </p>
            </div>
          </div>
        )}
      </div>
      <div>
        <form>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          />
        </form>
      </div>
      <div>
        <button
          type="submit"
          className="inline-block px-7 py-3 bg-brown text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
          onClick={handleRequestPasswordReset}
        >
          {requestPasswordResetStatus == "pending" ? (
            <p>Loading...</p>
          ) : (
            <p>Reset Password</p>
          )}
        </button>
      </div>
    </div>
  );
};

export default ReqResPass;
