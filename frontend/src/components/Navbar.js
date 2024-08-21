import React from "react";
import { assets } from "../assets/frontend_assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { StoreContext } from "../context/StoreContext";
import { useContext } from "react";
const Navbar = () => {
  const [downbar, setdownbar] = useState("Home");
  const { login, setlogin, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const toggleMenuVisibility = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  return (
    <div className="max-w-[1280px] mx-auto flex justify-between items-center p-4">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="logo"
        className="w-[150px] h-[50px] cursor-pointer"
      />
      <ul className="flex items-center gap-6">
        <NavLink to={"/"}>
          <li
            onClick={() => setdownbar("Home")}
            className={
              downbar === "Home" ? "pb-0.5 border-b-2 border-[#262c41]" : ""
            }
          >
            Home
          </li>
        </NavLink>

        <a
          href="#ExploreMenu"
          onClick={() => setdownbar("Menu")}
          className={`${
            downbar === "Menu" ? "pb-0.5 border-b-2 border-[#262c41]" : ""
          } cursor-pointer`}
        >
          Menu
        </a>

        <a
          href="#MobileApp"
          onClick={() => setdownbar("Mobile App")}
          className={`${
            downbar === "Mobile App" ? "pb-0.5 border-b-2 border-[#262c41]" : ""
          } cursor-pointer`}
        >
          Mobile App
        </a>

        <a
          href="#Contact"
          onClick={() => setdownbar("Contact")}
          className={`${
            downbar === "Contact" ? "pb-0.5 border-b-2 border-[#262c41]" : ""
          } cursor-pointer`}
        >
          Contact
        </a>
      </ul>

      <div className="flex items-center gap-6">
        <img
          src={assets.search_icon}
          alt="search_icon"
          className="w-[20px] h-[20px]"
        />
        <div className="relative">
          <img
            onClick={() => navigate("/cart")}
            src={assets.basket_icon}
            alt="basket_icon"
            className="w-[20px] h-[20px] cursor-pointer"
          />
          <div className="w-[10px] h-[10px] bg-yellow-500 absolute rounded-full top-[-8px] right-[-6px]"></div>
        </div>
        {!token ? (
          <button onClick={() => setlogin(!login)}>Sign in</button>
        ) : (
          <div className="relative flex flex-col">
            <img
              src={assets.profile_icon}
              alt="user_icon"
              className="w-[25px] h-[25px] cursor-pointer"
              onClick={toggleMenuVisibility} // Toggle menu visibility on click
            />
            {isMenuVisible && ( // Conditionally render the ul based on state
              <ul className="absolute top-[35px] left-[-35px] bg-white border w-[120px] border-gray-300 rounded-lg shadow-lg">
                <li
                  onClick={logout}
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
                >
                  <img
                    src={assets.logout_icon}
                    alt="logout_icon"
                    className="w-[20px] h-[20px]"
                  />
                  <p>Logout</p>
                </li>
                <li className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer">
                  <img
                    src={assets.bag_icon}
                    alt="bag_icon"
                    className="w-[20px] h-[20px]"
                  />
                  <p>Orders</p>
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
