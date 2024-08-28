import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "clear sky",
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
        setUnit: (state) => {
            state.unit = state.unit === "metric" ? "standard" : "metric"
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
        setError: (state, action) => {
            state.error = action.payload.error;
        },
    },
});

export const {
    setWeather,
    setLocation,
    setCurrentWeather,
    setForcastedData,
    setAirQuality,
    setUnit,
    setError
} = appSlice.actions;

export default appSlice.reducer;
