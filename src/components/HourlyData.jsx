import { useEffect, useState } from "react";
import { getHourlyData } from "../apis/Weather";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { setForcastedData } from "../state";

const HourlyData = () => {
    const [weatherData, setWeatherData] = useState([]);
    const lat = useSelector((state) => state.lat);
    const long = useSelector((state) => state.long);
    const mode = useSelector((state) => state.mode);
    const bgColor = mode === "clear-sky" ? "bg-slate-400/20" : "bg-gray-200/40";
    const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
    const cnt = 10;
    const showCount = isMobile ? 5 : 8;
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            const data = await getHourlyData(lat, long, cnt);
            setWeatherData(data.slice(0, showCount + 1));
            dispatch(setForcastedData({ forcastedData: data }))
        };

        if (lat && long) {
            fetchData();
        }
    }, [lat, long, cnt]);

    return (
        <div className="flex flex-col gap-4">
            <div key={isMobile} className="flex flex-row gap-4 mt-12 overflow-x-auto no-scrollbar items-center justify-center min-w-[80px]">
                {
                    weatherData.slice(0, showCount + 1).map((forecast, index) => (
                        <div key={index} className="flex flex-col items-center gap-2 justify-center text-center min-w-[30px]">
                            <p className="text-xs text-white font-semibold">{forecast.date}</p>
                            <div>
                                <img
                                    src={forecast.icon}
                                    alt="icon"
                                    loading="lazy"
                                    className="w-10 h-10"
                                />
                            </div>
                            <p className="text-normal">{forecast.temp}°C</p>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default HourlyData;
