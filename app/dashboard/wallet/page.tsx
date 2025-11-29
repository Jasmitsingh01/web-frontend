'use client'

import { useState } from "react"
import { WalletOverview } from "@/components/dashboard/WalletOverview"
import { TransferFunds } from "@/components/dashboard/TransferFunds"
import { AccountDetails } from "@/components/dashboard/AccountDetails"
import { QRTransfer } from "@/components/dashboard/QRTransfer"
import { ExternalTransfer } from "@/components/dashboard/ExternalTransfer"
import { WalletActivity } from "@/components/dashboard/WalletActivity"
import { GiftCards } from "@/components/dashboard/GiftCards"
import { TradingLimits } from "@/components/dashboard/TradingLimits"
import { Modal } from "@/components/ui/modal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Wallet() {
    const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false)

    // Wallet data
    const walletData = {
        totalBalance: "$54,108.23",
        available: "$54,108.23",
        currency: "Crypto",
        accountHolder: "John Doe",
        pl: "+$12,345.67"
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
                            <Button
                                className="bg-emerald-500 text-white hover:bg-emerald-500/90"
                                onClick={() => setIsWithdrawModalOpen(true)}
                            >
                                Withdraw funds
                            </Button>
                        </div>
                    </div>
                    <p className="text-sm text-slate-400">Transfer amounts, balances, and payment portals</p>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-12 gap-6">
                    {/* Left Column */}
                    <div className="col-span-8 space-y-6">
                        {/* Wallet Overview */}
                        <WalletOverview data={walletData} />

                        {/* Transfer Funds */}
                        <TransferFunds />

                        {/* Account Holder Details */}
                        <AccountDetails info={accountInfo} />

                        {/* QR Code Transfers */}
                        <QRTransfer />

                        {/* External Transfer Available */}
                        <ExternalTransfer />

                        {/* Recent Activity */}
                        <WalletActivity transactions={transactions} />
                    </div>

                    {/* Right Column */}
                    <div className="col-span-4 space-y-6">
                        {/* Gift Cards */}
                        <GiftCards cards={giftCards} />

                        {/* Trading Limits */}
                        <TradingLimits limits={tradingLimits} />

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

            {/* Withdraw Modal */}
            <Modal
                isOpen={isWithdrawModalOpen}
                onClose={() => setIsWithdrawModalOpen(false)}
                title="Withdraw Funds"
            >
                <div className="space-y-4">
                    <p className="text-sm text-slate-400">Withdraw funds to your linked bank account or crypto wallet.</p>
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-slate-300">Amount (USD)</label>
                        <Input placeholder="0.00" className="bg-slate-900 border-white/10 text-white" />
                        <p className="text-xs text-slate-500">Available: {walletData.available}</p>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-slate-300">Destination</label>
                        <select className="w-full bg-slate-900 border border-white/10 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50">
                            <option>Bank Account (****1234)</option>
                            <option>Crypto Wallet</option>
                        </select>
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                        <Button variant="ghost" onClick={() => setIsWithdrawModalOpen(false)}>Cancel</Button>
                        <Button className="bg-emerald-500 hover:bg-emerald-600 text-white" onClick={() => {
                            alert("Withdrawal initiated!");
                            setIsWithdrawModalOpen(false);
                        }}>Confirm Withdrawal</Button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
