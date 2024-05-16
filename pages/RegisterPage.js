import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { useAuth } from '../context/useAuth'

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [roleId, setRoleId] = useState('');
    const { user, logout, register } = useAuth();


    const handleSubmit = (e) => {
        e.preventDefault();
        if (!roleId) {
            alert("Please select a role.");
            return;
        }
        register(name, email, password, roleId);
    };



    return (
        <div className='flex flex-col h-screen'> {/* Asigură-te că acest container ocupă întreg ecranul */}
            <Navbar user={user} logout={logout} />
            <div className="flex flex-1 justify-center items-center bg-gray-200"> {/* Centrarea formularului */}
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                    <h1 className='text-center mb-6 text-xl font-semibold'>Create a new account</h1>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            placeholder="Email"
                            value={email}
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Name
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="name"
                            type="text"
                            placeholder="Name"
                            value={name}
                            required
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Parolă
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="******************"
                            value={password}
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
                            Role
                        </label>
                        <select
                            id="role"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            value={roleId}
                            onChange={(e) => setRoleId(e.target.value)}
                        >
                            <option value="">Select a Role</option>
                            <option value="2">Teacher</option>
                            <option value="3">Student</option>
                        </select>
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Register {/* Schimbat textul butonului */}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage
