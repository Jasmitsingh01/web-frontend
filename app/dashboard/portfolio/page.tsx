'use client'

import { useState } from "react"
import Chart from "react-apexcharts"
import { Button } from "@/components/ui/button"
import { ChevronDown, TrendingUp, TrendingDown } from "lucide-react"

export default function PortfolioDashboard() {
    const [activeTab, setActiveTab] = useState("All Assets")
    const [chartType, setChartType] = useState("1D")

    // Portfolio summary data
    const portfolioStats = {
        totalValue: "$176,156.27",
        cashUSD: "$17,248.18",
        totalPL: "92.0k (108.12%)",
        btcLedger: "82.0K (100.8%)"
    }

    // Performance buttons
    const performanceFilters = ["Assets", "Stocks", "Forex", "Crypto", "Futures"]
    const chartButtons = ["All", "1D", "1W", "1M", "3M", "1Y", "5Y", "Max"]

    // Allocation data
    const allocations = [
        { name: "Bitcoin", percent: "69.2%", value: "$41,600" },
        { name: "Stocks", percent: "3.0%", value: "$11,120" },
        { name: "Forex", percent: "5.1%", value: "$10,200" },
        { name: "Cash / USDT", percent: "9.2%", value: "$11,120" }
    ]

    // Risk & Insurance data
    const riskData = {
        avgDailyValue: "68 (+0.14%)",
        lossInsurance: "$1.8k of cash",
        available: "65% coverage available",
        dividendYield: "23.4% of cash value",
        coverage: "100% dividend cash reinvestment"
    }

    // Recent activity
    const recentActivity = [
        { date: "Aug 28 2024", action: "Buy of XAU $21,426" },
        { date: "Aug 28 2024", action: "Buy of EURUSD $21,426" },
        { date: "Aug 28 2024", action: "Buy 100k AARUSD @ 1.00400" },
        { date: "Pending", action: "Withdraw : $100.00", status: "Pending" },
        { date: "Today", action: "Deposit", value: "+$50.22" },
        { date: "1 day ago", action: "Buy of Gold", value: "+$2,188.52" }
    ]

    // Positions table data
    const positions = [
        { symbol: "GOOG", name: "Alphabet", qty: "200", price: "+$8.00", value: "+$68.00", pl: "$4 (Hold)", roi: "(+5.8%)", action: "5.3%" },
        { symbol: "AAPL", name: "Apple Inc.", qty: "300", price: "$215.00", value: "$45.00", pl: "$3 (Hold)", roi: "$4,920.00", action: "0%" },
        { symbol: "MSFT", name: "Microsoft Corp.", qty: "68", price: "$7.40", value: "+$68.00", pl: "$1 (Buy)", roi: "$1,163.80", action: "8.3%" },
        { symbol: "TSLA", name: "Tesla", qty: "68", price: "$7.40", value: "+$68.00", pl: "$0 (Sell)", roi: "$1,163.80", action: "-8.7%" },
        { symbol: "BTC/USD", name: "Bitcoin USD", qty: "-", price: "$62.00", value: "+$41.00", pl: "$2 (Hold)", roi: "$4,163.80", action: "-0.6%" },
        { symbol: "BNB", name: "Binance Coin", qty: "-", price: "-", value: "-", pl: "$4 (Hold)", roi: "$5,163.80", action: "-4.5%" },
        { symbol: "Cash", name: "Unallocated", qty: "-", rebalance: "-", delta: "-", value: "-", roi: "$,837.71", action: "0.4%" }
    ]

    // Chart configuration
    const chartOptions = {
        chart: {
            id: "btc-chart",
            toolbar: {
                show: true,
                tools: {
                    download: false,
                    zoom: true,
                    zoomin: true,
                    zoomout: true,
                    pan: true,
                    reset: true
                }
            },
            background: '#1a1a1a',
            foreColor: '#9ca3af'
        },
        xaxis: {
            type: 'datetime' as const,
            labels: {
                style: { colors: "#6b7280", fontSize: '10px' }
            },
            axisBorder: { color: '#374151' }
        },
        yaxis: {
            labels: {
                style: { colors: "#6b7280", fontSize: '10px' },
                formatter: (val: number) => `$${val.toLocaleString()}`
            },
            opposite: true
        },
        grid: {
            borderColor: "#374151",
            strokeDashArray: 2
        },
        stroke: {
            curve: 'smooth' as const,
            width: 2
        },
        colors: ['#ef4444'],
        tooltip: {
            theme: "dark",
            x: { format: 'dd MMM HH:mm' }
        },
        annotations: {
            yaxis: [
                {
                    y: 67000,
                    borderColor: '#10b981',
                    label: {
                        borderColor: '#10b981',
                        style: { color: '#fff', background: '#10b981' },
                        text: 'BTC'
                    }
                },
                {
                    y: 45000,
                    borderColor: '#f59e0b',
                    label: {
                        borderColor: '#f59e0b',
                        style: { color: '#fff', background: '#f59e0b' },
                        text: 'ETH'
                    }
                }
            ]
        }
    }

    const chartSeries = [{
        name: 'BTC/USD',
        data: [
            [new Date('2023-10-01').getTime(), 67000],
            [new Date('2023-10-05').getTime(), 65000],
            [new Date('2023-10-10').getTime(), 58000],
            [new Date('2023-10-15').getTime(), 62000],
            [new Date('2023-10-20').getTime(), 55000],
            [new Date('2023-10-25').getTime(), 48000],
            [new Date('2023-11-01').getTime(), 52000],
            [new Date('2023-11-05').getTime(), 58000],
            [new Date('2023-11-10').getTime(), 54000],
            [new Date('2023-11-15').getTime(), 61000],
            [new Date('2023-11-20').getTime(), 58000],
            [new Date('2023-11-25').getTime(), 67000],
        ]
    }]

    return (
        <div className="min-h-screen bg-[#f5f5f5] text-gray-900 p-6">
            <div className="max-w-[1600px] mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold mb-1">Portfolio</h1>
                    <p className="text-sm text-gray-600">Overview of Bitcoin, across Stocks, Forex, and Crypto</p>
                </div>

                {/* Portfolio Summary Cards */}
                <div className="grid grid-cols-4 gap-4 mb-6">
                    <div className="bg-white rounded-lg border border-gray-300 p-4">
                        <div className="text-xs text-gray-600 mb-1">Total Value</div>
                        <div className="text-2xl font-bold">{portfolioStats.totalValue}</div>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-300 p-4">
                        <div className="text-xs text-gray-600 mb-1">Cash (USD)</div>
                        <div className="text-2xl font-bold">{portfolioStats.cashUSD}</div>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-300 p-4">
                        <div className="text-xs text-gray-600 mb-1">Total P/L</div>
                        <div className="text-2xl font-bold text-emerald-600">{portfolioStats.totalPL}</div>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-300 p-4">
                        <div className="text-xs text-gray-600 mb-1">BTC Ledger</div>
                        <div className="text-2xl font-bold text-emerald-600">{portfolioStats.btcLedger}</div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-12 gap-6">
                    {/* Left Column - Chart */}
                    <div className="col-span-8">
                        {/* Performance Section */}
                        <div className="bg-white rounded-lg border border-gray-300 p-5 mb-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-bold">Performance</h2>
                                <div className="flex items-center gap-2">
                                    {performanceFilters.map((filter) => (
                                        <button
                                            key={filter}
                                            className={`px-3 py-1.5 rounded text-xs font-medium transition ${filter === "All Assets"
                                                ? 'bg-gray-900 text-white'
                                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                                }`}
                                        >
                                            {filter}
                                        </button>
                                    ))}
                                    <button className="px-3 py-1.5 rounded text-xs font-medium bg-gray-200 text-gray-700 hover:bg-gray-300">
                                        Crypto
                                    </button>
                                </div>
                            </div>

                            <div className="text-xs text-gray-600 mb-4">BTC converts to USD (2024)</div>

                            {/* Chart */}
                            <div className="bg-[#1a1a1a] rounded-lg p-4">
                                <Chart
                                    options={chartOptions}
                                    series={chartSeries}
                                    type="area"
                                    height={300}
                                />
                            </div>

                            {/* Chart Time Filters */}
                            <div className="flex items-center justify-between mt-4">
                                <div className="flex items-center gap-2">
                                    {chartButtons.map((btn) => (
                                        <button
                                            key={btn}
                                            onClick={() => setChartType(btn)}
                                            className={`px-3 py-1 rounded text-xs font-medium transition ${chartType === btn
                                                ? 'bg-gray-900 text-white'
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                }`}
                                        >
                                            {btn}
                                        </button>
                                    ))}
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="flex items-center gap-1 text-xs">
                                        <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                                        <span className="text-gray-600">USD</span>
                                    </span>
                                    <span className="flex items-center gap-1 text-xs">
                                        <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                                        <span className="text-gray-600">BTC</span>
                                    </span>
                                </div>
                            </div>

                            <div className="text-xs text-gray-500 mt-2">
                                Source: CBOE, CME AG, Binance, Coinbit, TSXUSDF, CBOE, Crypto.co
                            </div>
                        </div>

                        {/* Positions Table */}
                        <div className="bg-white rounded-lg border border-gray-300 p-5">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-bold">Positions</h2>
                                <button className="px-4 py-1.5 rounded bg-gray-200 text-gray-700 text-xs font-medium hover:bg-gray-300">
                                    Group by Asset class
                                </button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-xs">
                                    <thead>
                                        <tr className="border-b border-gray-300 text-gray-600">
                                            <th className="text-left py-3 px-3 font-semibold">Symbol</th>
                                            <th className="text-left py-3 px-3 font-semibold">Name / type</th>
                                            <th className="text-left py-3 px-3 font-semibold">Qty</th>
                                            <th className="text-left py-3 px-3 font-semibold">Avg. price / Rebalance</th>
                                            <th className="text-left py-3 px-3 font-semibold">Last / Delta</th>
                                            <th className="text-left py-3 px-3 font-semibold">P/L (Real / Unreal)</th>
                                            <th className="text-left py-3 px-3 font-semibold">Value / Trades</th>
                                            <th className="text-left py-3 px-3 font-semibold">Action / Weight</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {positions.map((pos, idx) => (
                                            <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                                                <td className="py-3 px-3 font-semibold">{pos.symbol}</td>
                                                <td className="py-3 px-3 text-gray-600">{pos.name}</td>
                                                <td className="py-3 px-3">{pos.qty}</td>
                                                <td className="py-3 px-3">{pos.price}</td>
                                                <td className="py-3 px-3 text-emerald-600">{pos.value}</td>
                                                <td className="py-3 px-3">{pos.pl}</td>
                                                <td className="py-3 px-3 font-medium">{pos.roi}</td>
                                                <td className={`py-3 px-3 font-medium ${pos.action.includes('-') ? 'text-red-600' :
                                                    pos.action === '0%' || pos.action === '0.4%' ? 'text-gray-600' : 'text-emerald-600'
                                                    }`}>
                                                    {pos.action}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="text-xs text-gray-500 mt-3">
                                By default, Positions by GGOS symbol | Portfolio data displayed in this table dates back to the 1950s to the current date, sources: www.company.com
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Allocation & Risk */}
                    <div className="col-span-4">
                        {/* Allocation Section */}
                        <div className="bg-white rounded-lg border border-gray-300 p-5 mb-6">
                            <h2 className="text-lg font-bold mb-4">Allocation</h2>
                            <div className="text-xs text-gray-600 mb-3">Current breakdown</div>

                            {allocations.map((item, idx) => (
                                <div key={idx} className="mb-4">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-sm font-medium">{item.name}</span>
                                        <span className="text-sm font-bold">{item.percent}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden mr-3">
                                            <div
                                                className={`h-full ${idx === 0 ? 'bg-orange-500' :
                                                    idx === 1 ? 'bg-blue-500' :
                                                        idx === 2 ? 'bg-purple-500' : 'bg-gray-400'
                                                    }`}
                                                style={{ width: item.percent }}
                                            ></div>
                                        </div>
                                        <span className="text-xs text-gray-600">{item.value}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Risk & Insurance Section */}
                        <div className="bg-white rounded-lg border border-gray-300 p-5 mb-6">
                            <h2 className="text-lg font-bold mb-4">Risk & Insurance</h2>

                            <div className="space-y-4">
                                <div>
                                    <div className="text-xs text-gray-600 mb-1">Avg. Daily portfolio volatility</div>
                                    <div className="text-sm font-semibold">{riskData.avgDailyValue}</div>
                                </div>

                                <div>
                                    <div className="text-xs text-gray-600 mb-1">Loss insurance</div>
                                    <div className="text-sm font-semibold">{riskData.lossInsurance}</div>
                                    <div className="text-xs text-gray-500">{riskData.available}</div>
                                </div>

                                <div>
                                    <div className="text-xs text-gray-600 mb-1">Dividend yield</div>
                                    <div className="text-sm font-semibold">{riskData.dividendYield}</div>
                                    <div className="text-xs text-gray-500">{riskData.coverage}</div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity Section */}
                        <div className="bg-white rounded-lg border border-gray-300 p-5">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-bold">Recent activity</h2>
                                <button className="px-3 py-1 rounded bg-gray-200 text-gray-700 text-xs font-medium hover:bg-gray-300">
                                    View all
                                </button>
                            </div>

                            <div className="space-y-3">
                                {recentActivity.map((activity, idx) => (
                                    <div key={idx} className="flex items-start justify-between pb-3 border-b border-gray-200 last:border-0">
                                        <div className="flex-1">
                                            <div className="text-xs text-gray-600 mb-1">{activity.date}</div>
                                            <div className="text-sm">{activity.action}</div>
                                            {activity.status && (
                                                <span className="inline-block mt-1 px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded">
                                                    {activity.status}
                                                </span>
                                            )}
                                        </div>
                                        {activity.value && (
                                            <div className={`text-sm font-semibold ${activity.value.includes('+') ? 'text-emerald-600' : 'text-red-600'
                                                }`}>
                                                {activity.value}
                                            </div>
                                        )}
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
