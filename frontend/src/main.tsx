import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter , Routes,Route} from 'react-router-dom'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css';
import { theme } from './styles/theme.ts';
import Home from './pages/public/Home.tsx';
import Signup from './pages/public/Register.tsx';
import Login from './pages/public/Login.tsx';
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <BrowserRouter>
      <Routes>
   <Route path='/app' element={< App/>} />
   <Route path='/' element={< Home/>} />
    <Route path='/signup' element={< Signup/>} />
    <Route path='/login' element={< Login/>} />
    </Routes>
    </BrowserRouter>
     </MantineProvider>
  </StrictMode>
 
)
