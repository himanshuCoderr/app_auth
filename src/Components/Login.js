import React from "react";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import LoginContext from "../Context/LoginContext";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import HomePage from "./HomePage";
const Login = () => {
  const [checkLogin, setCheckLogin] = useState(false);
  const [loginData, setLoginData] = useState({});
  // const contextsLogin = useContext(LoginContext)
  const { setlogin } = useContext(LoginContext);
  const navigate = useNavigate();
  const submitLogin = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:5000/getRegisteredData", loginData)
      .then((response) => {
        console.log("response for login ", response);
        if (response.data == "Exists") {
          setCheckLogin(true);
          NotificationManager.success("Login Successfull");
          setlogin(true);
          navigate("/");
        } else {
          NotificationManager.info("Invalid credentials");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <HomePage />
      <div className="w-[80vw] md:w-[50vw] lg:w-[40vw] xl:w-[40vw] h-[80vh] bg-white m-auto rounded-md mt-4 ">
        <NotificationContainer />
        <h1 className="text-2xl pt-4 pl-3 inputFont font-bold">
          <span className="border-b-2  border-blue-500">Lo</span>gin
        </h1>
        <form className="w-[80%] h-[80%] m-auto mt-10  flex justify-evenly flex-col ">
          <div className="border-[#1e1e1] border-b-2 text-lg p-2 flex inputFont">
            <label>
              <PersonOutlinedIcon className="scale-150 text-[#e1e1e1] mr-2" />
            </label>
            <input
              type="text"
              placeholder="Enter your User Name"
              onChange={(e) => {
                setLoginData({ ...loginData, email: e.target.value });
              }}
              className="border-none inputTag outline-none w-[100%]"
            />
          </div>
          <div className="border-[#1e1e1] border-b-2 text-lg p-2 flex inputFont">
            <label>
              <LockOutlinedIcon className="scale-150 mr-2 text-[#e1e1e1]" />
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="border-none inputTag outline-none w-[100%]"
              onChange={(e) => {
                setLoginData({ ...loginData, password: e.target.value });
              }}
            />
          </div>
          {/* <div className="flex items-center " >
          <input type="checkbox" className="mr-1 " />
          <label>Remember me</label>
        </div> */}
          <button
            onClick={submitLogin}
            className="w-[100%] h-[13%] text-lg inputFont bg-[#1B4242] text-white rounded-lg mt-4 font-bold "
          >
            Login
          </button>
          <p className="text-center">
            Don't have an account ?{" "}
            <span className="text-[#4071f4]">
              {" "}
              <Link to="/RegisterUser">Signup now</Link>{" "}
            </span>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
