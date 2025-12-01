"use client"

import { Button } from "@/components/ui/button"
import { Bell, Settings } from "lucide-react"

interface TradingHeaderProps {
    symbol?: string
    price?: number
    change?: number
    changePercent?: number
}

export function TradingHeader({ symbol = "AAPL", price = 0, change = 0, changePercent = 0 }: TradingHeaderProps) {
    const isPositive = changePercent >= 0

    return (
        <div className="bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950 border-b border-gray-800 px-6 py-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold">{symbol}</span>
                            <span className="text-xs text-gray-500 bg-slate-950 px-2 py-1 rounded">NASDAQ</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5">Live Market Data</div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div>
                            <div className="text-3xl font-bold">${price.toFixed(2)}</div>
                            <div className={`text-xs font-medium ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                                {isPositive ? '+' : ''}{change.toFixed(2)} • {isPositive ? '+' : ''}{changePercent.toFixed(2)}%
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="bg-emerald-600 hover:bg-emerald-700 border-0 text-white text-xs px-4 py-2">
                        Buy {symbol}
                    </Button>
                    <Button variant="outline" className="bg-slate-950 hover:bg-gray-700 border-0 text-xs px-4 py-2">
                        Sell
                    </Button>
                    <Button variant="outline" className="bg-slate-950 hover:bg-gray-700 border-0 text-xs px-3 py-2">
                        Add to watchlist
                    </Button>
                    <button className="p-2 hover:bg-slate-950 rounded">
                        <Bell className="w-4 h-4 text-gray-400" />
                    </button>
                    <button className="p-2 hover:bg-slate-950 rounded">
                        <Settings className="w-4 h-4 text-gray-400" />
                    </button>
                </div>
            </div>

            <div className="flex items-center gap-6 mt-3 text-xs text-gray-500">
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                    <span>Live Data</span>
                </div>
            </div>
        </div>
    )
}
