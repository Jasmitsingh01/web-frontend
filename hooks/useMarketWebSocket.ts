import { useState, useEffect, useRef, useCallback } from 'react'
import { useStockLiveData } from './useStockLiveData'
import { useBinanceCrypto } from './useBinanceCrypto'
import { useForexLiveData } from './useForexLiveData'

interface MarketUpdate {
  type: 'quote' | 'candle'
  data: {
    quote?: {
      price: number
      change: number
      changePercent: number
      volume?: number
      high?: number
      low?: number
    }
    latestCandle?: {
      timestamp: number
      open: number
      high: number
      low: number
      close: number
      volume?: number
    }
  }
}

interface UseMarketWebSocketProps {
  symbol: string
  assetType: 'stock' | 'crypto' | 'forex'
  resolution?: string
  enabled?: boolean
  onUpdate?: (update: MarketUpdate) => void
  onConnect?: () => void
  onDisconnect?: () => void
  onError?: (error: Error) => void
}

export function useMarketWebSocket({
  symbol,
  assetType,
  resolution = '5',
  enabled = true,
  onUpdate,
  onConnect,
  onDisconnect,
  onError
}: UseMarketWebSocketProps) {
  const [isConnected, setIsConnected] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)

  // Store callbacks in refs
  const callbacksRef = useRef({ onUpdate, onConnect, onDisconnect, onError })
  
  useEffect(() => {
    callbacksRef.current = { onUpdate, onConnect, onDisconnect, onError }
  }, [onUpdate, onConnect, onDisconnect, onError])

  // Stock WebSocket
  const stocks = useStockLiveData({
    enabled: enabled && assetType === 'stock',
    onPriceUpdate: (data) => {
      const update: MarketUpdate = {
        type: 'quote',
        data: {
          quote: {
            price: data.price,
            change: data.change || 0,
            changePercent: data.changePercent || 0,
            volume: data.volume
          }
        }
      }
      setLastUpdate(new Date())
      callbacksRef.current.onUpdate?.(update)
    },
    onConnect: () => {
      setIsConnected(true)
      callbacksRef.current.onConnect?.()
    },
    onDisconnect: () => {
      setIsConnected(false)
      callbacksRef.current.onDisconnect?.()
    },
    onError: (err) => {
      setError(err.message)
      callbacksRef.current.onError?.(err)
    }
  })

  // Crypto WebSocket
  const crypto = useBinanceCrypto({
    enabled: enabled && assetType === 'crypto',
    onPriceUpdate: (data) => {
      const update: MarketUpdate = {
        type: 'quote',
        data: {
          quote: {
            price: data.price,
            change: data.change || 0,
            changePercent: data.changePercent || 0,
            volume: data.volume,
            high: data.high,
            low: data.low
          }
        }
      }
      setLastUpdate(new Date())
      callbacksRef.current.onUpdate?.(update)
    },
    onConnect: () => {
      setIsConnected(true)
      callbacksRef.current.onConnect?.()
    },
    onDisconnect: () => {
      setIsConnected(false)
      callbacksRef.current.onDisconnect?.()
    },
    onError: (err) => {
      setError(err.message)
      callbacksRef.current.onError?.(err)
    }
  })

  // Forex WebSocket
  const forex = useForexLiveData({
    enabled: enabled && assetType === 'forex',
    onPriceUpdate: (data) => {
      const update: MarketUpdate = {
        type: 'quote',
        data: {
          quote: {
            price: data.price,
            change: data.change || 0,
            changePercent: data.changePercent || 0
          }
        }
      }
      setLastUpdate(new Date())
      callbacksRef.current.onUpdate?.(update)
    },
    onConnect: () => {
      setIsConnected(true)
      callbacksRef.current.onConnect?.()
    },
    onDisconnect: () => {
      setIsConnected(false)
      callbacksRef.current.onDisconnect?.()
    },
    onError: (err) => {
      setError(err.message)
      callbacksRef.current.onError?.(err)
    }
  })

  // Subscribe to the symbol when it changes
  useEffect(() => {
    if (!enabled || !symbol) return

    // Format symbol based on asset type
    let formattedSymbol = symbol
    
    if (assetType === 'crypto') {
      // Ensure crypto symbols have BINANCE: prefix if not present
      if (!symbol.includes(':') && !symbol.includes('/')) {
        formattedSymbol = `BINANCE:${symbol}`
      }
    }

    // Subscribe to the symbol
    if (assetType === 'stock' && stocks.isConnected) {
      stocks.subscribe([formattedSymbol])
    } else if (assetType === 'crypto' && crypto.isConnected) {
      crypto.subscribe([formattedSymbol])
    } else if (assetType === 'forex' && forex.isConnected) {
      forex.subscribe([formattedSymbol])
    }

    // Cleanup: unsubscribe when symbol changes or component unmounts
    return () => {
      if (assetType === 'stock' && stocks.isConnected) {
        stocks.unsubscribe([formattedSymbol])
      } else if (assetType === 'crypto' && crypto.isConnected) {
        crypto.unsubscribe([formattedSymbol])
      } else if (assetType === 'forex' && forex.isConnected) {
        forex.unsubscribe([formattedSymbol])
      }
    }
  }, [symbol, assetType, enabled, stocks, crypto, forex])

  // Get the appropriate connection status
  const currentConnection = 
    assetType === 'stock' ? stocks :
    assetType === 'crypto' ? crypto :
    forex

  return {
    isConnected: currentConnection.isConnected,
    isConnecting: currentConnection.isConnecting,
    error: error || currentConnection.error,
    lastUpdate,
    // Expose individual hooks if needed
    stocks,
    crypto,
    forex
  }
}
