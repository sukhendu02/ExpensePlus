import React from 'react'
import { useExpenses } from '../hooks/useExpense';
import ExpensePagination from '../Component/expense/ExpensePagination';
import ExpenseSearchBar from '../Component/expense/ExpenseSearchBar';
import ExpenseTable from '../Component/expense/ExpenseTable';
import ExpenseFilters from '../Component/expense/ExpenseFilter';
import Spinner from '../Component/ui/Spinner'
import ErrorMessage from '../Component/ui/ErrorMessage';
export default function Reports() {
     const {
    expenses,
    pagination,
    loading,
    initialLoad,
    error,
    filters,
    handleFilterChange,
    handleSort,
    handlePageChange,
    handleSearch,
    handleClearFilters,
    handleRetry,
    handleDelete
  } = useExpenses();

  return (
    <>
     <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Expenses</h1>
          <p className="mt-1 text-sm text-gray-500">Track and manage all your expenses</p>
        </div>

        <div className="mb-4">
          <ExpenseSearchBar searchValue={filters.search} onSearch={handleSearch} />
        </div>

        <div className="mb-4">
          <ExpenseFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
          />
        </div>

        {initialLoad && loading ? (
          <Spinner />
        ) : error ? (
          <ErrorMessage message={error} onRetry={handleRetry} />
        ) : (
          <>
            <ExpenseTable
              expenses={expenses}
              loading={loading && !initialLoad}
              sortBy={filters.sortBy}
              order={filters.order}
              onSort={handleSort}
              onDelete={handleDelete}
            />
            {pagination && pagination.totalPage > 1 && (
              <div className="mt-4">
                <ExpensePagination pagination={pagination} onPageChange={handlePageChange} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
    </>
  )
}
