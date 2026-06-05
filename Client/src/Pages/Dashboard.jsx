import { TrendingDown,Loader, History,TrendingUp, Wallet, PiggyBank, ArrowRightSquare } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";
// ── Placeholder block ────────────────────────────────────────────────────────
const Slot = ({ label, height = "h-full" }) => (
  <div className={`${height} bg-gray-50 border border-dashed border-gray-200 rounded-xl flex items-center justify-center`}>
    <span className="text-xs text-gray-300 tracking-wide uppercase">{label}</span>
  </div>
);

export default function Dashboard() {
     const { stats, loading } = useOutletContext();
  
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-5">

        {/* ── Header ── */}
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Financial Overview</h1>
          <p className="text-sm text-gray-400 mt-0.5">Welcome back — here's your summary</p>
        </div>

        {/* ── Stat Cards (4 col → 2 col → 1 col) ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            // { label: "Total Balance",      icon: Wallet,      color: "bg-blue-50   text-blue-500"   },
            // { label: "Monthly Income",     icon: TrendingUp,  color: "bg-green-50  text-green-500"  },
            { label: "Total Expenses",      icon: PiggyBank,   color: "bg-purple-100 text-purple-600",value:`${stats?.totalAllTime}` },
            { label: "This Month",   icon: TrendingDown,color: "bg-brand-dangerLight    text-red-600" , value: `${stats?.totalThisMonth}`   },
            { label: "Last Month",   icon: History ,color: "bg-fuchsia-100    text-fuchsia-600" , value: `${stats?.totalLastMonth}`   },
          ].map(({ label, icon: Icon, color,value }) => (
            <div key={label} className="bg-white ring-1 ring-black/5 rounded-xl border border-gray-100 p-4 flex flex-col gap-3 hover:shadow-md">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${color}`}>
                <Icon size={17} />
              </div>
              <div>
                <p className="text-xs text-gray-500 ">{label}</p>
                {/* <Slot label="value" height="h-7 mt-1" /> */}
                {loading ? <Loader color="gray"/> :
                <h3 className="text-2xl text-brand-primary font-bold my-2">{value}</h3>
                }
              </div>
            </div>
          ))}
        </div>

        {/* ── Charts row (2/3 + 1/3 → stacked) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Main chart */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 p-5 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-800">Spending vs. Income</p>
                <p className="text-xs text-gray-400">Transaction volume over the last 30 days</p>
              </div>
              <Slot label="legend" height="h-6 w-28" />
            </div>
            <Slot label="LineChart / AreaChart" height="h-52" />
          </div>

          {/* Spending categories */}
          <div className="bg-white rounded-xl border border-gray-100 p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-800">Spending Categories</p>
              {/* Filter dropdown slot */}
              <Slot label="30d / 60d / 90d" height="h-7 w-24" />
            </div>
            <div className="flex flex-col gap-3 flex-1">
              {["Housing", "Food & Dining", "Transport", "Entertainment"].map((c) => (
                <div key={c} className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">{c}</span>
                    <Slot label="$0.00" height="h-4 w-14" />
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full">
                    <div className="h-full w-1/3 bg-gray-300 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
            <button className="text-xs text-gray-400 hover:text-gray-600 transition-colors text-left">
              View full breakdown →
            </button>
          </div>
        </div>

        {/* ── Bottom row (recent transactions + budget health) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Recent transactions */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-800">Recent Transactions</p>
              <Link to="/expenses" className="text-xs uppercase bg-brand-income py-1 px-4 rounded-full " >
              View All 
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Slot label="" height="h-9 w-9 shrink-0 rounded-full" />
                  <div className="flex-1 flex flex-col gap-1">
                    <Slot label="merchant" height="h-3.5 w-32" />
                    <Slot label="category • date" height="h-3 w-24" />
                  </div>
                  <Slot label="$0.00" height="h-4 w-16" />
                </div>
              ))}
            </div>
          </div>

          {/* Budget health */}
          <div className="bg-white rounded-xl border border-gray-100 p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-800">Budget Health</p>
              <Slot label="⋯" height="h-6 w-6" />
            </div>
            <div className="flex flex-col gap-4 flex-1">
              {["Personal Care", "Shopping", "Travel"].map((b) => (
                <div key={b} className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">{b}</span>
                    <Slot label="50%" height="h-4 w-8" />
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full">
                    <div className="h-full w-1/2 bg-gray-800 rounded-full" />
                  </div>
                  <Slot label="$250 left of $500" height="h-3 w-28" />
                </div>
              ))}
            </div>

            {/* Upsell card slot */}
            <div className="bg-gray-900 rounded-xl p-4">
              <Slot label="promo / upsell card" height="h-16" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}