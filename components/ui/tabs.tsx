"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface TabsProps {
    tabs: string[]
    activeTab: string
    onTabChange: (tab: string) => void
    className?: string
    isLoading?: boolean
}

export function Tabs({ tabs, activeTab, onTabChange, className, isLoading = false }: TabsProps) {
    return (
        <div className={cn("flex items-center gap-2", className)}>
            {tabs.map((tab) => (
                <button
                    key={tab}
                    onClick={() => onTabChange(tab)}
                    disabled={isLoading}
                    className={cn(
                        "px-4 py-1.5 rounded-full text-xs font-medium transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed",
                        activeTab === tab
                            ? "bg-emerald-500 text-white hover:bg-emerald-500/90"
                            : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
                    )}
                >
                    {isLoading && activeTab === tab && (
                        <div className="animate-spin rounded-full h-3 w-3 border border-white border-t-transparent"></div>
                    )}
                    {tab}
                </button>
            ))}
        </div>
    )
}
