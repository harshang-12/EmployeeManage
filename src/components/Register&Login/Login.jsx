import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { ValidEmail, ValidPass } from './RegEx'

import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';

function Login() {
  const apiKey = import.meta.env.VITE_BASE_URL;


  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [vcode, setCode] = useState()
  const [openvery, setOpenvery] = useState(false)



  const checkData = () => {


    
    
    axios.post(`${apiKey}/login`, {
      email,
      password
    })
      .then((result) => {
        console.log(result)

        if (result.data.success) {
          toast.info("enter the mail verification Code ", {
            position: toast.POSITION.BOTTOM_LEFT,
          });
          
          setOpenvery(true)

        }
         else {
          toast.error("Match  failed.", {
            position: toast.POSITION.BOTTOM_LEFT,
          });
        }
      })
 
      .catch(err => console.log(err))


  }


  const checkwithvary = () => {


    axios.post(`${apiKey}/codeverify`, {

      vcode,
      email
    })
      .then((result) => {

        console.log(result)

        if (result.data.success) {
          toast.info(" you just Log in  ", {
            position: toast.POSITION.BOTTOM_LEFT,
          })
          localStorage.setItem("userInfo", JSON.stringify(result.data));
          navigate(`/Profile/EMRead`)

        } else {
          toast.error("Match  failed.", {
            position: toast.POSITION.BOTTOM_LEFT,
          });
        }
      })
      .catch(err => console.log("this is err ", err))


  }

  return (
    <>
      <div className=' bg-blue-300 text-4xl font-bold '>


        <div className='bgColor h-screen'>
          <div className='mainFont  pt-32    flex justify-center  w-full  '>


            <div className=' xl:w-1/3 lg:w-1/3 md:w-1/2 sm:w-full    '>
              <div className=' text-blue-950 text-center text-5xl '>
                Login
              </div>
              <form className='bg-blue-800 mt-4 rounded-md p-4 shadow-md ' action="">

                <div className='mt-2' >
                  <label className='block mt-2 text-xl text-white' htmlFor="name">Email</label>
                  <input id='name' value={email} onChange={(e) => setEmail(e.target.value)} className=' text-xl  w-full h-8 mt-1 block border border-black rounded-sm ' type="text" />

                </div>

                <div className='mt-2' >
                  <label className='block mt-2 text-xl text-white' htmlFor="password">PassWord </label>
                  <input id='password' value={password} onChange={(e) => setPassword(e.target.value)} className=' text-xl w-full h-8 mt-1 block border border-black rounded-sm' type="password" />

                </div>{
                  openvery &&
                  <div className='mt-2' >
                    <label className='block mt-2 text-xl text-white' htmlFor="password"> Verification Code </label>
                    <input id='password'
                      // value={} 
                      onChange={(e) => setCode(e.target.value)} className=' text-xl w-full h-8 mt-1 block border border-black rounded-sm' type="number" />

                  </div>
                }

                <div className=' flex justify-center mt-4 '>
                  {
                    openvery ?
                      <button
                        onClick={checkwithvary}
                        type='button' className=' text-lg shadow-xl hover:shadow-md bg-green-700  text-white p-2 rounded-md'>
                        login
                      </button> :
                      <button onClick={checkData} type='button' className=' text-lg shadow-xl hover:shadow-md bg-blue-500   text-white p-2 rounded-md'>
                        verify
                      </button>
                  }
                </div>

                <div className=' flex justify-center mt-4 '>
                  {
                    openvery &&
                    <button onClick={()=> setOpenvery(!openvery)} type='button' className=' text-lg shadow-xl hover:shadow-md bg-blue-500   text-white p-2 rounded-md'>
                      Back
                    </button>
                  }

                </div>

              </form>
            </div>

          </div>
          <div className=''>

          </div>
        </div>
        <ToastContainer />

      </div>
    </>
  )
}

export default Login
