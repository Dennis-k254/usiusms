import React, { useEffect, useState } from "react";
import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined";
import { useDispatch, useSelector } from "react-redux";
import { addScholarshipToUser } from "../features/scholarshipSlice";
import { isAfter } from "date-fns"; // Import isAfter from date-fns

const ScholCard = ({ scholarship }) => {
  // Format the applicationDeadline

  const auth = useSelector((state) => state.auth);
  const schol = useSelector((state) => state.schol);

  const dispatch = useDispatch();

  const formattedDeadline = new Date(
    scholarship.applicationDeadline
  ).toLocaleDateString();

  const handleAddScholarshipToUser = async (userId, scholarshipId) => {
    try {
      const status = "Approved"; //
      const applicationDeadline = scholarship.applicationDeadline;

      await dispatch(
        addScholarshipToUser({
          userId: auth._id,
          scholarshipId: scholarship._id,
          status,
          applicationDeadline,
          category: scholarship.category,
        })
      );
    } catch (error) {
      console.log("Error adding scholarship to user:", error);
    }
  };

  const now = new Date(); // Get the

  return (
    <div>
      <div className="flex flex-col bg-gray rounded-lg items-center p-2 w-[300px] ">
        <FolderOpenOutlinedIcon fontSize="" className="text-[100px]" />
        <p>{scholarship.scholarshipName}</p>
        <p>{scholarship.category}</p>
        <p>{formattedDeadline}</p>
        <p>{scholarship.gpaReq}</p>
        <button
          className={`${auth.isAdmin ? "hidden" : "block"} ${
            isAfter(new Date(scholarship.applicationDeadline), now)
              ? "bg-darkblue text-white rounded px-6 py-2 m-4"
              : "bg-gray text-gray-400 cursor-not-allowed rounded px-6 py-2 m-4"
          }`}
          onClick={() =>
            isAfter(new Date(scholarship.applicationDeadline), now) &&
            handleAddScholarshipToUser(auth._id, scholarship._id)
          }
          disabled={!isAfter(new Date(scholarship.applicationDeadline), now)}
        >
          {schol.applicationStatus === "pending" ? (
            <p>Loading</p>
          ) : (
            <>
              {!isAfter(new Date(scholarship.applicationDeadline), now) ? (
                <p>Expired</p>
              ) : (
                <p>Apply</p>
              )}
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ScholCard;
