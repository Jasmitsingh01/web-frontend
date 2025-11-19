'use client'

import { useSession } from 'next-auth/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, Users, DollarSign, Activity } from 'lucide-react'

export default function AdminDashboard() {
    const { data: session } = useSession()

    const stats = [
        {
            title: 'Total Revenue',
            value: '$45,231.89',
            change: '+20.1% from last month',
            icon: DollarSign,
            color: 'text-green-600',
            bgColor: 'bg-green-100 dark:bg-green-900/20',
        },
        {
            title: 'Active Trades',
            value: '2,350',
            change: '+180.1% from last month',
            icon: TrendingUp,
            color: 'text-blue-600',
            bgColor: 'bg-blue-100 dark:bg-blue-900/20',
        },
        {
            title: 'Total Users',
            value: '12,234',
            change: '+19% from last month',
            icon: Users,
            color: 'text-purple-600',
            bgColor: 'bg-purple-100 dark:bg-purple-900/20',
        },
        {
            title: 'Market Activity',
            value: '573',
            change: '+201 since last hour',
            icon: Activity,
            color: 'text-orange-600',
            bgColor: 'bg-orange-100 dark:bg-orange-900/20',
        },
    ]

    return (
        <div className="space-y-8 p-8 min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            {/* Welcome Header */}
            <div className="relative">
                <div className="absolute top-0 left-0 w-full h-full bg-white/40 dark:bg-black/40 backdrop-blur-xl rounded-3xl -z-10" />
                <div className="p-6 rounded-3xl border border-white/20 shadow-xl">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
                        Welcome back, {session?.user?.name?.split(' ')[0] || 'Admin'}! 👋
                    </h1>
                    <p className="text-muted-foreground mt-2 text-lg">
                        Here's what's happening with your trading platform today.
                    </p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <Card key={stat.title} className="hover:shadow-xl transition-all duration-300 border-none shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                {stat.title}
                            </CardTitle>
                            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                                <stat.icon className={`h-4 w-4 ${stat.color}`} />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-muted-foreground mt-1">
                                {stat.change}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Verified User Documents Section */}
            <Card className="border-none shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Users className="h-6 w-6 text-primary" />
                        Verified User Documents
                    </CardTitle>
                    <CardDescription>
                        Recent document verifications and status
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[
                            { user: 'Alice Johnson', docType: 'Passport', status: 'Verified', date: '2023-10-25', id: 'DOC-001' },
                            { user: 'Bob Smith', docType: 'Driver License', status: 'Pending', date: '2023-10-26', id: 'DOC-002' },
                            { user: 'Charlie Brown', docType: 'ID Card', status: 'Rejected', date: '2023-10-24', id: 'DOC-003' },
                            { user: 'David Wilson', docType: 'Passport', status: 'Verified', date: '2023-10-23', id: 'DOC-004' },
                        ].map((doc, i) => (
                            <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white dark:bg-gray-900 shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                        {doc.user.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-semibold">{doc.user}</p>
                                        <p className="text-xs text-muted-foreground">ID: {doc.id} • {doc.docType}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-sm text-muted-foreground hidden md:block">{doc.date}</span>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${doc.status === 'Verified' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                                            doc.status === 'Pending' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                                                'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                        }`}>
                                        {doc.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Recent Activity */}
            <div className="grid gap-6 lg:grid-cols-2">
                <Card className="border-none shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle>Recent Trades</CardTitle>
                        <CardDescription>
                            Your latest trading activity
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                { pair: 'BTC/USD', amount: '+$1,234.56', time: '2 minutes ago', type: 'buy' },
                                { pair: 'ETH/USD', amount: '-$987.65', time: '15 minutes ago', type: 'sell' },
                                { pair: 'SOL/USD', amount: '+$543.21', time: '1 hour ago', type: 'buy' },
                            ].map((trade, i) => (
                                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                                    <div>
                                        <p className="font-medium">{trade.pair}</p>
                                        <p className="text-xs text-muted-foreground">{trade.time}</p>
                                    </div>
                                    <div className={`font-semibold ${trade.type === 'buy' ? 'text-green-600' : 'text-red-600'}`}>
                                        {trade.amount}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle>Market Overview</CardTitle>
                        <CardDescription>
                            Top performing assets today
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                { name: 'Bitcoin', symbol: 'BTC', price: '$43,256.78', change: '+5.2%' },
                                { name: 'Ethereum', symbol: 'ETH', price: '$2,345.67', change: '+3.8%' },
                                { name: 'Solana', symbol: 'SOL', price: '$98.45', change: '+12.4%' },
                            ].map((asset, i) => (
                                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                                    <div>
                                        <p className="font-medium">{asset.name}</p>
                                        <p className="text-xs text-muted-foreground">{asset.symbol}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold">{asset.price}</p>
                                        <p className="text-xs text-green-600">{asset.change}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
