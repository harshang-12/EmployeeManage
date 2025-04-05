import { configureStore } from '@reduxjs/toolkit'

// import todoReducer  from '../feature/todo/TodoSlice'
import employeeReducer from '../Feature/employeeSlice'
import taskReducer from '../Feature/taskSlice'
import leaveReducer from '../Feature/leaveSlice'

export const Store  = configureStore({
    
        reducer : {
            emp : employeeReducer , 
            task : taskReducer ,
            leave : leaveReducer, 
        } 
})