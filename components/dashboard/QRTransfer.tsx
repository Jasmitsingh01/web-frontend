"use client"

import { Download } from "lucide-react"

export function QRTransfer() {
    return (
        <div className="bg-transparent border border-white/10 rounded-lg p-6">
            <h2 className="text-lg font-bold mb-4 text-white">QR (QR) Transfers</h2>

            <div className="grid grid-cols-2 gap-6">
                <div>
                    <div className="text-xs text-slate-400 mb-2">Send QR to others</div>
                    <div className="w-32 h-32 bg-white rounded mb-2 flex items-center justify-center">
                        <div className="w-28 h-28 bg-black"></div>
                    </div>
                    <button className="text-xs text-emerald-400 hover:underline flex items-center gap-1">
                        <Download className="w-3 h-3" />
                        Download QR
                    </button>
                </div>
                <div>
                    <div className="text-xs text-slate-400 mb-3">QR code information</div>
                    <div className="space-y-2">
                        <div>
                            <div className="text-xs text-slate-500">Receive code with QR scanners</div>
                            <div className="text-sm font-medium text-white">Account Holder details</div>
                        </div>
                        <div>
                            <div className="text-xs text-slate-500">Optional</div>
                            <div className="text-sm text-slate-300">Scan addresses or link crypto wallet</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
