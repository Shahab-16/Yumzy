import React from 'react'
import { assets } from '../assets/admin_assets/assets'
import { useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'  

const Sidebar = () => {
  return (
    <div className='max-w-[20%] p-[1rem] pl-[5rem]  flex flex-col gap-6 border-2 border-r-[#241919]'>
      <NavLink to={'/additems'} className='flex gap-2 border-2 border-[#241919] p-1 cursor-pointer'>
        <img src={assets.add_icon} alt='add_icon'/>
        <p>Add Items</p>
      </NavLink>

      <NavLink to={'/listitems'} className='flex gap-2 border-2 border-[#241919] p-1 cursor-pointer'>
        <img src={assets.order_icon} alt='order'/>
        <p>List Items</p>
      </NavLink>

      <NavLink to={'/orders'} className='flex gap-2 border-2 border-[#241919] p-1 cursor-pointe0'>
        <img src={assets.order_icon} alt='order'/>
        <p>Orders</p>
      </NavLink>
    </div>
  )
}

export default Sidebar
