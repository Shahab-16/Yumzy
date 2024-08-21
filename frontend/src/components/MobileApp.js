import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

const MobileApp = () => {
  return (
    <div className='flex flex-col justify-center items-center gap-9 m-[3rem]' id='MobileApp'>
        <p className='font-semibold text-2xl max-w-[70%] md:max-w-[40%] md:text-3xl text-center '>For Better Experience Download YUMZY App</p>
        <div className='flex flex-col md:flex-row gap-4'>
            <img src={assets.app_store} alt="app_store"/>
            <img src={assets.play_store} alt='play_store'/>
        </div>
    </div>
  )
}

export default MobileApp
