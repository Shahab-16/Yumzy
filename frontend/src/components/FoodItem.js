import React, { useState } from 'react'
import {assets} from '../assets/frontend_assets/assets'
import { StoreContext } from '../context/StoreContext'
import { useContext } from 'react'

const FoodItem = ({_id,name,image,price,description}) => {
    const {cartItems,addToCart,removeFromCart,url}=useContext(StoreContext);
  return (
    <div className='flex flex-col gap-[4px] mt-[20px] shadow-xl rounded-lg '>
      <div className='relative'>
        <img src={url+"/images/"+image} alt='food_image' className='rounded-lg w-full '/>
        {!cartItems[_id]?
        <img onClick={()=>addToCart(_id)} className='w-[15%] absolute bottom-0 right-0' src={assets.add_icon_white} alt='veg'/>:
        <div className='w-[35%] absolute bottom-0 right-0 flex gap-1 bg-white p-1 rounded-full'>
            <img onClick={()=>removeFromCart(_id)} src={assets.remove_icon_red} alt='remove'/>
            <p className='text-black text-center'>{cartItems[_id]}</p>
            <img onClick={()=>addToCart(_id)} src={assets.add_icon_green} alt='add'/>
        </div>
        }
      </div>
      
      <div className='flex flex-col gap-2 p-4'>
        <div className='flex justify-between'>
            <p className='text-md font-bold'>{name}</p>
            <img src={assets.rating_starts} className='w-[25%]'/>
        </div>
        <p>{description}</p>
        <p className='text-lg text-green-900 font-bold'>${price}</p>
      </div>
      
      
    </div>
  )
}

export default FoodItem
