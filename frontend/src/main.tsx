import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter , Routes,Route} from 'react-router-dom'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css';
import { theme } from './styles/theme.ts';
import Home from './pages/public/Home.tsx';
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <BrowserRouter>
      <Routes>
   <Route path='/' element={< App/>} />
   <Route path='/home' element={< Home/>} />
    </Routes>
    </BrowserRouter>
     </MantineProvider>
  </StrictMode>
 
)
