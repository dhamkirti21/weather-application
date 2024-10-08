import { useEffect, useState } from 'react';
import { logOut, setLocation, setUnit } from '../state';
import { useDispatch, useSelector } from 'react-redux';
import { FaLocationCrosshairs } from "react-icons/fa6";
import { useNavigate } from 'react-router';

const GetLocationOnLoad = () => {
    const [location, setLocationData] = useState({ lat: null, lon: null });
    const [error, setError] = useState(null);
    const [unit, setUnitL] = useState("Celcius");
    const token = useSelector((state) => state.token);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const fetchLocation = () => {
        if (navigator.geolocation) {
            console.log("fetch location runned")
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    console.log(position.coords.latitude, position.coords.longitude)
                    setLocationData({
                        lat: position.coords.latitude,
                        long: position.coords.longitude,
                    });

                    dispatch(setLocation({
                        lat: position.coords.latitude,
                        long: position.coords.longitude,
                    }));
                    return;
                },
                (err) => {
                    console.log("location error", err)
                    return;
                }

            );


        } else {
            setLocationData({
                lat: 26.218287,
                long: 78.182831,
            });
            dispatch(setLocation(location));
            setError("Geolocation is not supported by this browser.");
            console.log("location error", err)
            return;
        }
    };


    const changeUnit = () => {
        setUnitL(unit === "Celcius" ? "Fahrenheit" : "Celcius")
        dispatch(setUnit());
    }

    const handleLogout = () => {
        if (!token) {
            navigate("/login")
            return
        }
        dispatch(logOut());
        navigate("/")

    }
    useEffect(() => {
        fetchLocation();
    }, [dispatch, token]);


    return (
        <>

            <p onClick={fetchLocation} className={`flex flex-row gap-2 items-center rounded-full captilize text-xs md:text-sm cursor-pointer font-medium tracking-widest p-2 bg-slate-300/20 hover:bg-slate-400/20`}>
                <FaLocationCrosshairs size={15} />
                Current Location
            </p>
            <div className="flex flex-col mt-2 gap-2">
                <p key={unit} onClick={changeUnit} className={`flex flex-row gap-2 items-center rounded-full captilize text-xs md:text-sm cursor-pointer font-medium
                text-center tracking-widest p-2 px-6 bg-slate-300/20 hover:bg-slate-400/20`}>
                    {unit}
                </p>
                <p key={token} onClick={handleLogout} className={`flex flex-row gap-2 items-center rounded-full captilize text-xs md:text-sm cursor-pointer font-medium
                text-center tracking-widest p-2 px-6 bg-slate-300/20 hover:bg-slate-400/20`}>
                    {token ? "Logout" : "Login"}
                </p>
            </div>

        </>

    );
};

export default GetLocationOnLoad;
