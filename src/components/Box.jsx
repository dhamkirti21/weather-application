import { IoLocationSharp } from "react-icons/io5";
import { getWeatherData } from "../apis/Weather";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HourlyData from "./HourlyData";
import AirPolution from "./AirPolution";
import GetLocationOnLoad from "./Location";
import { setCurrentWeather, setWeather } from "../state";
import ForcastedTimeline from "./ForcastedTimeline";
import MoreDetails from "./MoreDetails";
import { useNavigate } from "react-router";

const Box = ({ mode }) => {
    const [weatherData, setWeatherData] = useState(null);
    const lat = useSelector((state) => state.lat);
    const long = useSelector((state) => state.long);
    const units = useSelector((state) => state.unit);
    const name = useSelector((state) => state.name);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {

        const fetchData = async () => {
            if (lat && long) {
                try {
                    const data = await getWeatherData(lat, long, units);
                    setWeatherData(data);
                    dispatch(setCurrentWeather({ currentWeather: data }));
                    dispatch(setWeather({ mode: data.weather[0].description }));
                } catch (error) {
                    console.error("Error fetching weather data:", error);
                }
            }
        };

        fetchData();
    }, [lat, long, units, dispatch]);

    const locationName = weatherData?.name;
    const d = new Date();
    const day = d.toLocaleDateString('en-US', { weekday: 'long' });
    const month = d.toLocaleDateString('en-US', { month: '2-digit' });
    const date = d.toLocaleDateString('en-US', { day: '2-digit' });
    const temperature = Math.floor(weatherData?.main?.temp) || 22;
    const unit = units === "metric" ? "C" : "F";
    const icon_base_url = "http://openweathermap.org/img/wn/";
    const weathertext = weatherData ? `${weatherData.weather[0].description}` : "Mostly cloudy 25/30";

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-row justify-between gap-12 md:gap-72">
                <div>
                    <h3 className={`uppercase text-normal md:text-lg font-semibold tracking-wide mb-2`}>
                        <div className="flex flex-row gap-2 items-center">
                            <IoLocationSharp />
                            {locationName}
                        </div>
                    </h3>
                    <p className={`uppercase text-base md:text-lg font-medium tracking-widest mb-1`}>
                        {day}
                    </p>
                    <p className={`uppercase text-base md:text-lg font-medium tracking-widest`}>
                        {date}.{month}
                    </p>
                    {
                        name ? (
                            <p className={`capitalize text-base md:text-lg font-medium tracking-widest`}>
                                User: {name.split(" ")[0]}
                            </p>
                        ) : (<></>)
                    }
                    <p onClick={() => { navigate("/calculate") }} className={`flex flex-row gap-2 items-center rounded-full captilize text-xs md:text-sm cursor-pointer font-medium mt-2 text-center tracking-widest p-2 px-4 bg-slate-300/20 hover:bg-slate-400/20`}>
                        Calculate
                    </p>
                </div>
                <div>
                    <GetLocationOnLoad />
                </div>
            </div>
            <div className="flex flex-row gap-2 items-center justify-center h-[100px]">
                <h3 className={`text-8xl font-bold text-center`}>
                    {temperature}
                </h3>
                <h3 className={`text-4xl font-bold text-center`}>
                    <img
                        src={`${icon_base_url}10n.png`}
                        alt="weather-icon"
                    />
                    {unit === "C" ? (<>&deg;C</>) : (<>&deg;F</>)}
                </h3>
            </div>
            <div>
                <h3 className={`text-xl capitalize font-semi-bold text-center`}>
                    {weathertext}
                </h3>
            </div>
            <div className="overflow-y-scroll">
                <HourlyData />
                <ForcastedTimeline />
                <AirPolution />
                <MoreDetails />
            </div>
        </div>
    );
};

export default Box;
