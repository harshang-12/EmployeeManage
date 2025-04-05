import React, { useState, useEffect } from 'react'
import axios, { all } from 'axios'
import { useParams, useNavigate } from 'react-router-dom';
import ErrMsg from "../ReusableCompo/ErrMsg.json"
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployee } from '../../../Feature/employeeSlice';
import { fetchTask, updateTask } from '../../../Feature/taskSlice';


function TaskUpdate() {

    const apiKey = import.meta.env.VITE_BASE_URL;
    const navigate = useNavigate()

    const { id } = useParams()
    const dispatch = useDispatch()

    const [empId, setEmpId] = useState('')

    const [empName, setEmpName] = useState('')
    const [taskDate, setTaskDate] = useState('')
    const [title, setTitle] = useState("")
    const [discription, setDiscription] = useState('')
    const [ allUser , setAllUser ] = useState([])

    const [emp, setEmp] = useState([])


     useEffect(() => {

        dispatch(fetchEmployee())

    }, [])

    const employee =   useSelector(state => state.emp)

    useEffect(()=>{

        if(employee){
            setEmp(employee.data)
        }

    },[emp , employee])



    const tastData = useEffect(() => {

       dispatch(fetchTask())

    }, [apiKey, id])

    const alldata =  useSelector(state => state.task)

    useEffect(()=>{
       setAllUser(alldata.taskData)

       if(id && allUser.length > 0  ){
           const filteredData = allUser.filter( (item) => item._id === id)
           if(filteredData.length > 0 ){

            setEmpName(filteredData[0].Taskdetails.name)
            setTaskDate(filteredData[0].taskDate)
            setTitle(filteredData[0].title)
            setDiscription(filteredData[0].discription)
           }
       } 
    }, [ alldata , allUser , id])
    





    const [nameErr , SetNameErr ] =useState()
    const [taskDateErr , setTaskDateErr  ] =useState()
    const [ titleErr , setTitleErr ] =useState()
    const [ discriptionErr , setDiscriptionErr ] =useState()


    const TaskUpdateOn = () => {

        SetNameErr(!empName)
        setTaskDateErr(!taskDate)
        setTitleErr(!title)
        setDiscriptionErr(!discription)



        if ( !nameErr && !taskDateErr && !titleErr && !discriptionErr ) {

            const data = {
                    id ,  
                    empId,
                    taskDate,
                    title,
                    discription
            }
console.log(empId);
            dispatch(updateTask(data))
            navigate('/Profile/TaskRead')
            // axios.put(`${apiKey}/taskUpdate/${id}`, {
            //     empId,
            //     taskDate,
            //     title,
            //     discription
            // })
            //     .then(result => {
            //         // console.log(result)
            //         navigate('/Profile/TaskRead')
            //     })

            //     .catch(err => console.log(err))
        }
    }

    useEffect(() => {
        emp.map((data, index) => {
            if (empName == data.name) {
                setEmpId(data._id)
            }
        })
    }, [emp, empName])


    // console.log(empId);





    return (
        <>
            <div className='   w-full bg-blue-200 h-screen   font-bold '>
                <div className=' bg- h-screen mainFont  pt-32   xl:flex  xl:justify-center lg:flex lg:justify-center md:flex md:justify-center  w-full  '>

                    <div className='  xl:w-1/3 lg:w-1/3 md:w-1/2 sm:w-full   smForm '>
                        <div className=' text-black text-5xl text-center'>
                            Update Task
                        </div>
                        <form className=' mt-5 w-full  bg-blue-900  rounded-md p-4 shadow-lg ' action="">

                            <div className='mt-2' >
                                <label className='  block mt-2 text-xl text-white'
                                    htmlFor="Name">Employee Name</label>
                                <select
                                    value={empName}

                                    onChange={(e) => {
                                        setEmpName(e.target.value)
                                    }}
                                    id='Name'
                                    className=" text-xl pl-1 w-full h-8 mt-1 block border border-black rounded-sm bg-blue-200 "
                                    placeholder=''
                                >

                                    <option disabled hidden  >Select</option>

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
                                <label className='block mt-2 text-xl text-white' htmlFor="Date">Task Date</label>
                                <input
                                    value={taskDate}
                                    onChange={(e) => setTaskDate(e.target.value)} id='Date'
                                    className=' text-xl pl-1 w-full h-8 mt-1 block border border-black rounded-sm bg-blue-200 '
                                    type="Date" />

                                {
                                   taskDateErr && <div className='text-sm text-red-500'>{ErrMsg.DateErr}</div>

                                }
                            </div>
                            <div className='mt-2' >
                                <label className='block mt-2 text-xl text-white' htmlFor="title">Task Title</label>
                                <input
                                    value={title}
                                    //  placeholder='Title'
                                    onChange={(e) => setTitle(e.target.value)}
                                    id='title' className=' text-xl pl-1 w-full h-8 mt-1 block border border-black rounded-sm bg-blue-200 ' type="text" />
                                {
                                   titleErr && <div className='text-sm text-red-500'>{ErrMsg.taskTitleErr} </div>

                                }
                            </div>
                            <div className='mt-2' >
                                <label className='block mt-2 text-xl text-white'
                                    htmlFor="discription">Task Discription</label>
                                <textarea
                                    value={discription}
                                    // placeholder='discription...'
                                    onChange={(e) => setDiscription(e.target.value)}
                                    id='discription' className=' text-xl pl-1 w-full h-32  mt-1 block border border-black rounded-sm bg-blue-200 ' />
                                {
                                discriptionErr && <div className='text-sm text-red-500'>{ErrMsg.taskDiscriptionErr} </div>

                                }
                            </div>


                            <div className=' flex justify-center mt-4 '>

                                <button
                                    onClick={TaskUpdateOn}
                                    type='button'
                                    className=' shadow-xl hover:shadow-md bg-green-500 hover:bg-green-700   text-white p-2 rounded-md'>
                                    Update Task
                                </button>

                            </div>
                        </form>
                    </div>

                </div>

            </div>
        </>
    )
}

export default TaskUpdate
