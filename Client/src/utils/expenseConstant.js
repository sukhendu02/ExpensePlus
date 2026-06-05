export const CATEGORIES = ['All', 'Food', 'Transport', 'Bills', 'Entertainment', 'Other'];

export const PAYMENT_METHODS = ['All', 'Cash', 'Credit Card', 'Debit Card', 'UPI'];

export const SORT_FIELDS = [
  { key: 'expenseDate', label: 'Date' },
  { key: 'amount', label: 'Amount' },
  { key: 'category', label: 'Category' },
  { key: 'createdAt', label: 'Created' },
];

export const CATEGORY_COLORS = {
  Food: 'bg-green-100 text-green-700',
  Transport: 'bg-blue-100 text-blue-700',
  Bills: 'bg-red-100 text-red-700',
  Entertainment: 'bg-purple-100 text-purple-700',
  Other: 'bg-gray-100 text-gray-700',
};