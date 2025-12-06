'use client'

import { useState } from 'react'
import { useFinnhubCrypto } from '@/hooks/useFinnhubCrypto'

export default function FinnhubCryptoExample() {
  const [selectedSymbols, setSelectedSymbols] = useState<string[]>(['BINANCE:BTCUSDT', 'BINANCE:ETHUSDT'])
  const [customSymbol, setCustomSymbol] = useState('')
  
  // Get API key from environment variable
  const apiKey = process.env.NEXT_PUBLIC_FINNHUB_API_KEY || 'YOUR_FINNHUB_API_KEY'
  
  const {
    isConnected,
    isConnecting,
    error,
    lastUpdate,
    latestPrices,
    subscribedSymbols,
    subscribe,
    unsubscribe
  } = useFinnhubCrypto({
    apiKey,
    symbols: selectedSymbols,
    enabled: true,
    onPriceUpdate: (data) => {
      // Handle real-time price updates
      console.log('Price update:', data)
    },
    onConnect: () => {
      console.log('Connected to Finnhub!')
    },
    onDisconnect: () => {
      console.log('Disconnected from Finnhub')
    },
    onError: (err) => {
      console.error('Finnhub error:', err)
    }
  })

  const handleAddSymbol = () => {
    if (customSymbol && !subscribedSymbols.includes(customSymbol)) {
      subscribe(customSymbol.toUpperCase())
      setSelectedSymbols([...selectedSymbols, customSymbol.toUpperCase()])
      setCustomSymbol('')
    }
  }

  const handleRemoveSymbol = (symbol: string) => {
    unsubscribe(symbol)
    setSelectedSymbols(selectedSymbols.filter(s => s !== symbol))
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Finnhub Crypto Live Prices</h1>
      
      {/* Connection Status */}
      <div className="mb-6 p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : isConnecting ? 'bg-yellow-500 animate-pulse' : 'bg-red-500'}`} />
          <span className="font-semibold">
            {isConnected ? 'Connected' : isConnecting ? 'Connecting...' : 'Disconnected'}
          </span>
          {lastUpdate && (
            <span className="text-sm text-gray-500 ml-auto">
              Last update: {lastUpdate.toLocaleTimeString()}
            </span>
          )}
        </div>
        {error && (
          <div className="mt-2 text-red-600 text-sm">
            Error: {error}
          </div>
        )}
      </div>

      {/* API Key Warning */}
      {apiKey === 'YOUR_FINNHUB_API_KEY' && (
        <div className="mb-6 p-4 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
          <p className="text-yellow-800 dark:text-yellow-200 font-semibold">⚠️ API Key Required</p>
          <p className="text-yellow-700 dark:text-yellow-300 text-sm mt-1">
            Please set <code className="bg-yellow-100 dark:bg-yellow-900 px-1 rounded">NEXT_PUBLIC_FINNHUB_API_KEY</code> in your <code className="bg-yellow-100 dark:bg-yellow-900 px-1 rounded">.env.local</code> file.
          </p>
          <p className="text-yellow-700 dark:text-yellow-300 text-sm mt-2">
            Get your free API key at: <a href="https://finnhub.io" target="_blank" rel="noopener noreferrer" className="underline">https://finnhub.io</a>
          </p>
        </div>
      )}

      {/* Add Symbol */}
      <div className="mb-6 flex gap-2">
        <input
          type="text"
          value={customSymbol}
          onChange={(e) => setCustomSymbol(e.target.value)}
          placeholder="e.g., BINANCE:BTCUSDT or COINBASE:BTC-USD"
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
          onKeyPress={(e) => e.key === 'Enter' && handleAddSymbol()}
        />
        <button
          onClick={handleAddSymbol}
          disabled={!customSymbol || !isConnected}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          Subscribe
        </button>
      </div>

      {/* Subscribed Symbols */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-3">Subscribed Symbols ({subscribedSymbols.length})</h2>
        <div className="flex flex-wrap gap-2">
          {subscribedSymbols.map(symbol => (
            <div key={symbol} className="px-3 py-1 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center gap-2">
              <span className="text-sm font-medium">{symbol}</span>
              <button
                onClick={() => handleRemoveSymbol(symbol)}
                className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Live Prices */}
      <div>
        <h2 className="text-xl font-semibold mb-3">Live Prices</h2>
        {latestPrices.size === 0 ? (
          <div className="text-center py-12 text-gray-500">
            {isConnected ? 'Waiting for price updates...' : 'Connect to see live prices'}
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from(latestPrices.entries()).map(([symbol, data]) => (
              <div key={symbol} className="p-4 border rounded-lg dark:border-gray-700 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg">{symbol}</h3>
                  <span className="text-xs text-gray-500">{data.formattedTime}</span>
                </div>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
                  ${data.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Volume: {data.volume.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Popular Symbols */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-3">Popular Symbols</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            'BINANCE:BTCUSDT',
            'BINANCE:ETHUSDT',
            'BINANCE:BNBUSDT',
            'BINANCE:SOLUSDT',
            'COINBASE:BTC-USD',
            'COINBASE:ETH-USD',
            'COINBASE:SOL-USD',
            'COINBASE:DOGE-USD'
          ].map(symbol => (
            <button
              key={symbol}
              onClick={() => {
                if (!subscribedSymbols.includes(symbol)) {
                  subscribe(symbol)
                  setSelectedSymbols([...selectedSymbols, symbol])
                }
              }}
              disabled={subscribedSymbols.includes(symbol) || !isConnected}
              className="px-3 py-2 text-sm border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {symbol}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
