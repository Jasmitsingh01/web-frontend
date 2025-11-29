'use client'

import { useState } from "react"
import { Search, ChevronRight } from "lucide-react"

export default function Markets() {
    const [activeTab, setActiveTab] = useState("All")
    const [selectedInterval, setSelectedInterval] = useState("Today")

    // Market overview data
    const marketOverview = [
        { symbol: "EUR/USD", category: "Forex", price: "1.0832", change: "+82.4k", changePercent: "London/NY", action: "Trade", pair: "EUR/USD", value: "1.0832" },
        { symbol: "AAPL", category: "Stocks", price: "215.42", change: "+1.76%", changePercent: "US", action: "Trade", pair: "Market cap and dividend yield offer different perspectives...", value: "" },
        { symbol: "BTC/USD", category: "Crypto", price: "$4,423.10", change: "+8.1k", changePercent: "24/7", action: "Trade", pair: "", value: "" },
        { symbol: "ETH/USD", category: "Crypto", price: "$2,435.18", change: "+142.1k", changePercent: "24/7", action: "Trade", pair: "", value: "" },
        { symbol: "TSLA", category: "Stocks", price: "192.04", change: "+31.7%", changePercent: "US", action: "Trade", pair: "", value: "" },
        { symbol: "USD/JPY", category: "Forex", price: "154.23", change: "+65.0k", changePercent: "Tokyo/NY", action: "Trade", pair: "", value: "" }
    ]

    // Major indices
    const majorIndices = [
        { name: "S&P 500", value: "5,235.74" },
        { name: "Nasdaq 100", value: "18,281.23" },
        { name: "Dow Jones", value: "39,140.23" }
    ]

    // Market Stats
    const marketStats = {
        investors: "315 mn",
        volatility: "31 pts",
        cryptoValue: "25 mn",
        timeframe: "Crypto volatility",
        note: "Now 24hr figure",
        timeRemaining: "13.2 min",
        taxAdvantage: "Tax-advantage account | 8 stocks and ETF available"
    }

    // Watchlists
    const watchlists = [
        { name: "Day trading", subtitle: "Top tech & crypto bets", count: "15 symbols" },
        { name: "FX majors", subtitle: "Top markets & pairs", count: "6 pairs" },
        { name: "Crypto core", subtitle: "Top markets only", count: "15 majors" }
    ]

    // Top movers by asset
    const topMovers = [
        {
            category: "Forex", movers: [
                { symbol: "GBP/USD", name: "Sterling Dollar", change: "GBP" },
                { symbol: "AUD/JPY", name: "Australian Yen", change: "AUD" },
                { symbol: "EUR/CHF", name: "Euro / Swiss Franc", change: "CHF/F" }
            ]
        },
        {
            category: "Stocks", movers: [
                { symbol: "NVDA", name: "Nvidia", change: "SPX" },
                { symbol: "AMD", name: "Advanced...", change: "NAS" },
                { symbol: "META", name: "Meta Platforms", change: "CAA" }
            ]
        }
    ]

    return (
        <div className="min-h-screen bg-white text-gray-900 p-6">
            <div className="max-w-[1400px] mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold mb-1">Markets</h1>
                    <p className="text-sm text-gray-500">Live markets across Forex, Bitcoin, and Crypto</p>
                </div>

                {/* Main Grid Layout */}
                <div className="grid grid-cols-12 gap-6">
                    {/* Left Section - Market Overview & Top Movers */}
                    <div className="col-span-8">
                        {/* Market Overview */}
                        <div className="mb-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-bold">Market overview</h2>
                                <p className="text-sm text-gray-500">Trade on every stock and region</p>
                            </div>

                            {/* Tabs */}
                            <div className="flex items-center gap-2 mb-4">
                                {["All", "Forex", "Stocks", "Crypto", "Futures"].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`px-4 py-1.5 rounded-full text-xs font-medium transition ${activeTab === tab
                                            ? 'bg-gray-900 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>

                            {/* Search Bar */}
                            <div className="relative mb-4">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search symbols, pairs, or token"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-10 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-300"
                                />
                            </div>

                            {/* Interval Filters */}
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-xs text-gray-600">Interval:</span>
                                {["Today", "1W", "1M", "3M", "6M", "1Y", "All", "Max"].map((interval) => (
                                    <button
                                        key={interval}
                                        onClick={() => setSelectedInterval(interval)}
                                        className={`px-3 py-1 rounded text-xs font-medium transition ${selectedInterval === interval
                                            ? 'bg-gray-900 text-white'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                            }`}
                                    >
                                        {interval}
                                    </button>
                                ))}
                            </div>

                            {/* Market Overview Table */}
                            <div className="border border-gray-200 rounded-lg overflow-hidden">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="bg-gray-50 border-b border-gray-200">
                                            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600">Symbol</th>
                                            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600">Last</th>
                                            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600">Chg</th>
                                            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600">Chg %</th>
                                            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600">Volume</th>
                                            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600">Interest</th>
                                            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {marketOverview.map((item, idx) => (
                                            <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                                                <td className="px-4 py-3">
                                                    <div className="font-semibold">{item.symbol}</div>
                                                    <div className="text-xs text-gray-500">{item.category}</div>
                                                </td>
                                                <td className="px-4 py-3 font-medium">{item.price}</td>
                                                <td className="px-4 py-3 text-emerald-600 font-medium">{item.change}</td>
                                                <td className="px-4 py-3 text-gray-600">{item.changePercent}</td>
                                                <td className="px-4 py-3 text-gray-600">-</td>
                                                <td className="px-4 py-3 text-gray-600">-</td>
                                                <td className="px-4 py-3">
                                                    <button className="px-3 py-1 bg-gray-900 text-white rounded text-xs font-medium hover:bg-gray-800">
                                                        {item.action}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <p className="text-xs text-gray-400 mt-3">
                                This information may be delayed 15-20 minutes on various services.
                            </p>
                        </div>

                        {/* Top Movers by Asset */}
                        <div>
                            <h2 className="text-lg font-bold mb-4">Top movers by asset</h2>
                            <p className="text-xs text-gray-500 mb-4">Biggest gainers and falling fast</p>

                            <div className="grid grid-cols-2 gap-6">
                                {topMovers.map((section, idx) => (
                                    <div key={idx}>
                                        <h3 className="text-sm font-bold mb-3 text-gray-700">{section.category}</h3>
                                        <div className="space-y-2">
                                            {section.movers.map((mover, moverIdx) => (
                                                <div key={moverIdx} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                                                    <div>
                                                        <div className="font-semibold text-sm">{mover.symbol}</div>
                                                        <div className="text-xs text-gray-500">{mover.name}</div>
                                                    </div>
                                                    <div className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded">
                                                        {mover.change}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="col-span-4">
                        {/* Major Indices */}
                        <div className="mb-6">
                            <div className="flex items-center justify-between mb-3">
                                <h2 className="text-lg font-bold">Major indices</h2>
                                <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium hover:bg-gray-200">
                                    Hide
                                </button>
                            </div>
                            <p className="text-xs text-gray-500 mb-4">S&P 500 top components</p>

                            <div className="space-y-3">
                                {majorIndices.map((index, idx) => (
                                    <div key={idx} className="p-4 border border-gray-200 rounded-lg">
                                        <div className="text-xs text-gray-600 mb-1">{index.name}</div>
                                        <div className="text-2xl font-bold">{index.value}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Market Stats */}
                        <div className="mb-6 p-4 border border-gray-200 rounded-lg">
                            <h2 className="text-lg font-bold mb-4">Market stats</h2>

                            <div className="space-y-4">
                                <div>
                                    <div className="text-xs text-gray-600 mb-1">Investors and volatility</div>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-xl font-bold">{marketStats.investors}</span>
                                        <span className="text-sm text-gray-600">mn</span>
                                    </div>
                                </div>

                                <div>
                                    <div className="text-xs text-gray-600 mb-1">Near 52w figure</div>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-xl font-bold">{marketStats.volatility}</span>
                                        <span className="text-sm text-gray-600">pts</span>
                                    </div>
                                </div>

                                <div>
                                    <div className="text-xs text-gray-600 mb-1">Near 52w figure</div>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-xl font-bold">{marketStats.cryptoValue}</span>
                                        <span className="text-sm text-gray-600">mn</span>
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1">{marketStats.timeframe}</div>
                                </div>

                                <div>
                                    <div className="text-xs text-gray-600 mb-1">Near 24hr figure</div>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-xl font-bold">{marketStats.timeRemaining}</span>
                                        <span className="text-sm text-gray-600">min</span>
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1">Time remaining</div>
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-200">
                                <p className="text-xs text-gray-500">{marketStats.taxAdvantage}</p>
                            </div>
                        </div>

                        {/* Watchlists */}
                        <div className="p-4 border border-gray-200 rounded-lg">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-bold">Watchlists</h2>
                                <button className="px-3 py-1 bg-gray-900 text-white rounded text-xs font-medium hover:bg-gray-800">
                                    Manage
                                </button>
                            </div>

                            <div className="space-y-3">
                                {watchlists.map((list, idx) => (
                                    <div key={idx} className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <div className="font-semibold text-sm mb-1">{list.name}</div>
                                                <div className="text-xs text-gray-500">{list.subtitle}</div>
                                            </div>
                                            <ChevronRight className="w-4 h-4 text-gray-400" />
                                        </div>
                                        <div className="text-xs text-gray-600 mt-2">{list.count}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-4">
                                <button className="text-xs text-blue-600 hover:underline">
                                    Have watchlist or digital from portfolio
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
