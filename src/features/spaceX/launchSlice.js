import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'

export const launchSlice = createSlice({
    name: 'launches',
    initialState: {
        value: [],
    },
    reducers: {
        setLaunches: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { setLaunches } = launchSlice.actions;

export const getLaunches = (year, launch, land) => dispatch => {


    let url = 'https://api.spacexdata.com/v3/launches?limit=100'

    if (year) {
        url = `${url}${year}`
    }
    if (launch) {
        url = `${url}${launch}`
    }
    if (land) {
        url = `${url}${land}`
    }

    console.log(url)
    axios.get(url).then((result) => {
        console.log(result)
        dispatch(setLaunches(result.data))
    })
};

export const selectLaunches = state => state.launches.value;

export default launchSlice.reducer;
