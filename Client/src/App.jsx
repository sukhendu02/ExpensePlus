import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './Pages/Dashboard'
import Expenses from './Pages/Expenses'
import AppLayout from './Component/Layout/AppLayout';

import { Toaster } from 'react-hot-toast'

function App() {

 
  return (
   <>
   <BrowserRouter>
    <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/expenses" element={<Expenses />}  />

        </Route>
      </Routes>
   </BrowserRouter>
     <Toaster
        // position="top-right"
        toastOptions={{
          style: {
            borderRadius: '10px',
            fontSize: '12px',
            // padding: '12px 16px',
          },
        }}
      />
   </>
  )
}

export default App
