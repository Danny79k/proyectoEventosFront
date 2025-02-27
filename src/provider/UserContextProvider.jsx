import React, { useState, useEffect } from 'react'
import { UserContext } from '../utils/Context'
import useFetch from '../components/useFetch'

export const UserContextProvider = ({ children }) => {
    const [User, setUser] = useState([])
    const [Loading, setLoading] = useState()

    useEffect(() => {
        fetch('https://jeffrey.informaticamajada.es/auth/user', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setUser(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error:', error);
                setLoading(false);
            });
    }, [])

    return (
        <UserContext.Provider value={User}>
            {children}
        </UserContext.Provider>
    )
}
