import React from 'react'
import useFetch from '../components/useFetch'
import { EventContext } from '../utils/Context'

export const EventContextProvider = () => {

    const {data, loading, error} = useFetch('https://jeffrey.informaticamajada.es/api/events')
  return (
    <EventContext.Provider value={{data, loading, error}}>
        {children}
    </EventContext.Provider>
  )
}
