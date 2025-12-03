/**
 * React Hook for WebSocket Live Data
 * Connects to backend WebSocket for real-time crypto, forex, and stock data
 */

'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

export interface LiveDataUpdate {
    symbol: string;
    displaySymbol: string;
    price: number;
    volume: number;
    timestamp: number;
    lastUpdate: Date;
    // Stock-specific fields
    companyName?: string;
    exchange?: 'NSE' | 'BSE';
    change?: number;
    changePercent?: number;
    marketState?: string;
    currency?: string;
    isin?: string;
}

interface WebSocketMessage {
    type: 'connected' | 'crypto' | 'forex' | 'stock' | 'subscribed' | 'unsubscribed' | 'error';
    data?: LiveDataUpdate | LiveDataUpdate[];
    message?: string;
    timestamp?: number;
    assetType?: 'crypto' | 'forex' | 'stock';
    symbols?: string[];
}

interface UseLiveDataOptions {
    autoConnect?: boolean;
    reconnectAttempts?: number;
    reconnectDelay?: number;
}

interface UseLiveDataReturn {
    isConnected: boolean;
    latestData: Map<string, LiveDataUpdate>;
    subscribe: (type: 'crypto' | 'forex' | 'stock', symbols: string[]) => void;
    unsubscribe: (type: 'crypto' | 'forex' | 'stock', symbols: string[]) => void;
    connect: () => void;
    disconnect: () => void;
    error: string | null;
}

/**
 * Hook to connect to backend WebSocket for live market data
 */
export function useLiveData(options: UseLiveDataOptions = {}): UseLiveDataReturn {
    const {
        autoConnect = true,
        reconnectAttempts = 5,
        reconnectDelay = 3000
    } = options;

    const [isConnected, setIsConnected] = useState(false);
    const [latestData, setLatestData] = useState<Map<string, LiveDataUpdate>>(new Map());
    const [error, setError] = useState<string | null>(null);

    const wsRef = useRef<WebSocket | null>(null);
    const reconnectCountRef = useRef(0);
    const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    /**
     * Get WebSocket URL
     */
    const getWebSocketUrl = useCallback(() => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
        const wsUrl = apiUrl.replace('http://', 'ws://').replace('https://', 'wss://');
        return `${wsUrl}/ws/live`;
    }, []);

    /**
     * Connect to WebSocket
     */
    const connect = useCallback(() => {
        if (wsRef.current?.readyState === WebSocket.OPEN) {
            console.log('WebSocket already connected');
            return;
        }

        try {
            const url = getWebSocketUrl();
            console.log('🔌 Connecting to WebSocket:', url);

            wsRef.current = new WebSocket(url);

            wsRef.current.onopen = () => {
                console.log('✅ WebSocket connected');
                setIsConnected(true);
                setError(null);
                reconnectCountRef.current = 0;
            };

            wsRef.current.onmessage = (event) => {
                try {
                    const message: WebSocketMessage = JSON.parse(event.data);

                    if (message.type === 'connected') {
                        console.log('📡', message.message);
                    } else if (message.type === 'crypto' || message.type === 'forex' || message.type === 'stock') {
                        // Handle price update
                        const updates = Array.isArray(message.data) ? message.data : [message.data];

                        setLatestData(prev => {
                            const newData = new Map(prev);
                            // Filter out undefined values before processing
                            updates
                                .filter((update): update is LiveDataUpdate => update !== undefined)
                                .forEach((update) => {
                                    newData.set(update.symbol, update);
                                });
                            return newData;
                        });
                    } else if (message.type === 'error') {
                        console.error('WebSocket error:', message.message);
                        setError(message.message || 'Unknown error');
                    }
                } catch (err) {
                    console.error('Error parsing WebSocket message:', err);
                }
            };

            wsRef.current.onerror = (event) => {
                console.error('❌ WebSocket error:', event);
                setError('WebSocket connection error');
            };

            wsRef.current.onclose = () => {
                console.log('🔌 WebSocket disconnected');
                setIsConnected(false);

                // Attempt reconnection
                if (reconnectCountRef.current < reconnectAttempts) {
                    reconnectCountRef.current++;
                    console.log(`🔄 Reconnecting... (${reconnectCountRef.current}/${reconnectAttempts})`);

                    reconnectTimeoutRef.current = setTimeout(() => {
                        connect();
                    }, reconnectDelay * reconnectCountRef.current);
                } else {
                    setError('Max reconnection attempts reached');
                }
            };

        } catch (err) {
            console.error('Failed to create WebSocket:', err);
            setError(err instanceof Error ? err.message : 'Failed to connect');
        }
    }, [getWebSocketUrl, reconnectAttempts, reconnectDelay]);

    /**
     * Disconnect from WebSocket
     */
    const disconnect = useCallback(() => {
        if (reconnectTimeoutRef.current) {
            clearTimeout(reconnectTimeoutRef.current);
            reconnectTimeoutRef.current = null;
        }

        if (wsRef.current) {
            wsRef.current.close();
            wsRef.current = null;
        }

        setIsConnected(false);
        reconnectCountRef.current = 0;
    }, []);

    /**
     * Subscribe to symbols
     */
    const subscribe = useCallback((type: 'crypto' | 'forex' | 'stock', symbols: string[]) => {
        if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
            console.warn('WebSocket not connected. Cannot subscribe.');
            return;
        }

        wsRef.current.send(JSON.stringify({
            action: 'subscribe',
            type,
            symbols
        }));

        console.log(`📊 Subscribed to ${type}:`, symbols);
    }, []);

    /**
     * Unsubscribe from symbols
     */
    const unsubscribe = useCallback((type: 'crypto' | 'forex' | 'stock', symbols: string[]) => {
        if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
            console.warn('WebSocket not connected. Cannot unsubscribe.');
            return;
        }

        wsRef.current.send(JSON.stringify({
            action: 'unsubscribe',
            type,
            symbols
        }));

        console.log(`❌ Unsubscribed from ${type}:`, symbols);
    }, []);

    /**
     * Auto-connect on mount
     */
    useEffect(() => {
        if (autoConnect) {
            connect();
        }

        return () => {
            disconnect();
        };
    }, [autoConnect, connect, disconnect]);

    return {
        isConnected,
        latestData,
        subscribe,
        unsubscribe,
        connect,
        disconnect,
        error
    };
}

/**
 * Hook to subscribe to specific symbols automatically
 */
export function useLiveSymbols(
    type: 'crypto' | 'forex' | 'stock',
    symbols: string[],
    options: UseLiveDataOptions = {}
) {
    const { isConnected, latestData, subscribe, unsubscribe, error } = useLiveData(options);
    const [symbolData, setSymbolData] = useState<LiveDataUpdate[]>([]);

    useEffect(() => {
        if (isConnected && symbols.length > 0) {
            subscribe(type, symbols);

            return () => {
                unsubscribe(type, symbols);
            };
        }
    }, [isConnected, type, symbols.join(','), subscribe, unsubscribe]);

    useEffect(() => {
        const data = symbols
            .map(symbol => latestData.get(symbol))
            .filter((d): d is LiveDataUpdate => d !== undefined);

        setSymbolData(data);
    }, [latestData, symbols.join(',')]);

    return {
        data: symbolData,
        isConnected,
        error
    };
}
