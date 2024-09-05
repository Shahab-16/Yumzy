import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import axios from 'axios'
import { StoreContext } from '../context/StoreContext'
import { assets } from '../assets/frontend_assets/assets'

const MyOrders = () => {
    const [data,setData]=useState([]);
    const {url,token}=useContext(StoreContext);

    const fetchOrders=async()=>{
        const response=await axios.post(url+"/api/v1/order/userorders",{},{headers:{token}});
        setData(response.data.data);
        console.log(response.data.data);
    }

    useEffect(() => {
        if(token){
            fetchOrders();
        }
    }, [token])


  return (
    <div className='flex flex-col max-w-[1200px] mx-auto mb-[10%]'>
      <h2>MY ORDERS</h2>
      <div className='flex flex-col gap-4'>
        {data.map((order,item)=>{
          return (
            <div className='flex items-center gap-[8%] bg-white p-4 rounded-lg border-2 border-black'>
              <img src={assets.parcel_icon}/>
              <p className='flex-1 max-w-[40%]'>{order.items.map((item,index)=>{
                if(index===order.items.length-1){
                  return item.name+" x "+item.quantity
                }else{
                  return item.name+" x "+item.quantity+", "
                }
              })}</p>
              <p>Rs{order.amount}</p>
              <p>Items: {order.items.length}</p>
              <p><span>&#x25cf;</span><b>{order.status}</b></p>
              <button className='bg-black hover:bg-slate-800 text-white px-4 py-2 rounded-md'>Track Order</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MyOrders
