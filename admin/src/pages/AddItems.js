import React, { useState } from 'react'
import { assets } from '../assets/admin_assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const AddItems = ({url}) => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    category: "Salad",
    price: ""
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('category', data.category);
    formData.append('price', data.price);
    formData.append('image', image);

    try {
      const response = await axios.post(`${url}/api/v1/food/add`, formData);
      if (response.data.success) {
        setData({
          name: "",
          description: "",
          price: "",
          category: "Salad"
        });
        toast.success(response.data.message);
        setImage(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong, please try again.");
    }
  }

  return (
    <div className='px-4 py-4 w-full max-w-md sm:px-8'>
      <form className='flex flex-col gap-4' onSubmit={submitHandler}>
        
        {/* Image Upload */}
        <div>
          <p className='mb-2 font-semibold'>Upload Image</p>
          <label htmlFor='image' className='cursor-pointer'>
            <img 
              src={image ? URL.createObjectURL(image) : assets.upload_area} 
              className='w-32 h-32 border-2 border-[#241919] rounded-sm object-cover' 
              alt='' 
            />
          </label>
          <input 
            onChange={(e) => setImage(e.target.files[0])} 
            type='file' 
            id='image' 
            name='image' 
            hidden 
            required 
          />
        </div>

        {/* Product Name */}
        <label htmlFor='productName' className='flex flex-col'>
          <p className='font-semibold'>Product Name</p>
          <input 
            onChange={onChangeHandler} 
            value={data.name} 
            type='text' 
            id='productName' 
            name='name' 
            required 
            className='border-2 border-[#241919] rounded-sm w-full mt-1 px-2 py-1'
          />
        </label>

        {/* Product Description */}
        <label htmlFor='productDescription' className='flex flex-col'>
          <p className='font-semibold'>Product Description</p>
          <textarea 
            onChange={onChangeHandler} 
            value={data.description} 
            id='productDescription' 
            name='description' 
            required 
            className='border-2 border-[#241919] rounded-sm w-full mt-1 px-2 py-1 h-32'
          />
        </label>

        {/* Product Category and Price */}
        <div className='flex flex-col sm:flex-row gap-4'>
          <label htmlFor='productCategory' className='flex flex-col w-full'>
            <p className='font-semibold'>Product Category</p>
            <select 
              onChange={onChangeHandler} 
              id='category' 
              name='category' 
              required 
              className='border-2 border-[#241919] rounded-sm px-2 py-1 mt-1 bg-slate-50'
            >
              <option value="Starters">Starters</option>
              <option value="Vegetarian Delights">Vegetarian Delights</option>
              <option value="Non-Vegetarian Specialties">Non-Vegetarian Specialties</option>
              <option value="Chicken Dishes">Chicken Dishes</option>
              <option value="Paneer Dishes">Paneer Dishes</option>
              <option value="Salads">Salads</option>
              <option value="Sandwiches">Sandwiches</option>
              <option value="Drinks">Drinks</option>
              <option value="Desserts">Desserts</option>
              <option value="Breads">Breads</option>
              <option value="Rolls">Rolls</option>
              <option value="Chinese">Chinese</option>
            </select>
          </label>

          <label htmlFor='productPrice' className='flex flex-col w-full'>
            <p className='font-semibold'>Price</p>
            <input 
              onChange={onChangeHandler} 
              name='price' 
              value={data.price} 
              type='number' 
              id='productPrice' 
              placeholder='Price in Dollar' 
              required 
              className='border-2 border-[#241919] rounded-sm px-2 py-1 mt-1'
            />
          </label>
        </div>

        {/* Submit Button */}
        <button className='border-2 border-[#241919] rounded-sm px-4 py-2 bg-black text-white w-full sm:w-32 mt-4 self-center sm:self-start'>
          ADD
        </button>

      </form>
    </div>
  );
}

export default AddItems;
