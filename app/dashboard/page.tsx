'use client'

import { useState } from "react"
import Chart from "react-apexcharts"
import { Button } from "@/components/ui/button"
import { CreditCard, CheckCircle, TrendingUp, TrendingDown, ArrowUpRight, Bell, Settings, RefreshCcw } from "lucide-react"

export default function Trading() {
  const [showDropdown, setShowDropdown] = useState(false)

  // Panel data
  const notifications = [
    { id: 1, message: "KYC verification is pending.", done: false },
    { id: 2, message: "Deposit of $1,000 completed.", done: true },
    { id: 3, message: "Auto-withdrawal setup successful.", done: true },
  ]
  const activities = [
    { date: "Oct 26, 2023", type: "BUY", asset: "BTC", amount: "$5,000.00", status: "Completed" },
    { date: "Oct 25, 2023", type: "SELL", asset: "ETH", amount: "$2,150.75", status: "Completed" },
    { date: "Oct 24, 2023", type: "DEPOSIT", asset: "USD", amount: "$10,000.00", status: "Completed" },
  ]
  const watchlist = [
    { symbol: "SOL", name: "Solana", price: "$145.23", change: "-2.15%" },
    { symbol: "ADA", name: "Cardano", price: "$0.45", change: "+1.80%" },
    { symbol: "DOGE", name: "Dogecoin", price: "$0.15", change: "+5.52%" },
  ]

  // Enhanced Chart configs with modern styling
  const lineChartOptions = {
    chart: { 
      id: "line-chart", 
      toolbar: { show: false }, 
      zoom: { enabled: false }, 
      background: 'transparent',
      sparkline: { enabled: false }
    },
    xaxis: { 
      categories: ["Jan", "Feb", "Mar", "Apr", "May"], 
      labels: { style: { colors: "#94a3b8", fontSize: '12px' } },
      axisBorder: { show: false },
      axisTicks: { show: false }
    },
    yaxis: {
      labels: { style: { colors: "#94a3b8", fontSize: '12px' } }
    },
    stroke: { curve: "smooth" as const, width: 3 },
    colors: ["#10B981"],
    grid: { borderColor: "#1e293b", strokeDashArray: 4 },
    tooltip: { theme: "dark", y: { formatter: (val: number) => `$${val}` } },
    dataLabels: { enabled: false },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'vertical',
        shadeIntensity: 0.5,
        gradientToColors: ['#10B981'],
        inverseColors: false,
        opacityFrom: 0.7,
        opacityTo: 0.3,
      }
    }
  }
  const lineChartSeries = [{ name: "Portfolio Value", data: [100, 200, 300, 400, 500] }]
  
  const barChartOptions = {
    chart: { 
      id: "bar-chart", 
      toolbar: { show: false }, 
      zoom: { enabled: false }, 
      background: 'transparent' 
    },
    xaxis: { 
      categories: ["Jan", "Feb", "Mar", "Apr", "May"], 
      labels: { style: { colors: "#94a3b8", fontSize: '12px' } },
      axisBorder: { show: false },
      axisTicks: { show: false }
    },
    yaxis: {
      labels: { style: { colors: "#94a3b8", fontSize: '12px' } }
    },
    colors: ["#3B82F6"],
    grid: { borderColor: "#1e293b", strokeDashArray: 4 },
    tooltip: { theme: "dark", y: { formatter: (val: number) => `$${val}` } },
    plotOptions: {
      bar: {
        borderRadius: 8,
        columnWidth: '60%',
      }
    },
    dataLabels: { enabled: false },
  }
  const barChartSeries = [{ name: "Deposits", data: [500, 700, 400, 900, 600] }]
  const verificationPending = notifications.some(n => n.message.toLowerCase().includes("verification") && !n.done);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Glass morphism navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-slate-900/60 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              TradePro
            </h1>
            <div className="hidden md:flex gap-6 text-sm">
              <a href="#" className="text-emerald-400 font-medium">Dashboard</a>
              <a href="#" className="text-slate-400 hover:text-white transition">Markets</a>
              <a href="#" className="text-slate-400 hover:text-white transition">Portfolio</a>
              <a href="#" className="text-slate-400 hover:text-white transition">Trading</a>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-white/5">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-white/5">
              <Settings className="w-5 h-5" />
            </Button>
            <Button className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white px-5 py-2 rounded-lg shadow-lg shadow-emerald-500/20 transition-all hover:shadow-emerald-500/40">
              <CreditCard className="w-4 h-4 mr-2" />
              Deposit
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Header with Stats */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h2 className="text-3xl font-bold text-white mb-1">Welcome back, John 👋</h2>
              <p className="text-slate-400 text-sm">Here's what's happening with your portfolio today</p>
            </div>
            <div className="flex items-center gap-2 mt-4 md:mt-0">
              <span className="text-xs text-slate-500">Last updated: 2 min ago</span>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white">
                <RefreshCcw className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Enhanced Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative overflow-hidden bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6 shadow-xl hover:shadow-emerald-500/10 transition-all group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-all"></div>
              <div className="relative">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm text-slate-400 mb-1">Total Balance</p>
                    <h3 className="text-3xl font-bold text-white">$12,500</h3>
                  </div>
                  <div className="p-3 bg-emerald-500/10 rounded-xl">
                    <TrendingUp className="w-5 h-5 text-emerald-400" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 text-sm font-semibold flex items-center">
                    <ArrowUpRight className="w-4 h-4" />
                    +12.5%
                  </span>
                  <span className="text-slate-500 text-xs">vs last month</span>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6 shadow-xl hover:shadow-blue-500/10 transition-all group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all"></div>
              <div className="relative">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm text-slate-400 mb-1">Recent Deposits</p>
                    <h3 className="text-3xl font-bold text-white">$2,700</h3>
                  </div>
                  <div className="p-3 bg-blue-500/10 rounded-xl">
                    <CreditCard className="w-5 h-5 text-blue-400" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-400 text-sm font-semibold">3 transactions</span>
                  <span className="text-slate-500 text-xs">this week</span>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6 shadow-xl hover:shadow-amber-500/10 transition-all group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl group-hover:bg-amber-500/20 transition-all"></div>
              <div className="relative">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm text-slate-400 mb-1">Pending Actions</p>
                    <h3 className="text-3xl font-bold text-white">{verificationPending ? "1" : "0"}</h3>
                  </div>
                  <div className="p-3 bg-amber-500/10 rounded-xl">
                    <Bell className="w-5 h-5 text-amber-400" />
                  </div>
                </div>
                {verificationPending && (
                  <Button size="sm" className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 w-full">
                    Complete KYC
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar - Notifications & Watchlist */}
          <div className="lg:col-span-4 space-y-6">
            {/* Notifications Card */}
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Bell className="w-5 h-5 text-emerald-400" />
                  Notifications
                </h3>
                {verificationPending && (
                  <span className="px-2 py-1 bg-amber-500/20 text-amber-400 text-xs font-medium rounded-full">
                    Action Required
                  </span>
                )}
              </div>
              <div className="space-y-3">
                {notifications.map(note => (
                  <div
                    key={note.id}
                    className={`p-4 rounded-xl border transition-all hover:scale-[1.02] ${
                      note.done 
                        ? "bg-slate-800/30 border-white/5" 
                        : "bg-amber-500/5 border-amber-500/20"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`mt-0.5 ${note.done ? "text-emerald-400" : "text-amber-400"}`}>
                        {note.done ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          <Bell className="w-5 h-5" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm ${note.done ? "text-slate-400" : "text-white font-medium"}`}>
                          {note.message}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced Watchlist */}
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                  Watchlist
                </h3>
                <Button variant="ghost" size="sm" className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 text-xs">
                  + Add
                </Button>
              </div>
              <div className="space-y-3">
                {watchlist.map((coin) => (
                  <div 
                    key={coin.symbol} 
                    className="p-4 bg-slate-800/30 hover:bg-slate-800/50 border border-white/5 rounded-xl transition-all cursor-pointer group"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center">
                          <span className="font-bold text-sm text-emerald-400">{coin.symbol.slice(0, 2)}</span>
                        </div>
                        <div>
                          <p className="font-bold text-white group-hover:text-emerald-400 transition">{coin.symbol}</p>
                          <p className="text-xs text-slate-500">{coin.name}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-white">{coin.price}</p>
                        <span className={`text-xs font-semibold flex items-center justify-end gap-1 ${
                          coin.change.startsWith('-') ? 'text-red-400' : 'text-emerald-400'
                        }`}>
                          {coin.change.startsWith('-') ? <TrendingDown className="w-3 h-3" /> : <TrendingUp className="w-3 h-3" />}
                          {coin.change}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content - Charts & Activity */}
          <div className="lg:col-span-8 space-y-6">
            {/* Charts Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6 shadow-xl">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-white">Portfolio Performance</h3>
                  <div className="flex gap-1">
                    <button className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-lg text-xs font-medium">1M</button>
                    <button className="px-3 py-1 text-slate-400 hover:bg-white/5 rounded-lg text-xs">3M</button>
                    <button className="px-3 py-1 text-slate-400 hover:bg-white/5 rounded-lg text-xs">1Y</button>
                  </div>
                </div>
                <Chart options={lineChartOptions} series={lineChartSeries} type="area" height={250} />
              </div>

              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6 shadow-xl">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-white">Deposit Activity</h3>
                  <div className="flex gap-1">
                    <button className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-lg text-xs font-medium">1M</button>
                    <button className="px-3 py-1 text-slate-400 hover:bg-white/5 rounded-lg text-xs">3M</button>
                    <button className="px-3 py-1 text-slate-400 hover:bg-white/5 rounded-lg text-xs">1Y</button>
                  </div>
                </div>
                <Chart options={barChartOptions} series={barChartSeries} type="bar" height={250} />
              </div>
            </div>

            {/* Activity Table */}
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6 shadow-xl">
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white text-xs">
                  View All →
                </Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-slate-500 text-xs font-medium border-b border-white/5">
                      <th className="text-left py-3 px-4">DATE</th>
                      <th className="text-left py-3 px-4">TYPE</th>
                      <th className="text-left py-3 px-4">ASSET</th>
                      <th className="text-right py-3 px-4">AMOUNT</th>
                      <th className="text-right py-3 px-4">STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activities.map((row, idx) => (
                      <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="py-4 px-4 text-slate-400 text-sm">{row.date}</td>
                        <td className="py-4 px-4">
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold ${
                            row.type === 'BUY' 
                              ? "bg-emerald-500/10 text-emerald-400" 
                              : row.type === 'SELL' 
                              ? "bg-red-500/10 text-red-400" 
                              : "bg-blue-500/10 text-blue-400"
                          }`}>
                            {row.type}
                          </span>
                        </td>
                        <td className="py-4 px-4 font-semibold text-white">{row.asset}</td>
                        <td className="py-4 px-4 text-right font-semibold text-white">{row.amount}</td>
                        <td className="py-4 px-4 text-right">
                          <span className="inline-flex items-center gap-1 text-emerald-400 text-sm">
                            <CheckCircle className="w-4 h-4" />
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
