import React, { useContext } from 'react'
import { StoreContext } from '../context/StoreContext'
import FoodItem from './FoodItem'

const FoodDisplay = ({category}) => {
  const {food_list}=useContext(StoreContext);
  return (
    <div className='p-[30px] flex flex-col gap-6' id='FoodDisplay'>
      <h2 className='text-3xl font-semibold'>Top dishes near you</h2>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[30px] mb-[20px]'>
        {food_list.map((item)=>{
          if(category==="All" || item.category===category){
            return <FoodItem key={item._id} id={item._id} {...item}/>
          }
        })}
      </div>
    </div>
  )
}

export default FoodDisplay
