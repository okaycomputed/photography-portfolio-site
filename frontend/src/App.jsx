import { useState } from 'react'
import NavBar from "./components/NavBar"
import Home from './pages/Home'
import Photography from './pages/Photography'
import Contact from './pages/Contact'
import {Routes, Route} from "react-router-dom"

function App() {
  return (
    <div>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Photography" element={<Photography />} />
          <Route path="/Contact" element={<Contact />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
