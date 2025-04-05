import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployee } from '../../../Feature/employeeSlice';


function InputName(props) {

    const dispatch = useDispatch()

    const [emp, setEmp] = useState([])


    useEffect(() => {
        dispatch(fetchEmployee())

    }, [])

    const allUser = useSelector(state => state.emp)

    useEffect(() => {
        setEmp(allUser.data)
    }, [allUser])


    return (
        <>
            <label className='  block mt-2 text-xl text-white'
                htmlFor="Name">Employee Name</label>
            <select onChange={(e) => {
                props.getName(e.target.value)
            }}
                id='Name'
                className=" text-xl pl-1 w-full h-8 mt-1 block border border-black rounded-sm bg-blue-200 "
                placeholder=''
            >
                <option disabled hidden selected >Select</option>
                {
                    emp.map((item, index) => (
                        <option key={index}>{item.name}</option>
                    ))
                }

            </select>
        </>
    )
}

export default InputName
