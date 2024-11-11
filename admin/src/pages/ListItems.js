import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const ListItems = ({ url }) => {
  const [list, setlist] = useState([])

  const fetchData = async () => {
    const response = await axios(`${url}/api/v1/food/get`)
    if (response.data.success) {
      setlist(response.data.data)
      console.log(list)
    } else {
      toast.error("Error")
    }
  }

  const removeHandler = async (id) => {
    const response = await axios.post(`${url}/api/v1/food/remove`, { _id: id })
    if (response.data.success) {
      toast.success(response.data.message)
      fetchData()
    } else {
      toast.error(response.data.message)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="px-16 pt-4 w-full">
      <h1 className="text-3xl font-semibold mb-2">Available Food Stocks</h1>
      <hr className="border-t-2 border-gray-300 mb-4" />

      <div className="grid grid-cols-5 gap-5 font-semibold text-left">
        <b>Image</b>
        <b>Name</b>
        <b>Category</b>
        <b>Price</b>
        <b>Delete Food Items</b>
      </div>
      <hr className="border-t-2 border-gray-300 my-2" />

      <div className="flex flex-col gap-3">
        {list.map((item) => (
          <div key={item._id} className="grid grid-cols-5 gap-4 items-center">
            <img
              src={`${url}/images/${item.image}`}
              className="w-16 h-16 border border-gray-300 rounded-sm"
              alt={item.name}
            />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>₹{item.price}</p>
            <button
              onClick={() => removeHandler(item._id)}
              className="text-red-500 hover:text-red-700 font-bold"
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ListItems
