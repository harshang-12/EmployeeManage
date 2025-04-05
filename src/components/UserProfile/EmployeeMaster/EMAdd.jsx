
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ValidName, ValidNo } from './RegEx'
import ErrMsg from "../ReusableCompo/ErrMsg.json"
import { useDispatch } from 'react-redux';
import { postEmployee } from '../../../Feature/employeeSlice';


function EMAdd() {

  const navigate = useNavigate()

  const dispatch =  useDispatch()

  const [name, setName] = useState('')
  const [emp_id, setemp_id] = useState('')
  const [Number, setNumber] = useState('')
  
  // regEx /// validation 
  const [nameErr, setNameErr] = useState(false)
  const [noErr, setNoErr] = useState(false)

  const AddOn = () => {

    const isValidName = ValidName.test(name);
    const isvalidNo = ValidNo.test(Number);

    setNameErr(!isValidName);
    setNoErr(!isvalidNo);

    if (isValidName && isvalidNo) {

      console.log("name : ", name);
      console.log("emp_id :", emp_id);
      console.log("Number", Number);

      let data = {
        name , 
        emp_id ,
        Number
      }
        dispatch(postEmployee(data))
        navigate('/Profile/EMRead')
    }
  }

  return (

    <div className='   w-full bg-blue-200 h-screen   font-bold '>
      <div className=' bg- h-screen mainFont  pt-32   xl:flex  xl:justify-center lg:flex lg:justify-center md:flex md:justify-center  w-full  '>

        <div className='  xl:w-1/3 lg:w-1/3 md:w-1/2 sm:w-full   smForm '>
          <div className=' text-black text-5xl text-center'>
            Add Employee
          </div>
          <form className=' mt-5 w-full  bg-blue-900  rounded-md p-4 shadow-lg ' action="">

            <div className='mt-2' >
              <label className='  block mt-2 text-xl text-white' htmlFor="Name">Name</label>
              <input value={name || ''} onChange={(e) => setName(e.target.value)} id='Name' className=' text-xl  pl-1 w-full h-8 mt-1 block border border-black rounded-sm bg-blue-200 ' type="text" />
              {
                nameErr &&
                <div className='text-sm text-red-500'>{ErrMsg.employeeNameErr}</div>

              }
            </div>

            <div className='mt-2' >
              <label className='block mt-2 text-xl text-white' htmlFor="number">Mobile</label>
              <input value={Number || ''} onChange={(e) => setNumber(e.target.value)} id='number' className=' text-xl pl-1 w-full h-8 mt-1 block border border-black rounded-sm bg-blue-200 ' type="text" />
              {
                noErr &&
                <div className='text-sm text-red-500'>{ErrMsg.employeeNumberErr}</div>
              }
            </div>
            <div className='mt-2' >
              <label className='block mt-2 text-xl text-white' htmlFor="emp">Employee No.</label>
              <input value={emp_id || ''} onChange={(e) => setemp_id(e.target.value)} id='emp' className=' text-xl pl-1 w-full h-8 mt-1 block border border-black rounded-sm bg-blue-200 ' type="text" />

            </div>


            <div className=' flex justify-center mt-4 '>

              <button onClick={AddOn} type='button' className=' shadow-xl hover:shadow-md bg-green-500 hover:bg-green-700   text-white p-2 rounded-md'>
                Add Employee
              </button>

            </div>
          </form>
        </div>

      </div>

    </div>
  )
}

export default EMAdd
