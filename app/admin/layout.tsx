'use client'

import { ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, TrendingUp, Settings, LogOut, Menu, X, Bell, Search, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { signOut, useSession } from 'next-auth/react'
import { useState } from 'react'
import { Input } from '@/components/ui/input'

interface AdminLayoutProps {
    children: ReactNode
}

const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Trading', href: '/admin/trading', icon: TrendingUp },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
]

export default function AdminLayout({ children }: AdminLayoutProps) {
    const pathname = usePathname()
    const { data: session } = useSession()
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const handleSignOut = async () => {
        await signOut({ callbackUrl: '/auth/login' })
    }

    return (
        <div className="min-h-screen bg-[#F3F4F6] dark:bg-[#0B0C10] font-sans selection:bg-primary/20">
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
          fixed top-0 left-0 z-50 h-full w-72 bg-white/80 dark:bg-[#121212]/80 backdrop-blur-xl border-r border-gray-200/50 dark:border-gray-800/50
          transform transition-transform duration-300 ease-out shadow-2xl lg:shadow-none
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
            >
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="flex items-center justify-between p-8">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-lg shadow-primary/20">
                                <TrendingUp className="h-6 w-6 text-white" />
                            </div>
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                                TradingPro
                            </h1>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="lg:hidden hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                            onClick={() => setSidebarOpen(false)}
                        >
                            <X className="h-5 w-5" />
                        </Button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-6 space-y-2 py-6">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-4">Menu</p>
                        {navigation.map((item) => {
                            const isActive = pathname === item.href
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`
                    group flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200
                    ${isActive
                                            ? 'bg-primary text-white shadow-lg shadow-primary/25 translate-x-1'
                                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white hover:translate-x-1'
                                        }
                  `}
                                >
                                    <item.icon className={`h-5 w-5 transition-colors ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-primary'}`} />
                                    <span className="font-medium">{item.name}</span>
                                    {isActive && (
                                        <div className="ml-auto h-1.5 w-1.5 rounded-full bg-white/50" />
                                    )}
                                </Link>
                            )
                        })}
                    </nav>

                    {/* User Profile */}
                    <div className="p-6 border-t border-gray-200/50 dark:border-gray-800/50 bg-gray-50/50 dark:bg-gray-900/50">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="relative">
                                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-md ring-2 ring-white dark:ring-gray-800">
                                    {session?.user?.name?.[0] || 'U'}
                                </div>
                                <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-white dark:ring-gray-800" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
                                    {session?.user?.name || 'User'}
                                </p>
                                <p className="text-xs text-muted-foreground truncate">
                                    {session?.user?.email || 'user@example.com'}
                                </p>
                            </div>
                        </div>
                        <Button
                            onClick={handleSignOut}
                            variant="outline"
                            className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 border-red-200 dark:border-red-900/30"
                            size="sm"
                        >
                            <LogOut className="h-4 w-4 mr-2" />
                            Sign Out
                        </Button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="lg:pl-72 transition-all duration-300">
                {/* Top Bar */}
                <header className="sticky top-0 z-30 bg-white/80 dark:bg-[#0B0C10]/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50 px-6 py-4">
                    <div className="flex items-center justify-between max-w-7xl mx-auto">
                        <div className="flex items-center gap-4 lg:hidden">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setSidebarOpen(true)}
                                className="-ml-2"
                            >
                                <Menu className="h-6 w-6" />
                            </Button>
                            <span className="font-bold text-lg">TradingPro</span>
                        </div>

                        <div className="hidden lg:flex items-center gap-4 flex-1 max-w-md">
                            <div className="relative w-full">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="w-full bg-gray-100 dark:bg-gray-800/50 border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <Button variant="ghost" size="icon" className="rounded-full relative">
                                <Bell className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-900" />
                            </Button>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-6 lg:p-8 max-w-7xl mx-auto">
                    {children}
                </main>
            </div>
        </div>
    )
}
