import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import ConfirmBox from '../ReusableCompo/ConfirmBox';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteEmployee, fetchEmployee } from '../../../Feature/employeeSlice';


function EMRead() {


    const [open, setOpen] = useState(false)
    const [deleteData, setDeleteData] = useState([])

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const NavAdd = () => {
        navigate("/Profile/EMRead/AddData")
    }

    useEffect(() => {

        dispatch(fetchEmployee())

    }, [])

    const emp = useSelector((state) => state.emp)

    console.log("emp", emp.data);


    const DeleteOn = () => {
        dispatch(DeleteEmployee(deleteData))
        setOpen(false)

    }



    function openDelete(data) {
        setOpen(true)
        setDeleteData(data)
    }

    return (
        <>
            <div className=' w-full bg-blue-200 h-screen mt-20 text-3xl '>
                <div className=' pt-8  flex justify-between'>
                    <div className=' ml-5  p-2 font-bold ' >
                        Employee Master
                    </div>
                    <div className=''>

                        <button onClick={NavAdd} className='  p-2  font-bold mr-10 bg-green-400 hover:bg-green-600 rounded-md shadow-md' >
                            Add
                        </button>

                    </div>

                </div>


                <div className=' w-full p-4  overflow-x-auto ro  '>
                    {

                        emp?.islodding === true ?
                            <h1 className='text-center text-4xl' > Loading ...</h1> :

                            <table className='  w-full text-sm text-center rtl:text-right '>
                                <thead className='text-lg text-white uppercase bg-gray-700 '>
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            sr.
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Name
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Employee No.
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Number
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        emp?.data &&
                                        emp?.data?.map((employee, id) => {
                                            return (

                                                <tr key={id} className="  text-lg  odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                                    <th scope="row" className="px-6 py-2">
                                                        {id + 1}
                                                    </th>
                                                    <th className="px-6 py-2">
                                                        {employee.name}
                                                    </th>
                                                    <th className="px-6 py-2">
                                                        {employee.emp_id}
                                                    </th>
                                                    <th className="px-6 py-2">
                                                        {employee.Number}
                                                    </th>
                                                    <th className="px-6 py-2">
                                                        <Link to={`/Profile/EMRead/EMUpdate/${employee._id}`} >
                                                            <button className='  p-1 m-2 h-10 w-10 text-black  bg-green-400 hover:bg-green-600 rounded-md shadow-md' >
                                                                <span>

                                                                    <FontAwesomeIcon icon={faPenToSquare} />
                                                                </span>
                                                            </button>
                                                        </Link>



                                                        <button key={id} onClick={(e) => openDelete(employee)} className=' text-black w-10 p-1 m-2 h-10    bg-red-400 hover:bg-red-600 rounded-md shadow-md' >
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


                    }
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

export default EMRead
