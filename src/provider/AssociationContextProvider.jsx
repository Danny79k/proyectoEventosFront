import React from 'react'
import useFetch from '../components/useFetch'
import { AsociationContext, EventContext } from '../utils/Context'

export const AssociationContextProvider = ({children}) => {

    const { data, loading, error } = useFetch('https://jeffrey.informaticamajada.es/api/associations')

    return (
        <AsociationContext.Provider value={{data, loading, error}}>
            {children}
        </AsociationContext.Provider>
    )
}
