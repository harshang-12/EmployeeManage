import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import InputName from '../ReusableCompo/inputName';
import { Children } from 'react';
import ErrMsg from "../ReusableCompo/ErrMsg.json"
import { useDispatch } from 'react-redux';
import { postTask } from '../../../Feature/taskSlice';


function TaskAdd() {
    const apiKey = import.meta.env.VITE_BASE_URL;


    const navigate = useNavigate()




    const [empName, setEmpName] = useState('')
    const [taskDate, setTaskDate] = useState('')
    const [title, setTitle] = useState("")
    const [discription, setDiscription] = useState('')

    // getting Name BY Reausable Component ... 
    const gettingName = (data) => {
        setEmpName(data)
    }

    // validation ... 
    const [nameErr, SetNameErr] = useState()
    const [taskDateErr, setTaskDateErr] = useState()
    const [titleErr, setTitleErr] = useState()
    const [discriptionErr, setDiscriptionErr] = useState()

    const dispatch = useDispatch()


    const TaskAdd = () => {

        console.log(empName);
        console.log(taskDate);
        console.log(title);
        console.log(discription);

        SetNameErr(!empName)
        setTaskDateErr(!taskDate)
        setTitleErr(!title)
        setDiscriptionErr(!discription)

        if (!nameErr && !taskDateErr && !titleErr && !discriptionErr) {

            const data = {
                empName,
                taskDate,
                title,
                discription
            }

            dispatch(postTask(data))


            // axios.post(`${apiKey}/addTask`, {
            //     empName,
            //     taskDate,
            //     title,
            //     discription
            // })
            //     .then(result => {
            //         console.log(result)
            navigate('/Profile/TaskRead')
            //     })
            //     .catch(err => console.log(err))

        }

    }


    return (
        <>
            <div className='   w-full bg-blue-200    font-bold '>
                <div className=' bg- h-screen mainFont  pt-32   xl:flex  xl:justify-center lg:flex lg:justify-center md:flex md:justify-center  w-full  '>

                    <div className='  xl:w-1/3 lg:w-1/3 md:w-1/2 sm:w-full   smForm '>
                        <div className=' text-black text-5xl text-center'>
                            Add Task
                        </div>
                        <form className=' mt-5 w-full  bg-blue-900  rounded-md p-4 shadow-lg ' action="">

                            <div className='mt-2' >
                                <InputName

                                    getName={gettingName}
                                />
                                {
                                    nameErr && <div className='text-sm text-red-500'>{ErrMsg.NameErr}</div>

                                }



                            </div>

                            <div className='mt-2' >
                                <label className='block mt-2 text-xl text-white' htmlFor="Date">Task Date</label>
                                <input value={taskDate} onChange={(e) => setTaskDate(e.target.value)} id='Date'
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
                                    titleErr && <div className='text-sm text-red-500'>{ErrMsg.taskTitleErr}</div>

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
                                    discriptionErr && <div className='text-sm text-red-500'>{ErrMsg.taskDiscriptionErr}</div>

                                }
                            </div>


                            <div className=' flex justify-center mt-4 '>

                                <button
                                    onClick={TaskAdd}
                                    type='button'
                                    className=' shadow-xl hover:shadow-md bg-green-500 hover:bg-green-700   text-white p-2 rounded-md'>
                                    Add Task
                                </button>

                            </div>
                        </form>
                    </div>

                </div>

            </div>
        </>
    )
}

export default TaskAdd
