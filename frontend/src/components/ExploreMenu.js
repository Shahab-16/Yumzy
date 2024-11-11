import React from "react";
import { menu_list } from "../assets/frontend_assets/assets";

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className="px-4 py-6 md:px-[30px] flex flex-col gap-4" id="ExploreMenu">
      <h2 className="text-2xl md:text-3xl text-black font-semibold">Explore Our Menu</h2>
      <p className="max-w-full md:max-w-[720px] text-sm md:text-base">
        Dive into our diverse menu and discover your next favorite dish! From
        savory appetizers to delightful desserts, there's something for
        everyone. Explore now and enjoy a culinary adventure!
      </p>

      <div className="flex gap-[1.5rem] md:gap-[2.3rem] overflow-x-auto items-center justify-start explore-menu-list h-[150px] md:h-[200px]">
        {menu_list.map((menu, index) => (
          <div
            key={index}
            className="flex-shrink-0 text-center"
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
                rounded-full w-[80px] h-[80px] md:w-[120px] md:h-[120px] object-cover cursor-pointer`}
            />
            <p className="text-[#4b4b4b] mt-[8px] md:mt-[10px] text-xs md:text-base max-w-[80px] md:max-w-[120px]">
              {menu.menu_name}
            </p>
          </div>
        ))}
      </div>

      <hr className="mt-6 md:mt-10 h-[2px] bg-[#4b4b4b] border-none" />
    </div>
  );
};

export default ExploreMenu;
