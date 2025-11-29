"use client"

import { TrendingUp, TrendingDown } from "lucide-react"
import { Button } from "@/components/ui/button"

interface WatchlistItem {
    symbol: string
    name: string
    price: string
    change: string
}

interface WatchlistProps {
    items: WatchlistItem[]
    onAdd?: () => void
}

export function Watchlist({ items, onAdd }: WatchlistProps) {
    return (
        <div className="border border-white/5 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-emerald-400" />
                    Watchlist
                </h3>
                <Button variant="ghost" size="sm" className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 text-xs" onClick={onAdd}>
                    + Add
                </Button>
            </div>
            <div className="space-y-3">
                {items.map((coin) => (
                    <div
                        key={coin.symbol}
                        className="p-4 bg-slate-800/30 hover:bg-slate-800/50 border border-white/5 rounded-xl transition-all cursor-pointer group"
                    >
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center">
                                    <span className="font-bold text-sm text-emerald-400">{coin.symbol.slice(0, 2)}</span>
                                </div>
                                <div>
                                    <p className="font-bold text-white group-hover:text-emerald-400 transition">{coin.symbol}</p>
                                    <p className="text-xs text-slate-500">{coin.name}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold text-white">{coin.price}</p>
                                <span className={`text-xs font-semibold flex items-center justify-end gap-1 ${coin.change.startsWith('-') ? 'text-red-400' : 'text-emerald-400'
                                    }`}>
                                    {coin.change.startsWith('-') ? <TrendingDown className="w-3 h-3" /> : <TrendingUp className="w-3 h-3" />}
                                    {coin.change}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
