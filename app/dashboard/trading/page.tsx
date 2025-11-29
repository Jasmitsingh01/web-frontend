'use client'

import { WatchlistSidebar } from "@/components/dashboard/WatchlistSidebar"
import { TradingHeader } from "@/components/dashboard/TradingHeader"
import { TradingChart } from "@/components/dashboard/TradingChart"
import { OrderTicket } from "@/components/dashboard/OrderTicket"

export default function Trading() {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950 text-white flex">
      {/* Left Sidebar - Markets Watchlist */}
      <WatchlistSidebar watchlist={watchlist} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950">
        {/* Top Header */}
        <TradingHeader />

        {/* Chart and Right Panel Container */}
        <div className="flex-1 flex">
          {/* Chart Section */}
          <div className="flex-1 flex flex-col">
            <TradingChart />

            {/* Content below chart */}
            <div className="px-6 pb-6">
              {/* Key Statistics */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                {keyStats.map((stat, idx) => (
                  <div key={idx} className="bg-transparent border border-gray-800 rounded-lg p-4">
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
                <div className="bg-transparent border border-gray-800 rounded-lg overflow-hidden">
                  <table className="w-full text-xs">
                    <thead className="bg-slate-950/50">
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
                        <tr key={idx} className="border-t border-gray-800 hover:bg-slate-950/30">
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
                <div className="bg-transparent border border-gray-800 rounded-lg overflow-hidden">
                  <table className="w-full text-xs">
                    <thead className="bg-slate-950/50">
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
                        <tr key={idx} className="border-t border-gray-800 hover:bg-slate-950/30">
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
          </div>

          {/* Right Order Panel */}
          <OrderTicket />
        </div>
      </div>
    </div>
  )
}
