'use client'

import { useSession } from 'next-auth/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Activity, CreditCard, DollarSign, Users, ArrowUpRight, ArrowDownRight, FileCheck, Clock, AlertCircle, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function AdminDashboard() {
    const { data: session } = useSession()

    const stats = [
        {
            title: 'Total Revenue',
            value: '$45,231.89',
            change: '+20.1% from last month',
            icon: DollarSign,
            trend: 'up',
            color: 'text-emerald-500',
            bgColor: 'bg-emerald-500/10',
        },
        {
            title: 'Active Traders',
            value: '2,350',
            change: '+180.1% from last month',
            icon: Activity,
            trend: 'up',
            color: 'text-blue-500',
            bgColor: 'bg-blue-500/10',
        },
        {
            title: 'Total Users',
            value: '12,234',
            change: '+19% from last month',
            icon: Users,
            trend: 'up',
            color: 'text-purple-500',
            bgColor: 'bg-purple-500/10',
        },
        {
            title: 'Market Activity',
            value: '573',
            change: '+201 since last hour',
            icon: Activity,
            trend: 'up',
            color: 'text-orange-500',
            bgColor: 'bg-orange-500/10',
        },
    ]

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Welcome Header */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600 to-indigo-600 p-8 text-white shadow-2xl">
                <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
                <div className="absolute bottom-0 left-0 -mb-10 -ml-10 h-64 w-64 rounded-full bg-black/10 blur-3xl" />

                <div className="relative z-10">
                    <h1 className="text-4xl font-bold mb-2">
                        Welcome back, {session?.user?.name?.split(' ')[0] || 'Admin'}! 👋
                    </h1>
                    <p className="text-indigo-100 text-lg max-w-2xl">
                        Here's what's happening with your trading platform today. You have 12 new verification requests pending review.
                    </p>
                    <div className="mt-6 flex gap-3">
                        <Button className="bg-white text-indigo-600 hover:bg-indigo-50 border-none shadow-lg shadow-black/10">
                            View Reports
                        </Button>
                        <Button variant="outline" className="bg-indigo-600/50 text-white border-white/20 hover:bg-indigo-600/70 backdrop-blur-sm">
                            Manage Users
                        </Button>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <Card key={stat.title} className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-[#121212]">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                {stat.title}
                            </CardTitle>
                            <div className={`p-2.5 rounded-xl ${stat.bgColor}`}>
                                <stat.icon className={`h-5 w-5 ${stat.color}`} />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                            <div className="flex items-center mt-1">
                                <div className={`flex items-center text-xs font-medium ${stat.trend === 'up' ? 'text-emerald-500' : 'text-red-500'}`}>
                                    {stat.trend === 'up' ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                                    <span className="text-muted-foreground">{stat.change}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Verified User Documents Section - Spans 2 columns */}
                <Card className="lg:col-span-2 border-none shadow-lg bg-white dark:bg-[#121212]">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle className="text-xl flex items-center gap-2">
                                <FileCheck className="h-5 w-5 text-primary" />
                                Document Verification
                            </CardTitle>
                            <CardDescription>
                                Recent user document submissions and their status
                            </CardDescription>
                        </div>
                        <Button variant="outline" size="sm" className="hidden sm:flex">
                            View All
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                { user: 'Alice Johnson', docType: 'Passport', status: 'Verified', date: '2 mins ago', id: 'DOC-001', avatar: 'A', color: 'bg-emerald-100 text-emerald-600' },
                                { user: 'Bob Smith', docType: 'Driver License', status: 'Pending', date: '15 mins ago', id: 'DOC-002', avatar: 'B', color: 'bg-amber-100 text-amber-600' },
                                { user: 'Charlie Brown', docType: 'ID Card', status: 'Rejected', date: '1 hour ago', id: 'DOC-003', avatar: 'C', color: 'bg-red-100 text-red-600' },
                                { user: 'David Wilson', docType: 'Passport', status: 'Verified', date: '2 hours ago', id: 'DOC-004', avatar: 'D', color: 'bg-blue-100 text-blue-600' },
                                { user: 'Eva Green', docType: 'Utility Bill', status: 'Pending', date: '3 hours ago', id: 'DOC-005', avatar: 'E', color: 'bg-purple-100 text-purple-600' },
                            ].map((doc, i) => (
                                <div key={i} className="group flex items-center justify-between p-4 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 hover:bg-white dark:hover:bg-gray-800 hover:shadow-md transition-all duration-200">
                                    <div className="flex items-center gap-4">
                                        <div className={`h-12 w-12 rounded-full ${doc.color} flex items-center justify-center font-bold text-lg shadow-sm`}>
                                            {doc.avatar}
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">{doc.user}</p>
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                <span className="font-mono bg-gray-200 dark:bg-gray-800 px-1.5 py-0.5 rounded text-[10px]">{doc.id}</span>
                                                <span>•</span>
                                                <span>{doc.docType}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-1">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${doc.status === 'Verified' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' :
                                                doc.status === 'Pending' ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400' :
                                                    'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400'
                                            }`}>
                                            {doc.status === 'Verified' && <CheckCircle2 className="h-3 w-3" />}
                                            {doc.status === 'Pending' && <Clock className="h-3 w-3" />}
                                            {doc.status === 'Rejected' && <AlertCircle className="h-3 w-3" />}
                                            {doc.status}
                                        </span>
                                        <span className="text-xs text-muted-foreground">{doc.date}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Activity / Market Overview - Spans 1 column */}
                <div className="space-y-6">
                    <Card className="border-none shadow-lg bg-white dark:bg-[#121212]">
                        <CardHeader>
                            <CardTitle className="text-lg">Market Overview</CardTitle>
                            <CardDescription>Top assets today</CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="divide-y divide-gray-100 dark:divide-gray-800">
                                {[
                                    { name: 'Bitcoin', symbol: 'BTC', price: '$43,256.78', change: '+5.2%', icon: '₿', color: 'bg-orange-100 text-orange-600' },
                                    { name: 'Ethereum', symbol: 'ETH', price: '$2,345.67', change: '+3.8%', icon: 'Ξ', color: 'bg-blue-100 text-blue-600' },
                                    { name: 'Solana', symbol: 'SOL', price: '$98.45', change: '+12.4%', icon: 'S', color: 'bg-purple-100 text-purple-600' },
                                    { name: 'Cardano', symbol: 'ADA', price: '$0.56', change: '-1.2%', icon: '₳', color: 'bg-blue-100 text-blue-600' },
                                ].map((asset, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className={`h-10 w-10 rounded-lg ${asset.color} flex items-center justify-center font-bold`}>
                                                {asset.icon}
                                            </div>
                                            <div>
                                                <p className="font-bold text-sm">{asset.name}</p>
                                                <p className="text-xs text-muted-foreground">{asset.symbol}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-sm">{asset.price}</p>
                                            <p className={`text-xs font-medium ${asset.change.startsWith('+') ? 'text-emerald-600' : 'text-red-600'}`}>
                                                {asset.change}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-lg bg-gradient-to-br from-gray-900 to-gray-800 text-white">
                        <CardHeader>
                            <CardTitle className="text-lg text-white">Pro Tips</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                                    <p className="text-sm font-medium">💡 Review pending documents daily to maintain compliance.</p>
                                </div>
                                <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                                    <p className="text-sm font-medium">🚀 Bitcoin is trending up! Check the trading volume.</p>
                                </div>
                            </div>
                            <Button className="w-full mt-4 bg-white text-gray-900 hover:bg-gray-100">
                                View Insights
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
