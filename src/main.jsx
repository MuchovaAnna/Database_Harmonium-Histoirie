import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import AuthProvider from './context/AuthContext';

import App from './App.jsx'
import NewHarmonium from './components/NewHarmonium/New.jsx'
import DatabaseHarmoniums from './components/HarmoniumsDatabase/DatabaseHarmonium.jsx'
import Builders from './components/BuilderDatabase/Builders.jsx'
import Home from './components/Home/Home.jsx'
import DetailHarmonium from './components/DetailHarmonium/DetailHarmonium.jsx'
import MiniaturCard from './components/HarmoniumsDatabase/Miniatur/Miniature.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />}>
            <Route index element={<Home />} />
            <Route path='/harmoniums' element={<DatabaseHarmoniums />}/>
            <Route path='/builders' element={<Builders />} />
            <Route path='/newHarmonium' element={<NewHarmonium />} />
            <Route path='detailharmonium' element={<DetailHarmonium/>}/>
            </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
