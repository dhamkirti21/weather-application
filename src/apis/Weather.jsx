import { AIR_QUALITY, CURRENT_WEATHER_DATA, HOURLY_WEAHTER_DATA } from "../constants/api";
import { fetchApi } from "./Utility";

const API_KEY = JSON.stringify(import.meta.env.VITE_API_KEY);

const getDataInUTC = (unixDate) => {
    const date = new Date(unixDate * 1000);
    let hours = date.getUTCHours();
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12;

    const formattedHours = String(hours).padStart(2, '0');
    return `${formattedHours}:${minutes} ${ampm}`;
}

const getWeatherData = async (lat, long, unit = "metric") => {
    const url = `${CURRENT_WEATHER_DATA}?units=${unit}&lat=${lat}&lon=${long}&appid=${JSON.parse(API_KEY)}`
    try {
        const response = await fetchApi(url);
        return response;
    } catch (err) {
        console.error("We ran into a problem", {
            err: error.message
        });
    }

}

const getHourlyData = async (lat, long, cnt, unit = "metric") => {
    const url = `${HOURLY_WEAHTER_DATA}?units=${unit}&cnt=${cnt}&lat=${lat}&lon=${long}&appid=${JSON.parse(API_KEY)}`
    try {
        const response = await fetchApi(url);
        const data = await response.list.map((item) => {
            return {
                temp: Math.floor(item.main.temp),
                date: getDataInUTC(item.dt),
                icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`,
                min_temp: Math.floor(item.main.temp_min),
                max_temp: Math.floor(item.main.temp_max)
            }
        })

        return data;
    } catch (err) {
        console.error("We ran into a problem", {
            err: error.message
        });
    }
}

const getAirQualityData = async (lat, long) => {
    const url = `${AIR_QUALITY}?lat=${lat}&lon=${long}&appid=${JSON.parse(API_KEY)}`
    try {
        const response = await fetchApi(url);
        console.log(response)
        const data = await response.list.map((item) => {
            return {
                aqi: item.main.aqi
            }
        })

        return data;
    } catch (err) {
        console.error("We ran into a problem", {
            err: err.message
        });
    }

}

export {
    getWeatherData,
    getHourlyData,
    getAirQualityData
};