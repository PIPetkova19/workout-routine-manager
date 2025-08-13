import { configureStore } from "@reduxjs/toolkit"
import { routinesReducer } from "./RoutinesReducer"

export const store = configureStore({
    reducer: {
        routines: routinesReducer.reducer
    }
})