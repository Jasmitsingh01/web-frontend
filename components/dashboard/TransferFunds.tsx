"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"

export function TransferFunds() {
    const [selectedTransferMethod, setSelectedTransferMethod] = useState("Bank transfer")

    return (
        <div className="bg-transparent border border-white/10 rounded-lg p-6">
            <h2 className="text-lg font-bold mb-4 text-white">Transfer funds</h2>
            <p className="text-xs text-slate-400 mb-4">Easily move balances to your main account</p>

            {/* Transfer Method Buttons */}
            <div className="flex items-center gap-2 mb-6">
                {["Bank transfer", "Crypto", "External transfer"].map((method) => (
                    <button
                        key={method}
                        onClick={() => setSelectedTransferMethod(method)}
                        className={`px-4 py-2 rounded text-sm font-medium transition ${selectedTransferMethod === method
                            ? 'bg-emerald-500 text-white hover:bg-emerald-500/90'
                            : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                            }`}
                    >
                        {method}
                    </button>
                ))}
            </div>

            {/* Transfer Form */}
            <div className="space-y-4">
                <div>
                    <label className="text-xs text-slate-400 block mb-2">Amount to transfer</label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                        <Input
                            type="text"
                            placeholder="0.00"
                            className="pl-8 bg-transparent border-white/10 text-white focus-visible:ring-emerald-500/50"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs text-slate-400 block mb-2">From account</label>
                        <select className="w-full bg-white/5 border border-white/10 rounded px-3 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50">
                            <option className="bg-slate-900">Trading account</option>
                            <option className="bg-slate-900">Savings account</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-xs text-slate-400 block mb-2">To account</label>
                        <select className="w-full bg-white/5 border border-white/10 rounded px-3 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50">
                            <option className="bg-slate-900">Bank account ****1234</option>
                            <option className="bg-slate-900">External wallet</option>
                        </select>
                    </div>
                </div>

                <Button className="w-full bg-emerald-500 text-white hover:bg-emerald-500/90">
                    Transfer now
                </Button>
            </div>
        </div>
    )
}
