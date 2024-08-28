import { useSelector } from "react-redux";

const BoxWrapper = ({ children }) => {
    const mode = useSelector((state) => state.mode);
    const bgColor = mode === "clear-sky" ? "bg-slate-400/20" : "bg-gray-200/40";
    return (
        <div className={`flex flex-col items-left mt-2 gap-2  ${bgColor} rounded-lg shadow-xs backdrop-blur-xs`}
        >
            {children}
        </div>
    )
}

export default BoxWrapper
