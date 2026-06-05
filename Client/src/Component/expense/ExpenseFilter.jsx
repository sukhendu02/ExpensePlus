import { CATEGORIES, PAYMENT_METHODS } from '../../utils/expenseConstant';

export default function ExpenseFilters({ filters, onFilterChange, onClearFilters }) {
  const today = new Date().toISOString().split('T')[0];

  const hasActiveFilters =
    filters.category ||
    filters.paymethod ||
    filters.startDate ||
    filters.endDate;

  const handleCategoryChange = (e) => {
    const value = e.target.value === 'All' ? '' : e.target.value;
    onFilterChange('category', value);
  };

  const handlePaymethodChange = (e) => {
    const value = e.target.value === 'All' ? '' : e.target.value;
    onFilterChange('paymethod', value);
  };

  const handleStartDateChange = (e) => {
    onFilterChange('startDate', e.target.value);
  };

  const handleEndDateChange = (e) => {
    onFilterChange('endDate', e.target.value);
  };

  return (
    <div className="flex flex-wrap items-end gap-4 rounded-lg border border-gray-200 bg-white p-4">
      <div className="min-w-0 flex-1 sm:min-w-[140px]">
        <label className="mb-1 block text-xs font-medium text-gray-500">Category</label>
        <select
          value={filters.category || 'All'}
          onChange={handleCategoryChange}
          className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="min-w-0 flex-1 sm:min-w-[140px]">
        <label className="mb-1 block text-xs font-medium text-gray-500">Payment Method</label>
        <select
          value={filters.paymethod || 'All'}
          onChange={handlePaymethodChange}
          className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          {PAYMENT_METHODS.map((method) => (
            <option key={method} value={method}>{method}</option>
          ))}
        </select>
      </div>

      <div className="min-w-0 flex-1 sm:min-w-[140px]">
        <label className="mb-1 block text-xs font-medium text-gray-500">Start Date</label>
        <input
          type="date"
          value={filters.startDate}
          onChange={handleStartDateChange}
          max={today}
          className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div className="min-w-0 flex-1 sm:min-w-[140px]">
        <label className="mb-1 block text-xs font-medium text-gray-500">End Date</label>
        <input
          type="date"
          value={filters.endDate}
          onChange={handleEndDateChange}
          max={today}
          className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div className="flex-shrink-0">
        <button
          onClick={onClearFilters}
          disabled={!hasActiveFilters && !filters.search}
          className="rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
}
