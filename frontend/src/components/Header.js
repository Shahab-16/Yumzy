import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

const Header = () => {
  return (
    <div style={{ backgroundImage: `url(${assets.header_img})` }} className='h-[34vw] bg-cover bg-center p-[2rem] m-[28px] auto rounded-md '>
       <div className='p-[2.5rem] flex flex-col gap-[5rem] pt-[10%] animate-fadein'>
          <h1 className='text-5xl font-bold text-white'>The best food waiting for you</h1>
          <p className='text-white max-w-[650px] text-[18px]'>Yumzy brings your favorite meals right to your doorstep with just a few clicks. Enjoy a wide selection of restaurants and dishes, all tailored to your taste. With fast, reliable delivery and a seamless ordering experience, Yumzy makes dining in as delightful as dining out.</p>
          <button  className='bg-white text-black rounded-lg p-2 w-[150px]'>View Menu</button>
       </div>
    </div>
  )
}

export default Header
