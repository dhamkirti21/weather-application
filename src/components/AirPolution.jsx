import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAirQualityData } from "../apis/Weather";
import { getAirQuality } from "../apis/Utility";
import { setAirQuality } from "../state";

const AirPolution = () => {
    const [rangeValue, setRangeValue] = useState(2);
    const maxValue = 300;
    const lat = useSelector((state) => state.lat);
    const long = useSelector((state) => state.long);
    const mode = useSelector((state) => state.mode);
    const { label, desc } = getAirQuality(rangeValue);
    const bgColor = mode === "clear sky" ? "bg-slate-400/20" : "bg-gray-200/40";
    const dispatch = useDispatch();


    useEffect(() => {
        const fetchData = async () => {
            const data = await getAirQualityData(lat, long);
            setRangeValue(data[0].aqi)
            dispatch(setAirQuality({ airQuality: data }))

        };

        fetchData();
    }, []);


    return (
        <div className={`flex flex-col items-left mt-2 gap-4 p-6 ${bgColor} rounded-lg shadow-xs backdrop-blur-xs`}
        >
            <h3 className="text-small font-semibold ">
                Air quality
            </h3>
            <hr className="border border-slate-400" />
            <p className="text-xl font-semibold">
                {label} {rangeValue}
            </p>
            <p className="text-xs font-semibold">
                {desc}
            </p>
            <input
                type="range"
                min="0"
                onChange={(e) => console.log(e.target.value)}
                disabled
                max={maxValue}
                value={rangeValue}
                className="w-full h-2 range-input"
            />
        </div>
    )
}

export default AirPolution
