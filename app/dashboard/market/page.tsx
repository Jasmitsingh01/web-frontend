'use client'

import { useState } from "react"
import { ChevronRight } from "lucide-react"
import { Tabs } from "@/components/ui/tabs"
import { SearchInput } from "@/components/ui/search-input"
import { MarketTable } from "@/components/dashboard/MarketTable"
import { Modal } from "@/components/ui/modal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Markets() {
    const [activeTab, setActiveTab] = useState("All")
    const [selectedInterval, setSelectedInterval] = useState("Today")
    const [isTradeModalOpen, setIsTradeModalOpen] = useState(false)
    const [selectedAsset, setSelectedAsset] = useState<any>(null)

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

    const handleTrade = (item: any) => {
        setSelectedAsset(item)
        setIsTradeModalOpen(true)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950 text-white p-6">
            <div className="max-w-[1400px] mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold mb-1 text-white">Markets</h1>
                    <p className="text-sm text-slate-400">Live markets across Forex, Bitcoin, and Crypto</p>
                </div>

                {/* Main Grid Layout */}
                <div className="grid grid-cols-12 gap-6">
                    {/* Left Section - Market Overview & Top Movers */}
                    <div className="col-span-8">
                        {/* Market Overview */}
                        <div className="mb-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-bold text-white">Market overview</h2>
                                <p className="text-sm text-slate-400">Trade on every stock and region</p>
                            </div>

                            {/* Tabs */}
                            <div className="mb-4">
                                <Tabs
                                    tabs={["All", "Forex", "Stocks", "Crypto", "Futures"]}
                                    activeTab={activeTab}
                                    onTabChange={setActiveTab}
                                />
                            </div>

                            {/* Search Bar */}
                            <div className="mb-4">
                                <SearchInput placeholder="Search symbols, pairs, or token" />
                            </div>

                            {/* Interval Filters */}
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-xs text-slate-400">Interval:</span>
                                <div className="flex flex-wrap gap-1">
                                    {["Today", "1W", "1M", "3M", "6M", "1Y", "All", "Max"].map((interval) => (
                                        <button
                                            key={interval}
                                            onClick={() => setSelectedInterval(interval)}
                                            className={`px-3 py-1 rounded text-xs font-medium transition ${selectedInterval === interval
                                                ? 'bg-emerald-500 text-white hover:bg-emerald-500/90'
                                                : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                                                }`}
                                        >
                                            {interval}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Market Overview Table */}
                            <MarketTable items={marketOverview} onAction={handleTrade} />

                            <p className="text-xs text-slate-500 mt-3">
                                This information may be delayed 15-20 minutes on various services.
                            </p>
                        </div>

                        {/* Top Movers by Asset */}
                        <div>
                            <h2 className="text-lg font-bold mb-4 text-white">Top movers by asset</h2>
                            <p className="text-xs text-slate-400 mb-4">Biggest gainers and falling fast</p>

                            <div className="grid grid-cols-2 gap-6">
                                {topMovers.map((section, idx) => (
                                    <div key={idx}>
                                        <h3 className="text-sm font-bold mb-3 text-slate-300">{section.category}</h3>
                                        <div className="space-y-2">
                                            {section.movers.map((mover, moverIdx) => (
                                                <div key={moverIdx} className="flex items-center justify-between p-3 border border-white/10 rounded-lg bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm hover:bg-white/5">
                                                    <div>
                                                        <div className="font-semibold text-sm text-white">{mover.symbol}</div>
                                                        <div className="text-xs text-slate-400">{mover.name}</div>
                                                    </div>
                                                    <div className="text-xs font-medium text-slate-300 bg-white/10 px-2 py-1 rounded">
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
                                <h2 className="text-lg font-bold text-white">Major indices</h2>
                                <button className="px-3 py-1 bg-white/5 text-slate-400 rounded text-xs font-medium hover:bg-white/10 hover:text-white">
                                    Hide
                                </button>
                            </div>
                            <p className="text-xs text-slate-400 mb-4">S&P 500 top components</p>

                            <div className="space-y-3">
                                {majorIndices.map((index, idx) => (
                                    <div key={idx} className="p-4 border border-white/10 rounded-lg bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm">
                                        <div className="text-xs text-slate-400 mb-1">{index.name}</div>
                                        <div className="text-2xl font-bold text-white">{index.value}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Market Stats */}
                        <div className="mb-6 p-4 border border-white/10 rounded-lg bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm">
                            <h2 className="text-lg font-bold mb-4 text-white">Market stats</h2>

                            <div className="space-y-4">
                                <div>
                                    <div className="text-xs text-slate-400 mb-1">Investors and volatility</div>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-xl font-bold text-white">{marketStats.investors}</span>
                                        <span className="text-sm text-slate-400">mn</span>
                                    </div>
                                </div>

                                <div>
                                    <div className="text-xs text-slate-400 mb-1">Near 52w figure</div>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-xl font-bold text-white">{marketStats.volatility}</span>
                                        <span className="text-sm text-slate-400">pts</span>
                                    </div>
                                </div>

                                <div>
                                    <div className="text-xs text-slate-400 mb-1">Near 52w figure</div>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-xl font-bold text-white">{marketStats.cryptoValue}</span>
                                        <span className="text-sm text-slate-400">mn</span>
                                    </div>
                                    <div className="text-xs text-slate-500 mt-1">{marketStats.timeframe}</div>
                                </div>

                                <div>
                                    <div className="text-xs text-slate-400 mb-1">Near 24hr figure</div>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-xl font-bold text-white">{marketStats.timeRemaining}</span>
                                        <span className="text-sm text-slate-400">min</span>
                                    </div>
                                    <div className="text-xs text-slate-500 mt-1">Time remaining</div>
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-white/10">
                                <p className="text-xs text-slate-500">{marketStats.taxAdvantage}</p>
                            </div>
                        </div>

                        {/* Watchlists */}
                        <div className="p-4 border border-white/10 rounded-lg bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-bold text-white">Watchlists</h2>
                                <Button size="sm" className="bg-emerald-500 text-white hover:bg-emerald-500/90 h-7 text-xs">
                                    Manage
                                </Button>
                            </div>

                            <div className="space-y-3">
                                {watchlists.map((list, idx) => (
                                    <div key={idx} className="p-3 border border-white/10 rounded-lg hover:bg-white/5 cursor-pointer">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <div className="font-semibold text-sm mb-1 text-white">{list.name}</div>
                                                <div className="text-xs text-slate-400">{list.subtitle}</div>
                                            </div>
                                            <ChevronRight className="w-4 h-4 text-slate-400" />
                                        </div>
                                        <div className="text-xs text-slate-400 mt-2">{list.count}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-4">
                                <button className="text-xs text-emerald-400 hover:underline">
                                    Have watchlist or digital from portfolio
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Trade Modal */}
            <Modal
                isOpen={isTradeModalOpen}
                onClose={() => setIsTradeModalOpen(false)}
                title={`Trade ${selectedAsset?.symbol || ''}`}
            >
                <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm text-slate-400">
                        <span>Current Price</span>
                        <span className="text-white font-bold">{selectedAsset?.price}</span>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-slate-300">Amount</label>
                        <Input placeholder="Enter amount..." className="bg-slate-900 border-white/10 text-white" />
                    </div>
                    <div className="flex gap-2 mt-4">
                        <Button className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white" onClick={() => {
                            alert(`Buy order placed for ${selectedAsset?.symbol}`);
                            setIsTradeModalOpen(false);
                        }}>Buy</Button>
                        <Button className="flex-1 bg-red-500 hover:bg-red-600 text-white" onClick={() => {
                            alert(`Sell order placed for ${selectedAsset?.symbol}`);
                            setIsTradeModalOpen(false);
                        }}>Sell</Button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
