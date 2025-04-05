import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiKey = import.meta.env.VITE_BASE_URL;


const initialState = { 
    islodding: false,
    leaveData: [],
    isError: false
}


export const  fetchLeave = createAsyncThunk("fetchLeave",

    async () => {
        const res = await axios.get(`${apiKey}/Leave`);
        try {
            
            return res.data;
        }
        catch (error) {
            console.log(error);
        }
    }
)


export const postLeave  = createAsyncThunk("postLeave",

    async (data) => {
        const res = await axios.post(`${apiKey}/addLeave`, data);
        try {
            return res.data;
        }
        catch (error) {
            console.log(error);
        }
    }
)


export const DeleteLeave = createAsyncThunk("DeleteLeave",

    async (data) => {
        console.log('this is delete ', data._id);
        await axios.delete(`${apiKey}/LeaveDel/${data._id}`);
        try {
            const result = await data
            return result;
        }
        catch (error) {
            console.log(error);
        }
    }
)


export const updateLeave = createAsyncThunk("updateLeave" , 

    async (getdata) => {
        const res = await axios.put(`${apiKey}/UpdateLeave/${getdata.id}`, getdata);
        try {
            return res.data;
        }
        catch (error) {
            console.log(error);
        }
    }
)



const leaveSlice = createSlice({ 
    name : "leave" , 
    initialState ,  
    reducers : {

    } , 
    extraReducers : (builder) =>  { 

        builder.addCase(fetchLeave.pending, (state, action) => {
            state.islodding = true;
        });

        builder.addCase(fetchLeave.fulfilled, (state, action) => {
            state.islodding = false;
            state.leaveData  = action.payload;
        });

        builder.addCase(fetchLeave.rejected, (state, action) => {
            console.log("error", action.payload);
            state.isError = true;

        });



        builder.addCase(postLeave.pending, (state, action) => {
            state.islodding = true;
    });

        builder.addCase(postLeave.fulfilled, (state, action) => {
            state.islodding = false;
            state.leaveData.push(action.payload);
            
        });

        builder.addCase(postLeave.rejected, (state, action) => {
            console.log("error", action.payload);
            state.isError = true;

        });
        


        builder.addCase(DeleteLeave.pending, (state, action) => {
            state.islodding = true;
        });

        builder.addCase(DeleteLeave.fulfilled, (state, action) => {
            state.islodding = false;
        
            const id = action.payload._id
            // console.log(id);
            if (id) {
                state.leaveData = state.leaveData.filter(item => item._id !== id)
            }
        });

        builder.addCase(DeleteLeave.rejected, (state, action) => {
            console.log("error", action.payload);
            state.isError = true;

        });


        builder.addCase(updateLeave.pending, (state, action) => {
            state.islodding = true;
        });

        builder.addCase(updateLeave.fulfilled, (state, action) => {
            state.islodding = false;
            console.log('this is data ... ', action.payload);

            state.leaveData = state.leaveData.map((item)=> (
                item._id === action.payload._id ? action.payload : item 
            ))

        });

        builder.addCase(updateLeave.rejected, (state, action) => {
            console.log("error", action.payload);
            state.isError = true;
    })
}
})



export default leaveSlice.reducer

