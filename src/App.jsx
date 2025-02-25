import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './layouts/layout';
import Index from './pages';
import Login from './pages/Login';
import Asociaciones from './pages/Asociaciones';
import Asociacion from './pages/Asociacion';
import NuevoAsociacion from './pages/NuevaAsociacion';
import MisAsociaciones from './pages/MisAsociaciones';
import Eventos from './pages/Eventos';
import Evento from './pages/Evento';
import NuevoEvento from './pages/NuevoEvento';
import NotFound from './pages/NotFound';
import useFetch from './components/useFetch';
import Loading from './components/Loading';
import { LightContext, EventContext, AsociationContext, TypeContext, UserContext } from './utils/Context'
import './App.css';


function App() {

  const [light, setLight] = useState(localStorage.getItem("theme") === "true");
  const [eventos, setEventos] = useState(null);
  const [asociaciones, setAsociationes] = useState(null);
  const [user, setUser] = useState(null);
  const [types, setTypes] = useState(null)
  const [loading, setLoading] = useState(true);


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
  }, []); // Se ejecuta solo una vez al montar el componente

  const { data, error } = useFetch("https://jeffrey.informaticamajada.es/api/types")

  useEffect(() => {
    if (error) setTypes("Error")
  }, [error])

  useEffect(() => {
    if (data) setTypes(data)
  }, [data])

  if (loading) return (<Loading />);


  return (
    <>
      <LightContext.Provider value={{ light, setLight }}>
        <UserContext.Provider value={{ user, setUser }}>
          <TypeContext.Provider value={{ types, setTypes }}>
            <EventContext.Provider value={{ eventos, setEventos }}>
              <AsociationContext.Provider value={{ asociaciones, setAsociationes }}>
                <Routes>
                  <Route path='/' element={<Layout />}>
                    <Route element={<Login />} path='/login'></Route>
                    <Route element={<Index />} path='/'></Route>
                    <Route element={<Asociaciones />} path='/asociaciones'></Route>
                    <Route element={<MisAsociaciones />} path='/mis-asociaciones'></Route>
                    <Route element={<Asociacion />} path='/asociacion/:id'></Route>
                    <Route element={<NuevoAsociacion />} path='/nueva-asociacion'></Route>
                    <Route element={<Eventos />} path='/eventos'></Route>
                    <Route element={<Evento />} path='/evento/:id'></Route>
                    <Route element={<NuevoEvento />} path='/nuevo-evento'></Route>
                    <Route element={<NotFound />} path='/*'></Route>
                  </Route>
                </Routes>
              </AsociationContext.Provider>
            </EventContext.Provider>
          </TypeContext.Provider>
        </UserContext.Provider>
      </LightContext.Provider>
    </>
  )
  // }

}

export default App;
