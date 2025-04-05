import React from 'react'
import {  useState  } from 'react'
import { useNavigate } from 'react-router-dom';
import InputName from '../ReusableCompo/inputName';
import ErrMsg from "../ReusableCompo/ErrMsg.json"
import { useDispatch } from 'react-redux';
import { postLeave } from '../../../Feature/leaveSlice';

function LeaveAdd() {

    const storedData = localStorage.getItem('userInfo');
    const parsedData = JSON.parse(storedData);

    const localEmail = parsedData.email
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [empName, setEmpName] = useState()
    const [startDate, setStartdate] = useState()
    const [endDate, setEndDate] = useState()

    const [nameErr, setNameErr] = useState(false)
    const [startDateErr, setStartDateErr] = useState(false)
    const [endDateErr, setEndDateErr] = useState(false)
    
    //    
        const gettingName = (data) => {
            setEmpName(data)
        }
    
    // 



    const AddHoliday = () => {
        
      setNameErr(!empName)
      setStartDateErr(!startDate)
      setEndDateErr(!endDate)

     console.log(nameErr , startDateErr , endDateErr);

        if ( empName && startDate && endDate) {


            const data ={ 
                startDate , 
                endDate , 
                empName , 
                localEmail 
            }

     dispatch(postLeave(data))

     navigate('/Profile/LeaveRead')

        }
    }

    return (
        <>
            <div className='   w-full bg-blue-200    font-bold '>
                <div className=' bg- h-screen mainFont  pt-32   xl:flex  xl:justify-center lg:flex lg:justify-center md:flex md:justify-center  w-full  '>

                    <div className='  xl:w-1/3 lg:w-1/3 md:w-1/2 sm:w-full   smForm '>
                        <div className=' text-black text-5xl text-center'>
                            Take Your Holiday
                        </div>
                        <form className=' mb-5 mt-5 w-full  bg-blue-900  rounded-md p-4 shadow-lg ' action="">

                            <div className='mt-2' >


                                <InputName
                                    getName={gettingName}
                                />
                                {
                                    nameErr && <div className='text-sm text-red-500'>{ErrMsg.NameErr}</div>
                                }



                            </div>

                            <div className='mt-2' >
                                <label className='block mt-2 text-xl text-white' htmlFor="startDate">Start Date</label>
                                <input   value={startDate || ''} onChange={(e) => setStartdate(e.target.value)} id='datepicker' 
                                    className=' text-xl pl-1 w-full h-8 mt-1 block border border-black rounded-sm bg-blue-200 '
                                    type="Date" />
                                {
                                    startDateErr && <div className='text-sm text-red-500'>{ErrMsg.DateErr}</div>

                                }
                            </div>

                            <div className='mt-2' >
                                <label className='block mt-2 text-xl text-white' htmlFor="endDate">End Date</label>
                                <input
                                    value={endDate || ''}
                                    onChange={(e) => setEndDate(e.target.value)} id='Date'
                                    className=' text-xl pl-1 w-full h-8 mt-1 block border border-black rounded-sm bg-blue-200 '
                                    type="Date" />
                                {
                                    endDateErr && <div className='text-sm text-red-500'>{ErrMsg.DateErr}</div>

                                }
                            </div>




                            <div className=' flex justify-center mt-4 '>

                                <button
                                    onClick={AddHoliday}
                                    type='button'
                                    className=' shadow-xl hover:shadow-md bg-green-500 hover:bg-green-700   text-white p-2 rounded-md'>
                                    Add Holiday
                                </button>

                            </div>
                        </form>
                    </div>

                </div>

            </div>
        </>
    )
}

export default LeaveAdd
