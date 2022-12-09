import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedRover: '',
    selectedSol: '',
    submitedRover: '',
    submitedSol: ''
}

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        roverFilterChanged: (state, action) => {state.selectedRover = action.payload},
        solFilterChanged: (state, action) => {state.selectedSol = action.payload},
        roverFilterSubmited: (state, action) => {state.submitedRover = action.payload},
        solFilterSubmited: (state, action) => {state.submitedSol = action.payload}
    }
})

const {actions, reducer} = formSlice;

export default reducer;

export const {
    roverFilterChanged,
    solFilterChanged,
    roverFilterSubmited,
    solFilterSubmited
} = actions




