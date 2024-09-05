import React from "react";
import axios from "axios";
import { useState,useEffect } from "react";
import { toast } from "react-toastify";
import {assets} from "../assets/admin_assets/assets";

const Orders = ({ url }) => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const response = await axios.get(`${url}` + "/api/v1/order/list");
    console.log(response.data.data);

    if (response.data.success) {
      setData(response.data.data);
    } else {
      toast.error("Error");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const statusHandler=async(event,orderId)=>{
   const response=await axios.post(`${url}`+"/api/v1/order/status",{orderId,status:event.target.value});
   if(response.data.success){
    toast.success(response.data.message);
    fetchData();
   }
  }

    return( 
      <div className="px-4 py-6 sm:px-6 lg:px-12 bg-gray-50 sm:w-full min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-semibold text-yellow-700 mb-6 text-center sm:text-left">Orders By User</h1>
      <div className="mt-8 w-full space-y-6">
        {data.map((orders, index) => (
          <div
            key={index}
            className="flex flex-col sm:w-full sm:gap-5 sm:flex-row items-start p-6 bg-white shadow-md rounded-lg border border-gray-200"
          >
            <img
              src={assets.parcel_icon}
              alt="parcel_icon"
              className="w-12 h-12 sm:w-16 sm:h-16 mb-4 sm:mb-0 sm:mr-6"
            />
            <div className="flex-1">
              <p className="text-base sm:text-lg sm:max-w-[75%] font-medium text-gray-800">
                {orders.items.map((item, idx) => {
                  return idx === orders.items.length - 1
                    ? `${item.name} x ${item.quantity}`
                    : `${item.name} x ${item.quantity}, `;
                })}
              </p>
              <p className="text-sm sm:text-base text-gray-600 mt-2">
                {orders.address.firstName} {orders.address.lastName}
              </p>
              <p className="text-sm sm:text-base text-gray-600">
                {orders.address.city}, {orders.address.state}, {orders.address.country}
              </p>
              <p className="text-sm sm:text-base text-gray-600">Pincode: {orders.address.pinCode}</p>
              <p className="text-sm sm:text-base text-gray-600">Phone Number: {orders.address.phoneNumber}</p>
    
              <div className="mt-4">
                <p className="text-lg sm:text-xl font-semibold text-gray-700">
                  Total Amount: ₹{orders.amount}
                </p>
              </div>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-auto">
              <select  onChange={(event)=>statusHandler(event,data)} value={data.status} className="block w-full sm:w-auto px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500">
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
    
    )
  };

export default Orders;
