import { useState, createContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './layouts/layout'
import Index from './pages'
export const LightContext = createContext()
import './App.css'

function App() {
  const [light, setLight] = useState(localStorage.getItem("theme") === "light")

  return (
    <>
      <LightContext.Provider value={{ light, setLight }}>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route element={<Index/>} path='/'></Route>
          </Route>
        </Routes>
      </LightContext.Provider>
    </>
  )
}

export default App
