import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core'
import { Outlet } from 'react-router-dom'
import './App.scss'

import { Header } from './components/Headers/Headers';

function App() {

  return (
    <>
      <MantineProvider>
        <Header />
        <main>
          <Outlet />
        </main>
      </MantineProvider>
    </>
  )
}

export default App