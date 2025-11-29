'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, DollarSign, TrendingUp, Clock, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Modal } from "@/components/ui/modal"

export default function UserDetailPage({ params }: { params: { id: string } }) {
    const router = useRouter()
    const [isAddBalanceModalOpen, setIsAddBalanceModalOpen] = useState(false)
    const [balanceAmount, setBalanceAmount] = useState("")
    const [balanceNote, setBalanceNote] = useState("")

    // Mock user data
    const user = {
        id: params.id,
        name: "John Doe",
        email: "john@example.com",
        phone: "+1 (555) 123-4567",
        balance: "$12,500",
        status: "verified",
        joinedDate: "2024-01-15",
        lastActive: "2024-03-15 10:30 AM",
        totalInvested: "$45,000",
        totalProfit: "$8,500"
    }

    const investments = [
        { id: 1, asset: "Bitcoin (BTC)", amount: "$15,000", quantity: "0.5 BTC", date: "2024-03-10", status: "active", profit: "+$2,500" },
        { id: 2, asset: "Ethereum (ETH)", amount: "$10,000", quantity: "4.2 ETH", date: "2024-03-05", status: "active", profit: "+$1,200" },
        { id: 3, asset: "Apple Stock (AAPL)", amount: "$20,000", quantity: "150 shares", date: "2024-02-20", status: "active", profit: "+$4,800" },
    ]

    const transactions = [
        { id: 1, type: "deposit", amount: "$5,000", date: "2024-03-15", status: "completed" },
        { id: 2, type: "withdrawal", amount: "$2,000", date: "2024-03-10", status: "completed" },
        { id: 3, type: "investment", amount: "$15,000", date: "2024-03-10", status: "completed" },
    ]

    const handleAddBalance = () => {
        if (balanceAmount) {
            alert(`Added $${balanceAmount} to ${user.name}'s account\nNote: ${balanceNote}`)
            setIsAddBalanceModalOpen(false)
            setBalanceAmount("")
            setBalanceNote("")
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950 text-white">
            <div className="max-w-7xl mx-auto p-6">
                {/* Header */}
                <div className="mb-8">
                    <Button
                        variant="ghost"
                        onClick={() => router.back()}
                        className="mb-4 text-slate-400 hover:text-white"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Users
                    </Button>
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
                            <p className="text-slate-400">{user.email}</p>
                        </div>
                        <Badge variant={user.status === "verified" ? "default" : "neutral"}>
                            {user.status}
                        </Badge>
                    </div>
                </div>

                {/* User Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm border border-white/10 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-2">
                            <DollarSign className="w-6 h-6 text-emerald-400" />
                        </div>
                        <p className="text-2xl font-bold">{user.balance}</p>
                        <p className="text-sm text-slate-400">Current Balance</p>
                    </div>

                    <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm border border-white/10 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-2">
                            <TrendingUp className="w-6 h-6 text-blue-400" />
                        </div>
                        <p className="text-2xl font-bold">{user.totalInvested}</p>
                        <p className="text-sm text-slate-400">Total Invested</p>
                    </div>

                    <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm border border-white/10 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-2">
                            <TrendingUp className="w-6 h-6 text-emerald-400" />
                        </div>
                        <p className="text-2xl font-bold text-emerald-400">{user.totalProfit}</p>
                        <p className="text-sm text-slate-400">Total Profit</p>
                    </div>

                    <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm border border-white/10 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-2">
                            <Clock className="w-6 h-6 text-purple-400" />
                        </div>
                        <p className="text-sm font-medium">{user.lastActive}</p>
                        <p className="text-sm text-slate-400">Last Active</p>
                    </div>
                </div>

                {/* Actions */}
                <div className="mb-8">
                    <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm border border-white/10 rounded-lg p-6">
                        <h2 className="text-xl font-bold mb-4">Admin Actions</h2>
                        <div className="flex gap-3">
                            <Button
                                onClick={() => setIsAddBalanceModalOpen(true)}
                                className="bg-emerald-500 hover:bg-emerald-600"
                            >
                                <DollarSign className="w-4 h-4 mr-2" />
                                Add Balance
                            </Button>
                            <Button variant="outline">
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Verify User
                            </Button>
                            <Button variant="outline" className="text-red-400 border-red-400/50 hover:bg-red-500/10">
                                <XCircle className="w-4 h-4 mr-2" />
                                Suspend Account
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Investments */}
                    <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm border border-white/10 rounded-lg p-6">
                        <h2 className="text-xl font-bold mb-4">Active Investments</h2>
                        <div className="space-y-4">
                            {investments.map((investment) => (
                                <div key={investment.id} className="p-4 bg-white/5 rounded-lg">
                                    <div className="flex items-center justify-between mb-2">
                                        <p className="font-medium">{investment.asset}</p>
                                        <Badge variant="default">{investment.status}</Badge>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <div>
                                            <p className="text-slate-400">Amount: {investment.amount}</p>
                                            <p className="text-slate-400">Quantity: {investment.quantity}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-emerald-400 font-medium">{investment.profit}</p>
                                            <p className="text-xs text-slate-500">{investment.date}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Transaction History */}
                    <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm border border-white/10 rounded-lg p-6">
                        <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
                        <div className="space-y-4">
                            {transactions.map((transaction) => (
                                <div key={transaction.id} className="p-4 bg-white/5 rounded-lg">
                                    <div className="flex items-center justify-between mb-2">
                                        <div>
                                            <p className="font-medium capitalize">{transaction.type}</p>
                                            <p className="text-sm text-slate-400">{transaction.date}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className={`font-bold ${transaction.type === "deposit" ? "text-emerald-400" : transaction.type === "withdrawal" ? "text-red-400" : "text-blue-400"}`}>
                                                {transaction.type === "withdrawal" ? "-" : "+"}{transaction.amount}
                                            </p>
                                            <Badge variant={transaction.status === "completed" ? "default" : "neutral"}>
                                                {transaction.status}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* User Information */}
                <div className="mt-6 bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm border border-white/10 rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-4">User Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-slate-400 mb-1">Full Name</p>
                            <p className="font-medium">{user.name}</p>
                        </div>
                        <div>
                            <p className="text-sm text-slate-400 mb-1">Email</p>
                            <p className="font-medium">{user.email}</p>
                        </div>
                        <div>
                            <p className="text-sm text-slate-400 mb-1">Phone</p>
                            <p className="font-medium">{user.phone}</p>
                        </div>
                        <div>
                            <p className="text-sm text-slate-400 mb-1">Joined Date</p>
                            <p className="font-medium">{user.joinedDate}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Balance Modal */}
            <Modal
                isOpen={isAddBalanceModalOpen}
                onClose={() => setIsAddBalanceModalOpen(false)}
                title="Add Balance to User Account"
            >
                <div className="space-y-4">
                    <div>
                        <label className="text-xs font-medium text-slate-300 block mb-2">Amount ($)</label>
                        <Input
                            type="number"
                            placeholder="Enter amount"
                            value={balanceAmount}
                            onChange={(e) => setBalanceAmount(e.target.value)}
                            className="bg-slate-900 border-white/10 text-white"
                        />
                    </div>
                    <div>
                        <label className="text-xs font-medium text-slate-300 block mb-2">Note (Optional)</label>
                        <Input
                            type="text"
                            placeholder="Add a note for this transaction"
                            value={balanceNote}
                            onChange={(e) => setBalanceNote(e.target.value)}
                            className="bg-slate-900 border-white/10 text-white"
                        />
                    </div>
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                        <p className="text-xs text-blue-400">
                            This will add ${balanceAmount || "0"} to {user.name}'s account balance.
                        </p>
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                        <Button variant="ghost" onClick={() => setIsAddBalanceModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleAddBalance}
                            disabled={!balanceAmount}
                            className="bg-emerald-500 hover:bg-emerald-600 text-white"
                        >
                            Add Balance
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
