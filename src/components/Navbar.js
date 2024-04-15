import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({ user, logout }) => {
    console.log(user.role.role_name)
    return (
        <div className='h-24 bg-gray-500 flex items-center'>
            <div className='flex justify-between w-full px-12'>
                <Link to='/'>
                <h2>Hello, {user.name}</h2>
                </Link>
                {user.role.role_name === 'admin' && (
                    <div>
                        <Link to='/register'>
                            <h2>Create a new account</h2>
                        </Link>
                    </div>
                )}
                {user.role.role_name === 'student' && (
                    <div>
                        <h2>Grades</h2>
                    </div>
                )}
                {user.role.role_name === 'teacher' && (
                    <div>
                        <h2>Note a student</h2>
                    </div>
                )}
                <button className='bg-red-500 p-4 rounded-md' onClick={logout}>Sign Out</button>
            </div>
        </div>
    )
}

export default Navbar