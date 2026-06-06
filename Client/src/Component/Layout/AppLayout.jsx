import React from 'react'
import Sidebar from '../ui/Sidebar'
import BottomNav from '../ui/BottomNav'
import { Outlet } from 'react-router-dom'
import { useExpenses } from '../../hooks/useExpense'
import { useStats } from '../../hooks/useStats'

export default function AppLayout() {
  const {
    handleAdd: addExpense,
    handleEdit: editExpense,
    handleDelete: deleteExpense,
    ...expenseContext
  } = useExpenses();

  const { refetchStats, ...statsContext } = useStats();

  const handleAdd = async (data) => {
    await addExpense(data);
    refetchStats();
  };

  const handleEdit = async (id, data) => {
    await editExpense(id, data);
    refetchStats();
  };

  const handleDelete = async (id) => {
    await deleteExpense(id);
    refetchStats();
  };

  return (
    <div className="flex w-full h-screen bg-gray-100">
      <Sidebar onAddExpense={handleAdd} />

      <main className="main-content flex-1 overflow-x-hidden overflow-y-auto sm:m-1 p-2 mb-28 sm:mb-0 md:ml-65">
        <Outlet context={{
          ...expenseContext,
          ...statsContext,
          handleAdd,
          handleEdit,
          handleDelete,
        }} />
      </main>

      <BottomNav />
    </div>
  );
}