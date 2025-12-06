import { useState, useEffect, useRef, useCallback } from 'react'

interface StockPriceUpdate {
  type: 'priceUpdate'
  asset: 'stock'
  symbol: string
  companyName: string
  exchange: string
  price: number
  change: number
  changePercent: number
  volume: number
  marketState: string
  timestamp: number
}

interface WebSocketMessage {
  type: string
  message?: string
  [key: string]: any
}

interface UseStockLiveDataProps {
  enabled?: boolean
  onPriceUpdate?: (data: StockPriceUpdate) => void
  onConnect?: () => void
  onDisconnect?: () => void
  onError?: (error: Error) => void
}

export function useStockLiveData({
  enabled = true,
  onPriceUpdate,
  onConnect,
  onDisconnect,
  onError
}: UseStockLiveDataProps) {
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)
  
  const wsRef = useRef<WebSocket | null>(null)
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const reconnectAttempts = useRef(0)
  const maxReconnectAttempts = 5
  
  const url = 'ws://localhost:8080/ws/stocks/live'
  
  // Store callbacks in refs
  const callbacksRef = useRef({ onPriceUpdate, onConnect, onDisconnect, onError })
  
  useEffect(() => {
    callbacksRef.current = { onPriceUpdate, onConnect, onDisconnect, onError }
  }, [onPriceUpdate, onConnect, onDisconnect, onError])

  const connect = useCallback(() => {
    if (!enabled || isConnecting || wsRef.current?.readyState === WebSocket.OPEN) {
      return
    }

    setIsConnecting(true)
    setError(null)

    try {
      console.log(`📈 Connecting to Stock WebSocket: ${url}`)
      const ws = new WebSocket(url)
      wsRef.current = ws

      ws.onopen = () => {
        console.log('✅ Stock WebSocket connected!')
        setIsConnected(true)
        setIsConnecting(false)
        setError(null)
        reconnectAttempts.current = 0
        callbacksRef.current.onConnect?.()
      }

      ws.onmessage = (event) => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data)
          
          if (message.type === 'priceUpdate' && message.asset === 'stock') {
            const stockUpdate: StockPriceUpdate = {
              type: 'priceUpdate',
              asset: 'stock',
              symbol: message.symbol,
              companyName: message.companyName,
              exchange: message.exchange,
              price: message.price,
              change: message.change,
              changePercent: message.changePercent,
              volume: message.volume,
              marketState: message.marketState,
              timestamp: message.timestamp || Date.now()
            }
            
            setLastUpdate(new Date())
            callbacksRef.current.onPriceUpdate?.(stockUpdate)
            
            console.log(`💰 ${message.symbol}: ₹${message.price} (${message.changePercent >= 0 ? '+' : ''}${message.changePercent?.toFixed(2)}%)`)
          } else if (message.type === 'welcome') {
            console.log('📡 Stock WS:', message.message)
          } else if (message.type === 'subscribed') {
            console.log('✅ Subscribed to stocks:', message.symbols)
          } else if (message.type === 'error') {
            console.error('❌ Stock WS error:', message.message)
            setError(message.message || 'Unknown error')
            callbacksRef.current.onError?.(new Error(message.message || 'Stock WebSocket error'))
          }
        } catch (err) {
          console.error('Error parsing stock message:', err)
          callbacksRef.current.onError?.(err as Error)
        }
      }

      ws.onerror = (event) => {
        console.error('❌ Stock WebSocket error:', event)
        setIsConnecting(false)
        setError('Connection failed')
        callbacksRef.current.onError?.(new Error('Stock WebSocket connection failed'))
      }

      ws.onclose = (event) => {
        console.log(`🔌 Stock WebSocket disconnected - Code: ${event.code}`)
        setIsConnected(false)
        setIsConnecting(false)
        wsRef.current = null
        callbacksRef.current.onDisconnect?.()
        
        if (enabled && event.code !== 1000 && reconnectAttempts.current < maxReconnectAttempts) {
          reconnectAttempts.current++
          const delay = Math.min(1000 * Math.pow(2, reconnectAttempts.current - 1), 10000)
          console.log(`🔄 Reconnecting stock WS in ${delay}ms... (${reconnectAttempts.current}/${maxReconnectAttempts})`)
          
          reconnectTimeoutRef.current = setTimeout(() => {
            connect()
          }, delay)
        } else if (reconnectAttempts.current >= maxReconnectAttempts) {
          setError('Max reconnection attempts reached')
        }
      }
    } catch (err) {
      console.error('❌ Failed to create stock WebSocket:', err)
      setIsConnecting(false)
      setError('Failed to create connection')
      callbacksRef.current.onError?.(err as Error)
    }
  }, [enabled, url])

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current)
      reconnectTimeoutRef.current = null
    }

    if (wsRef.current) {
      console.log('🔌 Disconnecting stock WebSocket...')
      wsRef.current.close(1000, 'Client disconnect')
      wsRef.current = null
    }

    setIsConnected(false)
    setIsConnecting(false)
    reconnectAttempts.current = 0
  }, [])

  const subscribe = useCallback((symbols: string[]) => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      console.warn('⚠️ Cannot subscribe: Stock WebSocket not connected')
      return false
    }

    if (symbols.length === 0) {
      console.warn('⚠️ No stock symbols to subscribe to')
      return false
    }

    console.log(`📤 Subscribing to ${symbols.length} stocks:`, symbols)
    
    wsRef.current.send(JSON.stringify({
      action: 'subscribe',
      symbols: symbols.map(s => s.toUpperCase())
    }))
    
    return true
  }, [])

  const unsubscribe = useCallback((symbols: string[]) => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      console.warn('⚠️ Cannot unsubscribe: Stock WebSocket not connected')
      return false
    }

    console.log(`📤 Unsubscribing from ${symbols.length} stocks:`, symbols)
    
    wsRef.current.send(JSON.stringify({
      action: 'unsubscribe',
      symbols: symbols.map(s => s.toUpperCase())
    }))
    
    return true
  }, [])

  useEffect(() => {
    if (enabled) {
      connect()
    }

    return () => {
      disconnect()
    }
  }, [enabled, connect, disconnect])

  return {
    isConnected,
    isConnecting,
    error,
    lastUpdate,
    connect,
    disconnect,
    subscribe,
    unsubscribe
  }
}
