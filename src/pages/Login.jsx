import { useEffect, useState } from "react";
import { BASE_URL } from "../constants/url";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../state";
import { useNavigate } from "react-router";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);

    useEffect(() => {
        if (token) {
            navigate("/")
        }
    }, [token])

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("onsubmit", formData);

        const response = await fetch(`${BASE_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: await JSON.stringify(formData)
        })
        const res = await response.json();
        if (response.status !== 200) {
            setError(res.message)
            return;
        }
        console.log(res);
        setError("");
        dispatch(setUserDetails({ token: res.token, user: res.user }))
        navigate("/");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
                    Login to Your Account
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <p className="text-red-400 text-sm font-semibold text-center">{error}</p>
                        <label htmlFor="email" className="text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            placeholder="weather@example.com"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            placeholder="Enter your password"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-indigo-500 text-white w-full py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        >
                            Login
                        </button>
                    </div>
                </form>
                <p className="text-sm text-gray-600 text-center mt-6">
                    Don't have an account? <a href="register" className="text-indigo-500 hover:text-indigo-600">Register</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
