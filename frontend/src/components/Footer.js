import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

const Footer = () => {
  return (
    <div className='bg-[#383736] text-white w-full px-[2%] pt-[2%] flex flex-col gap-6' id='Contact'>

        <div className='flex flex-col items-center justify-center lg:flex-row  gap-[2rem] lg:justify-around'>
            <div className='flex flex-col gap-4'>
                <p className='pl-9 text-3xl font-semibold'>Yumzy</p>
                <p className='text-sm'>The best food waiting for you</p>
                <div className='flex gap-2'>
                    <img src={assets.facebook_icon} alt='facebook'/>
                    <img src={assets.twitter_icon} alt='twitter'/>
                    <img src={assets.linkedin_icon} alt='linkedin'/>
                </div>
            </div>

            <div className='flex flex-col gap-3'>
                <p className='text-3xl font-semibold'>Links</p>
                <div className='flex flex-col gap-1'>
                    <p className='text-sm'>Home</p>
                    <p className='text-sm'>Menu</p>
                    <p className='text-sm'>About Us</p>
                    <p className='text-sm'>Privacy Policy</p>
                </div>
            </div>

            <div className='flex flex-col gap-3'>
                <p className='text-3xl font-semibold'>Contact Us</p>
                <div className='flex flex-col gap-1'>
                    <p className='text-sm'>+91 7325842656</p>
                    <p className='text-sm'>yumzy16@gmail.com</p>
                </div>
            </div>

        </div>

        <div className='h-[1px] w-[80%] bg-white mx-auto'></div>

        <p className='text-center p-4'>
            Copyright 2024 © Yumzy.com. All rights reserved.
        </p>
    </div>
  )
}

export default Footer
