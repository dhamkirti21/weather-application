import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "clear sky",
    name: "",
    token: "",
    lat: 26.218287,
    long: 78.182831,
    unit: "metric",
    currentWeather: {},
    airQuality: {},
    forcastedData: {},
    error: "",
};

export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setWeather: (state, action) => {
            state.mode = action.payload.mode || initialState.mode;
        },
        setUserDetails: (state, action) => {
            state.name = action.payload.user.name
            state.token = action.payload.token
        },
        setUnit: (state) => {
            state.unit = state.unit === "metric" ? "imperial" : "metric"
        },
        setLocation: (state, action) => {
            if (action.payload.lat && action.payload.long) {
                state.lat = action.payload.lat;
                state.long = action.payload.long;
            } else {
                state.lat = initialState.lat;
                state.long = initialState.long;
            }
        },
        setCurrentWeather: (state, action) => {
            state.currentWeather = action.payload.currentWeather;
        },
        setForcastedData: (state, action) => {
            state.forcastedData = action.payload.forcastedData;
        },
        setAirQuality: (state, action) => {
            state.airQuality = action.payload.airQuality;
        },
        logOut: (state) => {
            state.name = initialState.name,
                state.token = initialState.token
        },
        setError: (state, action) => {
            state.error = action.payload.error;
        },
    },
});

export const {
    setWeather,
    setLocation,
    setUserDetails,
    setCurrentWeather,
    setForcastedData,
    setAirQuality,
    setUnit,
    logOut,
    setError
} = appSlice.actions;

export default appSlice.reducer;
