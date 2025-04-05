import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { ValidName, ValidNo } from './RegEx'
import ErrMsg from "../ReusableCompo/ErrMsg.json"
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployee, updateEmployee  } from '../../../Feature/employeeSlice';

function EMUpdate() {

  const dispatch = useDispatch()

  const navigate = useNavigate()
  const { id } = useParams()

  const [name, setName] = useState('')
  const [emp_id, setemp_id] = useState('')
  const [Number, setNumber] = useState('')
  const [allUser, setAllUser] = useState([])

  //regex ... 
  const [nameErr, setNameErr] = useState(false)
  const [noErr, setNoErr] = useState(false)


  useEffect(() => {

    dispatch(fetchEmployee())

  }, [])

  const alldata = useSelector(state => state.emp)

  useEffect(() => {

    setAllUser(alldata.data);

    if (id && allUser.length > 0) {

      const filteredData = allUser.filter((item) => id == item._id)

      if (filteredData.length > 0) {
        setName(filteredData[0].name)
        setNumber(filteredData[0].Number)
        setemp_id(filteredData[0].emp_id)
      }
    }

  }, [ alldata, allUser, id ])

  const UpdateOn = (e) => {


    e.preventDefault()


    const isValidName = ValidName.test(name);
    const isvalidNo = ValidNo.test(Number);

    setNameErr(!isValidName);
    setNoErr(!isvalidNo);

    if (isValidName && isvalidNo) {

      const  data = { 
        id,
        name , 
        emp_id , 
        Number
      }
 
      dispatch(updateEmployee(data))
      navigate('/Profile/EMRead')
    }
  }

  return (

    <div className='   w-full bg-blue-200 h-screen   font-bold '>
      <div className=' bg- h-screen mainFont  pt-32   xl:flex  xl:justify-center lg:flex lg:justify-center md:flex md:justify-center  w-full  '>

        <div className='  xl:w-1/3 lg:w-1/3 md:w-1/2 sm:w-full   smForm '>
          <div className=' text-black text-5xl text-center'>
            Update Employee
          </div>
          <form className=' mt-5 w-full  bg-blue-900 rounded-md p-4 shadow-lg ' action="">

            <div className='mt-2' >
              <label className='  block mt-2 text-xl text-white' htmlFor="Name">Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} id='Name' className=' text-xl  pl-1 w-full h-8 mt-1 block border border-black rounded-sm bg-blue-200 ' type="text" />
              {
                nameErr &&
                <div className='text-sm text-red-500'>{ErrMsg.employeeNameErr}</div>

              }
            </div>

            <div className='mt-2' >
              <label className='block mt-2 text-xl text-white' htmlFor="number">Mobile</label>
              <input value={Number} onChange={(e) => setNumber(e.target.value)} id='number' className=' text-xl pl-1 w-full h-8 mt-1 block border border-black rounded-sm bg-blue-200 ' type="text" />
              {
                noErr &&
                <div className='text-sm text-red-500'>{ErrMsg.employeeNumberErr}</div>
              }
            </div>
            <div className='mt-2' >
              <label className='block mt-2 text-xl text-white' htmlFor="emp">Employee No.</label>
              <input value={emp_id} onChange={(e) => setemp_id(e.target.value)} id='emp' className=' text-xl pl-1 w-full h-8 mt-1 block border border-black rounded-sm bg-blue-200 ' type="text" />

            </div>


            <div className=' flex justify-center mt-4 '>

              <button onClick={UpdateOn} type='button' className=' shadow-xl hover:shadow-md bg-green-500 hover:bg-green-700   text-white p-2 rounded-md'>
                Update Employee
              </button>

            </div>
          </form>
        </div>

      </div>

    </div>
  )
}

export default EMUpdate
