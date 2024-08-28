import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FaLocationCrosshairs } from "react-icons/fa6";

const GetLocationOnLoad = () => {
    const [location, setLocation] = useState({ lat: null, lon: null });
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const fetchLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        lat: position.coords.latitude,
                        lon: position.coords.longitude,
                    });
                    dispatch(setLocation(location));
                },
                (err) => {
                    console.log(err)
                }
            );
        } else {
            setError("Geolocation is not supported by this browser.");
        }
    };

    useEffect(() => {
        fetchLocation();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <p onClick={fetchLocation} className={`flex flex-row gap-2 items-center captilize text-xs md:text-sm cursor-pointer font-medium tracking-widest`}>
            <FaLocationCrosshairs />
            Change Location
        </p>
    );
};

export default GetLocationOnLoad;
