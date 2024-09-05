import React, { useState } from 'react'
import { assets } from '../assets/admin_assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const AddItems = ({url}) => {
  const [image,setimage]=useState(false);
  const [data,setData]=useState({
    name:"",
    description:"",
    category:"Salad",
    price:""
  })

  const onChangeHandler=(e)=>{
    const name=e.target.name;
    const value=e.target.value;
    setData(data=>({...data,[name]:value}));
  }

  const submitHandler=async (e)=>{
    e.preventDefault();
    const formdata=new FormData();
    formdata.append('name',data.name);
    formdata.append('description',data.description);
    formdata.append('category',data.category);
    formdata.append('price',data.price);
    formdata.append('image',image);

    console.log(formdata);

    const response=await axios.post(`${url}/api/v1/food/add`,formdata);
    if(response.data.success){
      setData({
        name:"",
        description:"",
        price:"",
        category:"Salad"
      })
      toast.success(response.data.message);
      setimage(false);
    }
    else{
      toast.error(response.data.message);
    }
    
  }

  return (
    <div className='px-[4rem] pt-[1rem] w-[70%]'>
        <form className='flex flex-col gap-4' onSubmit={submitHandler}>
          <div>
            <p>Upload Image</p>
            <label htmlFor='image'>
              <img src={image?URL.createObjectURL(image):assets.upload_area} className='w-[8rem] h-[8rem] border-2 border-[#241919] rounded-sm' alt=''/>
            </label>
            <input onChange={(e)=>setimage(e.target.files[0])} type='file' id='image' name='image' hidden required/>
          </div>

          <label htmlFor='productName'>
            <p>Product Name</p>
            <input onChange={onChangeHandler} value={data.name} type='text' id='productName' name='name' required className='border-2 border-[#241919] rounded-sm w-[35%]'/>
          </label>

          <label htmlFor='productDescription'>
            <p>Product Description</p>
            <textarea onChange={onChangeHandler} value={data.description} id='productDescription' name='description' required className='border-2 border-[#241919] rounded-sm h-[10rem] w-[35%]'/>
          </label>

          <div className='flex gap-2'>
            <label htmlFor='productCategory'>
            <p>Product Category</p><br></br>
              <select onChange={onChangeHandler} id="category" name="category" required className='border-2 border-[#241919] rounded-sm p-[7px] bg-slate-50'>
                <option value="Starters">Starters</option>
                <option value="Vegetarian Delights">Vegetarian Delights</option>
                <option value="Non-Vegetarian Specialties">Non-Vegetarian Specialties</option>
                <option value="Chicken Dishes">Chicken Dishes</option>
                <option value="Paneer Dishes">Paneer Dishes</option>
                <option value="Chicken Dishes">Chicken Dishes</option>
                <option value="Salads">Salads</option>
                <option value="Sandwiches">Sandwiches</option>
                <option value="Drinks">Drinks</option>
                <option value="Desserts">Desserts</option>
                <option value="Breads">Breads</option>
                <option value="Rolls">Rolls</option>
                <option value="Chineese">Chineese</option>
              </select>
            </label>

            <label>
              <p>Price</p>
              <br></br>
              <input onChange={onChangeHandler} name='price' value={data.price} type='number' id='productPrice' placeholder='Price in Dollar' required className='border-2 border-[#241919] rounded-sm p-[5px] w-[55%]'/>
            </label>
          </div>

          <button className='border-2 border-[#241919] rounded-sm p-[7px] w-[10%] bg-black font-outfit text-white'>ADD</button>
          
        </form>
    </div>
  )
}

export default AddItems
