import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './Pages/Dashboard'
import Expense from './Pages/Expense'
import Reports from './Pages/Reports';
import Link4 from './Pages/Link4';
import AppLayout from './Component/Layout/AppLayout';
import { useExpenses } from "./hooks/useExpense.js";

import { Toaster } from 'react-hot-toast'

function App() {

  //  const {
  //   expenses,
  //   computedExpenses,
  //   loading,
  //   error,
  //   filters,
  //   setFilters,
  //   summaryStats,
  //   addExpense,
  //   updateExpense,
  //   deleteExpense,
  // } = useExpenses();
  return (
   <>
   <BrowserRouter>
    <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/expenses" element={<Expense />}  />
          <Route path="/reports"  element={<Reports />}   />
          <Route path="/link4" element={<Link4 />}  />
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
