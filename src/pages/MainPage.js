import React from 'react'
import { useAuth } from '../context/useAuth'

const MainPage = () => {
    const { user } = useAuth()
    console.log(user)
    return (
        <div>MainPage</div>
    )
}

export default MainPage