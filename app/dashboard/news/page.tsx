'use client'

import { useState } from "react"
import { NewsCard } from "@/components/dashboard/NewsCard"
import { TrendingStocks } from "@/components/dashboard/TrendingStocks"
import { EconomicCalendar } from "@/components/dashboard/EconomicCalendar"
import { Modal } from "@/components/ui/modal"
import { Button } from "@/components/ui/button"

export default function MarketNews() {
    const [selectedCategories, setSelectedCategories] = useState<string[]>(["All Assets"])
    const [isPersonalizeModalOpen, setIsPersonalizeModalOpen] = useState(false)

    // News articles data
    const newsArticles = [
        {
            slug: 'tech-stocks-rally-ai-optimism',
            category: "CRYPTO",
            source: "CoinDesk",
            time: "3h ago",
            title: "Tech stocks extend rally as AI optimism lifts broader US markets",
            description: "Major US indexes have logged their strongest gains this year after bank-lending data. Chipmakers and cloud-based companies in broad-based rally to sustain price momentum.",
            tags: ["Analysis", "Tech", "USA"],
            reactions: { smiling: 4, cool: 3 }
        },
        {
            slug: 'dollar-dips-softer-cpi',
            category: "FOREX",
            source: "Forex.com",
            time: "6h ago",
            title: "Dollar dips after softer-GE CPI; euro and yen edge higher",
            description: "Federal Reserve officials continues at ongoing debate surrounding discounting risk sentiment and weighing on macro releases.",
            tags: ["Analysis", "EUR", "USD"]
        },
        {
            slug: 'bitcoin-holds-60k-etf-inflows',
            category: "STOCKS",
            source: "Bloomberg",
            time: "12h ago",
            title: "Bitcoin holds above $60k as ETF inflows offset profit-taking",
            description: "Sustainable rally; persistent investor that takes initiative to remain bullish even on the back of Bitcoin spot ETF proving to be short-lived, thus we expect...",
            tags: ["Bitcoin", "Crypto"]
        },
        {
            slug: 'asian-markets-mixed-inflation',
            category: "CRYPTO",
            source: "Market Watch",
            time: "18h ago",
            title: "Asian stock markets see mixed open as core data dampens trading inflation",
            description: "Investor Fears: persistent investor that have caused declines in nasdaq before consecutive trading Asian weekly sentiment and volatility",
            tags: ["Markets", "Asia"]
        },
        {
            slug: 'mergers-competition-heats-up',
            category: "MARKETS",
            source: "Yahoo Finance",
            time: "1d ago",
            title: "Three-naming scheduler: mergers to focus as competition heats up",
            description: "Three-naming scheduler: merger in news to focus as competition heats up",
            tags: ["Mergers", "Tech"]
        },
        {
            slug: 'eu-mica-digital-assets',
            category: "TRADING",
            source: "Investing.com",
            time: "1d ago",
            title: "EU moves towards finalizing MICA stance for digital assets",
            description: "EU moves towards finalizing MICA stance for digital assets; comprehensive outlook provides updated framework clarifying staking, custody, and widespread trade for providers",
            tags: ["EU", "Regulation"]
        }
    ]

    // Category filters
    const categories = ["All Assets", "Breaking", "Analysis", "Forecast"]
    const assetTypes = ["Bitcoin", "Forex", "Crypto", "Stocks"]

    // Trending Stocks
    const trendingStocks = [
        { symbol: "TSLA", name: "Tesla", price: "$182", change: "+3.5%" },
        { symbol: "AAPL", name: "Apple", price: "$215", change: "+1.2%" },
        { symbol: "NVDA", name: "Nvidia Corp.", price: "$890", change: "+5.6%" },
        { symbol: "AMZN", name: "Amazon", price: "$175", change: "+2.1%" },
        { symbol: "MSFT", name: "Microsoft", price: "$410", change: "+1.8%" }
    ]

    // Economic Calendar
    const economicEvents = [
        { time: "Today 8:30am", event: "Non-Farm Payrolls", impact: "high" },
        { time: "Today 10:00am", event: "Fed Speech", impact: "medium" },
        { time: "Tomorrow 9:30", event: "Inflation Rate", impact: "high" },
        { time: "Dec 2", event: "FOMC Minutes", impact: "high" }
    ]

    // Scroll Articles
    const scrollArticles = [
        { title: "How to trade around high-level decisions", time: "26m 52s ago" },
        { title: "Swing series for hedge covered-end products", time: "28m 08s ago" },
        { title: "Understanding Ethical ETF Share", time: "29m 21s ago" }
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950 text-white">
            <div className="max-w-[1600px] mx-auto p-6">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold mb-1 text-white">Market news</h1>
                    <p className="text-sm text-slate-400">Latest headlines, news events, and asset-specific insights</p>
                </div>

                {/* Main Grid Layout */}
                <div className="grid grid-cols-12 gap-6">
                    {/* Left Section - News Articles */}
                    <div className="col-span-8">
                        {/* Category Filters */}
                        <div className="flex items-center gap-2 mb-6">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    className={`px-4 py-1.5 rounded-full text-xs font-medium transition ${selectedCategories.includes(cat)
                                        ? 'bg-emerald-500 text-white hover:bg-emerald-500/90'
                                        : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                                        }`}
                                    onClick={() => {
                                        if (selectedCategories.includes(cat)) {
                                            setSelectedCategories(selectedCategories.filter(c => c !== cat))
                                        } else {
                                            setSelectedCategories([...selectedCategories, cat])
                                        }
                                    }}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {/* Search/Filter Info */}
                        <div className="mb-4">
                            <p className="text-xs text-slate-400">Search headlines, tickers, or locations</p>
                        </div>

                        {/* News Articles List */}
                        <div className="space-y-4">
                            {newsArticles.map((article, idx) => (
                                <NewsCard key={idx} article={article} />
                            ))}
                        </div>

                        {/* Load More */}
                        <div className="mt-6 text-center">
                            <button className="px-6 py-2 bg-white/5 text-slate-300 rounded-lg text-sm font-medium hover:bg-white/10 hover:text-white transition">
                                Load more headlines
                            </button>
                        </div>

                        <p className="text-xs text-slate-500 text-center mt-4">
                            Headlines are delayed by up to 5-7 minutes depending on your data package
                        </p>
                    </div>

                    {/* Middle Column - Filters */}
                    <div className="col-span-2">
                        <div className="sticky top-6">
                            {/* Filter Header */}
                            <div className="mb-4 pb-3 border-b border-white/10">
                                <Button
                                    className="w-full bg-emerald-500 text-white hover:bg-emerald-500/90 text-xs font-medium"
                                    onClick={() => setIsPersonalizeModalOpen(true)}
                                >
                                    Personalize feeds
                                </Button>
                            </div>

                            {/* Filter by asset and region */}
                            <div className="mb-6">
                                <h3 className="text-sm font-bold mb-3 text-white">Filter by asset and region</h3>
                                <p className="text-xs text-slate-400 mb-3">Choose asset classes</p>

                                {/* Asset Type Checkboxes */}
                                <div className="space-y-2 mb-4">
                                    {assetTypes.map((asset) => (
                                        <label key={asset} className="flex items-center gap-2 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                className="w-4 h-4 rounded border-white/20 bg-white/5 text-emerald-500 focus:ring-emerald-500/50"
                                            />
                                            <span className="text-xs text-slate-300 group-hover:text-white transition">{asset}</span>
                                        </label>
                                    ))}
                                </div>

                                {/* Region Pills */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {["US", "Europe", "Asia", "Global"].map((region) => (
                                        <button
                                            key={region}
                                            className="px-3 py-1 bg-white/5 text-slate-300 rounded-full text-xs font-medium hover:bg-white/10 hover:text-white transition"
                                        >
                                            {region}
                                        </button>
                                    ))}
                                </div>

                                {/* More Filters */}
                                <div className="space-y-2">
                                    {["Crypto news", "Analysis", "Forex", "Economics"].map((filter) => (
                                        <button
                                            key={filter}
                                            className="w-full text-left px-3 py-2 bg-white/5 text-slate-300 rounded text-xs font-medium hover:bg-white/10 hover:text-white transition"
                                        >
                                            {filter}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Advanced filters link */}
                            <div className="text-xs text-slate-500 mb-4">
                                Apply advanced filters or save dashboard preferences.
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Trending & Calendar */}
                    <div className="col-span-2">
                        <div className="sticky top-6 space-y-6">
                            {/* Trending Stocks */}
                            <TrendingStocks stocks={trendingStocks} onSeeAll={() => alert("View all trending stocks")} />

                            {/* Economic Calendar */}
                            <EconomicCalendar events={economicEvents} />

                            {/* Scroll Articles */}
                            <div className="border border-white/10 rounded-lg p-4 bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm">
                                <h3 className="text-sm font-bold mb-3 text-white">Scroll articles</h3>
                                <p className="text-xs text-slate-400 mb-3">Related articles by our analysts</p>

                                <div className="space-y-3">
                                    {scrollArticles.map((article, idx) => (
                                        <div key={idx} className="pb-3 border-b border-white/5 last:border-0">
                                            <div className="text-sm text-slate-300 hover:text-emerald-400 cursor-pointer mb-1 transition">
                                                {article.title}
                                            </div>
                                            <div className="text-xs text-slate-500">{article.time}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Personalize Modal */}
            <Modal
                isOpen={isPersonalizeModalOpen}
                onClose={() => setIsPersonalizeModalOpen(false)}
                title="Personalize Your Feed"
            >
                <div className="space-y-4">
                    <p className="text-sm text-slate-400">Select topics and regions to customize your news feed.</p>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white">Topics</label>
                        <div className="flex flex-wrap gap-2">
                            {["Technology", "Finance", "Crypto", "Energy", "Healthcare"].map(topic => (
                                <button key={topic} className="px-3 py-1 bg-white/5 hover:bg-emerald-500/20 hover:text-emerald-400 rounded-full text-xs text-slate-300 transition">
                                    {topic}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                        <Button variant="ghost" onClick={() => setIsPersonalizeModalOpen(false)}>Cancel</Button>
                        <Button className="bg-emerald-500 hover:bg-emerald-600 text-white" onClick={() => {
                            alert("Preferences saved!");
                            setIsPersonalizeModalOpen(false);
                        }}>Save Preferences</Button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
