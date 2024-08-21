import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import axios from 'axios'
import { StoreContext } from '../context/StoreContext'

const MyOrders = () => {
    const [data,setData]=useState([]);
    const {url,token}=useContext(StoreContext);

    const fetchOrders=async()=>{
        const response=await axios.post(url+"/api/v1/order/userorders",{},{headers:{token}});
        setData(response.data.data);
        console.log(data)
    
    
    }

    useEffect(() => {
        if(token){
            fetchOrders();
        }
    }, [token])


  return (
    <div>
      
    </div>
  )
}

export default MyOrders
