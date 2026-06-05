export const CATEGORIES = [
"All",
  "Food",
  "Transport",
  "Bills",
  "Fuel",
  "Groceries",
  "Health",
  "Investment",
  "Entertainment",
  "Shopping",
  "Travel",
  "EMI",
  "Other",
];
export const PAYMENT_METHODS = ['All', 'Cash', 'UPI', 'Credit Card', 'Debit Card', 'Other'];

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
  Fuel:'bg-amber-100 text-amber-700',
  Groceries:"bg-Indigo-100 text-Indigo-700",
  Health:"bg-rose-100 text-rose-700",
  Investment:"bg-indigo-100 text-indigo-700",
  EMI:"bg-cyan-100 text-cyan-700",
  Shopping:"bg-pink-100 text-pink-700",
  Travel:"bg-stone-100 text-stone-700",
  Entertainment: 'bg-purple-100 text-purple-700',
  Other: 'bg-gray-100 text-gray-700',
};