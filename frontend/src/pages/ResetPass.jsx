import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordConfirmation } from "../features/authSlice";
import { toast } from "react-toastify";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom";

const ResetPass = () => {
  const dispatch = useDispatch();
  const resetPasswordConfirmationStatus = useSelector(
    (state) => state.auth.resetPasswordConfirmationStatus
  );

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isMatching, setIsmatching] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);

  const handleConfirmPassword = () => {
    if (password === confirmPassword && password.length > 3) {
      setIsmatching(true);
    } else {
      setIsmatching(false);
    }
  };
  const handleResetPassword = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    if (resetPasswordConfirmationStatus == "success") {
      toast.success("Password reset successfull", { position: "top-center" });
    }

    dispatch(resetPasswordConfirmation({ token, password }));
  };

  useEffect(() => {
    handleConfirmPassword();
  }, [password, confirmPassword]);

  useEffect(() => {
    console.log(isMatching);
  }, [isMatching]);
  return (
    <div className="bg-white flex flex-col h-[100%] items-center justify-center gap-4">
      <div className="items-center justify-center">
        {resetPasswordConfirmationStatus === "success" && (
          <div className="font-bold mb-5 text-yellow-500 px-10">
            <p>
              Password reset successful,proceed to
              <span className="text-blue-600">
                <Link to="/login">Log in</Link>
              </span>
            </p>
          </div>
        )}
        {resetPasswordConfirmationStatus === "rejected" && (
          <div className="font-bold mb-5 text-red ">
            <div className="font-bold mb-5 px-10 ">
              <p>Something went wrong, try again!</p>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-4 ">
        <div className="flex flex-row w-full  text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className=" px-4 py-2 w-full"
          />
          <span
            className="p-2"
            onClick={() => setShowPassword(!showPassword)}
            style={{ cursor: "pointer" }}
          >
            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </span>
        </div>

        <div className="flex flex-row w-full  text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none">
          <input
            type={showConfPassword ? "text" : "password"}
            placeholder="ConfirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="form-control block px-4 py-2 w-full "
          />
          <span
            className="p-2"
            onClick={() => setShowConfPassword(!showConfPassword)}
            style={{ cursor: "pointer" }}
          >
            {showConfPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </span>
        </div>

        {isMatching ? (
          <p className="text-style: italic mb-4 font-bold text-rose-900">
            It's a match, proceed.
          </p>
        ) : !isMatching && confirmPassword.length < 3 ? null : (
          <p className="text-style: italic mb-4 font-bold text-rose-900">
            password doesn't match.
          </p>
        )}
      </div>
      <div>
        <button
          type="submit"
          className={`${
            isMatching
              ? "cursor-pointer"
              : " text-yellow-900 cursor-not-allowed pointer-events-none"
          }inline-block px-7 py-3 bg-brown text-white font-medium text-sm leading-snug uppercase rounded shadow-md  hover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-out w-full`}
          onClick={handleResetPassword}
        >
          {resetPasswordConfirmationStatus == "pending" ? (
            <p>Loading...</p>
          ) : (
            <p>Reset Password</p>
          )}
        </button>
      </div>
    </div>
  );
};

export default ResetPass;
