'use client'

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, ChevronRight } from "lucide-react"

export default function MarketNews() {
    const [selectedCategories, setSelectedCategories] = useState<string[]>(["All Assets"])

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
        <div className="min-h-screen bg-white text-gray-900">
            <div className="max-w-[1600px] mx-auto p-6">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold mb-1">Market news</h1>
                    <p className="text-sm text-gray-500">Latest headlines, news events, and asset-specific insights</p>
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
                                        ? 'bg-gray-900 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
                            <p className="text-xs text-gray-500">Search headlines, tickers, or locations</p>
                        </div>

                        {/* News Articles List */}
                        <div className="space-y-4">
                            {newsArticles.map((article, idx) => (
                                <div key={idx} className="border-b border-gray-200 pb-4">
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="text-xs font-semibold text-gray-900 bg-gray-100 px-2 py-0.5 rounded">
                                                    {article.category}
                                                </span>
                                                <span className="text-xs text-gray-500">{article.source}</span>
                                                <span className="text-xs text-gray-500">• {article.time}</span>
                                            </div>
                                            <Link href={`/dashboard/news/${article.slug}`}>
                                                <h3 className="text-base font-bold mb-2 hover:text-blue-600 cursor-pointer transition">
                                                    {article.title}
                                                </h3>
                                            </Link>
                                            <p className="text-sm text-gray-600 leading-relaxed mb-3">
                                                {article.description}
                                            </p>
                                            <div className="flex items-center gap-2">
                                                {article.tags.map((tag, tagIdx) => (
                                                    <span key={tagIdx} className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="text-xs text-gray-400 ml-4 whitespace-nowrap">
                                            {idx === 0 && "13:03, Nov 12"}
                                            {idx === 1 && "07:20, Nov 11"}
                                            {idx === 2 && "12:14, Nov 8"}
                                            {idx === 3 && "18:11, Nov 6"}
                                            {idx === 4 && "CBOE + Free daily"}
                                            {idx === 5 && "Bloomberg • 12h ago"}
                                        </div>
                                    </div>
                                    {article.reactions && (
                                        <div className="flex items-center gap-3 mt-2">
                                            <span className="text-xs text-gray-500">Reactions: 4 Smiling • 3 Cool</span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Load More */}
                        <div className="mt-6 text-center">
                            <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200">
                                Load more headlines
                            </button>
                        </div>

                        <p className="text-xs text-gray-400 text-center mt-4">
                            Headlines are delayed by up to 5-7 minutes depending on your data package
                        </p>
                    </div>

                    {/* Middle Column - Filters */}
                    <div className="col-span-2">
                        <div className="sticky top-6">
                            {/* Filter Header */}
                            <div className="mb-4 pb-3 border-b border-gray-200">
                                <button className="px-4 py-1.5 bg-gray-900 text-white rounded-lg text-xs font-medium w-full hover:bg-gray-800">
                                    Personalize feeds
                                </button>
                            </div>

                            {/* Filter by asset and region */}
                            <div className="mb-6">
                                <h3 className="text-sm font-bold mb-3">Filter by asset and region</h3>
                                <p className="text-xs text-gray-500 mb-3">Choose asset classes</p>

                                {/* Asset Type Checkboxes */}
                                <div className="space-y-2 mb-4">
                                    {assetTypes.map((asset) => (
                                        <label key={asset} className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="w-4 h-4 rounded border-gray-300 text-gray-900"
                                            />
                                            <span className="text-xs text-gray-700">{asset}</span>
                                        </label>
                                    ))}
                                </div>

                                {/* Region Pills */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {["US", "Europe", "Asia", "Global"].map((region) => (
                                        <button
                                            key={region}
                                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium hover:bg-gray-200"
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
                                            className="w-full text-left px-3 py-2 bg-gray-100 text-gray-700 rounded text-xs font-medium hover:bg-gray-200"
                                        >
                                            {filter}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Advanced filters link */}
                            <div className="text-xs text-gray-500 mb-4">
                                Apply advanced filters or save dashboard preferences.
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Trending & Calendar */}
                    <div className="col-span-2">
                        <div className="sticky top-6 space-y-6">
                            {/* Trending Stocks */}
                            <div className="border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-sm font-bold">Trending Stocks</h3>
                                    <button className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium hover:bg-gray-200">
                                        See all
                                    </button>
                                </div>
                                <p className="text-xs text-gray-500 mb-3">Most discussed by the community</p>

                                <div className="space-y-2">
                                    {trendingStocks.map((stock, idx) => (
                                        <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                                            <div>
                                                <div className="text-sm font-semibold">{stock.symbol}</div>
                                                <div className="text-xs text-gray-500">{stock.name}</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-sm font-medium">{stock.price}</div>
                                                <div className={`text-xs font-medium ${stock.change.startsWith('+') ? 'text-emerald-600' : 'text-red-600'
                                                    }`}>
                                                    {stock.change}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Economic Calendar */}
                            <div className="border border-gray-200 rounded-lg p-4">
                                <h3 className="text-sm font-bold mb-3">Economic calendar (Today)</h3>
                                <p className="text-xs text-gray-500 mb-3">Upcoming key market-moving releases</p>

                                <div className="space-y-3">
                                    {economicEvents.map((event, idx) => (
                                        <div key={idx} className="pb-3 border-b border-gray-100 last:border-0">
                                            <div className="flex items-start justify-between mb-1">
                                                <div className="text-xs font-medium">{event.event}</div>
                                                <div className={`text-xs font-semibold px-2 py-0.5 rounded ${event.impact === 'high'
                                                    ? 'bg-red-100 text-red-700'
                                                    : 'bg-yellow-100 text-yellow-700'
                                                    }`}>
                                                    {event.impact}
                                                </div>
                                            </div>
                                            <div className="text-xs text-gray-500">{event.time}</div>
                                        </div>
                                    ))}
                                </div>

                                <button className="w-full mt-3 text-xs text-blue-600 hover:underline text-left">
                                    Event history shown in your dashboard
                                </button>
                            </div>

                            {/* Scroll Articles */}
                            <div className="border border-gray-200 rounded-lg p-4">
                                <h3 className="text-sm font-bold mb-3">Scroll articles</h3>
                                <p className="text-xs text-gray-500 mb-3">Related articles by our analysts</p>

                                <div className="space-y-3">
                                    {scrollArticles.map((article, idx) => (
                                        <div key={idx} className="pb-3 border-b border-gray-100 last:border-0">
                                            <div className="text-sm hover:text-blue-600 cursor-pointer mb-1">
                                                {article.title}
                                            </div>
                                            <div className="text-xs text-gray-500">{article.time}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
