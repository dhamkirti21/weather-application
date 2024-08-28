import BoxWrapper from "./shared/BoxWrapper";
import { useSelector } from "react-redux";
import { FaTemperatureHigh } from "react-icons/fa";
import { PiDropSimpleFill } from "react-icons/pi";
import { RxEyeOpen } from "react-icons/rx";

const MoreDetails = () => {
    const currentWeather = useSelector((state) => state.currentWeather);

    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-wrap gap-4 justify-between">
                <BoxWrapper>
                    <div className="flex flex-col items-center justify-center p-4 w-30 md:w-40 aspect-w-1 aspect-h-1 ">
                        <FaTemperatureHigh size={24} className="text-white mb-2" />
                        <p className="text-xs font-semibold text-gray-300">
                            Feels like
                        </p>
                        <p className="text-sm text-white">
                            {currentWeather.main.feels_like}&deg;
                        </p>
                    </div>
                </BoxWrapper>
                <BoxWrapper>
                    <div className="flex flex-col items-center justify-center p-4 w-30 md:w-40 aspect-w-1 aspect-h-1 ">
                        <PiDropSimpleFill size={24} className="text-white mb-2" />
                        <p className="text-xs font-semibold text-gray-300">
                            Humidity
                        </p>
                        <p className="text-sm text-white">
                            {currentWeather.main.humidity}%
                        </p>
                    </div>
                </BoxWrapper>
                <BoxWrapper>
                    <div className="flex flex-col items-center justify-center p-4 w-30 md:w-40 aspect-w-1 aspect-h-1 ">
                        <RxEyeOpen size={24} className="text-white mb-2" />
                        <p className="text-xs font-semibold text-gray-300">
                            Visiblity
                        </p>
                        <p className="text-sm text-white">
                            {currentWeather.visibility / 1000} km
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
