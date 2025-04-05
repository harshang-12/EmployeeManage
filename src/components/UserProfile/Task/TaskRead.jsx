import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import ConfirmBox from '../ReusableCompo/ConfirmBox';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteTask, fetchTask } from '../../../Feature/taskSlice';


function TaskRead() {
    const apiKey = import.meta.env.VITE_BASE_URL;
    
    const dispatch = useDispatch()

    const navigate = useNavigate();

    const [task, setTask] = useState([]);


    useEffect(() => {
        
        dispatch(fetchTask())
       
    }, [])

    const getTask = useSelector(state => state.task) 

    useEffect(()=> {
            setTask(getTask.taskData)
    },[  task  , getTask ])


    const [open, setOpen] = useState(false)
    const [deleteData, setDeleteData] = useState([])

    const NavAdd = () => {
        navigate("/Profile/TaskRead/AddTask")
    }


    const DeleteOn = () => {

        dispatch(DeleteTask(deleteData))

        setOpen(false)

        
        // axios.delete(`${apiKey}/taskDel/${deleteData._id}`)
        // .then(res => {
                
        //         const updatedData =  task.filter(item => item._id !==  deleteData._id );

        //         setOpen(false)
                
        //         setTask(updatedData);
        //         console.log(task);
                
                
        //         console.log(res)
        //     }
        //     )
           
        //     .catch(err => console.log(err))

    }

    function openDelete(data) {
        setOpen(true)
        console.log("data which will delete : ", data);
        setDeleteData(data)
    }

    return (
        <>
            <div className='mt-20'>
                <div className=' w-full bg-blue-200 h-screen mt-20 text-3xl '>
                    <div className=' pt-8  flex justify-between'>
                        <div className=' ml-5  p-2 font-bold ' >
                            Task
                        </div>
                        <div className=''>

                            <button
                                onClick={NavAdd}
                                className='  p-2  font-bold mr-10 bg-green-400 hover:bg-green-600 rounded-md shadow-md' >
                                Add Your Task
                            </button>

                        </div>

                    </div>


                    <div className=' w-full p-4  overflow-x-auto   '>
                        <table className='  w-full text-sm text-center rtl:text-right '>
                            <thead className='text-lg text-white uppercase bg-gray-700 '>
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        sr.
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Date
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Employee Name
                                    </th>

                                    <th scope="col" className="px-6 py-3">
                                        task title
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    task && 
                                    task.map((task, id) => {

                                        const date1 = new Date(task.taskDate) 

                                        const year = date1.getFullYear();
                                        const month = ("0" + (date1.getMonth() + 1)).slice(-2);
                                        const day = ("0" + date1.getDate()).slice(-2);
    
                                        const tDate = `${day}-${month}-${year}`;
    
                                        return (

                                            <tr key={id} className="  text-lg  odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                                <th scope="row" className="px-6 py-2">
                                                    {id + 1}
                                                </th>
                                                <th className="px-6 py-2">
                                                  {tDate}
                                                </th>
                                                <th className="px-6 py-2">
                                                    {task?.Taskdetails?.name}
                                                </th>
                                                <th className="px-6 py-2">
                                                    {task.title}
                                                </th>
                                                <th className="px-6 py-2">
                                                    <Link to={`/Profile/TaskRead/TaskUpdate/${task._id}`} >
                                                        <button className='  p-1 m-2 h-10 w-10 text-black  bg-green-400 hover:bg-green-600 rounded-md shadow-md' >
                                                            <span>

                                                                <FontAwesomeIcon icon={faPenToSquare} />
                                                            </span>
                                                        </button>
                                                    </Link>



                                                    <button key={id}
                                                        onClick={(e) => openDelete(task)}
                                                        className=' text-black w-10 p-1 m-2 h-10    bg-red-400 hover:bg-red-600 rounded-md shadow-md' >
                                                        <span>
                                                            <FontAwesomeIcon icon={faTrashCan} />
                                                        </span>
                                                    </button>


                                                </th>
                                            </tr>

                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <ConfirmBox
                open={open}
                closeDialog={() => setOpen(false)}
                title={deleteData.name}
                deleteFunction={DeleteOn}
            />
        </>
    )
}

export default TaskRead
