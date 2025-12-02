'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

interface MarketUpdate {
    type: 'market_update'
    symbol: string
    assetType: string
    data: {
        quote: {
            symbol: string
            price: number
            change: number
            changePercent: number
            high: number
            low: number
            open: number
            previousClose: number
            timestamp: number
        }
        latestCandle?: {
            timestamp: number
            open: number
            high: number
            low: number
            close: number
            volume: number
        }
        timestamp: number
    }
}

interface WebSocketMessage {
    type: string
    [key: string]: any
}

interface UseMarketWebSocketOptions {
    symbol: string
    assetType: string
    resolution?: string
    enabled?: boolean
    onUpdate?: (update: MarketUpdate) => void
}

export function useMarketWebSocket({
    symbol,
    assetType,
    resolution = '5',
    enabled = true,
    onUpdate
}: UseMarketWebSocketOptions) {
    const [isConnected, setIsConnected] = useState(false)
    const [lastUpdate, setLastUpdate] = useState<MarketUpdate | null>(null)
    const [error, setError] = useState<string | null>(null)

    const wsRef = useRef<WebSocket | null>(null)
    const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null)
    const reconnectAttempts = useRef(0)
    const maxReconnectAttempts = 5
    const reconnectDelay = 3000

    const connect = useCallback(() => {
        if (!enabled) return

        try {
            // Get WebSocket URL from environment or use default
            const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8080/ws/market'

            console.log('Connecting to WebSocket:', wsUrl)
            const ws = new WebSocket(wsUrl)

            ws.onopen = () => {
                console.log('WebSocket connected')
                setIsConnected(true)
                setError(null)
                reconnectAttempts.current = 0

                // Subscribe to symbol
                ws.send(JSON.stringify({
                    type: 'subscribe',
                    symbol,
                    assetType,
                    resolution
                }))
            }

            ws.onmessage = (event) => {
                try {
                    const message: WebSocketMessage = JSON.parse(event.data)

                    if (message.type === 'market_update') {
                        const update = message as MarketUpdate
                        setLastUpdate(update)
                        onUpdate?.(update)
                    } else if (message.type === 'error') {
                        console.error('WebSocket error message:', message.message)
                        setError(message.message)
                    }
                } catch (err) {
                    console.error('Error parsing WebSocket message:', err)
                }
            }

            ws.onerror = (event) => {
                console.error('WebSocket error:', event)
                setError('WebSocket connection error')
            }

            ws.onclose = () => {
                console.log('WebSocket disconnected')
                setIsConnected(false)

                // Attempt to reconnect
                if (enabled && reconnectAttempts.current < maxReconnectAttempts) {
                    reconnectAttempts.current++
                    console.log(`Reconnecting... Attempt ${reconnectAttempts.current}/${maxReconnectAttempts}`)

                    reconnectTimeoutRef.current = setTimeout(() => {
                        connect()
                    }, reconnectDelay)
                } else if (reconnectAttempts.current >= maxReconnectAttempts) {
                    setError('Failed to connect after multiple attempts')
                }
            }

            wsRef.current = ws
        } catch (err) {
            console.error('Error creating WebSocket:', err)
            setError('Failed to create WebSocket connection')
        }
    }, [enabled, symbol, assetType, resolution, onUpdate])

    const disconnect = useCallback(() => {
        if (reconnectTimeoutRef.current) {
            clearTimeout(reconnectTimeoutRef.current)
            reconnectTimeoutRef.current = null
        }

        if (wsRef.current) {
            // Unsubscribe before closing
            if (wsRef.current.readyState === WebSocket.OPEN) {
                wsRef.current.send(JSON.stringify({
                    type: 'unsubscribe',
                    symbol
                }))
            }

            wsRef.current.close()
            wsRef.current = null
        }

        setIsConnected(false)
    }, [symbol])

    const subscribe = useCallback((newSymbol: string, newAssetType: string, newResolution?: string) => {
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
            wsRef.current.send(JSON.stringify({
                type: 'subscribe',
                symbol: newSymbol,
                assetType: newAssetType,
                resolution: newResolution || resolution
            }))
        }
    }, [resolution])

    const unsubscribe = useCallback((symbolToUnsubscribe: string) => {
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
            wsRef.current.send(JSON.stringify({
                type: 'unsubscribe',
                symbol: symbolToUnsubscribe
            }))
        }
    }, [])

    // Connect on mount and when dependencies change
    useEffect(() => {
        if (enabled) {
            connect()
        }

        return () => {
            disconnect()
        }
    }, [enabled, connect, disconnect])

    // Update subscription when symbol or assetType changes
    useEffect(() => {
        if (isConnected && wsRef.current) {
            // Unsubscribe from previous symbol if different
            subscribe(symbol, assetType, resolution)
        }
    }, [symbol, assetType, resolution, isConnected, subscribe])

    return {
        isConnected,
        lastUpdate,
        error,
        subscribe,
        unsubscribe,
        reconnect: connect
    }
}
