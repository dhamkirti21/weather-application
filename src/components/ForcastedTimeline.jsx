import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHourlyData } from "../apis/Weather";
import { setForcastedData } from "../state";

const ForcastedTimeline = () => {
    const mode = useSelector((state) => state.mode);
    const lat = useSelector((state) => state.lat);
    const long = useSelector((state) => state.long);
    const unit = useSelector((state) => state.unit);
    const forcastedData = useSelector((state) => state.forcastedData);
    const dispatch = useDispatch();
    const [localForcastedData, setLocalForcastedData] = useState(null);

    useEffect(() => {
        const getData = async () => {
            const isEmpty = !forcastedData || Object.keys(forcastedData).length === 0;
            if (isEmpty) {
                const data = await getHourlyData(lat, long, unit);
                setLocalForcastedData(data);
                console.log(data);
                dispatch(setForcastedData({ forcastedData: data }));
            } else {
                setLocalForcastedData(forcastedData);
            }
        };

        getData();
    }, [lat, long, unit, dispatch, forcastedData]);

    const bgColor = mode === "clear sky" ? "bg-slate-400/20" : "bg-gray-200/40";

    return (
        <div className={`flex flex-col items-left mt-4 gap-4 p-6 ${bgColor} rounded-lg shadow-xs backdrop-blur-xs`}>
            {localForcastedData && Array.isArray(localForcastedData) && localForcastedData.map((forcast, index) => (
                <div key={index} className="flex flex-row gap-4 justify-between">
                    <p className="text-normal font-bold">
                        {forcast.date}
                    </p>
                    <div>
                        <img
                            src={forcast.icon}
                            alt="icon"
                            loading="eager"
                            className="w-10 h-10"
                        />
                    </div>
                    <p className="text-normal font-semibold">
                        {forcast.min_temp}&deg;/{forcast.max_temp}&deg;
                    </p>
                </div>
            ))}
        </div>
    );
};

export default ForcastedTimeline;
