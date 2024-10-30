import '@mantine/core/styles.css';
import { createTheme, MantineProvider} from '@mantine/core'
import { Outlet } from 'react-router-dom'
import './App.scss'

import { Header } from './components/Headers/Headers';
import AuthProvider from './context/AuthContext';

const theme = createTheme({
  fontFamily: 'David Libre',
})

function App() {

  return (
    <>
      <MantineProvider
        theme={theme}
      >
        <AuthProvider>
          <Header />
          <main className={"container"}>
            <Outlet />
          </main>
        </AuthProvider>
      </MantineProvider>
    </>
  )
}

export default App