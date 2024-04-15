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

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
