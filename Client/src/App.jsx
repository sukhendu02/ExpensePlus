import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './Pages/Dashboard'
import Expense from './Pages/Expense'
import Link3 from './Pages/Link3';
import Link4 from './Pages/Link4';
import AppLayout from './Component/Layout/AppLayout';

function App() {
  return (
   <>
   <BrowserRouter>
    <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/expenses" element={<Expense />}  />
          <Route path="/link3"  element={<Link3 />}   />
          <Route path="/link4" element={<Link4 />}  />
        </Route>
      </Routes>
   </BrowserRouter>
   </>
  )
}

export default App
