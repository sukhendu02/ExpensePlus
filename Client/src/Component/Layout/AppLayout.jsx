import React from 'react'
import Sidebar from '../ui/Sidebar'
import BottomNav from '../ui/BottomNav'
import Topbar from '../ui/Topbar'
import MobileHeader from '../ui/MobileHeader'
import {Outlet} from 'react-router-dom'
import { useExpenses } from '../../hooks/useExpense'
import { useStats } from '../../hooks/useStats'
export default function AppLayout() {
  const expenseContext = useExpenses();
  
  const { refetchStats, ...statsContext } = useStats();


const handleAdd = async (data) => {
  await originalHandleAdd(data);
  refetchStats(); 
};
  return (

    <>
      <div  className="flex w-full h-screen bg-gray-100" >
      <Sidebar  onAddExpense={expenseContext.handleAdd} />
      <main className="main-content flex-1 overflow-x-hidden overflow-y-auto sm:m-1 p-2  mb-28 sm:mb-0 md:ml-65">
        <Outlet context={{...expenseContext, ...statsContext}} />
      </main>

    </div>
    </>
    
  )
}
