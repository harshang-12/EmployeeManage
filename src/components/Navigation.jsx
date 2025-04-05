import React from 'react'
import { Link } from 'react-router-dom'

function Navigation() {

  // this is Profile Navigation ... 
  
  return (
    <>

      <div className='fixed bg-white top-0 font-bold  w-full  h-20  shadow-md  flex  justify-center text-xl rounded-md mainFont '>

        <div className=' w-1/4  m-1  pl-10 '>
          <Link to="/">
            <img
              width='100px'
              className='logo'
              src="https://c8.alamy.com/comp/2AH6RFF/real-estate-company-logo-design-template-blue-house-and-building-concept-construction-architecture-element-apartment-condo-rouded-window-shape-2AH6RFF.jpg"
              alt="" />
          </Link>
        </div>

        <div className=' w-9/12  mr-20 gap-16 pt-4  flex   justify-end'>

          <Link to="/">
            <div className='Home hover:text-black cursor-pointer ' >
              Home
            </div>
          </Link>

          <div className=' dropdown '>
            <Link to="/Register">
              <div className=' text-gray-600 hover:text-black cursor-pointer dropBtn'>
                Sign Up
              </div>
            </Link>


          </div>




          <Link to="/Login">
            <div className='logIn hover:text-black cursor-pointer'>
              Log in
            </div>
          </Link>


        </div>
      </div>
    </>
  )
}

export default Navigation
