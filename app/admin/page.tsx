'use client'

import { useState } from "react"
import Link from "next/link"
import {
    Users,
    DollarSign,
    TrendingUp,
    FileText,
    Search,
    Filter,
    MoreVertical,
    ArrowUpRight,
    ArrowDownRight,
    CheckCircle,
    Clock,
    XCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState<"overview" | "users" | "verifications" | "payments" | "investments">("overview")
    const [searchQuery, setSearchQuery] = useState("")

    // Mock data
    const stats = {
        totalUsers: 1247,
        pendingVerifications: 23,
        totalInvestments: "$2,450,000",
        pendingPayments: 15,
        activeUsers: 892,
        revenue: "$145,231"
    }

    return (
        <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-blue-900 dark:text-blue-100">
                            Total Users
                        </CardTitle>
                        <div className="p-2.5 rounded-xl bg-blue-500/20">
                            <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-blue-900 dark:text-blue-100">{stats.totalUsers}</div>
                        <div className="flex items-center mt-1">
                            <ArrowUpRight className="h-3 w-3 mr-1 text-emerald-500" />
                            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">+12.5% from last month</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950/20 dark:to-amber-900/20">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-amber-900 dark:text-amber-100">
                            Pending Verifications
                        </CardTitle>
                        <div className="p-2.5 rounded-xl bg-amber-500/20">
                            <FileText className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-amber-900 dark:text-amber-100">{stats.pendingVerifications}</div>
                        <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">Requires review</p>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/20 dark:to-emerald-900/20">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-emerald-900 dark:text-emerald-100">
                            Total Investments
                        </CardTitle>
                        <div className="p-2.5 rounded-xl bg-emerald-500/20">
                            <TrendingUp className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-emerald-900 dark:text-emerald-100">{stats.totalInvestments}</div>
                        <div className="flex items-center mt-1">
                            <ArrowUpRight className="h-3 w-3 mr-1 text-emerald-500" />
                            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">+8.2% this week</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-purple-900 dark:text-purple-100">
                            Pending Payments
                        </CardTitle>
                        <div className="p-2.5 rounded-xl bg-purple-500/20">
                            <DollarSign className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-purple-900 dark:text-purple-100">{stats.pendingPayments}</div>
                        <p className="text-xs text-purple-700 dark:text-purple-300 mt-1">Awaiting approval</p>
                    </CardContent>
                </Card>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 dark:border-gray-800">
                <div className="flex gap-1">
                    {[
                        { id: "overview", label: "Overview" },
                        { id: "users", label: "Users" },
                        { id: "verifications", label: "Verifications" },
                        { id: "payments", label: "Payments" },
                        { id: "investments", label: "Investments" }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`px-6 py-3 text-sm font-medium transition-all relative ${activeTab === tab.id
                                    ? "text-primary"
                                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                                }`}
                        >
                            {tab.label}
                            {activeTab === tab.id && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full" />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab Content */}
            <div>
                {activeTab === "overview" && <OverviewTab />}
                {activeTab === "users" && <UsersTab searchQuery={searchQuery} setSearchQuery={setSearchQuery} />}
                {activeTab === "verifications" && <VerificationsTab />}
                {activeTab === "payments" && <PaymentsTab />}
                {activeTab === "investments" && <InvestmentsTab />}
            </div>
        </div>
    )
}

function OverviewTab() {
    return (
        <div className="grid gap-6 lg:grid-cols-2">
            <Card className="border-none shadow-lg">
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Latest actions on the platform</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[
                            { action: "New user registration", user: "John Doe", email: "john@example.com", time: "2 min ago", icon: Users, color: "text-blue-500" },
                            { action: "KYC verification submitted", user: "Jane Smith", email: "jane@example.com", time: "15 min ago", icon: FileText, color: "text-amber-500" },
                            { action: "Payment received", user: "Mike Johnson", amount: "$5,000", time: "1 hour ago", icon: DollarSign, color: "text-emerald-500" },
                        ].map((activity, i) => (
                            <div key={i} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                <div className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-800 ${activity.color}`}>
                                    <activity.icon className="w-5 h-5" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-sm">{activity.action}</p>
                                    <p className="text-xs text-muted-foreground truncate">
                                        {activity.user} {activity.email && `- ${activity.email}`} {activity.amount}
                                    </p>
                                </div>
                                <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
                <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Common administrative tasks</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-3">
                        <Link href="/admin/verifications">
                            <Button className="w-full justify-start" variant="outline">
                                <FileText className="w-4 h-4 mr-2" />
                                Review Pending Verifications (23)
                            </Button>
                        </Link>
                        <Link href="/admin/payments">
                            <Button className="w-full justify-start" variant="outline">
                                <DollarSign className="w-4 h-4 mr-2" />
                                Approve Payments (15)
                            </Button>
                        </Link>
                        <Link href="/admin/users">
                            <Button className="w-full justify-start" variant="outline">
                                <Users className="w-4 h-4 mr-2" />
                                Manage Users
                            </Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

function UsersTab({ searchQuery, setSearchQuery }: { searchQuery: string; setSearchQuery: (q: string) => void }) {
    const users = [
        { id: 1, name: "John Doe", email: "john@example.com", balance: "$12,500", status: "verified", joinedDate: "2024-01-15" },
        { id: 2, name: "Jane Smith", email: "jane@example.com", balance: "$8,750", status: "pending", joinedDate: "2024-02-20" },
        { id: 3, name: "Mike Johnson", email: "mike@example.com", balance: "$25,000", status: "verified", joinedDate: "2024-01-10" },
        { id: 4, name: "Sarah Williams", email: "sarah@example.com", balance: "$15,300", status: "rejected", joinedDate: "2024-03-05" },
    ]

    return (
        <Card className="border-none shadow-lg">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>All Users</CardTitle>
                        <CardDescription>Manage and monitor user accounts</CardDescription>
                    </div>
                    <div className="flex gap-2">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder="Search users..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 w-64"
                            />
                        </div>
                        <Button variant="outline" size="icon">
                            <Filter className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200 dark:border-gray-800">
                                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">User</th>
                                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Balance</th>
                                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Joined</th>
                                <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id} className="border-b border-gray-100 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                                    <td className="py-4 px-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-bold">
                                                {user.name[0]}
                                            </div>
                                            <div>
                                                <p className="font-medium text-sm">{user.name}</p>
                                                <p className="text-xs text-muted-foreground">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4 font-semibold">{user.balance}</td>
                                    <td className="py-4 px-4">
                                        <Badge
                                            variant={user.status === "verified" ? "default" : user.status === "pending" ? "secondary" : "destructive"}
                                            className="capitalize"
                                        >
                                            {user.status === "verified" && <CheckCircle className="w-3 h-3 mr-1" />}
                                            {user.status === "pending" && <Clock className="w-3 h-3 mr-1" />}
                                            {user.status === "rejected" && <XCircle className="w-3 h-3 mr-1" />}
                                            {user.status}
                                        </Badge>
                                    </td>
                                    <td className="py-4 px-4 text-sm text-muted-foreground">{user.joinedDate}</td>
                                    <td className="py-4 px-4 text-right">
                                        <Link href={`/admin/users/${user.id}`}>
                                            <Button size="sm" variant="ghost">
                                                View Details
                                            </Button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    )
}

function VerificationsTab() {
    const verifications = [
        { id: 1, userName: "Jane Smith", email: "jane@example.com", submittedDate: "2024-03-15", status: "pending", documents: 5 },
        { id: 2, userName: "Robert Brown", email: "robert@example.com", submittedDate: "2024-03-14", status: "pending", documents: 5 },
        { id: 3, userName: "Emily Davis", email: "emily@example.com", submittedDate: "2024-03-13", status: "under_review", documents: 5 },
    ]

    return (
        <Card className="border-none shadow-lg">
            <CardHeader>
                <CardTitle>Pending Verifications</CardTitle>
                <CardDescription>Review and approve user KYC documents</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {verifications.map((verification) => (
                        <div key={verification.id} className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-primary/50 transition-colors">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold">
                                        {verification.userName[0]}
                                    </div>
                                    <div>
                                        <p className="font-medium">{verification.userName}</p>
                                        <p className="text-sm text-muted-foreground">{verification.email}</p>
                                    </div>
                                </div>
                                <Badge variant="secondary" className="capitalize">
                                    {verification.status.replace("_", " ")}
                                </Badge>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-muted-foreground">
                                    <p>Submitted: {verification.submittedDate}</p>
                                    <p>Documents: {verification.documents} files</p>
                                </div>
                                <Link href={`/admin/verifications/${verification.id}`}>
                                    <Button size="sm">
                                        Review Documents
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

function PaymentsTab() {
    const payments = [
        { id: 1, userName: "Mike Johnson", amount: "$5,000", method: "Bank Transfer", status: "pending", date: "2024-03-15 10:30 AM" },
        { id: 2, userName: "Sarah Williams", amount: "$10,000", method: "Wire Transfer", status: "pending", date: "2024-03-15 09:15 AM" },
        { id: 3, userName: "John Doe", amount: "$2,500", method: "Bank Transfer", status: "verified", date: "2024-03-14 03:45 PM" },
    ]

    return (
        <Card className="border-none shadow-lg">
            <CardHeader>
                <CardTitle>Payment Verifications</CardTitle>
                <CardDescription>Approve or reject payment submissions</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {payments.map((payment) => (
                        <div key={payment.id} className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-primary/50 transition-colors">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold">
                                        {payment.userName[0]}
                                    </div>
                                    <div>
                                        <p className="font-medium">{payment.userName}</p>
                                        <p className="text-sm text-muted-foreground">{payment.method}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{payment.amount}</p>
                                    <Badge variant={payment.status === "verified" ? "default" : "secondary"}>
                                        {payment.status}
                                    </Badge>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="text-xs text-muted-foreground">{payment.date}</p>
                                {payment.status === "pending" && (
                                    <Link href={`/admin/payments/${payment.id}`}>
                                        <Button size="sm">
                                            Verify Payment
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

function InvestmentsTab() {
    const investments = [
        { id: 1, userName: "John Doe", asset: "Bitcoin (BTC)", amount: "$15,000", quantity: "0.5 BTC", date: "2024-03-15", status: "active", profit: "+$2,500" },
        { id: 2, userName: "Mike Johnson", asset: "Ethereum (ETH)", amount: "$8,500", quantity: "3.2 ETH", date: "2024-03-14", status: "active", profit: "+$1,200" },
        { id: 3, userName: "Jane Smith", asset: "Apple Stock (AAPL)", amount: "$12,000", quantity: "100 shares", date: "2024-03-13", status: "active", profit: "+$4,800" },
        { id: 4, userName: "Sarah Williams", asset: "Tesla Stock (TSLA)", amount: "$20,000", quantity: "80 shares", date: "2024-03-12", status: "closed", profit: "-$1,500" },
    ]

    return (
        <Card className="border-none shadow-lg">
            <CardHeader>
                <CardTitle>User Investments</CardTitle>
                <CardDescription>Track all user investment activities</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200 dark:border-gray-800">
                                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">User</th>
                                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Asset</th>
                                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Amount</th>
                                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Quantity</th>
                                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Profit/Loss</th>
                                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {investments.map((investment) => (
                                <tr key={investment.id} className="border-b border-gray-100 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                                    <td className="py-4 px-4 font-medium">{investment.userName}</td>
                                    <td className="py-4 px-4">{investment.asset}</td>
                                    <td className="py-4 px-4 font-semibold text-emerald-600 dark:text-emerald-400">{investment.amount}</td>
                                    <td className="py-4 px-4 text-muted-foreground">{investment.quantity}</td>
                                    <td className="py-4 px-4">
                                        <span className={investment.profit.startsWith("+") ? "text-emerald-600 dark:text-emerald-400 font-semibold" : "text-red-600 dark:text-red-400 font-semibold"}>
                                            {investment.profit}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4">
                                        <Badge variant={investment.status === "active" ? "default" : "secondary"} className="capitalize">
                                            {investment.status}
                                        </Badge>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    )
}
