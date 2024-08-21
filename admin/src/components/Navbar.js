import React from 'react'
import { assets } from '../assets/admin_assets/assets'

const Navbar = () => {
  return (
    <div className='flex justify-between items-center max-w-[1420px] pl-[5%] p-2'>
        <div className='flex flex-col items-center'>
            <img src={assets.logo} alt='logo' className='w-[10rem] h-[4rem]'/>
            <p className='font-semibold pl-4'>Admin Panel</p>
        </div>
        <div className='flex items-center'>
            <img src={assets.profile_image} alt='profile' className='w-[3rem] h-[3rem]'/>
        </div>
    </div>
  )
}

export default Navbar