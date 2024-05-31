import { createSlice  } from '@reduxjs/toolkit'

const employeeSlice = createSlice({
    name:"employee",
    initialState:[],
    reducers:{
        viewEmployee:(state,action)=>{
            state.push(action.payload)
        }
    }
});


export const { viewEmployee } = employeeSlice.actions
export default employeeSlice.reducer