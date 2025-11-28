'use client'

import * as Avatar from '@radix-ui/react-avatar'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  ChartLine,
  LayoutDashboard,
  Newspaper,
  PieChart,
  Settings,
  TrendingUp,
  LogOut,
  CreditCard, // icon for wallet
} from 'lucide-react'
import { Button } from '../ui/button'

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Trading', href: '/dashboard/trading', icon: TrendingUp },
  { label: 'Portfolio', href: '/dashboard/portfolio', icon: PieChart },
  { label: 'Market', href: '/dashboard/market', icon: ChartLine },
  { label: 'News', href: '/dashboard/news', icon: Newspaper },
  { label: 'Wallet', href: '/dashboard/wallet', icon: CreditCard }, // new Wallet tab
]

const Navbar = () => {
  const pathname = usePathname()

  return (
    <aside className=" flex h-screen w-64 flex-col border-r border-border bg-gradient-to-b from-[#020817] via-[#020617] to-black/95 text-foreground">
      {/* Brand + user */}
      <div className="flex items-center gap-3 border-b border-white/5 px-4 py-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-500/10 ring-1 ring-emerald-500/40">
          <Avatar.Root className="h-9 w-9 overflow-hidden rounded-full">
            <Avatar.Image
              src="https://github.com/shadcn.png"
              className="h-full w-full object-cover"
            />
            <Avatar.Fallback className="flex h-full w-full items-center justify-center bg-emerald-500 text-xs font-semibold text-white">
              JD
            </Avatar.Fallback>
          </Avatar.Root>
        </div>
        <div className="flex flex-col">
          <p className="text-sm font-semibold tracking-tight">John Doe</p>
          <p className="text-[11px] text-muted-foreground">
            john.doe@example.com
          </p>
        </div>
      </div>

      {/* Balance / equity quick info */}
      <div className="border-b border-white/5 px-4 py-3">
        <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          Account equity
        </p>
        <p className="mt-1 text-lg font-semibold">$48,920.12</p>
        <p className="text-xs text-emerald-400">+3.21% today</p>
      </div>

      {/* Main navigation */}
      <nav className="flex-1 overflow-y-auto px-2 py-4">
        <p className="mb-2 px-2 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Trading
        </p>
        <div className="flex flex-col gap-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? 'default' : 'ghost'}
                  size="sm"
                  className={`w-full justify-start gap-2 rounded-lg px-2 text-sm ${
                    isActive
                      ? 'bg-emerald-500 text-white hover:bg-emerald-500/90'
                      : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
                  }`}
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-md bg-white/5">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span>{item.label}</span>
                </Button>
              </Link>
            )
          })}
        </div>

        {/* Secondary section */}
        <div className="mt-6">
          <p className="mb-2 px-2 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Preferences
          </p>
          <Link href="/dashboard/settings">
            <Button
              variant={pathname === '/dashboard/settings' ? 'default' : 'ghost'}
              size="sm"
              className={`w-full justify-start gap-2 rounded-lg px-2 text-sm ${
                pathname === '/dashboard/settings'
                  ? 'bg-emerald-500 text-white hover:bg-emerald-500/90'
                  : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
              }`}
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-white/5">
                <Settings className="h-4 w-4" />
              </span>
              <span>Settings</span>
            </Button>
          </Link>
        </div>
      </nav>

      {/* Bottom: session / version */}
      <div className="border-t border-white/5 px-3 py-3">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-between rounded-lg px-2 text-xs text-muted-foreground hover:bg-red-500/10 hover:text-red-400"
        >
          <span className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            <span>Sign out</span>
          </span>
          <span className="text-[10px] text-muted-foreground">
            v1.0.0
          </span>
        </Button>
      </div>
    </aside>
  )
}

export default Navbar
