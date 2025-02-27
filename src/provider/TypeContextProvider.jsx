import React from 'react'
import useFetch from '../components/useFetch'
import { TypeContext } from '../utils/Context'

export const TypeContextProvider = ({ children }) => {

    const { data, loading, error } = useFetch('https://jeffrey.informaticamajada.es/api/types')

    return (
        <TypeContext.Provider value={{ data, loading, error }}>
            {children}
        </TypeContext.Provider>
    )
}
