'use client'

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Modal } from "@/components/ui/modal"
import { StatCard } from "@/components/ui/StatCard"
import { RecentActivityTable } from "@/components/dashboard/RecentActivityTable"
import { Watchlist } from "@/components/dashboard/Watchlist"
import { Notifications } from "@/components/dashboard/Notifications"
import { ChartCard } from "@/components/dashboard/ChartCard"
import { CreditCard, TrendingUp, Bell, RefreshCcw } from "lucide-react"

export default function Trading() {
  const [isKYCModalOpen, setIsKYCModalOpen] = useState(false)
  const [isWatchlistModalOpen, setIsWatchlistModalOpen] = useState(false)
  const [newWatchlistSymbol, setNewWatchlistSymbol] = useState("")

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
  const [watchlist, setWatchlist] = useState([
    { symbol: "SOL", name: "Solana", price: "$145.23", change: "-2.15%" },
    { symbol: "ADA", name: "Cardano", price: "$0.45", change: "+1.80%" },
    { symbol: "DOGE", name: "Dogecoin", price: "$0.15", change: "+5.52%" },
  ])

  const handleAddWatchlist = () => {
    if (!newWatchlistSymbol) return
    setWatchlist([...watchlist, { symbol: newWatchlistSymbol.toUpperCase(), name: "Custom Asset", price: "$0.00", change: "+0.00%" }])
    setNewWatchlistSymbol("")
    setIsWatchlistModalOpen(false)
  }

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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950">
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
              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white" onClick={() => window.location.reload()}>
                <RefreshCcw className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Enhanced Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              label="Total Balance"
              value="$12,500"
              change="+12.5%"
              isPositive={true}
              subtext="vs last month"
              icon={TrendingUp}
              color="emerald"
            />
            <StatCard
              label="Recent Deposits"
              value="$2,700"
              subtext="3 transactions this week"
              icon={CreditCard}
              color="blue"
            />
            <StatCard
              label="Pending Actions"
              value={verificationPending ? "1" : "0"}
              icon={Bell}
              color="amber"
              action={verificationPending && (
                <Button
                  size="sm"
                  className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 w-full"
                  onClick={() => setIsKYCModalOpen(true)}
                >
                  Complete KYC
                </Button>
              )}
            />
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar - Notifications & Watchlist */}
          <div className="lg:col-span-4 space-y-6">
            <Notifications notifications={notifications} actionRequired={verificationPending} />
            <Watchlist items={watchlist} onAdd={() => setIsWatchlistModalOpen(true)} />
          </div>

          {/* Right Content - Charts & Activity */}
          <div className="lg:col-span-8 space-y-6">
            {/* Charts Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ChartCard
                title="Portfolio Performance"
                options={lineChartOptions}
                series={lineChartSeries}
                type="area"
                actions={
                  <>
                    <button className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-lg text-xs font-medium">1M</button>
                    <button className="px-3 py-1 text-slate-400 hover:bg-white/5 rounded-lg text-xs">3M</button>
                    <button className="px-3 py-1 text-slate-400 hover:bg-white/5 rounded-lg text-xs">1Y</button>
                  </>
                }
              />
              <ChartCard
                title="Deposit Activity"
                options={barChartOptions}
                series={barChartSeries}
                type="bar"
                actions={
                  <>
                    <button className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-lg text-xs font-medium">1M</button>
                    <button className="px-3 py-1 text-slate-400 hover:bg-white/5 rounded-lg text-xs">3M</button>
                    <button className="px-3 py-1 text-slate-400 hover:bg-white/5 rounded-lg text-xs">1Y</button>
                  </>
                }
              />
            </div>

            {/* Activity Table */}
            <RecentActivityTable activities={activities} onViewAll={() => alert("Navigating to all activities...")} />
          </div>
        </div>
      </div>

      {/* Modals */}
      <Modal
        isOpen={isKYCModalOpen}
        onClose={() => setIsKYCModalOpen(false)}
        title="Complete KYC Verification"
      >
        <div className="space-y-4">
          <p className="text-sm text-slate-400">
            To unlock full trading features and higher limits, please complete our secure verification process.
          </p>
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-emerald-400 mb-2">What you'll need:</h4>
            <ul className="text-xs text-slate-300 space-y-1">
              <li>• Government-issued ID (Passport, Driver's License, or National ID)</li>
              <li>• Proof of address (Utility bill or bank statement)</li>
              <li>• A clear selfie with your ID</li>
              <li>• Phone number for verification</li>
            </ul>
          </div>
          <p className="text-xs text-slate-400">
            The verification process typically takes 5-10 minutes. Your documents will be reviewed within 24-48 hours.
          </p>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="ghost" onClick={() => setIsKYCModalOpen(false)}>Later</Button>
            <Link href="/dashboard/verification">
              <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">
                Start Verification
              </Button>
            </Link>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isWatchlistModalOpen}
        onClose={() => setIsWatchlistModalOpen(false)}
        title="Add to Watchlist"
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-300">Asset Symbol</label>
            <Input
              placeholder="e.g. BTC, ETH, AAPL"
              value={newWatchlistSymbol}
              onChange={(e) => setNewWatchlistSymbol(e.target.value)}
              className="bg-slate-900 border-white/10 text-white"
            />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="ghost" onClick={() => setIsWatchlistModalOpen(false)}>Cancel</Button>
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-white" onClick={handleAddWatchlist}>Add Asset</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
