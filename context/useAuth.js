import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
    const navigate = useNavigate();

    useEffect(() => {
        // Automatically log in the user if their info is stored in localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = async (email, password) => {
        try {
            // Construct the URL with query parameters
            const url = `http://localhost:8081/auth/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;

            console.log(url)
            // Perform the GET request; note that this isn't the recommended way to transmit sensitive data
            const response = await axios.post(url);

            const { data } = response;

            // Assuming 'data' contains the user object or auth token
            localStorage.setItem('user', JSON.stringify(data));
            setUser(data);


            navigate('/'); // Redirect to homepage or dashboard after login
        } catch (error) {
            console.error("Login failed: ", error.response || error);
            // Handle login failure (e.g., show an error message)
        }
    };

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
        navigate('/login');
    };

    const register = async (name, email, password, roleId) => {
        try {
            // Construct the request payload including the role
            const payload = { name, email, "password_hash": password, role: { "role_id": roleId } };
            // Specify your API's registration endpoint
            const url = 'http://localhost:8081/auth/register';
            const response = await axios.post(url, payload);
            const { data } = response;
            // Optionally set the user in local state and storage, or redirect to login
            alert(`You have added ${data?.name} successfully!`);

          
        } catch (error) {
            console.error("Registration failed: ", error.response || error);
            // Handle registration failure (e.g., show an error message)
        }
    };
    

    return (
        <AuthContext.Provider value={{ user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
