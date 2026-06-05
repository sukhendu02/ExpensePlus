import React from 'react'
import { NavLink } from 'react-router-dom'
import { Plus,LayoutDashboard,ReceiptText,PieChart } from 'lucide-react';
const NAV_ITEMS = [
  { to: "/",          icon: LayoutDashboard, label: "Dashboard" },
  { to: "/expenses",  icon: ReceiptText,     label: "Expenses"  },
  { to: "/reports",   icon: PieChart,        label: "Reports"   },
];
export default function Sidebar() {
  return (
    <>
      {/* ── Desktop sidebar ── */}
      <aside className="hidden md:flex flex-col w-65 shrink-0 min-h-screen border-r border-gray-100 bg-white p-4 py-8 fixed top-0 left-0">

        {/* Logo */}
        <div className="px-5 mb-8">
          <p className="text-2xl font-semibold text-brand-primary">ExpensePlus</p>
          <span className="text-[12px] text-gray-400">Personal Finance</span>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col gap-0.5 flex-1">
          {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-5 py-3 my-1.5 rounded-xl text-sm transition-colors hover:bg-brand-surface
                ${isActive
                  ? "bg-gray-100 text-gray-900 font-medium"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon size={17} strokeWidth={isActive ? 2.2 : 1.8} />
                  {label}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-4 mt-auto pt-4 border-t border-gray-100">
          <button
            // onClick={onAddExpense}
            className="w-full flex items-center justify-center gap-2 bg-brand-primary cursor-pointer hover:bg-gray-800 text-white text-[13px] font-medium py-2.5 rounded-lg transition-colors shadow-2xl ring-1 ring-black/5"
          >
            <Plus size={15} strokeWidth={2.5} />
            Add Expense
          </button>
        </div>
      </aside>

      {/* ── Mobile bottom nav ── */}
       <button
    // onClick={onAddExpense}
    className="md:hidden fixed bottom-20 right-4 z-50 w-13 h-13 bg-brand-primary ring-1 ring-black text-white rounded-full shadow-xl flex items-center justify-center active:scale-95 transition-transform"
    aria-label="Add Expense"
  >
    <Plus size={22} strokeWidth={2.5} />
  </button>
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 flex items-center">
  {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
    <NavLink
      key={to}
      to={to}
      end={to === "/"}
      className={({ isActive }) =>
        `flex-1 flex flex-col items-center gap-1 py-3 text-[11px] transition-colors
        ${isActive ? "text-gray-900 font-medium" : "text-gray-400"}`
      }
    >
      {({ isActive }) => (
        <>
          <Icon size={21} strokeWidth={isActive ? 2.2 : 1.8} />
          <span>{label}</span>
        </>
      )}
    </NavLink>
    
  ))}
</nav>
      </>
  )
}
