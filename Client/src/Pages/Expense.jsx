import { useState, useMemo } from "react";
import { Download, Trash2, X, TrendingDown, TrendingUp, Landmark, Calendar, ChevronDown } from "lucide-react";

// ── Dummy data ──────────────────────────────────────────────────────────────
const TRANSACTIONS = [
  { id: 1,  date: "2023-10-24", description: "Whole Foods Market", subtext: "Grocery Purchase",  category: "Food",     paymentMethod: "Chase Checking",  amount: -142.30  },
  { id: 2,  date: "2023-10-22", description: "Apple Inc.",          subtext: "Salary Deposit",    category: "Income",   paymentMethod: "Apple Card",      amount: +6450.00 },
  { id: 3,  date: "2023-10-20", description: "Avalon Apartments",   subtext: "Monthly Rent",      category: "Housing",  paymentMethod: "Chase Checking",  amount: -2800.00 },
  { id: 4,  date: "2023-10-18", description: "Netflix",             subtext: "Monthly Plan",      category: "Entertainment", paymentMethod: "Apple Card", amount: -15.99  },
  { id: 5,  date: "2023-10-15", description: "Uber",                subtext: "Trip to Airport",   category: "Transport",paymentMethod: "Chase Checking",  amount: -38.50  },
  { id: 6,  date: "2023-10-10", description: "Freelance Payment",   subtext: "Web Project",       category: "Income",   paymentMethod: "Bank Transfer",   amount: +2200.00 },
  { id: 7,  date: "2023-10-10", description: "Freelance Payment",   subtext: "Web Project",       category: "Income",   paymentMethod: "Bank Transfer",   amount: +2200.00 },
  { id: 8,  date: "2023-10-10", description: "Freelance Payment",   subtext: "Web Project",       category: "Income",   paymentMethod: "Bank Transfer",   amount: +2200.00 },
  { id: 9,  date: "2023-10-10", description: "Freelance Payment",   subtext: "Web Project",       category: "Income",   paymentMethod: "Bank Transfer",   amount: +2200.00 },
  { id: 10,  date: "2023-10-10", description: "Freelance Payment",   subtext: "Web Project",       category: "Income",   paymentMethod: "Bank Transfer",   amount: +2200.00 },
  { id: 11,  date: "2023-10-10", description: "Freelance Payment",   subtext: "Web Project",       category: "Income",   paymentMethod: "Bank Transfer",   amount: +2200.00 },
  { id: 12,  date: "2023-10-10", description: "Freelance Payment",   subtext: "Web Project",       category: "Income",   paymentMethod: "Bank Transfer",   amount: +2200.00 },
  { id: 13,  date: "2023-10-10", description: "Freelance Payment",   subtext: "Web Project",       category: "Income",   paymentMethod: "Bank Transfer",   amount: +2200.00 },
  { id: 14,  date: "2023-10-10", description: "Freelance Payment",   subtext: "Web Project",       category: "Income",   paymentMethod: "Bank Transfer",   amount: +2200.00 },
  { id: 15,  date: "2023-10-10", description: "Freelance Payment",   subtext: "Web Project",       category: "Income",   paymentMethod: "Bank Transfer",   amount: +2200.00 },
];

const CATEGORIES  = ["All Categories", "Food", "Income", "Housing", "Entertainment", "Transport"];
const PAY_METHODS = ["All Methods", "Chase Checking", "Apple Card", "Bank Transfer"];

const CATEGORY_COLORS = {
  Food:          "bg-green-100 text-green-700",
  Income:        "bg-blue-100 text-blue-700",
  Housing:       "bg-orange-100 text-orange-700",
  Entertainment: "bg-purple-100 text-purple-700",
  Transport:     "bg-yellow-100 text-yellow-700",
};

const fmt = (n) =>
  (n < 0 ? "-" : "+") +
  "$" +
  Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: 2 });

const fmtDate = (d) =>
  new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

// ── Sub-components ───────────────────────────────────────────────────────────
function StatCard({ icon: Icon, iconClass, label, value, badge, badgeClass }) {
  return (
    <div className="bg-white rounded-xl border ring-1 ring-black/5 border-gray-100 p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className={`w-13 h-13 rounded-lg flex items-center justify-center ${iconClass}`}>
          <Icon size={18} />
        </div>
        {badge && <span className={`text-xs font-medium ${badgeClass}`}>{badge}</span>}
      </div>
      <div>
        <p className="text-xs text-gray-400 mb-0.5">{label}</p>
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  );
}

function Select({ value, onChange, options }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-white border border-gray-200 rounded-lg pl-3 pr-8 py-2 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300 cursor-pointer"
      >
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
      <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
    </div>
  );
}

function DetailRow({ label, value, valueClass = "" }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
      <span className="text-sm text-gray-400">{label}</span>
      <span className={`text-sm font-medium text-gray-800 ${valueClass}`}>{value}</span>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function Expense() {
  const [category,   setCategory]   = useState("All Categories");
  const [payMethod,  setPayMethod]  = useState("All Methods");
  const [dateFrom,   setDateFrom]   = useState("");
  const [dateTo,     setDateTo]     = useState("");
  const [sort,       setSort]       = useState("newest");
  const [selected,   setSelected]   = useState(null);
  const [rows,       setRows]       = useState(TRANSACTIONS);

  const filtered = useMemo(() => {
    let list = [...rows];
    if (category  !== "All Categories") list = list.filter((t) => t.category      === category);
    if (payMethod !== "All Methods")    list = list.filter((t) => t.paymentMethod  === payMethod);
    if (dateFrom)                       list = list.filter((t) => t.date           >= dateFrom);
    if (dateTo)                         list = list.filter((t) => t.date           <= dateTo);
    list.sort((a, b) => sort === "newest"
      ? new Date(b.date) - new Date(a.date)
      : new Date(a.date) - new Date(b.date)
    );
    return list;
  }, [rows, category, payMethod, dateFrom, dateTo, sort]);

  const totalInflow  = rows.filter((t) => t.amount > 0).reduce((s, t) => s + t.amount, 0);
  const totalOutflow = rows.filter((t) => t.amount < 0).reduce((s, t) => s + t.amount, 0);
  const netBalance   = totalInflow + totalOutflow;

  const handleDelete = (id) => {
    setRows((prev) => prev.filter((t) => t.id !== id));
    if (selected?.id === id) setSelected(null);
  };

  const clearFilters = () => {
    setCategory("All Categories");
    setPayMethod("All Methods");
    setDateFrom("");
    setDateTo("");
    setSort("newest");
  };


  

  return (
    <div className="min-h-screen bg-brand-background">


      {/*  Page body  */}
      <div className="px-6 py-5">

        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">Transactions</h1>
            <p className="text-sm text-gray-400 mt-0.5">Review and manage your latest financial activity.</p>
          </div>
          {/* <button className="flex items-center gap-2 border border-gray-200 bg-white rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors">
            <Download size={15} /> Export CSV
          </button> */}
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-3 gap-4 mb-5">
          <StatCard icon={TrendingDown} iconClass="bg-green-100 text-brand-successDark"
            label="Total Inflow"  value={fmt(totalInflow)}
            badge="+12.5%"        badgeClass="text-brand-successDark font-semibold" />
          <StatCard icon={TrendingUp} iconClass="bg-red-100 text-brand-danger"
            label="Total Outflow" value={fmt(totalOutflow)}
            badge="-4.2%"         badgeClass="text-brand-danger font-semibold" />
          <StatCard icon={Landmark} iconClass="bg-gray-100 text-gray-500"
            label="Net Balance"   value={fmt(netBalance)}
            badge="Current"       badgeClass="text-gray-400" />
        </div>

        
      {/* Sticky filter bar */}
      <div className="sticky top-0 z-10 bg-white ring-1 ring-black/5 rounded m-2 border-b border-gray-200 px-6 py-3">
        <div className="flex flex-wrap items-center gap-3">

          {/* Date range */}
          <div className="flex items-center gap-1.5 bg-brand-muted/20 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600">
           
            <Calendar size={14} className="text-gray-400" />
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="outline-none text-sm bg-transparent w-32"
            />
            <span className="text-gray-300">–</span>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="outline-none text-sm bg-transparent w-32"
            />
          </div>

          <Select value={category}  onChange={setCategory}  options={CATEGORIES}  />
          <Select value={payMethod} onChange={setPayMethod} options={PAY_METHODS} />
          <Select value={sort}      onChange={setSort}
            options={["newest", "oldest"]}
          />

          <button
            onClick={clearFilters}
            className="text-sm text-gray-400 hover:text-gray-600 transition-colors ml-auto"
          >
            Clear filters
          </button>
        </div>
      </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-100 ring-1 ring-black/5 overflow-hidden">
          <table className="w-full ">
            <thead>
              <tr className="border-b border-gray-100 bg-brand-muted/15">
                {["Date", "Description", "Category", "Payment Method", "Amount", ""].map((h) => (
                  <th key={h} className="text-left text-[11px] font-medium text-gray-400 uppercase tracking-wide px-5 py-3">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-sm text-gray-400">
                    No transactions found
                  </td>
                </tr>
              )}
              {filtered.map((t) => (
                <tr
                  key={t.id}
                  onClick={() => setSelected(t)}
                  className="border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors group"
                >
                  <td className="px-5 py-3.5 text-sm text-gray-500 whitespace-nowrap">
                    {fmtDate(t.date)}
                  </td>
                  <td className="px-5 py-3.5">
                    <p className="text-sm font-medium text-gray-800">{t.description}</p>
                    <p className="text-xs text-gray-400">{t.subtext}</p>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${CATEGORY_COLORS[t.category] ?? "bg-gray-100 text-gray-600"}`}>
                      {t.category}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-gray-500">{t.paymentMethod}</td>
                  <td className={`px-5 py-3.5 text-sm font-semibold ${t.amount < 0 ? "text-red-500" : "text-green-500"}`}>
                    {fmt(t.amount)}
                  </td>
                  <td className="px-5 py-3.5">
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDelete(t.id); }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-red-50 text-gray-300 hover:text-red-400"
                      aria-label="Delete transaction"
                    >
                      <Trash2 size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Detail drawer ──────────────────────────────────────────────── */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex justify-end"
          onClick={() => setSelected(null)}
        >
          {/* backdrop */}
          <div className="absolute inset-0 bg-black/20" />

          {/* panel */}
          <div
            className="relative bg-white w-full max-w-sm h-full shadow-xl overflow-y-auto flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Panel header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-base font-semibold text-gray-900">Transaction Details</h2>
              <button
                onClick={() => setSelected(null)}
                className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Panel body */}
            <div className="px-6 py-5 flex-1">

              {/* Icon + name */}
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-3">
                  <span className="text-2xl">🛒</span>
                </div>
                <p className="text-lg font-semibold text-gray-900">{selected.description}</p>
                <p className="text-sm text-gray-400 mt-0.5">{fmtDate(selected.date)}</p>
                <p className={`text-2xl font-bold mt-2 ${selected.amount < 0 ? "text-red-500" : "text-green-500"}`}>
                  {fmt(selected.amount)}
                </p>
              </div>

              {/* Details */}
              <div className="bg-gray-50 rounded-xl px-4 mb-5">
                <DetailRow label="Category"       value={selected.category} />
                <DetailRow label="Payment Method" value={selected.paymentMethod} />
                <DetailRow label="Date"           value={fmtDate(selected.date)} />
                <DetailRow label="Status"         value="Completed" valueClass="text-green-500" />
              </div>

              {/* Note */}
              <div className="mb-5">
                <label className="text-xs font-medium text-gray-400 uppercase tracking-wide block mb-2">
                  Note
                </label>
                <textarea
                  defaultValue={selected.subtext}
                  rows={3}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 resize-none focus:outline-none focus:ring-1 focus:ring-gray-300"
                />
              </div>
            </div>

            {/* Panel footer */}
            <div className="px-6 py-4 border-t border-gray-100 grid grid-cols-2 gap-3">
              <button
                onClick={() => handleDelete(selected.id)}
                className="flex items-center justify-center gap-2 border border-red-200 text-red-400 rounded-lg py-2.5 text-sm font-medium hover:bg-red-50 transition-colors"
              >
                <Trash2 size={15} /> Delete
              </button>
              <button className="bg-gray-900 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-gray-800 transition-colors">
                Save Note
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}