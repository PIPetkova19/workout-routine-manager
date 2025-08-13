import { createSlice } from "@reduxjs/toolkit";

export const routinesReducer = createSlice({
    name: 'routines',
    initialState: { routinesList: [] },
    reducers:{
        setData: (state, action) => {
            state.routinesList = action.payload;
        },
        createRoutine: (state, action) => {
            state.routinesList.push(action.payload);
        },
        deleteRoutine: (state, action) => {
            state.routinesList = state.routinesList.filter(routine => routine.id !== action.payload);
        },
        editRoutine: (state, action) => {
            const index = state.routinesList.findIndex(routine => routine.id == action.payload.id);
            state.routinesList[index] = action.payload;
        }
    }
})

export const {setData, createRoutine, deleteRoutine, editRoutine } = routinesReducer.actions