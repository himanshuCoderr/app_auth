import React, { useState } from "react";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import "react-notifications/lib/notifications.css";
import HomePage from "./HomePage";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

const Register = () => {
  let [passwordType, setPasswordType] = useState("password");
  const [userData, setUserData] = useState({});
  const [checkTc, setCheckTc] = useState(false);

  const checkRegister = async (e) => {
    e.preventDefault();
    try {
      if ((userData.password && userData.userConfPassword) == "") {
        NotificationManager.info("Enter Something");
      }
      if ((userData.password.length && userData.userConfPassword.length) < 8) {
        NotificationManager.warning("Password too short");
        if (userData.password.length != userData.userConfPassword.length) {
          NotificationManager.warning("Password Doesn't match");
        }
      } else {
        if (userData.password != userData.userConfPassword) {
          NotificationManager.warning("Password Doesn't match");
        }
      }
    } catch (error) {
      console.log("Something went wrong");
    }
    console.log(userData);
    await axios
      .post("http://localhost:5000/registerPerson", userData)
      .then((res) => {
        console.log("The response from the server for registration", res);
        console.log(
          "The response status from the server for registration",
          res.status
        );
        if (res.data == "exists") {
          NotificationManager.warning("User already Exists");
        } else {
          NotificationManager.success("User Registered You can Login Now");
        }
      })
      .catch((err) => {
        console.log("db data save failed ");
      });
  };

  const toggleViewPassword = () => {
    setPasswordType((prevType) =>
      prevType === "password" ? "text" : "password"
    );
  };
  return (
    <>
      <HomePage  />
      <div className="w-[80vw] md:w-[50vw] lg:w-[40vw] xl:w-[40vw] h-[80vh] bg-white m-auto rounded-md mt-4">
        <NotificationContainer />
        <h1 className="text-2xl pt-4 pl-3 inputFont font-bold">
          <span className="border-b-2  border-blue-500">Re</span>gistration
        </h1>
        <form className="w-[80%] h-[80%] m-auto mt-10  flex justify-evenly flex-col ">
          <div className="border-[#1e1e1] border-b-2 text-lg p-2 flex inputFont">
            <label>
              <PersonOutlinedIcon className="scale-150 mr-2 text-[#e1e1e1]" />
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="border-none inputTag outline-none w-[100%]"
              onChange={(e) => {
                setUserData({ ...userData, name: e.target.value });
              }}
            />
          </div>
          <div className="border-[#1e1e1] border-b-2 text-lg p-2 flex inputFont">
            <label>
              <PersonOutlinedIcon className="scale-150 mr-2 text-[#e1e1e1]" />
            </label>
            <input
              type="text"
              placeholder="Enter your Username"
              className="border-none inputTag outline-none w-[100%]"
              onChange={(e) => {
                setUserData({ ...userData, user_name: e.target.value });
              }}
            />
          </div>
          <div className="border-[#1e1e1] border-b-2 text-lg p-2 flex inputFont">
            <label>
              <MailOutlineOutlinedIcon className="scale-150 text-[#e1e1e1] mr-2" />
            </label>
            <input
              type="email"
              placeholder="Enter your Email"
              className="border-none inputTag outline-none w-[100%]"
              onChange={(e) => {
                setUserData({ ...userData, email: e.target.value });
              }}
            />
          </div>
          <div className="border-[#1e1e1] border-b-2 text-lg p-2 flex inputFont">
            <label>
              <LockOutlinedIcon className="scale-150 mr-2 text-[#e1e1e1]" />
            </label>
            <input
              type="password"
              onChange={(e) => {
                // setPassword(e.target.value);
                setUserData({ ...userData, password: e.target.value });
              }}
              value={userData.userPassword}
              placeholder="Create your password"
              className="border-none inputTag outline-none w-[100%]"
            />
          </div>
          <div className="border-[#1e1e1] border-b-2 text-lg p-2 flex inputFont">
            <label>
              <LockOutlinedIcon className="scale-150 mr-2 text-[#e1e1e1]" />
            </label>
            <input
              type={passwordType}
              onChange={(e) => {
                // setRePassword(e.target.value);
                setUserData({ ...userData, userConfPassword: e.target.value });
              }}
              value={userData.userConfPassword}
              placeholder="Confirm Your Password"
              className="border-none inputTag outline-none w-[100%]"
            />
            <LockOpenIcon onClick={toggleViewPassword} />
          </div>
          <div className="flex items-center ">
            <input
              type="checkbox"
              className="mr-1 "
              checked={checkTc}
              onChange={(e) => {
                if (checkTc) {
                  setCheckTc(false);
                  setUserData({ ...userData, acceptTc: false });
                } else {
                  setCheckTc(true);
                  setUserData({ ...userData, acceptTc: true });
                }
              }}
            />
            <label>I accept all terms & conditions </label>
          </div>
          <button
            className="w-[100%] h-[13%] text-lg inputFont bg-[#1B4242] text-white rounded-lg mt-4 font-bold "
            onClick={checkRegister}
          >
            Register
          </button>
          <p className="text-center">
            Already have an account ?{" "}
            <span className="text-[#4071f4]">
              {" "}
              <Link to="/LoginUser">Login now</Link>{" "}
            </span>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
