import { useDispatch, useSelector } from "react-redux";
import BackgroundWrapper from "../components/BackgroundWrapper"
import AnimationWrapper from "../components/motion/ScrollUpDiv"
import { memo, useEffect, useState } from "react";
import { fetchApi } from "../apis/Utility";
import { BASE_URL } from "../constants/url";
import { useNavigate } from "react-router";
import { logOut } from "../state";

const Calculate = () => {
    const mode = memo(useSelector((state) => state.mode));
    const [value, setValue] = useState(0);
    const [result, setResult] = useState(null)
    const [error, setError] = useState(null)
    const [unit, setUnit] = useState("Celcius")
    const [inputUnit, setInputUnit] = useState("Fahrenheit");
    const token = useSelector((state) => state.token);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const textColor = mode === "clear sky" || mode === "few-clouds" ? "text-white" : "text-slate-200";

    useEffect(() => {
        if (!token) {
            navigate("/login")
        }
    }, [token])


    const changeUnit = () => {
        const newUnit = unit === "Celcius" ? "Fahrenheit" : "Celcius";
        const newInputUnit = newUnit === "Fahrenheit" ? "Celcius" : "Fahrenheit";
        setUnit(newUnit)
        setInputUnit(newInputUnit)
    }

    const convert = async () => {
        const conversionUnit = unit === "Celcius" ? "changetoC" : "changetoF"
        const response = await fetch(`${BASE_URL}/calculate/${conversionUnit}/${value}`, {
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`
            },
        });
        const res = await response.json();
        if (response.status === 401) {
            dispatch(logOut())
            navigate("/login")
        }
        setResult(res.newValue);
    }

    return (
        <BackgroundWrapper>
            <AnimationWrapper>
                <div className="w-full h-full flex flex-col justify-center items-center py-12  px-48">
                    <div className={`flex flex-col gap-2 p-6 ${textColor} bg-white/20 dark:bg-gray-800/40 rounded-lg 
                    shadow-lg backdrop-blur-sm`}>
                        <h3 className={`${textColor} font-bold`}>
                            Calculator
                        </h3>
                        <div>
                            <label htmlFor="password" className={`text-sm font-medium ${textColor}`}>
                                Enter the Value - ({inputUnit})
                            </label>
                            <input
                                type="number"
                                id="number"
                                name="number"
                                value={value}
                                onChange={(event) => { setValue(event.target.value) }}
                                required
                                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 text-slate-800"
                                placeholder="Ex : 12"
                            />
                        </div>
                        <div className="flex flex-col  gap-2 justify-between">
                            <button
                                onClick={changeUnit}
                                className="bg-slate-500 text-white w-full py-2 rounded-md hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            >
                                Unit: {unit}
                            </button>
                            <button
                                onClick={convert}
                                className="bg-slate-500 text-white w-full py-2 rounded-md hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            >
                                Calculate
                            </button>
                        </div>
                        <div>
                            <h3>
                                Result : {result}
                            </h3>
                        </div>


                    </div>
                </div>
            </AnimationWrapper>
        </BackgroundWrapper>
    )
}

export default Calculate
