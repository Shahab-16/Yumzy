import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

const Header = () => {
  return (
    <div style={{ backgroundImage: `url(${assets.headerBI})`}} className='h-[38vw] bg-cover bg-center p-[1.5rem] m-[25px] auto rounded-md '>
       <div className='p-[2.2rem] flex flex-col gap-[4rem] pt-[7%] animate-fadein'>
          <h1 className='text-4xl md:text-5xl font-bold text-white'>The best food waiting for you</h1>
          {/* Only show description and button on screens medium and above */}
        <p className="hidden xl:block text-white max-w-full sm:max-w-[650px] text-[18px]">
          Yumzy brings your favorite meals right to your doorstep with just a few clicks. Enjoy a wide selection of restaurants and dishes, all tailored to your taste. With fast, reliable delivery and a seamless ordering experience, Yumzy makes dining in as delightful as dining out.
        </p>
        <button
          onClick={() => document.getElementById("ExploreMenu").scrollIntoView({ behavior: "smooth" })}
          className="hidden sm:block bg-[#f7983f] text-black rounded-lg p-2 w-[150px]"
        >
          View Menu
        </button>

       </div>
    </div>
  )
}

export default Header
