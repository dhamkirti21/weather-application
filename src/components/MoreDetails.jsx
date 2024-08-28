import BoxWrapper from "./shared/BoxWrapper";
import { useDispatch, useSelector } from "react-redux";
import { FaTemperatureHigh } from "react-icons/fa";
import { PiDropSimpleFill } from "react-icons/pi";
import { RxEyeOpen } from "react-icons/rx";
import { useEffect, useState } from "react";
import { setCurrentWeather } from "../state";
import { getWeatherData } from "../apis/Weather";

const MoreDetails = () => {
    const [localCurrentWeather, setLocalCurrentWeather] = useState(null);
    const long = useSelector((state) => state.long);
    const lat = useSelector((state) => state.lat);
    const unit = useSelector((state) => state.unit);
    const dispatch = useDispatch();
    const currentWeather = useSelector((state) => state.currentWeather);

    useEffect(() => {
        const getData = async () => {
            const isEmpty = !currentWeather || Object.keys(currentWeather).length === 0;
            if (isEmpty) {
                const data = await getWeatherData(lat, long, unit);
                setLocalCurrentWeather(data);
                console.log(data);
                dispatch(setCurrentWeather({ currentWeather: data }));
            } else {
                setLocalCurrentWeather(currentWeather);
            }
        };

        getData();
    }, [lat, long, unit, dispatch, currentWeather]);

    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-wrap gap-4 justify-between">
                <BoxWrapper>
                    <div className="flex flex-col items-center justify-center p-4 w-30 md:w-40 aspect-w-1 aspect-h-1">
                        <FaTemperatureHigh size={24} className="text-white mb-2" />
                        <p className="text-xs font-semibold text-gray-300">
                            Feels like
                        </p>
                        <p className="text-sm text-white">
                            {localCurrentWeather?.main?.feels_like}&deg;
                        </p>
                    </div>
                </BoxWrapper>
                <BoxWrapper>
                    <div className="flex flex-col items-center justify-center p-4 w-30 md:w-40 aspect-w-1 aspect-h-1">
                        <PiDropSimpleFill size={24} className="text-white mb-2" />
                        <p className="text-xs font-semibold text-gray-300">
                            Humidity
                        </p>
                        <p className="text-sm text-white">
                            {localCurrentWeather?.main?.humidity}%
                        </p>
                    </div>
                </BoxWrapper>
                <BoxWrapper>
                    <div className="flex flex-col items-center justify-center p-4 w-30 md:w-40 aspect-w-1 aspect-h-1">
                        <RxEyeOpen size={24} className="text-white mb-2" />
                        <p className="text-xs font-semibold text-gray-300">
                            Visibility
                        </p>
                        <p className="text-sm text-white">
                            {localCurrentWeather ? localCurrentWeather.visibility / 1000 : ''} km
                        </p>
                    </div>
                </BoxWrapper>
            </div>
            <BoxWrapper>
                <p className="text-normal font-semibold p-4 text-gray-300">
                    Made by Dhamkirti Sisodia
                </p>
            </BoxWrapper>
        </div>
    );
};

export default MoreDetails;
