import '@mantine/core/styles.css';
import { createTheme, MantineProvider } from '@mantine/core';

import { Outlet } from 'react-router-dom'
import './App.scss'

import { Header } from './components/Headers/Headers';
import Footer from './components/Footer/Footer';
import { Notifications } from '@mantine/notifications';

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

function App() {
  return (
    <MantineProvider
      theme={theme}
    ><div className={"bodyContainer"}>
        <Notifications />
        <Header />
        <main className={"container"}>
          <Outlet />
        </main>
        <Footer />
      </div>
    </MantineProvider>
  )
}

export default App
