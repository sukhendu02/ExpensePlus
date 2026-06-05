import { useState } from "react";
import { X, Store, LayoutGrid, Calendar, Wallet, ChevronDown } from "lucide-react";

import { CATEGORIES,PAYMENT_METHODS } from "../../utils/expenseConstant";
const INITIAL_FORM = {
  amount:        "",
  description:   "",
  category:      "",
  paymentMethod: "Cash",
  expenseDate:   new Date().toISOString().split("T")[0],
  notes:         "",
};

export default function AddExpenseModal({ onClose, onSubmit, initialData = null }) {
  const isEdit = !!initialData;

  const [form, setForm]     = useState(isEdit ? {
    amount:        String(initialData.amount),
    description:   initialData.description   ?? "",
    category:      initialData.category      ?? "",
    paymentMethod: initialData.paymentMethod ?? "Cash",
    expenseDate:   initialData.expenseDate   ?? INITIAL_FORM.expenseDate,
    notes:         initialData.notes         ?? "",
  } : INITIAL_FORM);

  const [errors, setErrors] = useState({});

  const set = (field, value) => {
    setForm((prev)   => ({ ...prev,   [field]: value }));
    setErrors((prev) => ({ ...prev,   [field]: ""    }));
  };

  const validate = () => {
    const e = {};
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0)
      e.amount = "Enter a valid amount greater than 0";
    if (!form.category)
      e.category = "Please select a category";
    if (!form.expenseDate)
      e.expenseDate = "Please select a date";
    if (form.expenseDate > new Date().toISOString().split("T")[0])
      e.expenseDate = "Expense date cannot be in the future";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    onSubmit({
      ...(isEdit && { id: initialData.id }),   // carry id for update
      ...form,
      amount: Number(form.amount),
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/25 flex items-end sm:items-center justify-center"
      onClick={onClose}
    >
      <div
        className="relative bg-white w-full sm:max-w-lg sm:rounded-2xl rounded-t-2xl
                   shadow-xl max-h-[95dvh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
          <h2 className="text-base font-semibold text-gray-900">
            {isEdit ? "Edit Expense" : "Add New Expense"}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto px-6 py-5 flex flex-col gap-5">

          {/* Amount */}
          <div className="flex flex-col items-center gap-1">
            <label className="text-[11px] font-medium text-gray-400 uppercase tracking-widest">
              Amount
            </label>
            <div className="flex items-center gap-2">
              <span className="text-4xl font-light text-gray-800">$</span>
              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={form.amount}
                onChange={(e) => set("amount", e.target.value)}
                className="text-4xl font-light text-gray-400 placeholder-gray-300 bg-transparent
                           w-40 text-center outline-none border-b-2
                           focus:border-gray-900 border-gray-200 transition-colors pb-1"
              />
            </div>
            {errors.amount && (
              <p className="text-xs text-red-400 mt-1">{errors.amount}</p>
            )}
          </div>

          {/* Description */}
          <Field label="Transaction Name / Merchant" icon={<Store size={15} className="text-gray-400" />}>
            <input
              type="text"
              placeholder="e.g. Starbucks, Rent, Salary"
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              className="flex-1 text-sm text-gray-700 placeholder-gray-300 outline-none bg-transparent"
            />
          </Field>

          {/* Category + Payment Method */}
          <div className="grid grid-cols-2 gap-3">
            <Field
              label="Category"
              icon={<LayoutGrid size={15} className="text-gray-400" />}
              error={errors.category}
            >
              <select
                value={form.category}
                onChange={(e) => set("category", e.target.value)}
                className="flex-1 text-sm text-gray-700 outline-none bg-transparent appearance-none cursor-pointer"
              >
                <option value="">Select</option>
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
              <ChevronDown size={14} className="text-gray-400 shrink-0" />
            </Field>

            <Field label="Payment Method" icon={<Wallet size={15} className="text-gray-400" />}>
              <select
                value={form.paymentMethod}
                onChange={(e) => set("paymentMethod", e.target.value)}
                className="flex-1 text-sm text-gray-700 outline-none bg-transparent appearance-none cursor-pointer"
              >
                {PAYMENT_METHODS.map((m) => <option key={m}>{m}</option>)}
              </select>
              <ChevronDown size={14} className="text-gray-400 shrink-0" />
            </Field>
          </div>

          {/* Date */}
          <Field
            label="Date"
            icon={<Calendar size={15} className="text-gray-400" />}
            error={errors.expenseDate}
          >
            <input
              type="date"
              value={form.expenseDate}
              max={new Date().toISOString().split("T")[0]}
              onChange={(e) => set("expenseDate", e.target.value)}
              className="flex-1 text-sm text-gray-700 outline-none bg-transparent cursor-pointer"
            />
          </Field>

          {/* Notes */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-medium text-gray-400 uppercase tracking-widest">
              Notes (Optional)
            </label>
            <div className="border border-gray-200 rounded-xl px-4 py-3 focus-within:border-gray-400 transition-colors">
              <textarea
                rows={3}
                placeholder="Add any extra details here..."
                value={form.notes}
                onChange={(e) => set("notes", e.target.value)}
                className="w-full text-sm text-gray-700 placeholder-gray-300 outline-none bg-transparent resize-none"
              />
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 grid grid-cols-2 gap-3 shrink-0">
          <button
            onClick={onClose}
            className="py-2.5 rounded-xl border border-gray-200 text-sm font-medium
                       text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="py-2.5 rounded-xl bg-gray-900 hover:bg-gray-800 text-white
                       text-sm font-medium transition-colors"
          >
            {isEdit ? "Save Changes" : "Add Expense"}
          </button>
        </div>

      </div>
    </div>
  );
}

// Reusable field wrapper
function Field({ label, icon, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-medium text-gray-400 uppercase tracking-widest">
        {label}
      </label>
      <div className={`flex items-center gap-2.5 border rounded-xl px-4 py-3
                       focus-within:border-gray-400 transition-colors
                       ${error ? "border-red-300 bg-red-50/30" : "border-gray-200"}`}>
        {icon}
        {children}
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}