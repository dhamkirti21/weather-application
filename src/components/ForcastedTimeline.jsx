import { useSelector } from "react-redux";

const ForcastedTimeline = () => {
    const mode = useSelector((state) => state.mode);
    const forcastedData = useSelector((state) => state.forcastedData);

    const bgColor = mode === "clear-sky" ? "bg-slate-400/20" : "bg-gray-200/40";
    return (
        <div key={forcastedData} className={`flex flex-col items-left mt-4 gap-4 p-6 ${bgColor} rounded-lg shadow-xs backdrop-blur-xs`}
        >
            {
                forcastedData.map((forcast, index) => {
                    return (
                        <div key={index} className="flex flex-row gap-4 justify-between">
                            <p className="text-normal font-bold">
                                {forcast.date}
                            </p>
                            <div>
                                <img
                                    src={forcast.icon}
                                    alt="icon"
                                    loading="lazy"
                                    className="w-10 h-10"
                                />
                            </div>
                            <p className="text-normal font-semibold">
                                {forcast.min_temp}&deg;/{forcast.max_temp}&deg;
                            </p>
                        </div>
                    )
                })}

        </div>
    )
}

export default ForcastedTimeline
