'use client'

import { useState } from "react"
import Chart from "react-apexcharts"
import { Button } from "@/components/ui/button"
import { TrendingUp, Settings } from "lucide-react"

export default function Trading() {
  const [activeTimeframe, setActiveTimeframe] = useState("1H")
  const [activeOrderTab, setActiveOrderTab] = useState("Buy")
  const [orderType, setOrderType] = useState("Market")
  const [amount, setAmount] = useState("")
  const [price, setPrice] = useState("")

  // Stats data
  const stats = [
    { label: "Current Price", value: "68,450.55", change: "+2.15%", positive: true },
    { label: "24h Change", value: "+1,245.10" },
    { label: "24h High / Low", value: "69.1k / 67.2k" },
    { label: "24h Volume", value: "34,567 BTC" },
  ]

  // Candlestick chart configuration
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
        style: { colors: "#64748b" },
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
        style: { colors: "#64748b" },
        formatter: (val: number) => `$${val.toLocaleString()}`
      },
      tooltip: { enabled: true }
    },
    grid: {
      borderColor: "#A7F3D0",
      strokeDashArray: 3,
      xaxis: { lines: { show: true } },
      yaxis: { lines: { show: true } }
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
        },
        wick: {
          useFillColor: true
        }
      }
    }
  }

  const chartSeries = [{
    name: 'BTC/USD',
    data: [
      { x: new Date('2023-10-24T00:00:00'), y: [67000, 67500, 66800, 67200] },
      { x: new Date('2023-10-24T01:00:00'), y: [67200, 67800, 67100, 67600] },
      { x: new Date('2023-10-24T02:00:00'), y: [67600, 68200, 67400, 68000] },
      { x: new Date('2023-10-24T03:00:00'), y: [68000, 68500, 67800, 68300] },
      { x: new Date('2023-10-24T04:00:00'), y: [68300, 69100, 68200, 68900] },
      { x: new Date('2023-10-24T05:00:00'), y: [68900, 69000, 68400, 68700] },
      { x: new Date('2023-10-24T06:00:00'), y: [68700, 68800, 67900, 68100] },
      { x: new Date('2023-10-24T07:00:00'), y: [68100, 68600, 68000, 68450] },
    ]
  }]

  const calculateTotal = () => {
    if (!amount || isNaN(parseFloat(amount))) return "0.00"
    const currentPrice = 68450.55
    return (parseFloat(amount) * currentPrice).toFixed(2)
  }

  const calculateFee = () => {
    const total = parseFloat(calculateTotal())
    return (total * 0.001).toFixed(2) // 0.1% fee
  }

  return (
    <div className="min-h-screen text-white p-6 bg-gradient-to-b from-[#020817] via-[#020617] to-black/95">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-extrabold mb-1">Bitcoin / USD</h1>
          <p className="text-gray-400 text-sm">BTC/USD</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-emerald-500/10 border border-white/5 rounded shadow p-6 text-center">
              <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
              <p className="text-2xl text-emerald-400 font-bold">{stat.value}</p>
              {stat.change && (
                <p className={`text-sm mt-1 font-semibold ${stat.positive ? 'text-emerald-400' : 'text-muted-foreground'}`}>
                  {stat.change}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Main Trading Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Chart Section - Takes 9 columns */}
          <div className="lg:col-span-9">
            <div className="bg-emerald-500/10 border border-white/5 rounded shadow p-6">
              {/* Chart Controls */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  {["1H", "4H", "1D", "1W"].map(period => (
                    <button
                      key={period}
                      onClick={() => setActiveTimeframe(period)}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition ${activeTimeframe === period
                          ? 'bg-emerald-500 text-white shadow-lg'
                          : 'bg-emerald-500/20 text-gray-400 hover:bg-emerald-500/30 hover:text-white'
                        }`}
                    >
                      {period}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 bg-emerald-500/20 rounded-md hover:bg-emerald-500/30 transition">
                    <TrendingUp className="w-5 h-5 text-emerald-400" />
                  </button>
                  <button className="px-4 py-2 bg-emerald-500/20 rounded-md hover:bg-emerald-500/30 transition text-gray-400 text-sm font-medium">
                    + Indicators
                  </button>
                </div>
              </div>

              {/* Candlestick Chart */}
              <div className="w-full">
                <Chart
                  options={chartOptions}
                  series={chartSeries}
                  type="candlestick"
                  height={500}
                />
              </div>
            </div>
          </div>

          {/* Order Panel - Takes 3 columns */}
          <div className="lg:col-span-3">
            <div className="bg-emerald-500/10 border border-white/5 rounded shadow p-6 sticky top-6">
              {/* Buy/Sell Tabs */}
              <div className="flex mb-6 bg-emerald-500/20 rounded-lg p-1 gap-1">
                <button
                  onClick={() => setActiveOrderTab("Buy")}
                  className={`flex-1 py-2.5 rounded-md text-sm font-bold transition ${activeOrderTab === "Buy"
                      ? 'bg-emerald-500 text-white shadow-lg'
                      : 'text-gray-400 hover:text-white'
                    }`}
                >
                  Buy
                </button>
                <button
                  onClick={() => setActiveOrderTab("Sell")}
                  className={`flex-1 py-2.5 rounded-md text-sm font-bold transition ${activeOrderTab === "Sell"
                      ? 'bg-red-500 text-white shadow-lg'
                      : 'text-gray-400 hover:text-white'
                    }`}
                >
                  Sell
                </button>
              </div>

              {/* Order Type Selector */}
              <div className="mb-5">
                <label className="text-sm text-muted-foreground mb-2 block font-medium">Order Type</label>
                <select
                  value={orderType}
                  onChange={(e) => setOrderType(e.target.value)}
                  className="w-full bg-emerald-500/20 border border-emerald-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
                >
                  <option>Market</option>
                  <option>Limit</option>
                  <option>Stop-Limit</option>
                </select>
              </div>

              {/* Price Input */}
              <div className="mb-5">
                <label className="text-sm text-muted-foreground mb-2 block font-medium">Price</label>
                <div className="relative">
                  <input
                    type="text"
                    value={orderType === "Market" ? "Market" : price}
                    onChange={(e) => setPrice(e.target.value)}
                    disabled={orderType === "Market"}
                    className="w-full bg-emerald-500/20 border border-emerald-500/30 rounded-lg px-4 py-3 pr-16 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    placeholder="0.00"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">USD</span>
                </div>
              </div>

              {/* Amount Input */}
              <div className="mb-5">
                <label className="text-sm text-muted-foreground mb-2 block font-medium">Amount</label>
                <div className="relative">
                  <input
                    type="text"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-emerald-500/20 border border-emerald-500/30 rounded-lg px-4 py-3 pr-16 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
                    placeholder="0.00"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">BTC</span>
                </div>
              </div>

              {/* Percentage Quick Select */}
              <div className="grid grid-cols-4 gap-2 mb-6">
                {["25%", "50%", "75%", "100%"].map(pct => (
                  <button
                    key={pct}
                    onClick={() => setAmount((0.5 * parseFloat(pct) / 100).toFixed(4))}
                    className="py-2 bg-emerald-500/20 hover:bg-emerald-500/30 rounded-md text-xs font-medium text-muted-foreground hover:text-white transition"
                  >
                    {pct}
                  </button>
                ))}
              </div>

              {/* Summary */}
              <div className="space-y-3 mb-6 py-4 border-t border-white/5">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total</span>
                  <span className="text-white font-semibold">~ {calculateTotal()} USD</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Fee</span>
                  <span className="text-white font-semibold">~ {calculateFee()} USD</span>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                className={`w-full py-3.5 rounded-lg font-bold text-white shadow-lg transition-all hover:shadow-xl ${activeOrderTab === "Buy"
                    ? 'bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700'
                    : 'bg-red-500 hover:bg-red-600 active:bg-red-700'
                  }`}
              >
                {activeOrderTab === "Buy" ? "Buy BTC" : "Sell BTC"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
