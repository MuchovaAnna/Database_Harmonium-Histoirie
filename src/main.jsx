import React from 'react'
import ReactDOM from 'react-dom/client'
import { StrictMode } from 'react'
import './index.scss'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import App from './App.jsx'
import NewHarmonium from './components/NewHarmonium/New.jsx'
import TableHarmoniums from './components/HarmoniumsDatabase/Table_harmoniums/TableHarmoniums.jsx'
import Builders from './components/BuilderDatabase/Builders.jsx'
import Home from './components/Home/Home.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<Home />} />
          <Route path='/harmoniums' element={<TableHarmoniums />} />
          <Route path='/builders' element={<Builders />} />
          <Route path='/newHarmonium' element={<NewHarmonium />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)