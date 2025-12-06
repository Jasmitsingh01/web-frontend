'use client'

import { useState } from "react"
import { WatchlistSidebar } from "@/components/dashboard/WatchlistSidebar"
import { TradingHeader } from "@/components/dashboard/TradingHeader"
import { TradingChart } from "@/components/dashboard/TradingChart"
import { OrderTicket } from "@/components/dashboard/OrderTicket"

export default function Trading() {
  const [selectedSymbol, setSelectedSymbol] = useState("AAPL")
  const [selectedAssetType, setSelectedAssetType] = useState("stock")
  const [currentTimeframe, setCurrentTimeframe] = useState("1D")
  const [isLoading, setIsLoading] = useState(false)

  // Static mock data
  const watchlist = [
    { symbol: "AAPL", name: "Apple Inc.", price: "$175.43", change: "+1.35%", positive: true },
    { symbol: "GOOGL", name: "Alphabet Inc.", price: "$140.23", change: "-0.79%", positive: false },
    { symbol: "MSFT", name: "Microsoft", price: "$380.50", change: "+0.95%", positive: true }
  ]

  const candleData = [
    { x: Date.now() - 86400000 * 5, y: [170, 175, 168, 173] },
    { x: Date.now() - 86400000 * 4, y: [173, 178, 172, 176] },
    { x: Date.now() - 86400000 * 3, y: [176, 180, 174, 178] },
    { x: Date.now() - 86400000 * 2, y: [178, 182, 176, 180] },
    { x: Date.now() - 86400000 * 1, y: [180, 185, 178, 183] },
    { x: Date.now(), y: [183, 188, 181, 175] }
  ]

  const quote = {
    symbol: selectedSymbol,
    price: 175.43,
    change: 2.34,
    changePercent: 1.35,
    volume: 52000000,
    high: 178.50,
    low: 173.20,
    open: 174.00,
    previousClose: 173.09
  }

  const handleSymbolSelect = (symbol: string) => {
    setSelectedSymbol(symbol)
    // Determine asset type based on symbol
    if (symbol.includes('/')) {
      setSelectedAssetType('forex')
    } else if (['BTC', 'ETH', 'BNB', 'SOL'].some(crypto => symbol.includes(crypto))) {
      setSelectedAssetType('crypto')
    } else {
      setSelectedAssetType('stock')
    }
  }

  const handleTimeframeChange = (timeframe: string) => {
    setCurrentTimeframe(timeframe)
  }

  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950 text-white">
      <div className="flex h-screen">
        {/* Watchlist Sidebar */}
        <WatchlistSidebar
          watchlist={watchlist}
          selectedSymbol={selectedSymbol}
          onSymbolSelect={handleSymbolSelect}
        />

        {/* Main Trading Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Trading Header */}
          <TradingHeader
            symbol={selectedSymbol}
            price={quote.price}
            change={quote.change}
            changePercent={quote.changePercent}
          />

          {/* Chart and Order Ticket */}
          <div className="flex-1 grid grid-cols-12 gap-4 p-4 overflow-hidden">
            {/* Trading Chart */}
            <div className="col-span-8">
              <TradingChart
                symbol={selectedSymbol}
                candleData={candleData}
                onTimeframeChange={handleTimeframeChange}
              />
            </div>

            {/* Order Ticket */}
            <div className="col-span-4">
              <OrderTicket
                symbol={selectedSymbol}
                currentPrice={quote.price}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Demo Mode Banner */}
      <div className="fixed bottom-4 right-4 bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-3 backdrop-blur-sm">
        <div className="text-yellow-300 text-sm font-semibold">
          📊 Demo Mode - No Live Data
        </div>
        <div className="text-yellow-200 text-xs">
          Static mock data only
        </div>
      </div>
    </div>
  )
}
