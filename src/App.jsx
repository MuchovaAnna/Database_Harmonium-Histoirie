import '@mantine/core/styles.css';

import { Outlet } from 'react-router-dom'
import './App.scss'

import { Header } from './components/Headers/Headers';
import Footer from './components/Footer/Footer';
import { Notifications } from '@mantine/notifications';

function App() {
  return (
<div className={"bodyContainer"}>
        <Notifications />
        <Header />
        <main className={"container"}>
          <Outlet />
        </main>
        <Footer />
      </div>
   )
}

export default App
