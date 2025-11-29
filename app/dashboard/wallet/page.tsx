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
        <div className="min-h-screen bg-[#fafafa] text-gray-900">
            <div className="max-w-[1200px] mx-auto p-6">
                {/* Header */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                        <h1 className="text-2xl font-bold">Wallet</h1>
                        <div className="flex items-center gap-2">
                            <button className="px-4 py-1.5 bg-white border border-gray-300 rounded text-sm font-medium hover:bg-gray-50">
                                Add funds
                            </button>
                            <button className="px-4 py-1.5 bg-gray-900 text-white rounded text-sm font-medium hover:bg-gray-800">
                                Withdraw funds
                            </button>
                        </div>
                    </div>
                    <p className="text-sm text-gray-500">Transfer amounts, balances, and payment portals</p>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-12 gap-6">
                    {/* Left Column */}
                    <div className="col-span-8 space-y-6">
                        {/* Wallet Overview */}
                        <div className="bg-white border border-gray-300 rounded-lg p-6">
                            <h2 className="text-lg font-bold mb-4">Wallet overview</h2>
                            <p className="text-xs text-gray-500 mb-4">Available balances and holdings</p>

                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">Total wallet value</div>
                                    <div className="text-3xl font-bold">{walletData.totalBalance}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">Available</div>
                                    <div className="text-3xl font-bold">{walletData.available}</div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">P/L</div>
                                    <div className="text-sm font-medium text-emerald-600">+$12,345.67</div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">Account for trading</div>
                                    <div className="text-sm font-medium">{walletData.currency}</div>
                                </div>
                            </div>

                            <p className="text-xs text-gray-400">
                                Available withdrawals by bank transfer to other accounts, crypto, and digital
                            </p>
                        </div>

                        {/* Transfer Funds */}
                        <div className="bg-white border border-gray-300 rounded-lg p-6">
                            <h2 className="text-lg font-bold mb-4">Transfer funds</h2>
                            <p className="text-xs text-gray-500 mb-4">Easily move balances to your main account</p>

                            {/* Transfer Method Buttons */}
                            <div className="flex items-center gap-2 mb-6">
                                {["Bank transfer", "Crypto", "External transfer"].map((method) => (
                                    <button
                                        key={method}
                                        onClick={() => setSelectedTransferMethod(method)}
                                        className={`px-4 py-2 rounded text-sm font-medium transition ${selectedTransferMethod === method
                                                ? 'bg-gray-900 text-white'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        {method}
                                    </button>
                                ))}
                            </div>

                            {/* Transfer Form */}
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs text-gray-600 block mb-2">Amount to transfer</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                                        <input
                                            type="text"
                                            placeholder="0.00"
                                            className="w-full bg-gray-50 border border-gray-300 rounded px-8 py-2.5 text-sm focus:outline-none focus:border-gray-400"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs text-gray-600 block mb-2">From account</label>
                                        <select className="w-full bg-gray-50 border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-gray-400">
                                            <option>Trading account</option>
                                            <option>Savings account</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-600 block mb-2">To account</label>
                                        <select className="w-full bg-gray-50 border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-gray-400">
                                            <option>Bank account ****1234</option>
                                            <option>External wallet</option>
                                        </select>
                                    </div>
                                </div>

                                <button className="w-full bg-gray-900 text-white rounded py-2.5 text-sm font-medium hover:bg-gray-800">
                                    Transfer now
                                </button>
                            </div>
                        </div>

                        {/* Account Holder Details */}
                        <div className="bg-white border border-gray-300 rounded-lg p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-bold">Account holder details</h2>
                                <button className="text-xs text-blue-600 hover:underline">Edit</button>
                            </div>

                            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">Account holder name</div>
                                    <div className="text-sm font-medium flex items-center gap-2">
                                        {accountInfo.name}
                                        <Copy className="w-3.5 h-3.5 text-gray-400 cursor-pointer hover:text-gray-600" />
                                    </div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">Account number</div>
                                    <div className="text-sm font-medium flex items-center gap-2">
                                        {accountInfo.accountNumber}
                                        <Copy className="w-3.5 h-3.5 text-gray-400 cursor-pointer hover:text-gray-600" />
                                    </div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">Routing number</div>
                                    <div className="text-sm font-medium flex items-center gap-2">
                                        {accountInfo.routingNumber}
                                        <Copy className="w-3.5 h-3.5 text-gray-400 cursor-pointer hover:text-gray-600" />
                                    </div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">Bank name</div>
                                    <div className="text-sm font-medium">{accountInfo.bankName}</div>
                                </div>
                            </div>

                            <p className="text-xs text-gray-400 mt-4">
                                Use the above details when transferring to accounts through banks, portals and crypto
                            </p>
                        </div>

                        {/* QR Code Transfers */}
                        <div className="bg-white border border-gray-300 rounded-lg p-6">
                            <h2 className="text-lg font-bold mb-4">QR (QR) Transfers</h2>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <div className="text-xs text-gray-500 mb-2">Send QR to others</div>
                                    <div className="w-32 h-32 bg-gray-900 rounded mb-2"></div>
                                    <button className="text-xs text-blue-600 hover:underline flex items-center gap-1">
                                        <Download className="w-3 h-3" />
                                        Download QR
                                    </button>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 mb-3">QR code information</div>
                                    <div className="space-y-2">
                                        <div>
                                            <div className="text-xs text-gray-400">Receive code with QR scanners</div>
                                            <div className="text-sm font-medium">Account Holder details</div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-400">Optional</div>
                                            <div className="text-sm">Scan addresses or link crypto wallet</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* External Transfer Available */}
                        <div className="bg-white border border-gray-300 rounded-lg p-6">
                            <h2 className="text-lg font-bold mb-2">External transfer (Available)</h2>
                            <p className="text-xs text-gray-500 mb-4">
                                Currently in markets that's used is enabled
                            </p>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between py-2 border-b border-gray-200">
                                    <div className="text-sm">PayPal connected here</div>
                                    <button className="text-xs text-blue-600 hover:underline">Connect</button>
                                </div>
                                <div className="flex items-center justify-between py-2">
                                    <div className="text-sm">Venmo (not connected)</div>
                                    <button className="text-xs text-blue-600 hover:underline">Connect</button>
                                </div>
                            </div>

                            <p className="text-xs text-gray-400 mt-4">
                                Learn more about payment authorization for crypto (and on Shopchain)
                            </p>
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-white border border-gray-300 rounded-lg p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-bold">Recent activity</h2>
                                <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium hover:bg-gray-200">
                                    History
                                </button>
                            </div>
                            <p className="text-xs text-gray-500 mb-4">Most recent transactions and movements</p>

                            <div className="space-y-3">
                                {transactions.map((tx, idx) => (
                                    <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                                        <div>
                                            <div className="text-sm font-medium">{tx.type}</div>
                                            <div className="text-xs text-gray-500">{tx.date}</div>
                                        </div>
                                        <div className={`text-sm font-semibold ${tx.amount.startsWith('+') ? 'text-emerald-600' : 'text-gray-900'
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
                        <div className="bg-white border border-gray-300 rounded-lg p-5">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-sm font-bold">Gift cards</h3>
                                <button className="text-xs text-blue-600 hover:underline">View all</button>
                            </div>
                            <p className="text-xs text-gray-500 mb-4">Your available gift cards</p>

                            <div className="space-y-3">
                                {giftCards.map((card, idx) => (
                                    <div key={idx} className="p-3 border border-gray-200 rounded hover:bg-gray-50 cursor-pointer">
                                        <div className="flex items-center justify-between mb-1">
                                            <div className="text-sm font-medium">{card.name}</div>
                                            <ChevronRight className="w-4 h-4 text-gray-400" />
                                        </div>
                                        <div className="text-xs text-gray-500">{card.expiry}</div>
                                        <div className="text-sm font-semibold mt-1">{card.balance}</div>
                                    </div>
                                ))}
                            </div>

                            <button className="w-full mt-3 px-3 py-2 bg-gray-100 text-gray-700 rounded text-xs font-medium hover:bg-gray-200 flex items-center justify-center gap-1">
                                <Plus className="w-3.5 h-3.5" />
                                Add new card
                            </button>
                        </div>

                        {/* Trading Limits */}
                        <div className="bg-white border border-gray-300 rounded-lg p-5">
                            <h3 className="text-sm font-bold mb-3">Limits</h3>
                            <p className="text-xs text-gray-500 mb-4">Your current trading limits</p>

                            <div className="space-y-4">
                                <div>
                                    <div className="flex items-center justify-between mb-1">
                                        <div className="text-xs text-gray-500">Daily limit</div>
                                        <div className="text-sm font-semibold">{tradingLimits.daily}</div>
                                    </div>
                                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-emerald-500" style={{ width: '54%' }}></div>
                                    </div>
                                    <div className="text-xs text-gray-400 mt-1">Used: {tradingLimits.used}</div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between mb-1">
                                        <div className="text-xs text-gray-500">Monthly limit</div>
                                        <div className="text-sm font-semibold">{tradingLimits.monthly}</div>
                                    </div>
                                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-500" style={{ width: '12%' }}></div>
                                    </div>
                                    <div className="text-xs text-gray-400 mt-1">Used: $12,000.00</div>
                                </div>
                            </div>

                            <button className="w-full mt-4 text-xs text-blue-600 hover:underline text-left">
                                Request limit increase
                            </button>
                        </div>

                        {/* Badges */}
                        <div className="bg-white border border-gray-300 rounded-lg p-5">
                            <h3 className="text-sm font-bold mb-3">Badges</h3>
                            <p className="text-xs text-gray-500 mb-4">Your earned achievements</p>

                            <div className="grid grid-cols-3 gap-3">
                                {[1, 2, 3, 4, 5, 6].map((badge) => (
                                    <div key={badge} className="aspect-square bg-gray-100 rounded-lg border border-gray-200 hover:border-gray-300 cursor-pointer"></div>
                                ))}
                            </div>

                            <button className="w-full mt-3 text-xs text-blue-600 hover:underline text-center">
                                View all badges
                            </button>
                        </div>

                        {/* Notifications & Alerts */}
                        <div className="bg-white border border-gray-300 rounded-lg p-5">
                            <h3 className="text-sm font-bold mb-3">Notifications & Alerts</h3>

                            <div className="space-y-2">
                                <div className="text-xs text-gray-600 py-2 border-b border-gray-100">
                                    KYC scan
                                </div>
                                <div className="text-xs text-gray-600 py-2 border-b border-gray-100">
                                    Trade notifications
                                </div>
                                <div className="text-xs text-gray-600 py-2">
                                    Email alerts
                                </div>
                            </div>

                            <button className="w-full mt-3 text-xs text-blue-600 hover:underline text-left">
                                Manage alerts
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
