import React, { useEffect } from "react";
import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const PlaceOrder = () => {
  const {
    addToCart,
    url,
    totalCartAmount,
    cartItems,
    token,
    food_list,
    setFoodList,
  } = useContext(StoreContext);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    state: "",
    pinCode: "",
    country: "",
    phoneNumber: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData((prev) => ({ ...prev, [name]: value }));
  };

  const placeOrderHandler = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      address: data,
      items: orderItems,
      amount: totalCartAmount() + 2,
    };
    let response = await axios.post(url + "/api/v1/order/place", orderData, {
      headers: { token },
    });
    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    } else {
      alert("Error");
    }
  };

 const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate("/cart")
    }
    else if(totalCartAmount===0){
      navigate('/cart')
    }
  }, [token]);

  return (
    <div className="my-[3rem] max-w-[1200px] mx-auto flex justify-between">
      <div className="flex flex-col gap-5">
        <h2 className="text-3xl font-semibold">Delivery Information</h2>
        <form onSubmit={placeOrderHandler} className="flex flex-col gap-4">
          <div className="flex gap-3">
            <input
              required
              type="text"
              name="firstName"
              onChange={onChangeHandler}
              value={data.firstName}
              placeholder="First Name"
              className="flex-1 h-[20px] border border-black rounded-lg p-[1rem]"
            />
            <input
              required
              type="text"
              name="lastName"
              onChange={onChangeHandler}
              value={data.lastName}
              placeholder="Last Name"
              className="flex-1 h-[20px] border border-black rounded-lg p-[1rem]"
            />
          </div>
          <input
            required
            type="email"
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            placeholder="Email Address"
            className="w-full h-[20px] border border-black rounded-lg p-[1rem]"
          />
          <div className="flex gap-3">
            <input
              required
              type="text"
              name="city"
              onChange={onChangeHandler}
              value={data.city}
              placeholder="City"
              className="flex-1 h-[20px] border border-black rounded-lg p-[1rem]"
            />
            <input
              required
              type="text"
              name="state"
              onChange={onChangeHandler}
              value={data.state}
              placeholder="State"
              className="flex-1 h-[20px] border border-black rounded-lg p-[1rem]"
            />
          </div>
          <div className="flex gap-3">
            <input
              required
              type="number"
              name="pinCode"
              onChange={onChangeHandler}
              value={data.pinCode}
              placeholder="Pin Code"
              className="flex-1 h-[20px] border border-black rounded-lg p-[1rem]"
            />
            <input
              required
              type="text"
              name="country"
              onChange={onChangeHandler}
              value={data.country}
              placeholder="Country"
              className="flex-1 h-[20px] border border-black rounded-lg p-[1rem]"
            />
          </div>
          <input
            required
            type="number"
            name="phoneNumber"
            onChange={onChangeHandler}
            value={data.phoneNumber}
            placeholder="Phone Number"
            className="w-full h-[20px] border border-black rounded-lg p-[1rem]"
          />

          <div className="flex flex-col gap-[0.5rem] w-[500px] mt-[2rem]">
            <p className="text-3xl font-semibold">Cart Totals</p>
            <div className="flex flex-col">
              <div className="flex justify-between">
                <p>Subtotal</p>
                <p>${totalCartAmount()}</p>
              </div>
              <div className="h-[2px] w-full bg-gray-600 mx-auto"></div>
            </div>

            <div className="flex flex-col mt-[1rem]">
              <div className="flex justify-between">
                <p>Delivery Fee</p>
                <p>${totalCartAmount() > 0 ? 2 : 0}</p>
              </div>
              <div className="h-[2px] w-full bg-gray-600 mx-auto"></div>
            </div>

            <div className="flex flex-col mb-[1rem]">
              <div className="flex justify-between">
                <p className="font-semibold">Total</p>
                <p>${totalCartAmount() > 0 ? totalCartAmount() + 2 : 0}</p>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="bg-yellow-600 text-white text-lg font-semibold w-[350px] h-[50px] text-center rounded-lg"
          >
            Proceed to Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default PlaceOrder;
