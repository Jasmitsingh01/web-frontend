'use client'

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Modal } from "@/components/ui/modal"

export default function Settings() {
  const [twoFactorAuth, setTwoFactorAuth] = useState(true)
  const [smsCode, setSmsCode] = useState(true)
  const [otherNotifications, setOtherNotifications] = useState(true)
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950 text-white">
      <div className="max-w-[800px] mx-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold text-white">Settings</h1>
            <div className="flex items-center gap-2">
              <button className="px-4 py-1.5 text-sm font-medium text-slate-400 hover:text-white transition">
                Cancel
              </button>
              <Button className="bg-emerald-500 text-white hover:bg-emerald-500/90">
                Save
              </Button>
            </div>
          </div>
          <p className="text-sm text-slate-400">Quickly update your basic preferences</p>
        </div>

        {/* Profile Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-semibold mb-1 text-white">Profile</h2>
              <p className="text-xs text-slate-400">Basic details for your account</p>
            </div>
            <button className="text-sm text-emerald-400 hover:underline">
              Details
            </button>
          </div>

          {/* Full name */}
          <div className="mb-4">
            <label className="text-xs text-slate-400 font-medium block mb-2">
              Full name
            </label>
            <Input
              type="text"
              placeholder="John Doe"
              className="bg-white/5 border-white/10 text-white focus-visible:ring-emerald-500/50"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="text-xs text-slate-400 font-medium block mb-2">
              Email
            </label>
            <Input
              type="email"
              placeholder="john@example.com"
              className="bg-white/5 border-white/10 text-white focus-visible:ring-emerald-500/50"
            />
          </div>

          {/* Preferred currency */}
          <div className="mb-4">
            <label className="text-xs text-slate-400 font-medium block mb-2">
              Preferred currency
            </label>
            <div className="relative">
              <select className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white appearance-none focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50">
                <option className="bg-slate-900">USD</option>
                <option className="bg-slate-900">EUR</option>
                <option className="bg-slate-900">GBP</option>
                <option className="bg-slate-900">JPY</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Security & Alerts Section */}
        <div className="mb-8">
          <div className="mb-4">
            <h2 className="text-base font-semibold mb-1 text-white">Security & alerts</h2>
            <p className="text-xs text-slate-400">Keep your account safe</p>
          </div>

          {/* Password */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs text-slate-400 font-medium">
                Password
              </label>
              <button
                className="text-sm text-emerald-400 hover:underline"
                onClick={() => setIsPasswordModalOpen(true)}
              >
                Change
              </button>
            </div>
            <input
              type="password"
              value="••••••••••"
              disabled
              className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-slate-500 cursor-not-allowed"
            />
          </div>

          {/* KYC Verification */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs text-slate-400 font-medium">
                KYC Verification
              </label>
              <a
                href="/dashboard/verification"
                className="text-sm text-emerald-400 hover:underline"
              >
                Start Verification
              </a>
            </div>
            <div className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Status:</span>
                <span className="px-2 py-1 bg-amber-500/20 text-amber-400 rounded text-xs font-medium">
                  Pending
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                Complete your KYC verification to unlock full trading features
              </p>
            </div>
          </div>

          {/* Two-factor authentication */}
          <div className="mb-4">
            <div className="flex items-center justify-between py-3 border-b border-white/10">
              <div>
                <div className="text-sm font-medium mb-1 text-white">Two-factor authentication</div>
                <div className="text-xs text-slate-400">Extra code when you log in</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={twoFactorAuth}
                  onChange={(e) => setTwoFactorAuth(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
              </label>
            </div>
          </div>

          {/* SMS code */}
          <div className="mb-4">
            <div className="flex items-center justify-between py-3 border-b border-white/10">
              <div>
                <div className="text-sm font-medium mb-1 text-white">SMS code</div>
                <div className="text-xs text-slate-400">Extra code to authenticate log in</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={smsCode}
                  onChange={(e) => setSmsCode(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
              </label>
            </div>
          </div>

          {/* Other notifications */}
          <div className="mb-4">
            <div className="flex items-center justify-between py-3">
              <div>
                <div className="text-sm font-medium mb-1 text-white">Other notifications</div>
                <div className="text-xs text-slate-400">Latest important updates</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={otherNotifications}
                  onChange={(e) => setOtherNotifications(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
              </label>
            </div>
          </div>

          <p className="text-xs text-slate-500">
            You can: Adjust additional settings from the list settings on desktop
          </p>
        </div>

        {/* Bank Accounts Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-semibold mb-1 text-white">Bank accounts</h2>
              <p className="text-xs text-slate-400">Manage the accounts you use to deposit and withdraw</p>
            </div>
            <button className="text-sm text-emerald-400 hover:underline">
              Payments
            </button>
          </div>

          {/* HDFC Bank */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-3">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-sm font-semibold mb-1 text-white">HDFC Bank</div>
                <div className="text-xs text-slate-400">Checking • **** • Treasury</div>
              </div>
              <div className="flex items-center gap-2">
                <button className="text-sm text-emerald-400 hover:underline">Edit</button>
                <button className="text-sm text-emerald-400 hover:underline">Remove</button>
              </div>
            </div>
          </div>

          {/* DBS */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-3">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-sm font-semibold mb-1 text-white">DBS</div>
                <div className="text-xs text-slate-400">Savings • **** • 6666</div>
              </div>
              <div className="flex items-center gap-2">
                <button className="text-sm text-emerald-400 hover:underline">Edit</button>
                <button className="text-sm text-emerald-400 hover:underline">Remove</button>
              </div>
            </div>
          </div>

          {/* Add new bank */}
          <div className="border-2 border-dashed border-white/10 rounded-lg p-4 hover:border-white/20 transition">
            <button className="w-full text-left">
              <div className="text-sm font-medium text-slate-300 mb-1">Add new bank</div>
              <div className="text-xs text-slate-500">
                Account holder names, IFSC, account number
              </div>
            </button>
          </div>

          <p className="text-xs text-slate-500 mt-4">
            You can connect up to 2 bank accounts. Only verified accounts can be used for withdrawals.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-6 border-t border-white/10">
          <button className="px-6 py-2 text-sm font-medium text-slate-400 hover:text-white">
            Set as primary
          </button>
          <Button className="bg-emerald-500 text-white hover:bg-emerald-500/90">
            Manage bank accounts
          </Button>
        </div>
      </div>

      {/* Change Password Modal */}
      <Modal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        title="Change Password"
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-300">Current Password</label>
            <Input type="password" placeholder="Enter current password" className="bg-slate-900 border-white/10 text-white" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-300">New Password</label>
            <Input type="password" placeholder="Enter new password" className="bg-slate-900 border-white/10 text-white" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-300">Confirm New Password</label>
            <Input type="password" placeholder="Confirm new password" className="bg-slate-900 border-white/10 text-white" />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="ghost" onClick={() => setIsPasswordModalOpen(false)}>Cancel</Button>
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-white" onClick={() => {
              alert("Password changed successfully!");
              setIsPasswordModalOpen(false);
            }}>Update Password</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
