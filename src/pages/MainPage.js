import React from 'react'
import { useAuth } from '../context/useAuth'
import Navbar from '../components/Navbar'

const MainPage = () => {
    const { user, logout } = useAuth()
    console.log(user)
    return (
        <div>
            <Navbar user={user} logout={logout} />
        </div>
    )
}

export default MainPage