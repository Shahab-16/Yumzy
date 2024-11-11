import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";

const Login = () => {
  const [currState, setCurrState] = useState("Login");
  const { login, setlogin, url, token, setToken } = useContext(StoreContext);
  const [data, setdata] = useState({
    name: "",
    email: "",
    password: "",
  });

  const OnchangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setdata({ ...data, [name]: value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    let newurl = url;
    if (currState === "Login") {
      newurl += "/api/v1/user/login";
    } else {
      newurl += "/api/v1/user/signup";
    }

    const response = await axios.post(newurl, data);

    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setlogin(false);
    } else {
      console.log("Problem is in login frontend");
      alert(response.data.message);
    }
  };
  useEffect(() => {
    console.log(data);
  });
  return (
    <div className="bg-[#000000c0] absolute w-full h-full flex justify-center items-center min-h-screen">
      <form
        onSubmit={onSubmit}
        className="w-[400px] h-[550px] rounded-lg bg-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-[2rem] flex flex-col gap-[4px]"
      >
        <div className="flex justify-between">
          <h1 className="text-center text-3xl font-bold">{currState}</h1>
          <img
            src={assets.cross}
            className="w-[20px] h-[20px] cursor-pointer"
            alt="cross"
            onClick={() => setlogin(false)}
          />
        </div>

        <input
          type="text"
          placeholder="Your Name"
          name="name"
          value={data.name}
          onChange={OnchangeHandler}
          className="w-full h-[50px] border border-black rounded-lg p-[1rem] mt-[20px]"
        />

        <input
          type="email"
          placeholder="Email"
          name="email"
          value={data.email}
          onChange={OnchangeHandler}
          className="w-full h-[50px] border border-black rounded-lg p-[1rem] mt-[20px]"
        />

        <input
          type="password"
          placeholder="Password"
          name="password"
          value={data.password}
          onChange={OnchangeHandler}
          className="w-full h-[50px] border border-black rounded-lg p-[1rem] mt-[20px]"
        />

        {currState === "Signup" ? (
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full h-[50px] border border-black rounded-lg p-[1rem] mt-[20px]"
          />
        ) : (
          <></>
        )}

        <button
          type="submit"
          className="w-full h-[50px] border border-black rounded-lg p-[1rem] mt-[20px] flex justify-center items-center bg-[#c80a0ac5]"
        >
          {currState}
        </button>

        <div className="flex items-center mt-[20px]">
          <input type="checkbox" className="w-[15px] h-[20px]" />
          <p className="ml-2 text-[11px]">
            By continuing, I agree to the Terms of Service and Privacy Policy
          </p>
        </div>

        {currState === "Login" ? (
          <p>
            Don't have an account?
            <span
              className="text-[#c80a0ac5] cursor-pointer font-semibold"
              onClick={() => setCurrState("Signup")}
            >
              SignUp
            </span>
          </p>
        ) : (
          <p>
            Already have an account?
            <span
              className="text-[#c80a0ac5] cursor-pointer font-semibold"
              onClick={() => setCurrState("Login")}
            >
              Login
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
