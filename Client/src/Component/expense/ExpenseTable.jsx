import { formatCurrency, formatDate } from '../../utils/formatters';
import { CATEGORY_COLORS } from '../../utils/expenseConstant';
import EmptyState from '../ui/EmptyState';
import { useState } from 'react';
import { X,Trash2 } from 'lucide-react';
import AddExpenseModal from './AddExpenseModal';

const COLUMNS = [
  { key: 'expenseDate', label: 'Date', sortable: true },
  { key: 'description', label: 'Description', sortable: false },
  { key: 'category', label: 'Category', sortable: true },
  { key: 'paymentMethod', label: 'Payment', sortable: false },
  { key: 'amount', label: 'Amount', sortable: true },
  
];

function SkeletonRows() {
  return Array.from({ length: 5 }).map((_, i) => (
    <tr key={i} className="animate-pulse border-b border-gray-100">
      <td className="px-6 py-3"><div className="h-4 w-6 rounded bg-gray-100" /></td>
      <td className="px-6 py-3"><div className="h-4 w-20 rounded bg-gray-100" /></td>
      <td className="px-6 py-3"><div className="h-4 w-28 rounded bg-gray-100" /></td>
      <td className="px-6 py-3"><div className="h-4 w-16 rounded bg-gray-100" /></td>
      <td className="px-6 py-3"><div className="h-4 w-12 rounded bg-gray-100" /></td>
      <td className="px-6 py-3"><div className="h-4 w-20 rounded bg-gray-100" /></td>
      <td className="px-6 py-3"><div className="h-4 w-8 rounded bg-gray-100" /></td>
    </tr>
  ));
}

export default function ExpenseTable({ expenses, loading, sortBy, order, onSort,onDelete,onEdit }) {
  const handleHeaderClick = (field) => {
    onSort(field);
  };

  const renderSortIcon = (field) => {
    if (sortBy !== field) return null;
    return order === 'DESC' ? (
      <span className="ml-1 text-xs">&#8595;</span>
    ) : (
      <span className="ml-1 text-xs">&#8593;</span>
    );
  };

  const renderCell = (expense, col) => {
    switch (col.key) {
      case 'expenseDate':
        return(
            <span className="text-slate-500">
      {formatDate(expense.expenseDate)}
    </span>
        )
      case 'description':
        return (
             <div className="max-w-[200px] truncate">
      {expense.description}
    </div>
        )
      case 'category': {
        const badgeColor = CATEGORY_COLORS[expense.category] || 'bg-gray-100 text-gray-700';
        return (
          <span className={`inline-block rounded-full px-2.5 py-0.5  font-medium ${badgeColor}`}>
            {expense.category}
          </span>
        );
      }
      case 'paymentMethod':
        return expense.paymentMethod;
      case 'amount':
        return <span className="font-medium  text-md">{formatCurrency(expense.amount)}</span>;
      
      default:
        return null;
    }
  };

  if (!loading && expenses.length === 0) {
    return <EmptyState />;
  }

  const [selectedExpense, setSelectedExpense] = useState(null);

//   CONFIRMATION BEFORE DELETE
  const [confirmDelete, setConfirmDelete] = useState(null); 

  const [editExpense, setEditExpense] = useState(null);

  return (
    <>

    <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-200 bg-white ring-1 ring-black/5 ">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-gray-200 bg-brand-muted/15 ">
            <th className="px-6 py-4 font-sm text-gray-500">#</th>
            {COLUMNS.map((col) => (
              <th
                key={col.key}
                onClick={col.sortable ? () => handleHeaderClick(col.key) : undefined}
                className={`px-6 py-5  font-medium text-[11px] uppercase tracking-wide text-gray-500  ${
                  col.sortable
                    ? 'cursor-pointer select-none hover:text-gray-700'
                    : ''
                }`}
              >
                {col.label}
                {col.sortable && renderSortIcon(col.key)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <SkeletonRows />
          ) : (
            expenses.map((expense, index) => (
              <tr key={expense.id} onClick={()=>setSelectedExpense(expense)} className="border-gray-100 transition-colors hover:bg-brand-muted/20 cursor-pointer">
                <td className="px-6 py-3 text-gray-400">{index + 1}</td>
                {COLUMNS.map((col) => (
                  <td key={col.key} className="px-6 py-5 text-gray-700">
                    {renderCell(expense, col)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>

      {/* Mobile Cards */}
  <div className="md:hidden space-y-3">
    {loading ? (
      <div>Loading...</div>
    ) : (
      expenses.map((expense) => (
        <div
          key={expense.id}
          onClick={() => setSelectedExpense(expense)}
          className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="font-medium text-gray-900 truncate">
                {expense.description}
              </p>

              <p className="text-sm text-gray-500 mt-1">
                {formatDate(expense.expenseDate)}
              </p>
            </div>

            <span
              className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                CATEGORY_COLORS[expense.category] ||
                "bg-gray-100 text-gray-700"
              }`}
            >
              {expense.category}
            </span>
          </div>

          <div className="flex justify-between items-center mt-4">
            <span className="text-sm text-gray-500">
              {expense.paymentMethod}
            </span>

            <span className="font-semibold text-lg text-brand-primary">
              {formatCurrency(expense.amount)}
            </span>
          </div>
        </div>
      ))
    )}
  </div>

  {selectedExpense && (
  <>
    {/* Backdrop */}
    <div
      className="fixed inset-0 z-40 bg-black/20"
      onClick={() => setSelectedExpense(null)}
    />

    {/* Panel — right drawer on desktop, full screen on mobile */}
    <div className="fixed z-50
      inset-0 md:inset-auto md:right-0 md:top-0 md:h-full md:w-[380px]
      bg-white shadow-xl flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4  shrink-0">
        <h1 className="text-xl font-semibold text-brand-primary">Expense Details</h1>
        <button
          onClick={() => setSelectedExpense(null)}
          className="p-1.5 rounded-lg cursor-pointer hover:bg-gray-100 text-gray-700 bg-gray-50 transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-5 py-5">

        {/* Icon + name */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-3 text-2xl">
            🧾
          </div>
          {/* <p className="text-lg font-semibold text-gray-900">{selectedExpense.description}</p> */}
          <p className="text-sm text-gray-400 mt-0.5">{formatDate(selectedExpense.expenseDate)}</p>
          <p className={`text-2xl font-bold mt-2 text-brand-primary`}>
            {formatCurrency(selectedExpense.amount)}
          </p>
        </div>

        {/* Details */}
        <div className="bg-gray-50 rounded-xl px-4 mb-5 divide-y divide-gray-100">
          {[
            { label: "Category",       value: selectedExpense.category },
            { label: "Payment Method", value: selectedExpense.paymentMethod },
            { label: "Date",           value: formatDate(selectedExpense.expenseDate) },
            { label: "Note",           value: selectedExpense.description || "—" },
            { label: "Last Update",           value: formatDate(selectedExpense.updatedAt )|| "—" },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between py-3">
              <span className="text-sm text-gray-400">{label}</span>
              <span className="text-sm font-medium text-gray-800">{value}</span>
            </div>
          ))}
        </div>

      </div>

      {/* Footer actions */}
      <div className="px-5 py-4 border-t border-gray-100 grid grid-cols-2 gap-3 shrink-0">
        <button
         onClick={() => setConfirmDelete(selectedExpense)}
        
          className="flex items-center cursor-pointer justify-center gap-2 border border-red-200 text-red-400 rounded-lg py-2.5 text-sm font-medium hover:bg-red-50 transition-colors"
        >
          <Trash2 size={15} /> Delete
        </button>
        <button
          onClick={() => {
              setEditExpense(selectedExpense);
              setSelectedExpense(null);
            }}
            className="bg-gray-900 text-white cursor-pointer rounded-lg py-2.5 text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          Edit
        </button>
      </div>
    </div>
  </>
)}


{confirmDelete && (
  <>
    <div className="fixed inset-0 z-60 bg-black/30" onClick={() => setConfirmDelete(null)} />
    <div className="fixed z-60 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                    bg-white rounded-2xl shadow-xl w-[90%] max-w-sm p-6">

      {/* Icon */}
      <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
        <Trash2 size={20} className="text-red-400" />
      </div>

      {/* Text */}
      <h3 className="text-base font-semibold text-gray-900 text-center mb-1">
        Delete Expense?
      </h3>
      <p className="text-sm text-gray-400 text-center mb-6">
        
        The expense will be permanently removed. This action cannot be undone.
      </p>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => setConfirmDelete(null)}
          className="py-2.5 rounded-lg border cursor-pointer border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            onDelete(confirmDelete.id);
            setConfirmDelete(null);
            setSelectedExpense(null);
          }}
          className="py-2.5 rounded-lg cursor-pointer bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition-colors"
        >
          Yes, Delete
        </button>
      </div>
    </div>
  </>
)}


{editExpense && (
  <AddExpenseModal
    initialData={editExpense}
    onClose={() => setEditExpense(null)}
    onSubmit={(data) => {
      onEdit(data.id, data);
      setEditExpense(null);
    }}
  />
)}
</>



  );
}