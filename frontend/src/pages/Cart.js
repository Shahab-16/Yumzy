import React, { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { assets, food_list } from "../assets/frontend_assets/assets";
import { useNavigate } from "react-router-dom";


const Cart = () => {
  const { food_list, cartItems, removeFromCart,totalCartAmount,url} = useContext(StoreContext);
  const navigate=useNavigate();
  return (
    <div className="flex flex-col max-w-[1280px] mx-auto gap-[1.5rem] mb-[2rem]">
      <div className="flex justify-between p-[2px]">
        <p>Items</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>

      <div className="h-[2px] w-full bg-gray-600 mx-auto"></div>

      <div className="flex flex-col gap-[2rem]">
        <div className="flex flex-col gap-8">
          {food_list.map((item) => {
            if (cartItems[item._id]){
              return(
                <>
                  <div className="flex justify-between">
                    <img
                      src={url+"/images/"+item.image}
                      alt="food_item"
                      className="w-[50px] h-[50px]"
                    />
                    <p>{item.name}</p>
                    <p>{item.price}</p>
                    <p>{cartItems[item._id]}</p>
                    <p>
                      {cartItems[item._id]*item.price}
                    </p>
                    <img
                      src={assets.cross}
                      alt="remove"
                      className="w-[15px] h-[15px] cursor-pointer"
                      onClick={() => removeFromCart(item._id)}
                    />
                  </div>
                  <div className="h-[1.5px] w-full bg-gray-400 mx-auto"></div>
                </>
              );
            }
          })}
        </div>

        <div className="flex justify-between">

          <div className="flex flex-col gap-[0.5rem] w-[500px]">
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
                <p>${totalCartAmount()>0?2:0}</p>
              </div>
              <div className="h-[2px] w-full bg-gray-600 mx-auto"></div>
            </div>

            <div className="flex flex-col mb-[1rem]">
              <div className="flex justify-between">
                <p className="font-semibold">Total</p>
                <p>${totalCartAmount()>0?totalCartAmount()+2:0}</p>
              </div>
            </div>

            <button onClick={()=>navigate('/placeorder')} className="bg-yellow-600 text-white text-lg font-semibold w-[350px] h-[50px] text-center rounded-lg">Proceed to Checkout</button>

          </div>

          <div className="flex flex-col w-[400px] gap-3">
            <p>If you have a promo code.Enter it here</p>
            <div className="flex gap-[1px]">
              <input type="text" placeholder='Enter promo code' className="bg-gray-300 border-hidden h-[35px] w-[300px] rounded-lg placeholder-black placeholder-opacity-50 text-center"/>
              <button className="bg-black text-white font-semibold w-[90px]  rounded-lg">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
