'use client'

import { useState } from "react"
import { Copy, Plus, ArrowUpRight, ChevronRight, Download } from "lucide-react"

export default function Wallet() {
    const [selectedTransferMethod, setSelectedTransferMethod] = useState("Bank transfer")

    // Wallet data
    const walletData = {
        totalBalance: "$54,108.23",
        available: "$54,108.23",
        currency: "Crypto",
        accountHolder: "John Doe"
    }

    // Transaction history
    const transactions = [
        { type: "From deposit", date: "4 hours ago", amount: "+$1,200.12" },
        { type: "Converted", date: "1 day ago", amount: "-$250.00" },
        { type: "Bitcoin purchase", date: "2 days ago", amount: "-$5,000.00" },
        { type: "Ethereum purchase", date: "3 days ago", amount: "-$2,500.00" }
    ]

    // Account holder info
    const accountInfo = {
        name: "John Doe",
        accountNumber: "****1234",
        routingNumber: "****5678",
        bankName: "Chase Bank"
    }

    // Gift cards
    const giftCards = [
        { name: "Apple gift card", balance: "$100.00", expiry: "Expires in 2 years" },
        { name: "Amazon card", balance: "$250.00", expiry: "Expires in 3 years" }
    ]

    // Trading limits
    const tradingLimits = {
        daily: "$10,000.00",
        monthly: "$100,000.00",
        used: "$5,420.00"
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950 text-white">
            <div className="max-w-[1200px] mx-auto p-6">
                {/* Header */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                        <h1 className="text-2xl font-bold text-white">Wallet</h1>
                        <div className="flex items-center gap-2">
                            <button className="px-4 py-1.5 bg-white/5 border border-white/10 rounded text-sm font-medium hover:bg-white/10 transition text-slate-300 hover:text-white">
                                Add funds
                            </button>
                            <button className="px-4 py-1.5 bg-emerald-500 text-white rounded text-sm font-medium hover:bg-emerald-500/90 transition">
                                Withdraw funds
                            </button>
                        </div>
                    </div>
                    <p className="text-sm text-slate-400">Transfer amounts, balances, and payment portals</p>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-12 gap-6">
                    {/* Left Column */}
                    <div className="col-span-8 space-y-6">
                        {/* Wallet Overview */}
                        <div className="bg-transparent border border-white/10 rounded-lg p-6">
                            <h2 className="text-lg font-bold mb-4 text-white">Wallet overview</h2>
                            <p className="text-xs text-slate-400 mb-4">Available balances and holdings</p>

                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <div className="text-xs text-slate-400 mb-1">Total wallet value</div>
                                    <div className="text-3xl font-bold text-white">{walletData.totalBalance}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-slate-400 mb-1">Available</div>
                                    <div className="text-3xl font-bold text-white">{walletData.available}</div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div>
                                    <div className="text-xs text-slate-400 mb-1">P/L</div>
                                    <div className="text-sm font-medium text-emerald-400">+$12,345.67</div>
                                </div>
                                <div>
                                    <div className="text-xs text-slate-400 mb-1">Account for trading</div>
                                    <div className="text-sm font-medium text-slate-300">{walletData.currency}</div>
                                </div>
                            </div>

                            <p className="text-xs text-slate-500">
                                Available withdrawals by bank transfer to other accounts, crypto, and digital
                            </p>
                        </div>

                        {/* Transfer Funds */}
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
                                        <input
                                            type="text"
                                            placeholder="0.00"
                                            className="w-full bg-transparent border border-white/10 rounded px-8 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50"
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

                                <button className="w-full bg-emerald-500 text-white rounded py-2.5 text-sm font-medium hover:bg-emerald-500/90 transition">
                                    Transfer now
                                </button>
                            </div>
                        </div>

                        {/* Account Holder Details */}
                        <div className="bg-transparent border border-white/10 rounded-lg p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-bold text-white">Account holder details</h2>
                                <button className="text-xs text-emerald-400 hover:underline">Edit</button>
                            </div>

                            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                                <div>
                                    <div className="text-xs text-slate-400 mb-1">Account holder name</div>
                                    <div className="text-sm font-medium text-white flex items-center gap-2">
                                        {accountInfo.name}
                                        <Copy className="w-3.5 h-3.5 text-slate-400 cursor-pointer hover:text-white" />
                                    </div>
                                </div>
                                <div>
                                    <div className="text-xs text-slate-400 mb-1">Account number</div>
                                    <div className="text-sm font-medium text-white flex items-center gap-2">
                                        {accountInfo.accountNumber}
                                        <Copy className="w-3.5 h-3.5 text-slate-400 cursor-pointer hover:text-white" />
                                    </div>
                                </div>
                                <div>
                                    <div className="text-xs text-slate-400 mb-1">Routing number</div>
                                    <div className="text-sm font-medium text-white flex items-center gap-2">
                                        {accountInfo.routingNumber}
                                        <Copy className="w-3.5 h-3.5 text-slate-400 cursor-pointer hover:text-white" />
                                    </div>
                                </div>
                                <div>
                                    <div className="text-xs text-slate-400 mb-1">Bank name</div>
                                    <div className="text-sm font-medium text-white">{accountInfo.bankName}</div>
                                </div>
                            </div>

                            <p className="text-xs text-slate-500 mt-4">
                                Use the above details when transferring to accounts through banks, portals and crypto
                            </p>
                        </div>

                        {/* QR Code Transfers */}
                        <div className="bg-transparent border border-white/10 rounded-lg p-6">
                            <h2 className="text-lg font-bold mb-4 text-white">QR (QR) Transfers</h2>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <div className="text-xs text-slate-400 mb-2">Send QR to others</div>
                                    <div className="w-32 h-32 bg-white rounded mb-2 flex items-center justify-center">
                                        <div className="w-28 h-28 bg-black"></div>
                                    </div>
                                    <button className="text-xs text-emerald-400 hover:underline flex items-center gap-1">
                                        <Download className="w-3 h-3" />
                                        Download QR
                                    </button>
                                </div>
                                <div>
                                    <div className="text-xs text-slate-400 mb-3">QR code information</div>
                                    <div className="space-y-2">
                                        <div>
                                            <div className="text-xs text-slate-500">Receive code with QR scanners</div>
                                            <div className="text-sm font-medium text-white">Account Holder details</div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-slate-500">Optional</div>
                                            <div className="text-sm text-slate-300">Scan addresses or link crypto wallet</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* External Transfer Available */}
                        <div className="bg-transparent border border-white/10 rounded-lg p-6">
                            <h2 className="text-lg font-bold mb-2 text-white">External transfer (Available)</h2>
                            <p className="text-xs text-slate-400 mb-4">
                                Currently in markets that's used is enabled
                            </p>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between py-2 border-b border-white/5">
                                    <div className="text-sm text-slate-300">PayPal connected here</div>
                                    <button className="text-xs text-emerald-400 hover:underline">Connect</button>
                                </div>
                                <div className="flex items-center justify-between py-2">
                                    <div className="text-sm text-slate-300">Venmo (not connected)</div>
                                    <button className="text-xs text-emerald-400 hover:underline">Connect</button>
                                </div>
                            </div>

                            <p className="text-xs text-slate-500 mt-4">
                                Learn more about payment authorization for crypto (and on Shopchain)
                            </p>
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-transparent border border-white/10 rounded-lg p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-bold text-white">Recent activity</h2>
                                <button className="px-3 py-1 bg-white/5 text-slate-300 rounded text-xs font-medium hover:bg-white/10 hover:text-white transition">
                                    History
                                </button>
                            </div>
                            <p className="text-xs text-slate-400 mb-4">Most recent transactions and movements</p>

                            <div className="space-y-3">
                                {transactions.map((tx, idx) => (
                                    <div key={idx} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                                        <div>
                                            <div className="text-sm font-medium text-white">{tx.type}</div>
                                            <div className="text-xs text-slate-400">{tx.date}</div>
                                        </div>
                                        <div className={`text-sm font-semibold ${tx.amount.startsWith('+') ? 'text-emerald-400' : 'text-slate-300'
                                            }`}>
                                            {tx.amount}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="col-span-4 space-y-6">
                        {/* Gift Cards */}
                        <div className="bg-transparent border border-white/10 rounded-lg p-5">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-sm font-bold text-white">Gift cards</h3>
                                <button className="text-xs text-emerald-400 hover:underline">View all</button>
                            </div>
                            <p className="text-xs text-slate-400 mb-4">Your available gift cards</p>

                            <div className="space-y-3">
                                {giftCards.map((card, idx) => (
                                    <div key={idx} className="p-3 border border-white/10 rounded hover:bg-white/5 cursor-pointer transition">
                                        <div className="flex items-center justify-between mb-1">
                                            <div className="text-sm font-medium text-white">{card.name}</div>
                                            <ChevronRight className="w-4 h-4 text-slate-400" />
                                        </div>
                                        <div className="text-xs text-slate-400">{card.expiry}</div>
                                        <div className="text-sm font-semibold mt-1 text-emerald-400">{card.balance}</div>
                                    </div>
                                ))}
                            </div>

                            <button className="w-full mt-3 px-3 py-2 bg-white/5 text-slate-300 rounded text-xs font-medium hover:bg-white/10 hover:text-white transition flex items-center justify-center gap-1">
                                <Plus className="w-3.5 h-3.5" />
                                Add new card
                            </button>
                        </div>

                        {/* Trading Limits */}
                        <div className="bg-transparent border border-white/10 rounded-lg p-5">
                            <h3 className="text-sm font-bold mb-3 text-white">Limits</h3>
                            <p className="text-xs text-slate-400 mb-4">Your current trading limits</p>

                            <div className="space-y-4">
                                <div>
                                    <div className="flex items-center justify-between mb-1">
                                        <div className="text-xs text-slate-400">Daily limit</div>
                                        <div className="text-sm font-semibold text-white">{tradingLimits.daily}</div>
                                    </div>
                                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-emerald-500" style={{ width: '54%' }}></div>
                                    </div>
                                    <div className="text-xs text-slate-500 mt-1">Used: {tradingLimits.used}</div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between mb-1">
                                        <div className="text-xs text-slate-400">Monthly limit</div>
                                        <div className="text-sm font-semibold text-white">{tradingLimits.monthly}</div>
                                    </div>
                                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-500" style={{ width: '12%' }}></div>
                                    </div>
                                    <div className="text-xs text-slate-500 mt-1">Used: $12,000.00</div>
                                </div>
                            </div>

                            <button className="w-full mt-4 text-xs text-emerald-400 hover:underline text-left">
                                Request limit increase
                            </button>
                        </div>



                        {/* Notifications & Alerts */}
                        <div className="bg-transparent backdrop-blur-sm border border-white/10 rounded-lg p-5">
                            <h3 className="text-sm font-bold mb-3 text-white">Notifications & Alerts</h3>

                            <div className="space-y-2">
                                <div className="text-xs text-slate-400 py-2 border-b border-white/5">
                                    KYC scan
                                </div>
                                <div className="text-xs text-slate-400 py-2 border-b border-white/5">
                                    Trade notifications
                                </div>
                                <div className="text-xs text-slate-400 py-2">
                                    Email alerts
                                </div>
                            </div>

                            <button className="w-full mt-3 text-xs text-emerald-400 hover:underline text-left">
                                Manage alerts
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
