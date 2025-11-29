"use client"

import { Button } from "@/components/ui/button"
import { Bell, Settings } from "lucide-react"

export function TradingHeader() {
    return (
        <div className="bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950 border-b border-gray-800 px-6 py-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold">AAPL</span>
                            <span className="text-xs text-gray-500 bg-slate-950 px-2 py-1 rounded">NASDAQ</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5">Apple Inc. - Technology - Consumer Electronics</div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div>
                            <div className="text-3xl font-bold">215.42</div>
                            <div className="text-xs text-emerald-400 font-medium">+1.85 • +0.86 • +0.41%</div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="bg-emerald-600 hover:bg-emerald-700 border-0 text-white text-xs px-4 py-2">
                        Buy AAPL
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
                    <span>As of 3:57 PM EST</span>
                </div>
                <div>32-week range</div>
                <div>$3.16 / 22.50</div>
            </div>
        </div>
    )
}
