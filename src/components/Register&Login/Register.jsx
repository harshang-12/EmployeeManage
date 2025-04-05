import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import { ValidName, ValidEmail, ValidPass } from './RegEx'
import axios from 'axios'


function Register() {

  const apiKey = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    console.log(apiKey);
  }, [])

  let navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(true)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [Cpassword, setCpassword] = useState('')

  // RegEx ...
  const [nameErr, setNameErr] = useState(false)
  const [EmailErr, setEmailErr] = useState(false)
  const [passErr, setPassErr] = useState(false)



  const postData = (e) => {
    e.preventDefault();

    const isValidName = ValidName.test(name);
    const isValidEmail = ValidEmail.test(email);
    const isValidPass = ValidPass.test(password);


    setNameErr(!isValidName);
    setEmailErr(!isValidEmail);
    setPassErr(!isValidPass);

    if (isValidName && isValidEmail && isValidPass) {
      
      axios.post(`${apiKey}/register`, {
        name,
        email,
        password,
        Cpassword

      })
        .then(result => console.log(result))
        .then(() => navigate('/Login'))
        .catch(err => console.log(err))

    }

  }

  return (
    <>
      <div className=' bg-blue-300  h-screen font-bold'>
        <div className='  mainFont  pt-32   xl:flex  xl:justify-center lg:flex lg:justify-center md:flex md:justify-center  w-full  '>

          <div className='  xl:w-1/3 lg:w-1/3 md:w-1/2 sm:w-full   smForm '>
            <div className=' text-blue-950 text-5xl text-center'>
              Register
            </div>
            <form className=' w-full bg-blue-800 rounded-md mt-4 p-4 shadow-md ' action="">

              <div className='mt-2' >
                <label className='  block mt-2 text-xl text-white' htmlFor="Name">Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} id='Name' className=' text-xl  pl-1 w-full h-8 mt-1 block border border-black rounded-sm bg-blue-200 ' type="text" />
                {
                  nameErr &&
                  <div className='text-sm text-red-500'>Invalid Name...</div>

                }
              </div>

              <div className='mt-2' >
                <label className='block mt-2 text-xl text-white' htmlFor="email">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} id='email' className=' text-xl pl-1 w-full h-8 mt-1 block border border-black rounded-sm bg-blue-200 ' type="text" />
                {
                  EmailErr &&
                  <div className='text-sm text-red-500'>Invalid Email...</div>
                }
              </div>

              <div className='mt-2   relative' >
                <label className='block mt-2 text-xl text-white' htmlFor="password">Password</label>
                <div className=' flex  '>
                  <input value={password} onChange={(e) => setPassword(e.target.value)} id='password' className=' text-xl  pl-1 w-full h-8 mt-1 block border border-black rounded-sm bg-blue-200'
                    type={showPassword ? "text" : "password"} />

                  <button type='button' onClick={() => setShowPassword(!showPassword)} className=' h-8 m-8  absolute  inset-y-0 right-0  '>
                    <span className='  '> {
                      showPassword ?
                        <FontAwesomeIcon icon={faEyeSlash} shake />
                        :
                        <FontAwesomeIcon icon={faEye} />
                    }
                    </span>
                  </button>

                </div>
                {
                  passErr &&
                  <div className='text-sm text-red-500'>Invalid Password...</div>

                }
              </div>
              <div className='mt-2' >
                <label className='block mt-2 text-xl text-white' htmlFor="confirmPassword">Confirm Password </label>
                <input value={Cpassword} onChange={(e) => setCpassword(e.target.value)} id='confirmPassword' className=' text-xl  pl-1 w-full h-8 mt-1 block border border-black rounded-sm bg-blue-200' type="password" />

              </div>
              <div className=' flex justify-end mt-4 '>
                {
                  password === Cpassword && Cpassword !== "" ?

                    <button onClick={postData} type='button' className=' shadow-xl hover:shadow-md bg-blue-500 hover:bg-blue-700   text-white p-2 rounded-md'>
                      Join or Login
                    </button>
                    :
                    <div className='   cursor-default  bg-gray-500  text-white p-2 rounded-md'>
                      Join or Login
                    </div>

                }

              </div>
            </form>
          </div>

        </div>

      </div>
    </>
  )
}

export default Register
