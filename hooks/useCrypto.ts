/**
 * React Hook for Crypto Symbols Fetching
 * Provides easy-to-use hooks for fetching and managing crypto symbols
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { getCryptoService, FinnhubCryptoSymbol, PaginatedCryptoResponse } from '@/lib/services/crypto';

interface UseCryptoSymbolsOptions {
    exchange?: string;
    limit?: number;
    autoFetch?: boolean;
}

interface UseCryptoSymbolsReturn {
    symbols: FinnhubCryptoSymbol[];
    loading: boolean;
    error: string | null;
    total: number;
    hasMore: boolean;
    refetch: () => Promise<void>;
}

/**
 * Hook to fetch crypto symbols with pagination
 */
export function useCryptoSymbols(options: UseCryptoSymbolsOptions = {}): UseCryptoSymbolsReturn {
    const { exchange = 'binance', limit = 100, autoFetch = true } = options;

    const [symbols, setSymbols] = useState<FinnhubCryptoSymbol[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [total, setTotal] = useState<number>(0);
    const [hasMore, setHasMore] = useState<boolean>(false);

    const fetchSymbols = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const cryptoService = getCryptoService();
            const result: PaginatedCryptoResponse = await cryptoService.fetchCryptoSymbolsPaginated(limit, exchange);

            setSymbols(result.symbols);
            setTotal(result.total);
            setHasMore(result.hasMore);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to fetch crypto symbols';
            setError(errorMessage);
            console.error('Error fetching crypto symbols:', err);
        } finally {
            setLoading(false);
        }
    }, [exchange, limit]);

    useEffect(() => {
        if (autoFetch) {
            fetchSymbols();
        }
    }, [autoFetch, fetchSymbols]);

    return {
        symbols,
        loading,
        error,
        total,
        hasMore,
        refetch: fetchSymbols
    };
}

interface UseSearchCryptoOptions {
    exchange?: string;
    debounceMs?: number;
}

interface UseSearchCryptoReturn {
    results: FinnhubCryptoSymbol[];
    loading: boolean;
    error: string | null;
    search: (query: string) => Promise<void>;
}

/**
 * Hook to search crypto symbols
 */
export function useSearchCrypto(options: UseSearchCryptoOptions = {}): UseSearchCryptoReturn {
    const { exchange = 'binance', debounceMs = 300 } = options;

    const [results, setResults] = useState<FinnhubCryptoSymbol[]>([]);
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
                const cryptoService = getCryptoService();
                const searchResults = await cryptoService.searchCryptoSymbols(query, exchange);
                setResults(searchResults);
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Failed to search crypto symbols';
                setError(errorMessage);
                console.error('Error searching crypto symbols:', err);
            } finally {
                setLoading(false);
            }
        }, debounceMs);

        setDebounceTimer(timer);
    }, [exchange, debounceMs, debounceTimer]);

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

interface UsePopularCryptoOptions {
    exchange?: string;
    count?: number;
    autoFetch?: boolean;
}

interface UsePopularCryptoReturn {
    symbols: FinnhubCryptoSymbol[];
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

/**
 * Hook to fetch popular crypto symbols
 */
export function usePopularCrypto(options: UsePopularCryptoOptions = {}): UsePopularCryptoReturn {
    const { exchange = 'binance', count = 20, autoFetch = true } = options;

    const [symbols, setSymbols] = useState<FinnhubCryptoSymbol[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchPopularSymbols = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const cryptoService = getCryptoService();
            const popularSymbols = await cryptoService.getPopularCryptoSymbols(count, exchange);
            setSymbols(popularSymbols);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to fetch popular crypto symbols';
            setError(errorMessage);
            console.error('Error fetching popular crypto symbols:', err);
        } finally {
            setLoading(false);
        }
    }, [exchange, count]);

    useEffect(() => {
        if (autoFetch) {
            fetchPopularSymbols();
        }
    }, [autoFetch, fetchPopularSymbols]);

    return {
        symbols,
        loading,
        error,
        refetch: fetchPopularSymbols
    };
}

interface UseCryptoSymbolOptions {
    exchange?: string;
    autoFetch?: boolean;
}

interface UseCryptoSymbolReturn {
    symbol: FinnhubCryptoSymbol | null;
    loading: boolean;
    error: string | null;
    fetchSymbol: (symbolName: string) => Promise<void>;
}

/**
 * Hook to fetch a specific crypto symbol by name
 */
export function useCryptoSymbol(
    symbolName?: string,
    options: UseCryptoSymbolOptions = {}
): UseCryptoSymbolReturn {
    const { exchange = 'binance', autoFetch = true } = options;

    const [symbol, setSymbol] = useState<FinnhubCryptoSymbol | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchSymbol = useCallback(async (name: string) => {
        if (!name) return;

        setLoading(true);
        setError(null);

        try {
            const cryptoService = getCryptoService();
            const foundSymbol = await cryptoService.getCryptoSymbolByName(name, exchange);
            setSymbol(foundSymbol);

            if (!foundSymbol) {
                setError(`Symbol ${name} not found`);
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to fetch crypto symbol';
            setError(errorMessage);
            console.error('Error fetching crypto symbol:', err);
        } finally {
            setLoading(false);
        }
    }, [exchange]);

    useEffect(() => {
        if (autoFetch && symbolName) {
            fetchSymbol(symbolName);
        }
    }, [autoFetch, symbolName, fetchSymbol]);

    return {
        symbol,
        loading,
        error,
        fetchSymbol
    };
}
