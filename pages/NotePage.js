import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/useAuth';

const NotePage = () => {
    const { user, logout } = useAuth();
    const [subject, setSubject] = useState('');
    const [grade, setGrade] = useState('');
    const [selectedStudentId, setSelectedStudentId] = useState('');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (user && user.role.role_name === 'teacher') {
            fetchUsers();
        }
    }, [user]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8081/auth/users'); // Update with your actual API endpoint
            setUsers(response.data.filter(u => u.role.role_name === 'student'));
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('id:' + selectedStudentId)
            const response = await axios.post('http://localhost:8081/grades', {
                student: {
                    user_id: selectedStudentId,
                },
                subject,
                value: grade,
            });
            console.log('Grade added successfully:', response.data);
            alert('Grade added successfully!')
            // Reset the form
            setSelectedStudentId('');
            setSubject('');
            setGrade('');
        } catch (error) {
            console.error('Failed to add grade:', error.response || error);
        }
    };

    return (
        <div className='flex flex-col h-screen'>
            <Navbar user={user} logout={logout} />
            <div className="flex flex-1 justify-center items-center bg-gray-200">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                    <h1 className='text-center mb-6 text-xl font-semibold'>Note a student</h1>
                    <div className="mb-4">
                        <label htmlFor="studentId" className="block text-sm font-medium text-gray-700">
                            Student
                        </label>
                        <select
                            id="studentId"
                            value={selectedStudentId}
                            required
                            onChange={(e) => setSelectedStudentId(e.target.value)}
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        >
                            <option value="">Select a student</option>
                            {users.map((student) => (
                                <option key={student.user_id} value={student.user_id}>
                                    {student.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                            Subject
                        </label>
                        <input
                            type="text"
                            id="subject"
                            required
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            placeholder="Enter subject"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="grade" className="block text-sm font-medium text-gray-700">
                            Grade
                        </label>
                        <input
                            type="number"
                            id="grade"
                            required
                            value={grade}
                            onChange={(e) => setGrade(e.target.value)}
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-1"
                            placeholder="Enter grade"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Submit Grade
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NotePage;
