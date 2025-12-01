'use client'

import { useState, useEffect } from "react"
import { ChevronRight } from "lucide-react"
import { Tabs } from "@/components/ui/tabs"
import { SearchInput } from "@/components/ui/search-input"
import { MarketTable } from "@/components/dashboard/MarketTable"
import { Modal } from "@/components/ui/modal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { api } from "@/lib/api"

export default function Markets() {
    const [activeTab, setActiveTab] = useState("All")
    const [selectedInterval, setSelectedInterval] = useState("Today")
    const [isTradeModalOpen, setIsTradeModalOpen] = useState(false)
    const [selectedAsset, setSelectedAsset] = useState<any>(null)
    const [token, setToken] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    // Dynamic Data States
    const [marketOverview, setMarketOverview] = useState<any[]>([])
    const [majorIndices, setMajorIndices] = useState<any[]>([])
    const [topMovers, setTopMovers] = useState<any[]>([])

    // Symbol Lists
    const [stockSymbols, setStockSymbols] = useState<any[]>([])
    const [forexSymbols, setForexSymbols] = useState<any[]>([])
    const [cryptoSymbols, setCryptoSymbols] = useState<any[]>([])
    const [areSymbolsLoaded, setAreSymbolsLoaded] = useState(false)

    // Get token from localStorage
    useEffect(() => {
        const storedToken = localStorage.getItem('token')
        setToken(storedToken)
    }, [])

    // Fetch Symbol Lists (Once)
    useEffect(() => {
        const fetchSymbols = async () => {
            if (!token || areSymbolsLoaded) return

            try {
                const [stocks, forex, crypto] = await Promise.all([
                    api.market.getStockSymbols(token),
                    api.market.getForexSymbols(token),
                    api.market.getCryptoSymbols(token)
                ])

                setStockSymbols(stocks || [])
                setForexSymbols(forex || [])
                setCryptoSymbols(crypto || [])
                setAreSymbolsLoaded(true)
            } catch (err) {
                console.error("Error fetching symbol lists:", err)
            }
        }

        fetchSymbols()
    }, [token, areSymbolsLoaded])

    // Fetch Market Data
    useEffect(() => {
        const fetchMarketData = async () => {
            if (!token || !areSymbolsLoaded) return
            setIsLoading(true)

            try {
                // 1. Fetch Major Indices (using specific symbols)
                const indicesSymbols = ['SPY', 'QQQ', 'DIA'] // ETFs as proxies for S&P 500, Nasdaq, Dow
                const indicesPromises = indicesSymbols.map(sym => api.market.getQuote(token, sym, 'stock'))
                const indicesResponses = await Promise.all(indicesPromises)

                const indicesData = indicesResponses.map((res: any, idx) => {
                    const data = res.data || res
                    const names = ["S&P 500 (ETF)", "Nasdaq 100 (ETF)", "Dow Jones (ETF)"]
                    return {
                        name: names[idx],
                        value: data.price?.toFixed(2) || "0.00",
                        change: (data.changePercent?.toFixed(2) || "0.00") + "%"
                    }
                })
                setMajorIndices(indicesData)

                // 2. Fetch Market Overview based on Active Tab
                let symbolsToFetch: { symbol: string, type: string, category: string }[] = []

                if (activeTab === 'All' || activeTab === 'Stocks') {
                    // Take top 10 stocks
                    const stocks = stockSymbols.slice(0, 10).map(s => ({
                        symbol: s.symbol,
                        type: 'stock',
                        category: 'Stocks'
                    }))
                    symbolsToFetch = [...symbolsToFetch, ...stocks]
                }

                if (activeTab === 'All' || activeTab === 'Crypto') {
                    // Take top 10 crypto
                    const crypto = cryptoSymbols.slice(0, 10).map(s => ({
                        symbol: s.symbol, // Backend handles BINANCE: prefix if needed, or we pass raw
                        type: 'crypto',
                        category: 'Crypto'
                    }))
                    symbolsToFetch = [...symbolsToFetch, ...crypto]
                }

                if (activeTab === 'All' || activeTab === 'Forex') {
                    // Take top 10 forex
                    const forex = forexSymbols.slice(0, 10).map(s => ({
                        symbol: s.symbol,
                        type: 'forex',
                        category: 'Forex'
                    }))
                    symbolsToFetch = [...symbolsToFetch, ...forex]
                }

                // If no symbols loaded yet, don't fetch quotes
                if (symbolsToFetch.length === 0) {
                    setIsLoading(false)
                    return
                }

                const overviewPromises = symbolsToFetch.map(item => api.market.getQuote(token, item.symbol, item.type))
                const overviewResponses = await Promise.all(overviewPromises)

                const overviewData = overviewResponses.map((res: any, idx) => {
                    const data = res.data || res
                    const item = symbolsToFetch[idx]

                    let displaySymbol = item.symbol
                    if (item.category === 'Crypto') {
                        // Clean up BINANCE: prefix if present in the source symbol
                        displaySymbol = item.symbol.replace('BINANCE:', '').replace('USDT', '/USD')
                        if (!displaySymbol.includes('/')) displaySymbol += '/USD'
                    }

                    return {
                        symbol: displaySymbol,
                        category: item.category,
                        price: data.price?.toFixed(2) || "0.00",
                        change: (data.change >= 0 ? "+" : "") + (data.change?.toFixed(2) || "0.00"),
                        changePercent: (data.changePercent?.toFixed(2) || "0.00") + "%",
                        action: "Trade",
                        pair: item.category === 'Stocks' ? "US" : "Global",
                        value: data.price?.toFixed(2)
                    }
                })
                setMarketOverview(overviewData)

                // 3. Top Movers
                const sortedByChange = [...overviewData].sort((a, b) => parseFloat(b.changePercent) - parseFloat(a.changePercent))
                setTopMovers([
                    {
                        category: "Top Gainers",
                        movers: sortedByChange.slice(0, 3).map(m => ({
                            symbol: m.symbol,
                            name: m.category,
                            change: m.changePercent
                        }))
                    },
                    {
                        category: "Top Losers",
                        movers: sortedByChange.slice(-3).reverse().map(m => ({
                            symbol: m.symbol,
                            name: m.category,
                            change: m.changePercent
                        }))
                    }
                ])

            } catch (err) {
                console.error("Error fetching market data:", err)
            } finally {
                setIsLoading(false)
            }
        }

        fetchMarketData()

        const interval = setInterval(fetchMarketData, 30000)
        return () => clearInterval(interval)

    }, [token, activeTab, areSymbolsLoaded, stockSymbols, forexSymbols, cryptoSymbols])

    // Market Stats
    const marketStats = {
        investors: "315 mn",
        volatility: "31 pts",
        cryptoValue: "2.5 tn",
        timeframe: "Global Cap",
        note: "Now 24hr figure",
        timeRemaining: "Live",
        taxAdvantage: "Tax-advantage account | 8 stocks and ETF available"
    }

    // Watchlists
    const watchlists = [
        { name: "Day trading", subtitle: "Top tech & crypto bets", count: "15 symbols" },
        { name: "FX majors", subtitle: "Top markets & pairs", count: "6 pairs" },
        { name: "Crypto core", subtitle: "Top markets only", count: "15 majors" }
    ]

    const handleTrade = (item: any) => {
        setSelectedAsset(item)
        setIsTradeModalOpen(true)
    }

    if (isLoading && !marketOverview.length) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950 text-white flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
                    <p className="text-slate-400">Loading market data...</p>
                </div>
            </div>
        )
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
                                    tabs={["All", "Stocks", "Crypto"]}
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
                            <h2 className="text-lg font-bold mb-4 text-white">Top movers</h2>
                            <p className="text-xs text-slate-400 mb-4">Biggest gainers and falling fast</p>

                            <div className="grid grid-cols-2 gap-6">
                                {topMovers.map((section, idx) => (
                                    <div key={idx}>
                                        <h3 className="text-sm font-bold mb-3 text-slate-300">{section.category}</h3>
                                        <div className="space-y-2">
                                            {section.movers.map((mover: any, moverIdx: number) => (
                                                <div key={moverIdx} className="flex items-center justify-between p-3 border border-white/10 rounded-lg bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm hover:bg-white/5">
                                                    <div>
                                                        <div className="font-semibold text-sm text-white">{mover.symbol}</div>
                                                        <div className="text-xs text-slate-400">{mover.name}</div>
                                                    </div>
                                                    <div className={`text-xs font-medium px-2 py-1 rounded ${mover.change.includes('-') ? 'text-red-400 bg-red-500/10' : 'text-emerald-400 bg-emerald-500/10'}`}>
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
                            <p className="text-xs text-slate-400 mb-4">Market Proxies (ETFs)</p>

                            <div className="space-y-3">
                                {majorIndices.map((index, idx) => (
                                    <div key={idx} className="p-4 border border-white/10 rounded-lg bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm">
                                        <div className="flex justify-between items-center">
                                            <div className="text-xs text-slate-400 mb-1">{index.name}</div>
                                            <div className={`text-xs font-medium ${index.change.includes('-') ? 'text-red-400' : 'text-emerald-400'}`}>
                                                {index.change}
                                            </div>
                                        </div>
                                        <div className="text-2xl font-bold text-white">${index.value}</div>
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
                                    <div className="text-xs text-slate-400 mb-1">Global Crypto Cap</div>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-xl font-bold text-white">{marketStats.cryptoValue}</span>
                                        <span className="text-sm text-slate-400"></span>
                                    </div>
                                    <div className="text-xs text-slate-500 mt-1">{marketStats.timeframe}</div>
                                </div>

                                <div>
                                    <div className="text-xs text-slate-400 mb-1">Market Status</div>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-xl font-bold text-white">{marketStats.timeRemaining}</span>
                                    </div>
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
                        <span className="text-white font-bold">${selectedAsset?.price}</span>
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
