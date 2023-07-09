import React from "react";
import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined";

const ScholCard = ({ scholarship }) => {
  // Format the applicationDeadline
  const formattedDeadline = new Date(
    scholarship.applicationDeadline
  ).toLocaleDateString();

  return (
    <div>
      <div className="flex flex-col bg-gray rounded-lg items-center p-2 w-[300px] ">
        <FolderOpenOutlinedIcon fontSize="" className="text-[100px]" />
        <p>{scholarship.scholarshipName}</p>
        <p>{scholarship.category}</p>
        <p>{formattedDeadline}</p>
      </div>
    </div>
  );
};

export default ScholCard;
