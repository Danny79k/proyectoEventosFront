import { useState, createContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './layouts/layout'
import Index from './pages'
import Eventos from './pages/Eventos'
import Asociaciones from './pages/Asociaciones'
import useFetchAuth from './components/useFetchAuth'
import Loading from './components/Loading'

export const LightContext = createContext()
import './App.css'

function App() {
  const [light, setLight] = useState(localStorage.getItem("theme") === "light")

  const { data, loading, error } = useFetchAuth("https://jeffrey.informaticamajada.es/auth/check")

  if (loading) return (<Loading />)
  if (error) return (<h1>Error</h1>)
  if (data) {
    console.log(data.authentificated);
    return (
    // (data.authentificated === false) ?
    //   window.location.href = "https://jeffrey.informaticamajada.es/login"
    //   :
        <>
          <LightContext.Provider value={{ light, setLight }}>
            <Routes>
              <Route path='/' element={<Layout />}>
                <Route element={<Index />} path='/'></Route>
                <Route element={<Asociaciones />} path='/asociaciones'></Route>
                <Route element={<Eventos />} path='/eventos'></Route>
              </Route>
            </Routes>
          </LightContext.Provider>
        </>
      )
  }

}

export default App
