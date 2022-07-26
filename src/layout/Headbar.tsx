import React from 'react'
import { useLocation } from 'react-router-dom'

const Headbar = () => {
  const {pathname} = useLocation();
  return (
    <div className='w-full font-bold bg-indigo-900 text-white text-xl relative z-10 h-12 shadow-md flex items-center justify-center'>
      <p className='capitalize'>{pathname === "/"? "Home":pathname.substring(1)}</p>
    </div>
  )
}

export default Headbar