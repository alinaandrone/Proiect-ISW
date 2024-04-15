import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/useAuth'
import Navbar from '../components/Navbar'
import axios from 'axios'; // Import Axios

const MainPage = () => {
    const { user, logout } = useAuth();
    const [users, setUsers] = useState([]);
    const [grades, setGrades] = useState([]);

    useEffect(() => {
        if (user) {
            fetchUsers();
            fetchGrades()
        }
    }, [user]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8081/auth/users'); // Update with your actual API endpoint
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
            // Handle error (e.g., show an error message)
        }
    };

    const fetchGrades = async () => {
        try {
            const response = await axios.get('http://localhost:8081/grades'); // Update with your actual API endpoint
            setGrades(response.data);
            console.log(response)
        } catch (error) {
            console.error('Error fetching users:', error);
            // Handle error (e.g., show an error message)
        }
    };
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar user={user} logout={logout} />
            {/* For admin */}
            {user && user.role.role_name === 'admin' && (
                <div className="py-8 px-4 lg:px-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">All Users</h2>
                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Role
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((u) => (
                                    <tr key={u.id}>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <div className="flex items-center">
                                                <div className="ml-3">
                                                    <p className="text-gray-900 whitespace-no-wrap">
                                                        {u.name}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{u.email}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                                <span aria-hidden="true" className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                                                <span className="relative">{u.role.role_name}</span>
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
            {/* For teacher */}
            {user && user.role.role_name === 'teacher' && (
                <div className="py-8 px-4 lg:px-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">All Grades</h2>
                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Student ID
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Subject
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Grade
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Date Added
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {grades.map((grade) => (
                                    <tr key={grade.grade_id}>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                                {grade.student ? grade.student.name : 'N/A'} {/* Adjusted to show student name */}
                                            </p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{grade.subject}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{grade.value}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                                {grade.date_added ? new Date(grade.date_added).toLocaleDateString() : 'N/A'}
                                            </p>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
            {/* For student */}
            {user && user.role.role_name === 'student' && (
                <div className="py-8 px-4 lg:px-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">My Grades</h2>
                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Subject
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Grade
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Date Added
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {grades.filter(grade => grade.student && grade.student.user_id === user.user_id).map((grade) => (
                                    <tr key={grade.grade_id}>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{grade.subject}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{grade.value}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                                {grade.date_added ? new Date(grade.date_added).toLocaleDateString() : 'N/A'}
                                            </p>
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );

};

export default MainPage