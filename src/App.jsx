import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './layouts/layout';
import Index from './pages';
import Login from './pages/Login';
import Asociaciones from './pages/Asociaciones';
import Asociacion from './pages/Asociacion';
import NuevoAsociacion from './pages/NuevaAsociacion';
import Eventos from './pages/Eventos';
import Evento from './pages/Evento';
import NuevoEvento from './pages/NuevoEvento';
import NotFound from './pages/NotFound';
import { LightContext, EventContext, AsociationContext } from './utils/Context';
import './App.css';

function App() {
  const [light, setLight] = useState(localStorage.getItem("theme") === "true");
  const [eventos, setEventos] = useState(null);
  const [asociaciones, setAsociationes] = useState(null);
  const [user, setUser] = useState(null);
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

  if (loading) return <p>Cargando...</p>;



  return (
    <LightContext.Provider value={{ light, setLight }}>
      <EventContext.Provider value={{ eventos, setEventos }}>
        <AsociationContext.Provider value={{ asociaciones, setAsociationes }}>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route element={<Login />} path='/login' />
              <Route element={<Index />} path='/' />
              <Route element={<Asociaciones />} path='/asociaciones' />
              <Route element={<Asociacion />} path='/asociacion/:id' />
              <Route element={<NuevoAsociacion />} path='/nueva-asociacion' />
              <Route element={<Eventos />} path='/eventos' />
              <Route element={<Evento />} path='/evento/:id' />
              <Route element={<NuevoEvento />} path='/nuevo-evento' />
              <Route element={<NotFound />} path='/*' />
            </Route>
          </Routes>
        </AsociationContext.Provider>
      </EventContext.Provider>
    </LightContext.Provider>
  );
}

export default App;
