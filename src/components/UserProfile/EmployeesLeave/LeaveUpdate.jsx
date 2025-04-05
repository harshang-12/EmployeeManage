import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import ErrMsg from "../ReusableCompo/ErrMsg.json"
import { useDispatch, useSelector } from 'react-redux';
import { fetchLeave, updateLeave } from '../../../Feature/leaveSlice';
import { fetchEmployee } from '../../../Feature/employeeSlice';


function LeaveUpdate() {

    const navigate = useNavigate()

    const { id } = useParams();
    const dispatch = useDispatch()

    const storedData = localStorage.getItem('userInfo');
    const parsedData = JSON.parse(storedData);

    const localEmail = parsedData.email

    const [emp, setEmp] = useState([])

    const [empId, setEmpId] = useState('')

    const [empName, setEmpName] = useState()
    const [startDate, setStartdate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [allUser, setAllUser] = useState([])

    useEffect(() => {

        dispatch(fetchEmployee())

    }, [])

    const allemp = useSelector(state => state.emp)

    useEffect(() => {
        setEmp(allemp.data)
    }, [])



    useEffect(() => {

        dispatch(fetchLeave())

    }, [])

    const alldata = useSelector(state => state.leave)



    useEffect(() => {

        setAllUser(alldata.leaveData)

        if (id && allUser.length > 0) {
            const filteredData = allUser.filter((item) => item._id === id)


            if (filteredData.length > 0) {

                console.log(filteredData);
                let date1 = new Date(filteredData[0].startDate);
                let date2 = new Date(filteredData[0].endDate);

                const year = date1.getFullYear();
                const month = ("0" + (date1.getMonth() + 1)).slice(-2);
                const day = ("0" + date1.getDate()).slice(-2);

                setStartdate(`${year}-${month}-${day}`);

                const year2 = date2.getFullYear();
                const month2 = ("0" + (date2.getMonth() + 1)).slice(-2);
                const day2 = ("0" + date2.getDate()).slice(-2);

                setEndDate(`${year2}-${month2}-${day2}`);

                setEmpName(filteredData[0].holidayDetail.name)

            }

        }
    }, [alldata, allUser, id])



    const [nameErr, setNameErr] = useState(false)
    const [startDateErr, setStartDateErr] = useState(false)
    const [endDateErr, setEndDateErr] = useState(false)

    const updateHoliday = () => {

        setNameErr(!empName)
        setStartDateErr(!startDate)
        setEndDateErr(!endDate)

        console.log(nameErr, startDateErr, endDateErr);

        if (empName && startDate && endDate) {

            let data = {
                id,
                empId,
                startDate,
                endDate,
                localEmail
            }

            dispatch(updateLeave(data))

            navigate('/Profile/LeaveRead')

        }
    }

    useEffect(() => {
        emp.map((data, index) => {
            if (empName == data.name) {
                setEmpId(data._id)
            }
        })
    }, [emp, empName])


    return (
        <>
            <div className='   w-full bg-blue-200 h-full   font-bold '>
                <div className=' bg- h-screen mainFont  pt-32   xl:flex  xl:justify-center lg:flex lg:justify-center md:flex md:justify-center  w-full  '>

                    <div className='  xl:w-1/3 lg:w-1/3 md:w-1/2 sm:w-full   smForm '>
                        <div className=' text-black text-5xl text-center'>
                            Update Your Holiday
                        </div>
                        <form className=' mb-5 mt-5 w-full  bg-blue-900  rounded-md p-4 shadow-lg ' action="">

                            <div className='mt-2' >
                                <label className='  block mt-2 text-xl text-white'
                                    htmlFor="Name">Employee Name</label>

                                <select onChange={(e) => {
                                    setEmpName(e.target.value)
                                }}
                                    value={empName || ''}
                                    id='Name'
                                    className=" text-xl pl-1 w-full h-8 mt-1 block border border-black rounded-sm bg-blue-200 "
                                    placeholder=''
                                >
                                    <option disabled hidden >Select</option>
                                    {
                                        emp.map((item, index) => (
                                            <option key={index}>{item.name}</option>
                                        ))
                                    }

                                </select>
                                {
                                    nameErr && <div className='text-sm text-red-500'>{ErrMsg.NameErr} </div>

                                }
                            </div>

                            <div className='mt-2' >
                                <label className='block mt-2 text-xl text-white' htmlFor="startDate">Start Date</label>
                                <input value={startDate || ''} onChange={(e) => setStartdate(e.target.value)} id='Date'
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
                                    onClick={updateHoliday}
                                    type='button'
                                    className=' shadow-xl hover:shadow-md bg-green-500 hover:bg-green-700   text-white p-2 rounded-md'>
                                    Update Holiday
                                </button>

                            </div>
                        </form>
                    </div>

                </div>

            </div>
        </>
    )
}

export default LeaveUpdate