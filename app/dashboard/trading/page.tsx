'use client'

import { useState } from "react"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { Search, TrendingUp, TrendingDown, Star, Bell, Settings, ChevronDown, Info } from "lucide-react"

// Dynamically import Chart with SSR disabled to avoid "window is not defined" error
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false })

export default function Trading() {
  const [activeTimeframe, setActiveTimeframe] = useState("1D")
  const [activeOrderTab, setActiveOrderTab] = useState("Buy")
  const [orderType, setOrderType] = useState("Market")
  const [amount, setAmount] = useState("")
  const [price, setPrice] = useState("")
  const [quantity, setQuantity] = useState("100")

  // Market watchlist data
  const watchlist = [
    { symbol: "AAPL", name: "Apple", price: "215.42", change: "+0.85%", positive: true },
    { symbol: "TSLA", name: "Tesla", price: "384.10", change: "+2.34%", positive: true },
    { symbol: "GOOG", name: "Alphabet", price: "141.27", change: "-0.45%", positive: false },
    { symbol: "TSLA", name: "Tesla", price: "288.92", change: "-1.20%", positive: false },
    { symbol: "AMZN", name: "Amazon", price: "174.85", change: "+1.15%", positive: true },
    { symbol: "NVDA", name: "NVIDIA", price: "898.20", change: "+3.45%", positive: true },
    { symbol: "META", name: "Meta Platforms", price: "374.38", change: "+0.92%", positive: true },
  ]

  // Open orders data
  const openOrders = [
    { symbol: "AAPL", qty: "100 Limit", price: "213.05", status: "Working", filled: "0%", type: "Monthly Cancel" },
    { symbol: "TSLA", qty: "50 Stop", price: "280.00", status: "Working", filled: "0%", type: "Monthly Cancel" },
    { symbol: "WDSA", qty: "20 Limit", price: "880.00", status: "Working", filled: "25%", type: "Monthly Cancel" },
  ]

  // Positions data
  const positions = [
    { symbol: "AAPL", qty: "300", avgPrice: "198.65", last: "215.42", pl: "+$4,625.00", plPercent: "30.2%" },
    { symbol: "MSFT", qty: "120", avgPrice: "352.10", last: "368.12", pl: "+$1,922.40", plPercent: "4.5%" },
    { symbol: "TSLA", qty: "40", avgPrice: "274.60", last: "288.92", pl: "+$572.80", plPercent: "5.4%" },
    { symbol: "GOOG", qty: "-3", avgPrice: "138.10", last: "141.27", pl: "-$9.51", plPercent: "2.3%" },
    { symbol: "Cash", qty: "-", avgPrice: "-", last: "-", pl: "-", plPercent: "$2,621.27" },
  ]

  // Key statistics
  const keyStats = [
    { label: "P/E (TTM)", value: "3.321" },
    { label: "Dividend yield", value: "0.52%" },
    { label: "Beta", value: "1.68" },
  ]

  const chartOptions = {
    chart: {
      id: "trading-candlestick",
      toolbar: {
        show: true,
        tools: {
          download: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true
        }
      },
      background: 'transparent',
      foreColor: '#9ca3af'
    },
    xaxis: {
      type: 'datetime' as const,
      labels: {
        style: { colors: "#64748b", fontSize: '10px' },
        datetimeFormatter: {
          year: 'yyyy',
          month: 'MMM \'yy',
          day: 'dd MMM',
          hour: 'HH:mm'
        }
      }
    },
    yaxis: {
      labels: {
        style: { colors: "#64748b", fontSize: '10px' },
        formatter: (val: number) => `$${val.toLocaleString()}`
      },
      opposite: true
    },
    grid: {
      borderColor: "#1e293b",
      strokeDashArray: 2
    },
    tooltip: {
      theme: "dark",
      x: { format: 'dd MMM HH:mm' }
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: '#10B981',
          downward: '#EF4444'
        }
      }
    }
  }

  const chartSeries = [{
    name: 'AAPL',
    data: [
      { x: new Date('2023-10-24T09:00:00'), y: [210, 212, 209, 211] },
      { x: new Date('2023-10-24T10:00:00'), y: [211, 215, 210, 214] },
      { x: new Date('2023-10-24T11:00:00'), y: [214, 218, 213, 217] },
      { x: new Date('2023-10-24T12:00:00'), y: [217, 219, 215, 216] },
      { x: new Date('2023-10-24T13:00:00'), y: [216, 220, 215, 219] },
      { x: new Date('2023-10-24T14:00:00'), y: [219, 221, 217, 218] },
      { x: new Date('2023-10-24T15:00:00'), y: [218, 217, 213, 214] },
      { x: new Date('2023-10-24T16:00:00'), y: [214, 216, 213, 215] },
    ]
  }]

  const calculateTotal = () => {
    if (!quantity || isNaN(parseFloat(quantity))) return "0.00"
    const currentPrice = 215.42
    return (parseFloat(quantity) * currentPrice).toFixed(2)
  }

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white flex">
      {/* Left Sidebar - Markets Watchlist */}
      <div className="w-64 bg-[#0d1117] border-r border-gray-800 flex flex-col">
        <div className="p-4 border-b border-gray-800">
          <h2 className="text-sm font-semibold text-gray-400 mb-3">Markets</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search symbols, companies..."
              className="w-full bg-[#161b22] border border-gray-700 rounded px-9 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-gray-600"
            />
          </div>
        </div>

        {/* Watchlist Categories */}
        <div className="flex border-b border-gray-800 text-xs">
          <button className="flex-1 py-2.5 text-gray-400 hover:text-white hover:bg-gray-800/50 transition">Watchlist</button>
          <button className="flex-1 py-2.5 text-white bg-gray-800 font-medium">Favorites</button>
          <button className="flex-1 py-2.5 text-gray-400 hover:text-white hover:bg-gray-800/50 transition">News</button>
        </div>

        {/* Stock List */}
        <div className="flex-1 overflow-y-auto">
          {watchlist.map((stock, idx) => (
            <div
              key={idx}
              className={`px-4 py-3 border-b border-gray-800 hover:bg-gray-800/50 cursor-pointer transition ${idx === 0 ? 'bg-gray-800/70 border-l-2 border-l-emerald-500' : ''
                }`}
            >
              <div className="flex items-center justify-between mb-1">
                <div>
                  <div className="font-semibold text-sm">{stock.symbol}</div>
                  <div className="text-xs text-gray-500">{stock.name}</div>
                </div>
                <Star className="w-3.5 h-3.5 text-gray-600 hover:text-yellow-500" />
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold">{stock.price}</div>
                <div className={`text-xs font-medium flex items-center gap-1 ${stock.positive ? 'text-emerald-400' : 'text-red-400'
                  }`}>
                  {stock.positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {stock.change}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <div className="bg-[#0d1117] border-b border-gray-800 px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold">AAPL</span>
                  <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">NASDAQ</span>
                </div>
                <div className="text-xs text-gray-500 mt-0.5">Apple Inc. - Technology - Consumer Electronics</div>
              </div>
              <div className="flex items-center gap-4">
                <div>
                  <div className="text-3xl font-bold">215.42</div>
                  <div className="text-xs text-emerald-400 font-medium">+1.85 • +0.86 • +0.41%</div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="bg-emerald-600 hover:bg-emerald-700 border-0 text-white text-xs px-4 py-2">
                Buy AAPL
              </Button>
              <Button variant="outline" className="bg-gray-800 hover:bg-gray-700 border-0 text-xs px-4 py-2">
                Sell
              </Button>
              <Button variant="outline" className="bg-gray-800 hover:bg-gray-700 border-0 text-xs px-3 py-2">
                Add to watchlist
              </Button>
              <button className="p-2 hover:bg-gray-800 rounded">
                <Bell className="w-4 h-4 text-gray-400" />
              </button>
              <button className="p-2 hover:bg-gray-800 rounded">
                <Settings className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Market Status */}
          <div className="flex items-center gap-6 mt-3 text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
              <span>As of 3:57 PM EST</span>
            </div>
            <div>32-week range</div>
            <div>$3.16 / 22.50</div>
          </div>
        </div>

        {/* Chart and Right Panel Container */}
        <div className="flex-1 flex">
          {/* Chart Section */}
          <div className="flex-1 p-6">
            {/* Chart Controls */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-1">
                {["1D", "5D", "1M", "6M", "YTD", "1Y", "5Y", "All"].map(period => (
                  <button
                    key={period}
                    onClick={() => setActiveTimeframe(period)}
                    className={`px-3 py-1.5 rounded text-xs font-medium transition ${activeTimeframe === period
                        ? 'bg-gray-700 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800'
                      }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded text-xs text-gray-400">
                  Indicators
                </button>
                <button className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded text-xs text-gray-400">
                  Compare
                </button>
              </div>
            </div>

            {/* Chart */}
            <div className="bg-[#0d1117] border border-gray-800 rounded-lg p-4 mb-4">
              <Chart
                options={chartOptions}
                series={chartSeries}
                type="candlestick"
                height={380}
              />
            </div>

            {/* Tabs - Overview, News, Fundamentals, Order book */}
            <div className="flex border-b border-gray-800 mb-4">
              {["Overview", "News", "Fundamentals", "Order book"].map((tab, idx) => (
                <button
                  key={tab}
                  className={`px-4 py-2.5 text-xs font-medium transition ${idx === 0
                      ? 'text-white border-b-2 border-emerald-500'
                      : 'text-gray-400 hover:text-white'
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Key Statistics */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {keyStats.map((stat, idx) => (
                <div key={idx} className="bg-[#0d1117] border border-gray-800 rounded-lg p-4">
                  <div className="text-xs text-gray-500 mb-1">{stat.label}</div>
                  <div className="text-lg font-semibold">{stat.value}</div>
                </div>
              ))}
            </div>

            {/* Open Orders Table */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold">Open orders</h3>
                <span className="text-xs text-gray-500">3 working</span>
              </div>
              <div className="bg-[#0d1117] border border-gray-800 rounded-lg overflow-hidden">
                <table className="w-full text-xs">
                  <thead className="bg-gray-800/50">
                    <tr className="text-gray-400">
                      <th className="text-left px-4 py-2 font-medium">Symbol</th>
                      <th className="text-left px-4 py-2 font-medium">Qty</th>
                      <th className="text-left px-4 py-2 font-medium">Price</th>
                      <th className="text-left px-4 py-2 font-medium">Status</th>
                      <th className="text-left px-4 py-2 font-medium">Filled</th>
                      <th className="text-left px-4 py-2 font-medium">Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {openOrders.map((order, idx) => (
                      <tr key={idx} className="border-t border-gray-800 hover:bg-gray-800/30">
                        <td className="px-4 py-3 font-medium">{order.symbol}</td>
                        <td className="px-4 py-3 text-emerald-400">{order.qty}</td>
                        <td className="px-4 py-3">{order.price}</td>
                        <td className="px-4 py-3">
                          <span className="bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded text-xs">
                            {order.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">{order.filled}</td>
                        <td className="px-4 py-3 text-gray-400">{order.type}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Positions Table */}
            <div>
              <h3 className="text-sm font-semibold mb-3">Positions</h3>
              <div className="bg-[#0d1117] border border-gray-800 rounded-lg overflow-hidden">
                <table className="w-full text-xs">
                  <thead className="bg-gray-800/50">
                    <tr className="text-gray-400">
                      <th className="text-left px-4 py-2 font-medium">Symbol</th>
                      <th className="text-left px-4 py-2 font-medium">Qty</th>
                      <th className="text-left px-4 py-2 font-medium">Avg price</th>
                      <th className="text-left px-4 py-2 font-medium">Last</th>
                      <th className="text-left px-4 py-2 font-medium">P/L</th>
                      <th className="text-left px-4 py-2 font-medium">P/L (%/Profit)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {positions.map((pos, idx) => (
                      <tr key={idx} className="border-t border-gray-800 hover:bg-gray-800/30">
                        <td className="px-4 py-3 font-medium">{pos.symbol}</td>
                        <td className="px-4 py-3">{pos.qty}</td>
                        <td className="px-4 py-3">{pos.avgPrice}</td>
                        <td className="px-4 py-3">{pos.last}</td>
                        <td className={`px-4 py-3 font-medium ${pos.pl.includes('+') ? 'text-emerald-400' : 'text-red-400'}`}>
                          {pos.pl}
                        </td>
                        <td className={`px-4 py-3 font-medium ${pos.pl.includes('+') ? 'text-emerald-400' : pos.plPercent.includes('$') ? 'text-gray-400' : 'text-red-400'}`}>
                          {pos.plPercent}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Order Panel */}
          <div className="w-80 bg-[#0d1117] border-l border-gray-800 p-6">
            <h2 className="text-lg font-bold mb-4">Order ticket</h2>

            {/* Buy/Sell Tabs */}
            <div className="flex mb-4 bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => setActiveOrderTab("Buy")}
                className={`flex-1 py-2 rounded-md text-sm font-semibold transition ${activeOrderTab === "Buy"
                    ? 'bg-emerald-600 text-white'
                    : 'text-gray-400'
                  }`}
              >
                Buy
              </button>
              <button
                onClick={() => setActiveOrderTab("Sell")}
                className={`flex-1 py-2 rounded-md text-sm font-semibold transition ${activeOrderTab === "Sell"
                    ? 'bg-red-600 text-white'
                    : 'text-gray-400'
                  }`}
              >
                Sell
              </button>
            </div>

            {/* Symbol Display */}
            <div className="mb-4">
              <label className="text-xs text-gray-400 block mb-2">Symbol</label>
              <div className="bg-gray-800 border border-gray-700 rounded px-3 py-2.5 text-sm font-medium">
                AAPL - NASDAQ
              </div>
            </div>

            {/* Order Type */}
            <div className="mb-4">
              <label className="text-xs text-gray-400 block mb-2">Order type</label>
              <select
                value={orderType}
                onChange={(e) => setOrderType(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2.5 text-sm text-white focus:outline-none focus:border-gray-600"
              >
                <option>Market</option>
                <option>Limit</option>
                <option>Stop</option>
                <option>Stop-Limit</option>
              </select>
            </div>

            {/* Quantity */}
            <div className="mb-4">
              <label className="text-xs text-gray-400 block mb-2">Shares</label>
              <input
                type="text"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2.5 text-sm text-white focus:outline-none focus:border-gray-600"
                placeholder="100"
              />
            </div>

            {/* Time in force */}
            <div className="mb-4">
              <label className="text-xs text-gray-400 block mb-2">Time in force</label>
              <select className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2.5 text-sm text-white focus:outline-none focus:border-gray-600">
                <option>GTC</option>
                <option>DAY</option>
                <option>IOC</option>
                <option>FOK</option>
              </select>
            </div>

            {/* Consolidated hours */}
            <div className="mb-6">
              <label className="text-xs text-gray-400 block mb-2">Consolidated hours</label>
              <select className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2.5 text-sm text-white focus:outline-none focus:border-gray-600">
                <option>Off</option>
                <option>Extended</option>
              </select>
            </div>

            {/* Estimated Cost */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Max slippage</span>
                <span className="font-medium">$0.001 (0.0276%)</span>
              </div>
              <div className="flex justify-between text-sm pt-2 border-t border-gray-700">
                <span className="text-gray-400 font-medium">Estimated cost</span>
                <span className="font-bold text-lg">${calculateTotal()}</span>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              className={`w-full py-3 rounded-lg font-bold text-white transition ${activeOrderTab === "Buy"
                  ? 'bg-emerald-600 hover:bg-emerald-700'
                  : 'bg-red-600 hover:bg-red-700'
                }`}
            >
              Submit buy order
            </Button>

            {/* Cancel Button */}
            <Button
              variant="outline"
              className="w-full mt-3 py-3 rounded-lg font-semibold bg-transparent border border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-white"
            >
              Cancel
            </Button>

            {/* Balance Info */}
            <div className="mt-6 pt-6 border-t border-gray-800">
              <div className="flex justify-between text-xs mb-2">
                <span className="text-gray-400">Available cash</span>
                <span className="font-medium">$21,508.06</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Buying power</span>
                <span className="font-medium">$43,016.12</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
