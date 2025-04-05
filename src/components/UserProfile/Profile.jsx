import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom';

function Profile() {

  const navigate = useNavigate()

  const storedData = localStorage.getItem('userInfo');
  const loginData = localStorage.getItem('LoginData');
  const parsedData = JSON.parse(storedData);

  const parserLoginData = JSON.parse(loginData);

  //console.log("this is getting Profile : ", parsedData)

  const logOut = () => {
    localStorage.removeItem('userInfo');
    navigate('/Login')
  }

  return (
    <>
      {/* <div>
      {parsedData.name},  you  are loged in ... 
      </div>


        <div>
          <button onClick={logOut}  className=' p-2   text-white   bg-slate-800 rounded-md'>
             logOut
          </button>
        </div> */}

      <div className='fixed bg-white top-0 font-bold  w-full  h-20  shadow-md  flex  justify-center text-xl rounded-md mainFont '>

        <div className=' w-1/4  m-1  pl-10 '>
          <Link to="/Profile/EMRead">
            <img
              width='100px'
              className='logo'
              src="https://c8.alamy.com/comp/2AH6RFF/real-estate-company-logo-design-template-blue-house-and-building-concept-construction-architecture-element-apartment-condo-rouded-window-shape-2AH6RFF.jpg"
              alt="" />
          </Link>
        </div>

        <div className=' w-9/12   mr-16 gap-16 pt-4  flex   justify-end'>

          <Link to="/Profile/EMRead">
            <div className='Home hover:text-black cursor-pointer ' >
              Employee Master
            </div>
          </Link>
          <Link to="/Profile/TaskRead">
            <div className='Home hover:text-black cursor-pointer ' >
              Task
            </div>
          </Link>
          <Link to="/Profile/LeaveRead">
            <div className='Home hover:text-black cursor-pointer ' >
              Employees Leave
            </div>
          </Link>



          <Link to={`/Profile/EMRead/EMUpdate/${parserLoginData.data.id}`}>
            Hello! {parsedData.name}
          </Link>

          <div className=' '>
            <button onClick={logOut} className=' p-2  text-white   bg-slate-800 rounded-md shadow-md   hover:shadow-sm'>
              log Out
            </button>
          </div>

        </div>


      </div>

    </>
  )
}

export default Profile
