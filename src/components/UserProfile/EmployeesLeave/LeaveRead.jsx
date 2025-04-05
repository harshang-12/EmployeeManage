import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import ConfirmBox from '../ReusableCompo/ConfirmBox';
import { useDispatch, useSelector } from 'react-redux'
import { DeleteLeave, fetchLeave } from '../../../Feature/leaveSlice'


function LeaveRead() {

    const Navigate = useNavigate()
    const dispatch = useDispatch()

    const [open, setOpen] = useState(false)
    const [deleteData, setDeleteData] = useState([])

    const addLeave = () => {
        Navigate('/Profile/LeaveRead/LeaveAdd')
    }

    const [leave, setLeave] = useState([])

    useEffect(() => {

        dispatch(fetchLeave())

    }, [])

    const alldata = useSelector(state => state.leave)

    useEffect(()=>{

        setLeave(alldata.leaveData)

    } , [alldata])


    const DeleteOn = () => {

                dispatch(DeleteLeave(deleteData))
                setOpen(false)

    }

    function openDelete(data) {
        setOpen(true)
        console.log("data which will delete : ", data);
        setDeleteData(data)
    }

    return (
        <>
            <div className=' w-full bg-blue-200  h-screen mt-20 text-3xl '>
                <div className=' pt-8  flex justify-between'>
                    <div className=' ml-5  p-2 font-bold ' >
                        Holiday !
                    </div>
                    <div className=''>

                        <button
                            onClick={addLeave}
                            className='  p-2  font-bold mr-10 bg-green-400 hover:bg-green-600 rounded-md shadow-md' >
                            Take Holiday
                        </button>

                    </div>

                </div>


                <div className=' w-full p-4  overflow-x-auto ro  '>
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
                                    start date
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    end date
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    total days
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Sat/Sun
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                leave.map((empleave, id) => {

                                    const date1 = new Date(empleave.startDate);
                                    const date2 = new Date(empleave.endDate);

                                    let satday = []
                                    let sunday = []

                                    function getDatesInRange(startDate, endDate) {
                                        let date = new Date(startDate.getTime());

                                        let dates = [];

                                        while (date <= endDate) {
                                            dates.push(new Date(date));
                                            date.setDate(date.getDate() + 1);
                                        }

                                        return dates;

                                    }
                                    const dateArray = getDatesInRange(date1, date2)

                                    dateArray.map(getDate => {
                                        if (getDate.getDay() == 0) {
                                            sunday.push(getDate.getDay());
                                        }
                                        if (getDate.getDay() == 6) {
                                            satday.push(getDate.getDay());
                                        }
                                    })

                                    let TotalLeftOfHoliday = satday.length + sunday.length



                                    let Difference_In_Time = (date2.getTime() - date1.getTime());

                                    // To calculate the no. of days between two dates
                                    let Difference_In_Days =
                                        Math.round(Difference_In_Time / (1000 * 3600 * 24));

                                    let holidayTIme = Difference_In_Days + 1;

                                    
                                    const year = date1.getFullYear();
                                    const month = ("0" + (date1.getMonth() + 1)).slice(-2);
                                    const day = ("0" + date1.getDate()).slice(-2);

                                    const sDate = `${day}-${month}-${year}`;


                                    const year2 = date2.getFullYear();
                                    const month2 = ("0" + (date2.getMonth() + 1)).slice(-2);
                                    const day2 = ("0" + date2.getDate()).slice(-2);

                                    const eDate = `${day2}-${month2}-${year2}`;


                                    return (

                                        <tr key={id} className="  text-lg  odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                            <th scope="row" className="px-6 py-2">
                                                {id + 1}
                                            </th>
                                            <th className="px-6 py-2">
                                                {empleave?.holidayDetail?.name}
                                            </th>
                                            <th className="px-6 py-2">
                                                {/* {empleave.startDate} */}
                                                {sDate}
                                            </th>
                                            <th className="px-6 py-2">
                                                {/* {empleave.endDate} */}
                                                {eDate}
                                            </th>
                                            <th className="px-6 py-2">
                                                {holidayTIme - TotalLeftOfHoliday}
                                            </th>
                                            <th className="px-6 py-2">
                                                {satday.length}/ {sunday.length}
                                            </th>
                                            <th className="px-6 py-2">
                                                <Link to={`/Profile/LeaveRead/LeaveUpdate/${empleave._id}`} >
                                                    <button className='  p-1 m-2 h-10 w-10 text-black  bg-green-400 hover:bg-green-600 rounded-md shadow-md' >
                                                        <span>

                                                            <FontAwesomeIcon icon={faPenToSquare} />
                                                        </span>
                                                    </button>
                                                </Link>

                                                <button key={id} onClick={(e) => openDelete(empleave)} className=' text-black w-10 p-1 m-2 h-10    bg-red-400 hover:bg-red-600 rounded-md shadow-md' >
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

            <ConfirmBox
                open={open}
                closeDialog={() => setOpen(false)}
                title={deleteData.name}
                deleteFunction={DeleteOn}
            />

        </>
    )
}

export default LeaveRead
