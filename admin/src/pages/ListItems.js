import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const ListItems = ({url}) => {
  const [list,setlist]=useState([])

  const fetchData=async()=>{
    const response=await axios(`${url}/api/v1/food/get`);
    /*console.log(response.data.data)*/
    if(response.data.success){
      setlist(response.data.data);
      console.log(list)
    }
    else{
      toast.err("Error");
    }
  }

  const removeHandler=async(id)=>{
    const response=await axios.post(`${url}/api/v1/food/remove`,{_id:id});
    if(response.data.success){
      toast.success(response.data.message);
      fetchData();
    }
    else{
      toast.error(response.data.message);
    }
  }

  useEffect(()=>{
    fetchData();
  },[])
  return (
    <div className='px-[4rem] pt-[1rem] w-full'>
      <h1 className='text-3xl font-semibold'>Available Food Stocks</h1>
      <div className='flex justify-between'>
        <b>Image</b>
        <b>Name</b>
        <b>Category</b>
        <b>Price</b>
        <b>Delete</b>
      </div>

      <div className='flex flex-col gap-3'>
        {list.map((item)=>{
          return (
            <div className='flex justify-between'>
              <img src={`${url}/images/`+item.image} className='w-[4rem] h-[4rem] border-2 border-[#241919] rounded-sm' alt=''/>
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.price}</p>
              <button onClick={()=>removeHandler(item._id)}>X</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ListItems
