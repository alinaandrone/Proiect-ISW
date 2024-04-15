import React from 'react'

const Navbar = ({ user, logout }) => {
    return (
        <div className='h-24 bg-gray-500 flex items-center'>
            <div className='flex justify-between w-full px-12'>
                <h2>Hello, {user.name}</h2>
                <div>
                    <h2>ceva</h2>
                </div>
                <button className='bg-red-500 p-4 rounded-md' onClick={logout}>Sign Out</button>
            </div>
        </div>
    )
}

export default Navbar