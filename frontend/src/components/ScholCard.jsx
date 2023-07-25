import React from "react";
import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined";
import { useDispatch, useSelector } from "react-redux";
import { addScholarshipToUser } from "../features/scholarshipSlice";

const ScholCard = ({ scholarship }) => {
  // Format the applicationDeadline

  const auth = useSelector((state) => state.auth);

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

  return (
    <div>
      <div className="flex flex-col bg-gray rounded-lg items-center p-2 w-[300px] ">
        <FolderOpenOutlinedIcon fontSize="" className="text-[100px]" />
        <p>{scholarship.scholarshipName}</p>
        <p>{scholarship.category}</p>
        <p>{formattedDeadline}</p>
        <button
          className="bg-darkblue text-white rounded px-6 py-2 m-4"
          onClick={handleAddScholarshipToUser}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default ScholCard;
