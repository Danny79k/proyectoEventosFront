import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './layouts/layout'
import Index from './pages'
import Login from './pages/Login'
import Asociaciones from './pages/Asociaciones'
import Asociacion from './pages/Asociacion'
import NuevoAsociacion from './pages/NuevaAsociacion'
import Eventos from './pages/Eventos'
import Evento from './pages/evento'
import NuevoEvento from './pages/NuevoEvento'
import NotFound from './pages/NotFound'
import { LightContext, EventContext, AsociationContext } from './utils/Context'
// import useFetchAuth from './components/useFetchAuth'
// import Loading from './components/Loading'


import './App.css'


function App() {

  const [light, setLight] = useState(localStorage.getItem("theme") || true)
  const [eventos, setEventos] = useState(null)
  const [asociaciones, setAsociationes] = useState(null)


  // const { data, loading, error } = useFetchAuth("https://jeffrey.informaticamajada.es/auth/check")

  // if (loading) return (<Loading />)
  // if (error) return (<h1>Error</h1>)
  // if (data) {
  // console.log(data);
  return (
    // (data.authentificated === false) ?
    //   window.location.href = "https://jeffrey.informaticamajada.es/login"
    //   :
    <>
      <LightContext.Provider value={{ light, setLight }}>
        <EventContext.Provider value={{ eventos, setEventos }}>
          <AsociationContext.Provider value={{ asociaciones, setAsociationes }}>
            <Routes>
              <Route path='/' element={<Layout />}>
                <Route element={<Login />} path='/login'></Route>
                <Route element={<Index />} path='/'></Route>
                <Route element={<Asociaciones />} path='/asociaciones'></Route>
                <Route element={<Asociacion/>} path='/asociacion/:id'></Route>
                <Route element={<NuevoAsociacion />} path='/nueva-asociacion'></Route>
                <Route element={<Eventos />} path='/eventos'></Route>
                <Route element={<Evento/>} path='/evento/:id'></Route>
                <Route element={<NuevoEvento />} path='/nuevo-evento'></Route>
                <Route element={<NotFound />} path='/*'></Route>
              </Route>
            </Routes>
          </AsociationContext.Provider>
        </EventContext.Provider>
      </LightContext.Provider>
    </>
  )
  // }

}

export default App
