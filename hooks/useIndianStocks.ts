/**
 * React Hook for Indian Stock Fetching
 * Provides easy-to-use hooks for fetching and managing Indian stock data
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { api } from '@/lib/api';

export interface IndianStock {
    symbol: string;
    companyName: string;
    exchange: 'NSE' | 'BSE';
    securityCode?: string;
    securityId?: string;
    series?: string;
    status?: string;
    group?: string;
    isin: string;
    faceValue: number;
    paidUpValue?: number;
    marketLot?: number;
    dateOfListing?: string;
    instrument?: string;
}

interface UseIndianStocksOptions {
    exchange?: 'NSE' | 'BSE';
    autoFetch?: boolean;
}

interface UseIndianStocksReturn {
    stocks: IndianStock[];
    loading: boolean;
    error: string | null;
    total: number;
    refetch: () => Promise<void>;
}

/**
 * Hook to fetch all Indian stocks or by exchange
 */
export function useIndianStocks(options: UseIndianStocksOptions = {}): UseIndianStocksReturn {
    const { exchange, autoFetch = true } = options;

    const [stocks, setStocks] = useState<IndianStock[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [total, setTotal] = useState<number>(0);

    const fetchStocks = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            // Get token from localStorage
            const token = localStorage.getItem('authToken') || '';

            let result;
            if (exchange) {
                result = await api.indianStocks.getByExchange(token, exchange);
            } else {
                result = await api.indianStocks.getAll(token);
            }

            setStocks(result.data);
            setTotal(result.total);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to fetch Indian stocks';
            setError(errorMessage);
            console.error('Error fetching Indian stocks:', err);
        } finally {
            setLoading(false);
        }
    }, [exchange]);

    useEffect(() => {
        if (autoFetch) {
            fetchStocks();
        }
    }, [autoFetch, fetchStocks]);

    return {
        stocks,
        loading,
        error,
        total,
        refetch: fetchStocks
    };
}

interface UseSearchStocksOptions {
    limit?: number;
    debounceMs?: number;
}

interface UseSearchStocksReturn {
    results: IndianStock[];
    loading: boolean;
    error: string | null;
    search: (query: string) => Promise<void>;
}

/**
 * Hook to search Indian stocks
 */
export function useSearchStocks(options: UseSearchStocksOptions = {}): UseSearchStocksReturn {
    const { limit = 50, debounceMs = 300 } = options;

    const [results, setResults] = useState<IndianStock[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);

    const search = useCallback(async (query: string) => {
        // Clear previous debounce timer
        if (debounceTimer) {
            clearTimeout(debounceTimer);
        }

        if (!query.trim()) {
            setResults([]);
            return;
        }

        // Set new debounce timer
        const timer = setTimeout(async () => {
            setLoading(true);
            setError(null);

            try {
                const token = localStorage.getItem('authToken') || '';
                const result = await api.indianStocks.search(token, query, limit);
                setResults(result.data);
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Failed to search stocks';
                setError(errorMessage);
                console.error('Error searching stocks:', err);
            } finally {
                setLoading(false);
            }
        }, debounceMs);

        setDebounceTimer(timer);
    }, [limit, debounceMs, debounceTimer]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (debounceTimer) {
                clearTimeout(debounceTimer);
            }
        };
    }, [debounceTimer]);

    return {
        results,
        loading,
        error,
        search
    };
}

interface UseActiveNSEStocksReturn {
    stocks: IndianStock[];
    loading: boolean;
    error: string | null;
    total: number;
    refetch: () => Promise<void>;
}

/**
 * Hook to fetch active NSE stocks (series: EQ)
 */
export function useActiveNSEStocks(autoFetch: boolean = true): UseActiveNSEStocksReturn {
    const [stocks, setStocks] = useState<IndianStock[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [total, setTotal] = useState<number>(0);

    const fetchStocks = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem('authToken') || '';
            const result = await api.indianStocks.getActiveNSE(token);

            setStocks(result.data);
            setTotal(result.total);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to fetch active NSE stocks';
            setError(errorMessage);
            console.error('Error fetching active NSE stocks:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (autoFetch) {
            fetchStocks();
        }
    }, [autoFetch, fetchStocks]);

    return {
        stocks,
        loading,
        error,
        total,
        refetch: fetchStocks
    };
}

interface UseStockStatsReturn {
    stats: {
        total: number;
        nse: number;
        bse: number;
        uniqueISINs: number;
        activeNSE: number;
    } | null;
    loading: boolean;
    error: string | null;
}

/**
 * Hook to fetch stock statistics
 */
export function useStockStats(autoFetch: boolean = true): UseStockStatsReturn {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!autoFetch) return;

        const fetchStats = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('authToken') || '';
                const result = await api.indianStocks.getStats(token);
                setStats(result.data);
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Failed to fetch stats';
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [autoFetch]);

    return { stats, loading, error };
}
