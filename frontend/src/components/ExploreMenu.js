import React from "react";
import { menu_list } from "../assets/frontend_assets/assets";

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className="p-[30px] flex flex-col gap-4" id="ExploreMenu">
      <h2 className="text-3xl text-black font-semibold">Explore Our Menu</h2>
      <p className="max-w-[720px]">
        Dive into our diverse menu and discover your next favorite dish! From
        savory appetizers to delightful desserts, there's something for
        everyone. Explore now and enjoy a culinary adventure!
      </p>

      <div className="flex gap-[2.5rem] overflow-x-scroll items-center justify-between explore-menu-list h-[200px]">
        {menu_list.map((menu, index) => (
          <div
            key={index}
            className="flex-shrink-0"
            onClick={() =>
              setCategory((prev) =>
                prev === menu.menu_name ? "All" : menu.menu_name
              )
            }
          >
            <img
              src={menu.menu_image}
              alt={menu.menu_name}
              className={`${
                category === menu.menu_name
                  ? "border-4 border-[#f7983f] p-[2px]"
                  : ""
              } 
                    rounded-full w-[120px] h-[120px] object-cover cursor-pointer`}
            />
            <p className="text-center text-[#4b4b4b] mt-[10px] max-w-[120px]">
              {menu.menu_name}
            </p>
          </div>
        ))}
      </div>

      <hr className="mt-10 h-[2px] bg-[#4b4b4b] border-none" />
    </div>
  );
};

export default ExploreMenu;
