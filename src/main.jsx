import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import AuthProvider from './context/AuthContext';
import { HarmoniumProvider } from './context/DataContext.jsx';
import { createTheme ,MantineProvider } from '@mantine/core';

import App from './App.jsx'
import NewHarmonium from './components/NewHarmonium/New.jsx'
import DatabaseHarmoniums from './components/HarmoniumsDatabase/DatabaseHarmonium.jsx'
import Builders from './components/BuilderDatabase/Builders.jsx'
import Home from './components/Home/Home.jsx'
import DetailHarmonium from './components/DetailHarmonium/DetailHarmonium.jsx'

const theme = createTheme({
  fontFamily: 'David Libre',

  colors: {
    // Add your color
    brown: [
      "#f7f3f2",
      "#e8e6e5",
      "#d2c9c6",
      "#bdaaa4",
      "#ab9087",
      "#a17f74",
      "#9d766a",
      "#896459",
      "#7b594e",
      "#6d4b4"
    ],
    // or replace default theme color
    lightGreen: [
      "#f4f8ec",
      "#e8ece0",
      "#d0d7c4",
      "#b7c0a4",
      "#a2ad8a",
      "#94a178",
      "#8d9b6e",
      "#79875c",
      "#6b7850",
      "#5b6840"
    ],
  },

  shadows: {
    md: '1px 1px 3px rgba(0, 0, 0, .25)',
    xl: '5px 5px 3px rgba(0, 0, 0, .25)',
  },

})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MantineProvider theme={theme}>
    <AuthProvider>
      <HarmoniumProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<App />}>
                <Route index element={<Home />} />
                <Route path='/harmoniums' element={<DatabaseHarmoniums />} />
                <Route path='/builders' element={<Builders />} />
                <Route path='/newHarmonium' element={<NewHarmonium />} />
                <Route path='detailharmonium' element={<DetailHarmonium />} />
              </Route>
            </Routes>
          </BrowserRouter>
      </HarmoniumProvider>
      </AuthProvider>
    </MantineProvider>
  </StrictMode>,
)
