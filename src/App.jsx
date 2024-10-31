import '@mantine/core/styles.css';
import { createTheme, MantineProvider } from '@mantine/core';

import { Outlet } from 'react-router-dom'
import './App.scss'

import { Header } from './components/Headers/Headers';

const theme = createTheme({
  fontFamily: 'David Libre',
})

function App() {
  return (
    <MantineProvider
      theme={theme}
    >
      <Header />
      <main className={"container"}>
        <Outlet />
      </main>
    </MantineProvider>
  )
}

export default App
