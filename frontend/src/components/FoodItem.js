import React, { useContext } from 'react';
import { assets } from '../assets/frontend_assets/assets';
import { StoreContext } from '../context/StoreContext';

const FoodItem = ({ _id, name, image, price, description }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

  return (
    <div className='flex flex-col gap-[4px] mt-[20px] shadow-xl rounded-lg'>
      <div className='relative'>
        <img
          src={url + "/images/" + image}
          alt='food_image'
          className='mx-auto w-full max-w-[300px] h-[200px] object-cover rounded-lg'
        />
        {!cartItems[_id] ? (
          <img
            onClick={() => addToCart(_id)}
            className='w-[20%] sm:w-[15%] absolute bottom-2 right-2 cursor-pointer' // Adjust width and position based on screen size
            src={assets.add_icon_white}
            alt='add'
          />
        ) : (
          <div className='w-[40%] sm:w-[35%] absolute bottom-2 right-2 flex gap-1 bg-white p-1 rounded-full items-center justify-around'>
            <img onClick={() => removeFromCart(_id)} src={assets.remove_icon_red} alt='remove' className='w-4 sm:w-5 cursor-pointer' />
            <p className='text-black text-center text-xs sm:text-sm'>{cartItems[_id]}</p>
            <img onClick={() => addToCart(_id)} src={assets.add_icon_green} alt='add' className='w-4 sm:w-5 cursor-pointer' />
          </div>
        )}
      </div>

      <div className='flex flex-col gap-2 p-4'>
        <div className='flex justify-between'>
          <p className='text-md font-bold'>{name}</p>
          <img src={assets.rating_starts} className='w-[25%]' alt='rating' />
        </div>
        <p>{description}</p>
        <p className='text-lg text-green-900 font-bold'>₹{price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
