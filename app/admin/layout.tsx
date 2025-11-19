'use client'

import { ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, TrendingUp, Settings, LogOut, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { signOut, useSession } from 'next-auth/react'
import { useState } from 'react'

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
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
          fixed top-0 left-0 z-50 h-full w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
            >
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                            Trading Pro
                        </h1>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="lg:hidden"
                            onClick={() => setSidebarOpen(false)}
                        >
                            <X className="h-5 w-5" />
                        </Button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4 space-y-2">
                        {navigation.map((item) => {
                            const isActive = pathname === item.href
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                    ${isActive
                                            ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                                            : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                                        }
                  `}
                                >
                                    <item.icon className="h-5 w-5" />
                                    <span className="font-medium">{item.name}</span>
                                </Link>
                            )
                        })}
                    </nav>

                    {/* User Profile */}
                    <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                        <Card className="p-4">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-semibold">
                                    {session?.user?.name?.[0] || 'U'}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate">
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
                                className="w-full"
                                size="sm"
                            >
                                <LogOut className="h-4 w-4 mr-2" />
                                Sign Out
                            </Button>
                        </Card>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="lg:pl-64">
                {/* Mobile Header */}
                <header className="lg:hidden sticky top-0 z-30 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-4">
                    <div className="flex items-center justify-between">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <Menu className="h-5 w-5" />
                        </Button>
                        <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                            Trading Pro
                        </h1>
                        <div className="w-10" /> {/* Spacer for centering */}
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    )
}
