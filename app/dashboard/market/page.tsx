'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronRight } from "lucide-react"
import { Tabs } from "@/components/ui/tabs"
import { SearchInput } from "@/components/ui/search-input"
import { MarketTable } from "@/components/dashboard/MarketTable"
import { Modal } from "@/components/ui/modal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Markets() {
    const router = useRouter()
    const [activeTab, setActiveTab] = useState("Stocks")
    const [selectedInterval, setSelectedInterval] = useState("Today")
    const [isTradeModalOpen, setIsTradeModalOpen] = useState(false)
    const [selectedAsset, setSelectedAsset] = useState<any>(null)
    const [isManageWatchlistOpen, setIsManageWatchlistOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isTabLoading, setIsTabLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(10)
    const [totalItems, setTotalItems] = useState(0)
    const [searchQuery, setSearchQuery] = useState("")
    const [isMarketStatsHidden, setIsMarketStatsHidden] = useState(false)

    // Static mock data
    const marketOverview = [
        {
            symbol: "AAPL",
            category: "Apple Inc.",
            price: "$175.43",
            change: "+2.34",
            changePercent: "+1.35%",
            action: "Trade",
            pair: "NASDAQ",
            value: "175.43",
            volume: 52000000,
            type: "stock"
        },
        {
            symbol: "GOOGL",
            category: "Alphabet Inc.",
            price: "$140.23",
            change: "-1.12",
            changePercent: "-0.79%",
            action: "Trade",
            pair: "NASDAQ",
            value: "140.23",
            volume: 28000000,
            type: "stock"
        },
        // Add more mock data as needed
    ]

    const majorIndices = []
    const topMovers = [
        {
            category: "Top Gainers",
            movers: [
                { symbol: "AAPL", name: "Apple Inc.", change: "+1.35%" },
                { symbol: "MSFT", name: "Microsoft", change: "+0.95%" },
                { symbol: "TSLA", name: "Tesla", change: "+0.75%" }
            ]
        },
        {
            category: "Top Losers",
            movers: [
                { symbol: "GOOGL", name: "Alphabet", change: "-0.79%" },
                { symbol: "AMZN", name: "Amazon", change: "-0.45%" },
                { symbol: "META", name: "Meta", change: "-0.32%" }
            ]
        }
    ]

    const marketStats = {
        investors: "100+ symbols",
        volatility: "2.5 pts",
        cryptoValue: "1.2 tn",
        timeframe: "Static Data",
        note: "Mock data",
        timeRemaining: "Demo Mode",
        taxAdvantage: "No live data"
    }

    const watchlists = [
        { 
            name: "Stocks", 
            subtitle: "Stock symbols", 
            count: "50 symbols",
            isActive: activeTab === 'Stocks',
            type: 'Stocks',
            isLoading: false
        },
        { 
            name: "Forex", 
            subtitle: "Forex pairs", 
            count: "25 pairs",
            isActive: activeTab === 'Forex',
            type: 'Forex',
            isLoading: false
        },
        { 
            name: "Crypto", 
            subtitle: "Crypto symbols", 
            count: "30 symbols",
            isActive: activeTab === 'Crypto',
            type: 'Crypto',
            isLoading: false
        }
    ]

    const handleTrade = (item: any) => {
        localStorage.setItem('selectedSymbol', item.symbol)
        localStorage.setItem('selectedAssetType', item.type || 'stock')
        router.push('/dashboard/trading')
    }

    const handleSearch = (query: string) => {
        setSearchQuery(query)
    }

    const handleTabChange = (tab: string) => {
        if (tab === activeTab) return
        setIsTabLoading(true)
        setActiveTab(tab)
        setCurrentPage(1)
        setSearchQuery("")
        setTimeout(() => {
            setIsTabLoading(false)
        }, 300)
    }

    const totalPages = Math.ceil(totalItems / itemsPerPage)
    const startItem = (currentPage - 1) * itemsPerPage + 1
    const endItem = Math.min(currentPage * itemsPerPage, totalItems)

    const handlePageChange = (page: number) => {
        if (page === currentPage) return
        setCurrentPage(page)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950 text-white p-6">
            <div className="max-w-[1400px] mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold mb-1 text-white">Markets</h1>
                    <p className="text-sm text-slate-400">Markets across Forex, Bitcoin, and Crypto (Demo Mode - No Live Data)</p>
                </div>

                {/* Main Grid Layout */}
                <div className="grid grid-cols-12 gap-6">
                    {/* Left Section - Market Overview & Top Movers */}
                    <div className="col-span-8">
                        {/* Market Overview */}
                        <div className="mb-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-bold text-white">Market overview</h2>
                                <p className="text-sm text-slate-400">Static demo data</p>
                            </div>

                            {/* Tabs */}
                            <div className="mb-4">
                                <Tabs
                                    tabs={["Stocks", "Crypto", "Forex"]}
                                    activeTab={activeTab}
                                    onTabChange={handleTabChange}
                                    isLoading={isTabLoading}
                                />
                            </div>

                            {/* Search Bar */}
                            <div className="mb-4">
                                <SearchInput 
                                    placeholder="Search symbols, pairs, or token" 
                                    value={searchQuery}
                                    onChange={(e) => handleSearch(e.target.value)}
                                />
                            </div>

                            {/* Market Overview Table */}
                            <div className="relative">
                                <MarketTable
                                    data={marketOverview}
                                    onTrade={handleTrade}
                                    isLoading={isLoading}
                                />
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="mt-4 flex items-center justify-between text-sm">
                                    <span className="text-slate-400">
                                        Showing {startItem}-{endItem} of {totalItems}
                                    </span>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            disabled={currentPage === 1}
                                            className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Previous
                                        </button>
                                        <span className="px-3 py-1">
                                            Page {currentPage} of {totalPages}
                                        </span>
                                        <button
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            disabled={currentPage === totalPages}
                                            className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Top Movers */}
                        <div>
                            <h2 className="text-lg font-bold mb-4 text-white">Top movers</h2>
                            <div className="grid grid-cols-2 gap-4">
                                {topMovers.map((section, idx) => (
                                    <div key={idx} className="bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-lg p-4">
                                        <h3 className="text-sm font-semibold mb-3 text-emerald-400">{section.category}</h3>
                                        <div className="space-y-2">
                                            {section.movers.map((mover, moverIdx) => (
                                                <div key={moverIdx} className="flex justify-between items-center">
                                                    <div>
                                                        <div className="font-medium text-white">{mover.symbol}</div>
                                                        <div className="text-xs text-slate-400">{mover.name}</div>
                                                    </div>
                                                    <div className={`font-semibold ${mover.change.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>
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

                    {/* Right Section - Market Stats & Watchlists */}
                    <div className="col-span-4 space-y-6">
                        {/* Market Stats */}
                        {!isMarketStatsHidden && (
                            <div className="bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-lg p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-lg font-bold text-white">Market stats</h2>
                                    <button
                                        onClick={() => setIsMarketStatsHidden(true)}
                                        className="text-slate-400 hover:text-white"
                                    >
                                        ✕
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <div className="text-sm text-slate-400 mb-1">{activeTab} symbols</div>
                                        <div className="text-2xl font-bold text-white">{marketStats.investors}</div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-slate-400 mb-1">Average volatility</div>
                                        <div className="text-2xl font-bold text-white">{marketStats.volatility}</div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-slate-400 mb-1">Market Cap</div>
                                        <div className="text-2xl font-bold text-white">{marketStats.cryptoValue}</div>
                                    </div>
                                    <div className="pt-4 border-t border-white/10">
                                        <div className="text-xs text-slate-500">{marketStats.taxAdvantage}</div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Watchlists */}
                        <div className="bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-lg p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-bold text-white">Watchlists</h2>
                                <button
                                    onClick={() => setIsManageWatchlistOpen(true)}
                                    className="text-sm text-emerald-400 hover:text-emerald-300"
                                >
                                    Manage
                                </button>
                            </div>
                            <div className="space-y-3">
                                {watchlists.map((list, idx) => (
                                    <div
                                        key={idx}
                                        onClick={() => handleTabChange(list.type)}
                                        className={`p-3 rounded-lg cursor-pointer transition-colors ${
                                            list.isActive
                                                ? 'bg-emerald-500/20 border border-emerald-500/50'
                                                : 'bg-slate-800/50 hover:bg-slate-800 border border-transparent'
                                        }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <div className="font-medium text-white">{list.name}</div>
                                                <div className="text-xs text-slate-400">{list.subtitle}</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-semibold text-white">{list.count}</div>
                                                {list.isActive && <ChevronRight className="w-4 h-4 text-emerald-400 ml-auto" />}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
