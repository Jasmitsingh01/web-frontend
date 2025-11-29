"use client"

import { Bell, CheckCircle } from "lucide-react"

interface Notification {
    id: number
    message: string
    done: boolean
}

interface NotificationsProps {
    notifications: Notification[]
    actionRequired?: boolean
}

export function Notifications({ notifications, actionRequired }: NotificationsProps) {
    return (
        <div className="border border-white/5 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Bell className="w-5 h-5 text-emerald-400" />
                    Notifications
                </h3>
                {actionRequired && (
                    <span className="px-2 py-1 bg-amber-500/20 text-amber-400 text-xs font-medium rounded-full">
                        Action Required
                    </span>
                )}
            </div>
            <div className="space-y-3">
                {notifications.map(note => (
                    <div
                        key={note.id}
                        className={`p-4 rounded-xl border transition-all hover:scale-[1.02] ${note.done
                            ? "bg-slate-800/30 border-white/5"
                            : "bg-amber-500/5 border-amber-500/20"
                            }`}
                    >
                        <div className="flex items-start gap-3">
                            <div className={`mt-0.5 ${note.done ? "text-emerald-400" : "text-amber-400"}`}>
                                {note.done ? (
                                    <CheckCircle className="w-5 h-5" />
                                ) : (
                                    <Bell className="w-5 h-5" />
                                )}
                            </div>
                            <div className="flex-1">
                                <p className={`text-sm ${note.done ? "text-slate-400" : "text-white font-medium"}`}>
                                    {note.message}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
