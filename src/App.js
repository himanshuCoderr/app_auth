import React from "react";
import Register from "./Components/Register";
import Login from "./Components/Login";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import HomePage from "./Components/HomePage";
import LoginContextProvider from "./Context/LoginContextProvider";
const App = () => {
  return (
    <LoginContextProvider>
      <BrowserRouter>
        <div className="w-[100vw] h-[100vh] bg-[#092635] ">
          <Routes>
            <Route
              path="/RegisterUser"
              element={
                <div className="">
                  {" "}
                  <Register />
                </div>
              }
            />
            <Route
              path="/LoginUser"
              element={
                <div className="">
                  {" "}
                  <Login />
                </div>
              }
            />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </LoginContextProvider>
  );
};

export default App;
