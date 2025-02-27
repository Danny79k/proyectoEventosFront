import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './layouts/layout';
import Index from './pages';
import Asociaciones from './pages/Asociaciones';
import Asociacion from './pages/Asociacion';
import NuevoAsociacion from './pages/NuevaAsociacion';
import MisAsociaciones from './pages/MisAsociaciones';
import Eventos from './pages/Eventos';
import Evento from './pages/Evento';
import NuevoEvento from './pages/NuevoEvento';
import MisEventos from './pages/MisEventos';
import NotFound from './pages/NotFound';
import CalendarComponent from './components/Calendar';
import { LightContext, UserContext } from './utils/Context'
import './App.css';
import { EventContextProvider } from './provider/EventContextProvider';
import { AssociationContextProvider } from './provider/AssociationContextProvider';
import { TypeContextProvider } from './provider/TypeContextProvider';
import { UserContextProvider } from './provider/UserContextProvider';


function App() {

  const [light, setLight] = useState(localStorage.getItem("theme") === "true");

  return (
    <>
      <LightContext.Provider value={{ light, setLight }}>
        <UserContextProvider>
          <TypeContextProvider>
            <EventContextProvider>
              <AssociationContextProvider>
                <Routes>
                  <Route path='/' element={<Layout />}>
                    <Route element={<Index />} path='/'></Route>
                    <Route element={<Asociaciones />} path='/asociaciones'></Route>
                    <Route element={<MisAsociaciones />} path='/mis-asociaciones'></Route>
                    <Route element={<Asociacion />} path='/asociacion/:id'></Route>
                    <Route element={<NuevoAsociacion />} path='/nueva-asociacion'></Route>
                    <Route element={<Eventos />} path='/eventos'></Route>
                    <Route element={<MisEventos />} path='/mis-eventos'></Route>
                    <Route element={<Evento />} path='/evento/:id'></Route>
                    <Route element={<NuevoEvento />} path='/nuevo-evento'></Route>
                    <Route element={<CalendarComponent />} path='/calendario'></Route>
                    <Route element={<NotFound />} path='/*'></Route>
                  </Route>
                </Routes>
              </AssociationContextProvider>
            </EventContextProvider>
          </TypeContextProvider>
        </UserContextProvider>
      </LightContext.Provider>
    </>
  )
  // }

}

export default App;
