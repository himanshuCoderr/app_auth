import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import LoginContext from "../Context/LoginContext";

const HomePage = (props) => {
  console.log("props login ", props);
  const { login } = useContext(LoginContext);
  const { setlogin } = useContext(LoginContext);
  const changeLoginStaus = () => {
    setlogin(false);
  };
  return (
    <div className="">
      <div className="flex justify-between items-center w-[100vw] px-5 text-white bg-[#1B4242] h-[10vh]">
        <Link to="/">
          {" "}
          <h1>Skill Mate</h1>{" "}
        </Link>
        {login ? (
          <div className="sm:w-[60%] md:w-[30%] flex justify-between items-center">
            <h1>logged in</h1>
            <button
              className="bg-[#5C8374] p-2 rounded-lg"
              onClick={changeLoginStaus}
            >
              log Out !
            </button>
          </div>
        ) : (
          <div className="w-[50vw] md:w-[30vw] lg:w-[30vw] flex justify-between">
            <button className=" bg-[#5C8374] p-2 rounded-lg">
              <Link to="/RegisterUser">Register</Link>
            </button>
            <button className=" bg-[#5C8374] p-2 rounded-lg">
              <Link to="/LoginUser">Login</Link>
            </button>
          </div>
        )}
      </div>
      <h1 className="text-white pl-5 pt-2" >Home Page Check Login And Register </h1>
    </div>
  );
};

export default HomePage;
