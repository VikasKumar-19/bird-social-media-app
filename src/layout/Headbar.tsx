import React from 'react'
import { useLocation } from 'react-router-dom'

const Headbar = () => {
  const {pathname} = useLocation();
  // switch(pathname){
  //   case ""
  // }
  return (
    <div className='w-full h-12 shadow-md flex items-center justify-center'>
      <p>Home</p>
    </div>
  )
}

export default Headbar