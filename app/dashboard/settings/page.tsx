'use client'

import { useState } from "react"
import { ChevronDown } from "lucide-react"

export default function Settings() {
  const [twoFactorAuth, setTwoFactorAuth] = useState(true)
  const [smsCode, setSmsCode] = useState(true)
  const [otherNotifications, setOtherNotifications] = useState(true)

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-gray-900">
      <div className="max-w-[800px] mx-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold">Settings</h1>
            <div className="flex items-center gap-2">
              <button className="px-4 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-900">
                Cancel
              </button>
              <button className="px-4 py-1.5 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700">
                Save
              </button>
            </div>
          </div>
          <p className="text-sm text-gray-600">Quickly update your basic preferences</p>
        </div>

        {/* Profile Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-semibold mb-1">Profile</h2>
              <p className="text-xs text-gray-500">Basic details for your account</p>
            </div>
            <button className="text-sm text-blue-600 hover:underline">
              Details
            </button>
          </div>

          {/* Full name */}
          <div className="mb-4">
            <label className="text-xs text-gray-700 font-medium block mb-2">
              Full name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="text-xs text-gray-700 font-medium block mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="john@example.com"
              className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Preferred currency */}
          <div className="mb-4">
            <label className="text-xs text-gray-700 font-medium block mb-2">
              Preferred currency
            </label>
            <div className="relative">
              <select className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm appearance-none focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                <option>USD</option>
                <option>EUR</option>
                <option>GBP</option>
                <option>JPY</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Security & Alerts Section */}
        <div className="mb-8">
          <div className="mb-4">
            <h2 className="text-base font-semibold mb-1">Security & alerts</h2>
            <p className="text-xs text-gray-500">Keep your account safe</p>
          </div>

          {/* Password */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs text-gray-700 font-medium">
                Password
              </label>
              <button className="text-sm text-blue-600 hover:underline">
                Change
              </button>
            </div>
            <input
              type="password"
              value="••••••••••"
              disabled
              className="w-full bg-gray-50 border border-gray-300 rounded px-3 py-2 text-sm text-gray-500 cursor-not-allowed"
            />
          </div>

          {/* Two-factor authentication */}
          <div className="mb-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <div>
                <div className="text-sm font-medium mb-1">Two-factor authentication</div>
                <div className="text-xs text-gray-500">Extra code when you log in</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={twoFactorAuth}
                  onChange={(e) => setTwoFactorAuth(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>

          {/* SMS code */}
          <div className="mb-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <div>
                <div className="text-sm font-medium mb-1">SMS code</div>
                <div className="text-xs text-gray-500">Extra code to authenticate log in</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={smsCode}
                  onChange={(e) => setSmsCode(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>

          {/* Other notifications */}
          <div className="mb-4">
            <div className="flex items-center justify-between py-3">
              <div>
                <div className="text-sm font-medium mb-1">Other notifications</div>
                <div className="text-xs text-gray-500">Latest important updates</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={otherNotifications}
                  onChange={(e) => setOtherNotifications(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>

          <p className="text-xs text-gray-500">
            You can: Adjust additional settings from the list settings on desktop
          </p>
        </div>

        {/* Bank Accounts Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-semibold mb-1">Bank accounts</h2>
              <p className="text-xs text-gray-500">Manage the accounts you use to deposit and withdraw</p>
            </div>
            <button className="text-sm text-blue-600 hover:underline">
              Payments
            </button>
          </div>

          {/* HDFC Bank */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-3">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-sm font-semibold mb-1">HDFC Bank</div>
                <div className="text-xs text-gray-500">Checking • **** • Treasury</div>
              </div>
              <div className="flex items-center gap-2">
                <button className="text-sm text-blue-600 hover:underline">Edit</button>
                <button className="text-sm text-blue-600 hover:underline">Remove</button>
              </div>
            </div>
          </div>

          {/* DBS */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-3">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-sm font-semibold mb-1">DBS</div>
                <div className="text-xs text-gray-500">Savings • **** • 6666</div>
              </div>
              <div className="flex items-center gap-2">
                <button className="text-sm text-blue-600 hover:underline">Edit</button>
                <button className="text-sm text-blue-600 hover:underline">Remove</button>
              </div>
            </div>
          </div>

          {/* Add new bank */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-gray-400 transition">
            <button className="w-full text-left">
              <div className="text-sm font-medium text-gray-700 mb-1">Add new bank</div>
              <div className="text-xs text-gray-500">
                Account holder names, IFSC, account number
              </div>
            </button>
          </div>

          <p className="text-xs text-gray-500 mt-4">
            You can connect up to 2 bank accounts. Only verified accounts can be used for withdrawals.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
          <button className="px-6 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">
            Set as primary
          </button>
          <button className="px-6 py-2 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700">
            Manage bank accounts
          </button>
        </div>
      </div>
    </div>
  )
}
