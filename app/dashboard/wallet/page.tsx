'use client'

import { useState, useEffect } from "react"
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
import { api } from "@/lib/api"

export default function Wallet() {
    const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false)
    const [isDepositModalOpen, setIsDepositModalOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [token, setToken] = useState<string | null>(null)

    // Form states
    const [withdrawAmount, setWithdrawAmount] = useState("")
    const [depositAmount, setDepositAmount] = useState("")
    const [paymentMethod, setPaymentMethod] = useState("bank_transfer")

    // Dynamic data
    const [balance, setBalance] = useState<any>(null)
    const [transactions, setTransactions] = useState<any[]>([])
    const [userProfile, setUserProfile] = useState<any>(null)

    // Load token
    useEffect(() => {
        const storedToken = localStorage.getItem('authToken')
        if (storedToken) {
            setToken(storedToken)
        } else {
            window.location.href = '/auth/login'
        }
    }, [])

    // Fetch data
    useEffect(() => {
        if (!token) return

        const fetchData = async () => {
            try {
                setIsLoading(true)

                // Fetch balance
                const balanceResult = await api.user.getBalance(token)
                setBalance(balanceResult.userBalance)

                // Fetch transactions
                const transactionsResult = await api.transactions.getAll(token, { page: 1, limit: 10 })
                setTransactions(transactionsResult.transactions.transactions)

                // Fetch user profile
                const profileResult = await api.user.getProfile(token)
                setUserProfile(profileResult.userProfile)

            } catch (err: any) {
                console.error('Error fetching wallet data:', err)
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [token])

    const handleWithdraw = async () => {
        if (!token || !withdrawAmount) return

        try {
            await api.transactions.createWithdrawal(token, {
                amount: parseFloat(withdrawAmount),
                currency: balance?.currency || 'USD',
                paymentMethod: paymentMethod as any,
                bankDetails: {
                    bankName: "User Bank",
                    accountNumber: "****1234"
                }
            })

            alert("Withdrawal request submitted successfully!")
            setIsWithdrawModalOpen(false)
            setWithdrawAmount("")

            // Refresh data
            const balanceResult = await api.user.getBalance(token)
            setBalance(balanceResult.userBalance)
            const transactionsResult = await api.transactions.getAll(token, { page: 1, limit: 10 })
            setTransactions(transactionsResult.transactions.transactions)
        } catch (err: any) {
            alert(err.message || "Failed to create withdrawal request")
        }
    }

    const handleDeposit = async () => {
        if (!token || !depositAmount) return

        try {
            await api.transactions.createDeposit(token, {
                amount: parseFloat(depositAmount),
                currency: balance?.currency || 'USD',
                paymentMethod: paymentMethod as any,
                bankDetails: {
                    bankName: "User Bank",
                    accountNumber: "****1234",
                    transactionId: `TXN${Date.now()}`
                },
                proofDocument: ""
            })

            alert("Deposit request submitted successfully!")
            setIsDepositModalOpen(false)
            setDepositAmount("")

            // Refresh data
            const balanceResult = await api.user.getBalance(token)
            setBalance(balanceResult.userBalance)
            const transactionsResult = await api.transactions.getAll(token, { page: 1, limit: 10 })
            setTransactions(transactionsResult.transactions.transactions)
        } catch (err: any) {
            alert(err.message || "Failed to create deposit request")
        }
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950 flex items-center justify-center">
                <div className="text-white text-xl">Loading wallet...</div>
            </div>
        )
    }

    // Wallet data
    const walletData = {
        totalBalance: `$${balance?.totalBalance?.toFixed(2) || '0.00'}`,
        available: `$${balance?.availableBalance?.toFixed(2) || '0.00'}`,
        currency: balance?.currency || 'USD',
        accountHolder: userProfile?.fullname || "User",
        pl: `+$${balance?.totalProfit?.toFixed(2) || '0.00'}`
    }

    // Format transactions
    const formattedTransactions = transactions.map((t: any) => ({
        type: t.type.charAt(0).toUpperCase() + t.type.slice(1),
        date: new Date(t.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        amount: `${t.type === 'deposit' ? '+' : '-'}$${t.amount.toFixed(2)}`
    }))

    // Account holder info
    const accountInfo = {
        name: userProfile?.fullname || "User",
        accountNumber: "****1234",
        routingNumber: "****5678",
        bankName: "Bank"
    }

    // Gift cards (static for now)
    const giftCards = [
        { name: "Apple gift card", balance: "$100.00", expiry: "Expires in 2 years" },
        { name: "Amazon card", balance: "$250.00", expiry: "Expires in 3 years" }
    ]

    // Trading limits (static for now)
    const tradingLimits = {
        daily: "$10,000.00",
        monthly: "$100,000.00",
        used: `$${balance?.totalDeposited?.toFixed(2) || '0.00'}`
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950 text-white">
            <div className="max-w-[1200px] mx-auto p-6">
                {/* Header */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                        <h1 className="text-2xl font-bold text-white">Wallet</h1>
                        <div className="flex items-center gap-2">
                            <button
                                className="px-4 py-1.5 bg-white/5 border border-white/10 rounded text-sm font-medium hover:bg-white/10 transition text-slate-300 hover:text-white"
                                onClick={() => setIsDepositModalOpen(true)}
                            >
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
                        <WalletActivity transactions={formattedTransactions} />
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
                        <Input
                            placeholder="0.00"
                            className="bg-slate-900 border-white/10 text-white"
                            value={withdrawAmount}
                            onChange={(e) => setWithdrawAmount(e.target.value)}
                            type="number"
                        />
                        <p className="text-xs text-slate-500">Available: {walletData.available}</p>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-slate-300">Payment Method</label>
                        <select
                            className="w-full bg-slate-900 border border-white/10 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >
                            <option value="bank_transfer">Bank Transfer</option>
                            <option value="crypto">Crypto Wallet</option>
                            <option value="paypal">PayPal</option>
                        </select>
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                        <Button variant="ghost" onClick={() => setIsWithdrawModalOpen(false)}>Cancel</Button>
                        <Button
                            className="bg-emerald-500 hover:bg-emerald-600 text-white"
                            onClick={handleWithdraw}
                            disabled={!withdrawAmount || parseFloat(withdrawAmount) <= 0}
                        >
                            Confirm Withdrawal
                        </Button>
                    </div>
                </div>
            </Modal>

            {/* Deposit Modal */}
            <Modal
                isOpen={isDepositModalOpen}
                onClose={() => setIsDepositModalOpen(false)}
                title="Add Funds"
            >
                <div className="space-y-4">
                    <p className="text-sm text-slate-400">Add funds to your wallet securely.</p>
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-slate-300">Amount (USD)</label>
                        <Input
                            placeholder="0.00"
                            className="bg-slate-900 border-white/10 text-white"
                            value={depositAmount}
                            onChange={(e) => setDepositAmount(e.target.value)}
                            type="number"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-slate-300">Payment Method</label>
                        <select
                            className="w-full bg-slate-900 border border-white/10 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >
                            <option value="bank_transfer">Bank Transfer</option>
                            <option value="credit_card">Credit Card</option>
                            <option value="debit_card">Debit Card</option>
                            <option value="crypto">Crypto</option>
                        </select>
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                        <Button variant="ghost" onClick={() => setIsDepositModalOpen(false)}>Cancel</Button>
                        <Button
                            className="bg-emerald-500 hover:bg-emerald-600 text-white"
                            onClick={handleDeposit}
                            disabled={!depositAmount || parseFloat(depositAmount) <= 0}
                        >
                            Confirm Deposit
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
