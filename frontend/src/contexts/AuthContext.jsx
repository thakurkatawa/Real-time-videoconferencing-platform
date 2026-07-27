import axios from "axios";
import httpStatus from "http-status";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

const client = axios.create({
    baseURL: "http://localhost:8000/api/v1/users",
});

export const AuthProvider = ({ children }) => {

    const [userData, setUserData] = useState(null);

    const navigate = useNavigate();

    // Register
    const handleRegister = async (name, username, password) => {
        try {
            const request = await client.post("/register", {
                name,
                username,
                password,
            });

            if (request.status === httpStatus.CREATED) {
                return request.data.message;
            }

            return request.data;
        } catch (err) {
            console.error(err);
            throw err;
        }
    };

    // Login
    const handleLogin = async (username, password) => {
        try {
            const request = await client.post("/login", {
                username,
                password,
            });

            console.log(request.data);

            if (request.status === httpStatus.OK) {
                localStorage.setItem("token", request.data.token);

                setUserData(request.data);

                navigate("/home");

                return request.data;
            }
        } catch (err) {
            console.error(err);
            throw err;
        }
    };

    // Get User History
    const getHistoryOfUser = async () => {
        try {
            const request = await client.get("/get_all_activity", {
                params: {
                    token: localStorage.getItem("token"),
                },
            });

            return request.data;
        } catch (err) {
            console.error(err);
            throw err;
        }
    };

    // Add Meeting History
    const addToUserHistory = async (meetingCode) => {
        try {
            const request = await client.post("/add_to_activity", {
                token: localStorage.getItem("token"),
                meeting_code: meetingCode,
            });

            return request.data;
        } catch (err) {
            console.error(err);
            throw err;
        }
    };

    const value = {
        userData,
        setUserData,
        handleRegister,
        handleLogin,
        getHistoryOfUser,
        addToUserHistory,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};