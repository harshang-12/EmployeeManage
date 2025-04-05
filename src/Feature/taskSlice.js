import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const apiKey = import.meta.env.VITE_BASE_URL;


const initialState = {
    islodding: false,
    taskData: [],
    isError: false
}


export const fetchTask = createAsyncThunk("fetchTask",

    async () => {
        const res = await axios.get(`${apiKey}/Task`);
        try {

            return res.data;
        }
        catch (error) {
            console.log(error);
        }
    }
)

export const postTask = createAsyncThunk("postTask",

    async (data) => {
        const res = await axios.post(`${apiKey}/addTask`, data);
        try {
            return res.data;
        }
        catch (error) {
            console.log(error);
        }
    }
)

export const DeleteTask = createAsyncThunk("DeleteTask",

    async (data) => {
        console.log(data._id);
        await axios.delete(`${apiKey}/taskDel/${data._id}`);
        try {
            const result = await data
            return result;
        }
        catch (error) {
            console.log(error);
        }
    }
)


export const updateTask = createAsyncThunk("updateTask" , 

    async (getdata) => {
        const res = await axios.put(`${apiKey}/taskUpdate/${getdata.id}`, getdata);
        try {
            return res.data;
        }
        catch (error) {
            console.log(error);
        }
    }
)




const taskSlice = createSlice({ 
    name : "task" , 
    initialState , 
    reducers :{ 

    } , 
    extraReducers : (builder)=> {


        builder.addCase(fetchTask.pending, (state, action) => {
            state.islodding = true;
        });

        builder.addCase(fetchTask.fulfilled, (state, action) => {
            state.islodding = false;
            state.taskData  = action.payload;
        });

        builder.addCase(fetchTask.rejected, (state, action) => {
            console.log("error", action.payload);
            state.isError = true;

        });


        builder.addCase(postTask.pending, (state, action) => {
            state.islodding = true;
        });

        builder.addCase(postTask.fulfilled, (state, action) => {
            state.islodding = false;
            state.taskData.push(action.payload);
            
        });

        builder.addCase(postTask.rejected, (state, action) => {
            console.log("error", action.payload);
            state.isError = true;

        });

        


        builder.addCase(DeleteTask.pending, (state, action) => {
            state.islodding = true;
        });

        builder.addCase(DeleteTask.fulfilled, (state, action) => {
            state.islodding = false;
        
            const id = action.payload._id
            console.log(id);
            if (id) {
                state.taskData = state.taskData.filter(item => item._id !== id)
            }
        });

        builder.addCase(DeleteTask.rejected, (state, action) => {
            console.log("error", action.payload);
            state.isError = true;

        });




        builder.addCase(updateTask.pending, (state, action) => {
            state.islodding = true;
        });

        builder.addCase(updateTask.fulfilled, (state, action) => {
            state.islodding = false;
            console.log('this is data ... ', action.payload);

            state.taskData = state.taskData.map((item)=> (
                item._id === action.payload._id ? action.payload : item 
            ))

        });

        builder.addCase(updateTask.rejected, (state, action) => {
            console.log("error", action.payload);
            state.isError = true;

        });


    }
})


export default taskSlice.reducer 