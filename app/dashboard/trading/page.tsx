'use client'

import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import { WatchlistSidebar } from "@/components/dashboard/WatchlistSidebar"
import { TradingHeader } from "@/components/dashboard/TradingHeader"
import { TradingChart } from "@/components/dashboard/TradingChart"
import { OrderTicket } from "@/components/dashboard/OrderTicket"

export default function Trading() {
  const [token, setToken] = useState<string | null>(null)
  const [watchlist, setWatchlist] = useState<any[]>([])
  const [selectedSymbol, setSelectedSymbol] = useState("AAPL")
  const [selectedAssetType, setSelectedAssetType] = useState("stock")
  const [candleData, setCandleData] = useState<any[]>([])
  const [quote, setQuote] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Get token and selected symbol from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    setToken(storedToken)

    // Check if a symbol was selected from the markets page
    const storedSymbol = localStorage.getItem('selectedSymbol')
    const storedAssetType = localStorage.getItem('selectedAssetType')

    if (storedSymbol) {
      setSelectedSymbol(storedSymbol)
      setSelectedAssetType(storedAssetType || 'stock')

      // Clear the stored values after reading them
      localStorage.removeItem('selectedSymbol')
      localStorage.removeItem('selectedAssetType')
    }
  }, [])

  // Fetch watchlist with live prices
  const fetchWatchlist = async () => {
    if (!token) return

    try {
      const result = await api.market.getWatchlistQuotes(token)
      const quotes = Array.isArray(result) ? result : (result.data || [])

      const formatted = quotes.map((item: any) => ({
        symbol: item.symbol,
        name: item.symbol,
        price: `$${item.price?.toFixed(2) || '0.00'}`,
        change: `${item.changePercent >= 0 ? '+' : ''}${item.changePercent?.toFixed(2) || '0.00'}%`,
        positive: item.changePercent >= 0
      }))

      setWatchlist(formatted)
    } catch (err) {
      console.error('Error fetching watchlist:', err)
    }
  }

  // Fetch candle data for chart
  const fetchCandleData = async (symbol: string, timeframe: string = '1D') => {
    if (!token) return

    try {
      const to = Math.floor(Date.now() / 1000)
      let from = to
      let resolution = 'D'

      switch (timeframe) {
        case '1D':
          from = to - (24 * 60 * 60)
          resolution = '5'
          break
        case '5D':
          from = to - (5 * 24 * 60 * 60)
          resolution = '15'
          break
        case '1M':
          from = to - (30 * 24 * 60 * 60)
          resolution = '60'
          break
        case '6M':
          from = to - (180 * 24 * 60 * 60)
          resolution = 'D'
          break
        case '1Y':
          from = to - (365 * 24 * 60 * 60)
          resolution = 'D'
          break
        default:
          from = to - (24 * 60 * 60)
          resolution = '5'
      }

      const result = await api.market.getCandles(token, symbol, resolution, from, to)

      if (result.data && result.data.t && result.data.t.length > 0) {
        const candles = result.data.t.map((timestamp: number, idx: number) => ({
          x: timestamp * 1000,
          y: [
            result.data.o[idx],
            result.data.h[idx],
            result.data.l[idx],
            result.data.c[idx]
          ]
        }))
        setCandleData(candles)
      }
    } catch (err) {
      console.error('Error fetching candle data:', err)
    }
  }

  // Fetch current quote
  const fetchQuote = async (symbol: string, assetType: string) => {
    if (!token) return

    try {
      const result = await api.market.getQuote(token, symbol, assetType)
      setQuote(result.data || result)
    } catch (err) {
      console.error('Error fetching quote:', err)
    }
  }

  // Initial data load
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      try {
        if (token) {
          await Promise.all([
            fetchWatchlist().catch(err => console.error('Watchlist error:', err)),
            fetchCandleData(selectedSymbol).catch(err => console.error('Candle error:', err)),
            fetchQuote(selectedSymbol, selectedAssetType).catch(err => console.error('Quote error:', err))
          ])
        }
      } catch (err) {
        console.error('Error loading data:', err)
      } finally {
        setIsLoading(false)
      }
    }

    const timer = setTimeout(() => {
      loadData()
    }, 100)

    return () => clearTimeout(timer)
  }, [token, selectedSymbol, selectedAssetType])

  // Auto-refresh every 10 seconds
  useEffect(() => {
    if (!token) return

    const interval = setInterval(() => {
      fetchWatchlist()
      fetchQuote(selectedSymbol, selectedAssetType)
    }, 10000)

    return () => clearInterval(interval)
  }, [token, selectedSymbol, selectedAssetType])

  // Handle symbol selection
  const handleSymbolSelect = (symbol: string) => {
    setSelectedSymbol(symbol)
    if (token) {
      fetchCandleData(symbol)
      fetchQuote(symbol, 'stock')
    }
  }

  // Handle timeframe change
  const handleTimeframeChange = (timeframe: string) => {
    if (token) {
      fetchCandleData(selectedSymbol, timeframe)
    }
  }

  // Mock data
  const openOrders = [
    { symbol: "AAPL", qty: "100 Limit", price: "213.05", status: "Working", filled: "0%", type: "Monthly Cancel" },
    { symbol: "TSLA", qty: "50 Stop", price: "280.00", status: "Working", filled: "0%", type: "Monthly Cancel" },
  ]

  const positions = [
    { symbol: "AAPL", qty: "300", avgPrice: "198.65", last: quote?.price?.toFixed(2) || "215.42", pl: "+$4,625.00", plPercent: "30.2%" },
    { symbol: "Cash", qty: "-", avgPrice: "-", last: "-", pl: "-", plPercent: "$2,621.27" },
  ]

  const keyStats = [
    { label: "Current Price", value: `$${quote?.price?.toFixed(2) || '0.00'}` },
    { label: "Change", value: `${quote?.changePercent >= 0 ? '+' : ''}${quote?.changePercent?.toFixed(2) || '0.00'}%` },
    { label: "Volume", value: quote?.volume?.toLocaleString() || 'N/A' },
  ]

  if (isLoading) {
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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950 text-white flex">
      <WatchlistSidebar
        watchlist={watchlist}
        onSymbolSelect={handleSymbolSelect}
        selectedSymbol={selectedSymbol}
      />

      <div className="flex-1 flex flex-col bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950">
        <TradingHeader
          symbol={selectedSymbol}
          price={quote?.price}
          change={quote?.change}
          changePercent={quote?.changePercent}
        />

        <div className="flex-1 flex">
          <div className="flex-1 flex flex-col">
            <TradingChart
              symbol={selectedSymbol}
              candleData={candleData}
              onTimeframeChange={handleTimeframeChange}
            />

            <div className="px-6 pb-6">
              <div className="grid grid-cols-3 gap-4 mb-6">
                {keyStats.map((stat, idx) => (
                  <div key={idx} className="bg-transparent border border-gray-800 rounded-lg p-4">
                    <div className="text-xs text-gray-500 mb-1">{stat.label}</div>
                    <div className="text-lg font-semibold">{stat.value}</div>
                  </div>
                ))}
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold">Open orders</h3>
                  <span className="text-xs text-gray-500">{openOrders.length} working</span>
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

          <OrderTicket
            symbol={selectedSymbol}
            currentPrice={quote?.price}
          />
        </div>
      </div>
    </div>
  )
}
