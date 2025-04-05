import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiKey = import.meta.env.VITE_BASE_URL;

const initialState = {
    islodding: false,
    data: [],
    isError: false
}


export const fetchEmployee = createAsyncThunk("fetchEmployee",

    async () => {
        const res = await axios.get(`${apiKey}/Employee`);
        try {
            return res.data;
        }
        catch (error) {
            console.log(error);
        }
    }
)

export const postEmployee = createAsyncThunk("postEmployee",

    async (data) => {
        const res = await axios.post(`${apiKey}/AddEmployee`, data);
        try {
            console.log(res);
            return res.data;
        }
        catch (error) {
            console.log(error);
        }
    }
)


export const DeleteEmployee = createAsyncThunk("DeleteEmployee",

    async (data) => {

        await axios.delete(`${apiKey}/EmployeeDel/${data._id}`);
        try {
            const result = await data
            return result;
        }
        catch (error) {
            console.log(error);
        }
    }
)


export const updateEmployee = createAsyncThunk("updateEmployee",

    async (getdata) => {
        const res = await axios.put(`${apiKey}/upEmployee/${getdata.id}`, getdata);
        try {
            
            return res.data;
        }
        catch (error) {
            console.log(error);
        }
    }
)



 const employeeSlice = createSlice({

    name: "employee",
    initialState,

    reducers: {

    },

    extraReducers: (builder) => {
        builder.addCase(fetchEmployee.pending, (state, action) => {
            state.islodding = true;
        });

        builder.addCase(fetchEmployee.fulfilled, (state, action) => {
            state.islodding = false;
            state.data = action.payload;
        });

        builder.addCase(fetchEmployee.rejected, (state, action) => {
            console.log("error", action.payload);
            state.isError = true;

        });



        // post Employee data ... 
        builder.addCase(postEmployee.pending, (state, action) => {
            state.islodding = true;
        });

        builder.addCase(postEmployee.fulfilled, (state, action) => {
            state.islodding = false;
            state.data.push(action.payload);

        });

        builder.addCase(postEmployee.rejected, (state, action) => {
            console.log("error", action.payload);
            state.isError = true;

        });


        // delete employee data 
        builder.addCase(DeleteEmployee.pending, (state, action) => {
            state.islodding = true;
        });

        builder.addCase(DeleteEmployee.fulfilled, (state, action) => {
            state.islodding = false;

            const id = action.payload._id
            console.log(id);
            if (id) {
                state.data = state.data.filter(item => item._id !== id)
            }
        });

        builder.addCase(DeleteEmployee.rejected, (state, action) => {
            console.log("error", action.payload);
            state.isError = true;

        });


        // update Employee ... 
        builder.addCase(updateEmployee.pending, (state, action) => {
            state.islodding = true;
        });

        builder.addCase(updateEmployee.fulfilled, (state, action) => {
            state.islodding = false;
            console.log('this is data ... ', action.payload);
            state.data = state.data.map((item)=> (
                item._id === action.payload._id ? action.payload : item 
            ))

        });

        builder.addCase(updateEmployee.rejected, (state, action) => {
            console.log("error", action.payload);
            state.isError = true;

        });



    },

})


export default employeeSlice.reducer