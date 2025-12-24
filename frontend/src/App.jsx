import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Createnote from './pages/Createnote'
import History from './pages/History'
import Archive from './pages/Archive'

function App() {
  return (
    <div className='flex flex-col min-h-screen bg-slate-50 text-slate-900'>
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className='flex-1 container mx-auto px-4 md:px-6 lg:px-8 py-2 md:py-4'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Createnote />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/trash" element={<History />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default App