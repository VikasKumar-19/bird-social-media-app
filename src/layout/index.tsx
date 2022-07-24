import React, { FC, PropsWithChildren } from 'react'
import Headbar from './Headbar'
import Navbar from './navbar'

const Layout:FC<PropsWithChildren> = (props) => {
  return (
    <div className='flex'>
      <Navbar />
      <div className='flex-1 flex flex-col'>
        <Headbar />
        <div className='h-[calc(100vh-3rem)] overflow-auto'>
          {props.children}
        </div>
      </div>
    </div>
  )
}

export default Layout 