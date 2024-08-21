import React from 'react'
import Header from '../components/Header'
import ExploreMenu from '../components/ExploreMenu'
import { useState } from 'react'
import FoodDisplay from '../components/FoodDisplay'
import MobileApp from '../components/MobileApp'
const Home = () => {
  const [category,setCategory]=useState('All');
  return (
    <div className='max-w-[1280px] mx-auto'>
      <Header/>
      <ExploreMenu category={category} setCategory={setCategory}/>
      <FoodDisplay category={category}/>
      <MobileApp/>
    </div>
  )
} 

export default Home
