import React, { useState } from 'react'
import { UserContext } from '../utils/Context'
import useFetch from '../components/useFetch'

export const UserContextProvider = ({ children }) => {
    const { data, loading, error } = useFetch('https://jeffrey.informaticamajada.es/auth/user')
    const [User, setUser] = useState([])
    if (data?.data) setUser(data.data)
    if (loading) return (<div>Loading...</div>)
    if (error) return (<div>Error...</div>)
    console.log(UserId)
    return (
        <UserContext.Provider value={User}>
            {children}
        </UserContext.Provider>
    )
}
