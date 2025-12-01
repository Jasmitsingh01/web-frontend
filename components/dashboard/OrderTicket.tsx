"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface OrderTicketProps {
    symbol?: string
    currentPrice?: number
}

export function OrderTicket({ symbol = "AAPL", currentPrice = 0 }: OrderTicketProps) {
    const [activeOrderTab, setActiveOrderTab] = useState("Buy")
    const [orderType, setOrderType] = useState("Market")
    const [quantity, setQuantity] = useState("100")

    const calculateTotal = () => {
        if (!quantity || isNaN(parseFloat(quantity))) return "0.00"
        return (parseFloat(quantity) * currentPrice).toFixed(2)
    }

    return (
        <div className="w-80 bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950 border-l border-gray-800 p-6">
            <h2 className="text-lg font-bold mb-4">Order ticket</h2>

            {/* Buy/Sell Tabs */}
            <div className="flex mb-4 bg-slate-950 rounded-lg p-1">
                <button
                    onClick={() => setActiveOrderTab("Buy")}
                    className={`flex-1 py-2 rounded-md text-sm font-semibold transition ${activeOrderTab === "Buy"
                        ? 'bg-emerald-600 text-white'
                        : 'text-gray-400'
                        }`}
                >
                    Buy
                </button>
                <button
                    onClick={() => setActiveOrderTab("Sell")}
                    className={`flex-1 py-2 rounded-md text-sm font-semibold transition ${activeOrderTab === "Sell"
                        ? 'bg-red-600 text-white'
                        : 'text-gray-400'
                        }`}
                >
                    Sell
                </button>
            </div>

            {/* Symbol Display */}
            <div className="mb-4">
                <label className="text-xs text-gray-400 block mb-2">Symbol</label>
                <div className="bg-slate-950 border border-gray-700 rounded px-3 py-2.5 text-sm font-medium">
                    {symbol} - NASDAQ
                </div>
            </div>

            {/* Order Type */}
            <div className="mb-4">
                <label className="text-xs text-gray-400 block mb-2">Order type</label>
                <select
                    value={orderType}
                    onChange={(e) => setOrderType(e.target.value)}
                    className="w-full bg-slate-950 border border-gray-700 rounded px-3 py-2.5 text-sm text-white focus:outline-none focus:border-gray-600"
                >
                    <option>Market</option>
                    <option>Limit</option>
                    <option>Stop</option>
                    <option>Stop-Limit</option>
                </select>
            </div>

            {/* Quantity */}
            <div className="mb-4">
                <label className="text-xs text-gray-400 block mb-2">Shares</label>
                <input
                    type="text"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full bg-slate-950 border border-gray-700 rounded px-3 py-2.5 text-sm text-white focus:outline-none focus:border-gray-600"
                    placeholder="100"
                />
            </div>

            {/* Time in force */}
            <div className="mb-4">
                <label className="text-xs text-gray-400 block mb-2">Time in force</label>
                <select className="w-full bg-slate-950 border border-gray-700 rounded px-3 py-2.5 text-sm text-white focus:outline-none focus:border-gray-600">
                    <option>GTC</option>
                    <option>DAY</option>
                    <option>IOC</option>
                    <option>FOK</option>
                </select>
            </div>

            {/* Consolidated hours */}
            <div className="mb-6">
                <label className="text-xs text-gray-400 block mb-2">Consolidated hours</label>
                <select className="w-full bg-slate-950 border border-gray-700 rounded px-3 py-2.5 text-sm text-white focus:outline-none focus:border-gray-600">
                    <option>Off</option>
                    <option>Extended</option>
                </select>
            </div>

            {/* Estimated Cost */}
            <div className="bg-slate-950 border border-gray-700 rounded-lg p-4 mb-4">
                <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Max slippage</span>
                    <span className="font-medium">$0.001 (0.0276%)</span>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t border-gray-700">
                    <span className="text-gray-400 font-medium">Estimated cost</span>
                    <span className="font-bold text-lg">${calculateTotal()}</span>
                </div>
            </div>

            {/* Submit Button */}
            <Button
                className={`w-full py-3 rounded-lg font-bold text-white transition ${activeOrderTab === "Buy"
                    ? 'bg-emerald-600 hover:bg-emerald-700'
                    : 'bg-red-600 hover:bg-red-700'
                    }`}
            >
                Submit {activeOrderTab.toLowerCase()} order
            </Button>

            {/* Cancel Button */}
            <Button
                variant="outline"
                className="w-full mt-3 py-3 rounded-lg font-semibold bg-transparent border border-gray-700 text-gray-400 hover:bg-slate-950 hover:text-white"
            >
                Cancel
            </Button>

            {/* Balance Info */}
            <div className="mt-6 pt-6 border-t border-gray-800">
                <div className="flex justify-between text-xs mb-2">
                    <span className="text-gray-400">Available cash</span>
                    <span className="font-medium">$21,508.06</span>
                </div>
                <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Buying power</span>
                    <span className="font-medium">$43,016.12</span>
                </div>
            </div>
        </div>
    )
}
