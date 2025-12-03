
'use client';

import React, { useState } from 'react';
import { useCryptoSymbols, useSearchCrypto, usePopularCrypto } from '@/hooks/useCrypto';
import { FinnhubCryptoSymbol } from '@/lib/services/crypto';

export default function CryptoSymbolsList() {
    const [activeTab, setActiveTab] = useState<'all' | 'popular' | 'search'>('popular');
    const [searchQuery, setSearchQuery] = useState('');

    // Fetch all crypto symbols with pagination
    const {
        symbols: allSymbols,
        loading: allLoading,
        error: allError,
        total,
        hasMore,
        refetch: refetchAll
    } = useCryptoSymbols({
        exchange: 'binance',
        limit: 50,
        autoFetch: activeTab === 'all'
    });

    // Fetch popular crypto symbols
    const {
        symbols: popularSymbols,
        loading: popularLoading,
        error: popularError,
        refetch: refetchPopular
    } = usePopularCrypto({
        exchange: 'binance',
        count: 20,
        autoFetch: activeTab === 'popular'
    });

    // Search crypto symbols
    const {
        results: searchResults,
        loading: searchLoading,
        error: searchError,
        search
    } = useSearchCrypto({
        exchange: 'binance',
        debounceMs: 300
    });

    // Handle search input
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
        if (query.trim()) {
            search(query);
        }
    };

    // Render symbol list
    const renderSymbols = (symbols: FinnhubCryptoSymbol[]) => {
        if (symbols.length === 0) {
            return (
                <div className="text-center py-8 text-slate-400">
                    No symbols found
                </div>
            );
        }

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {symbols.map((symbol) => (
                    <div
                        key={symbol.symbol}
                        className="p-4 bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm rounded-lg border border-white/10 hover:border-emerald-500 transition-colors cursor-pointer"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-semibold text-white">
                                    {symbol.displaySymbol}
                                </h3>
                                <p className="text-sm text-slate-400">{symbol.description}</p>
                            </div>
                            <div className="text-xs text-slate-500">
                                {symbol.symbol.replace('BINANCE:', '')}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    // Determine current symbols and loading state
    let currentSymbols: FinnhubCryptoSymbol[] = [];
    let currentLoading = false;
    let currentError: string | null = null;

    if (activeTab === 'all') {
        currentSymbols = allSymbols;
        currentLoading = allLoading;
        currentError = allError;
    } else if (activeTab === 'popular') {
        currentSymbols = popularSymbols;
        currentLoading = popularLoading;
        currentError = popularError;
    } else if (activeTab === 'search') {
        currentSymbols = searchResults;
        currentLoading = searchLoading;
        currentError = searchError;
    }

    return (
        <div>
            {/* Tabs */}
            <div className="flex gap-4 mb-6 border-b border-white/10">
                <button
                    onClick={() => setActiveTab('popular')}
                    className={`px-4 py-2 font-medium transition-colors ${activeTab === 'popular'
                        ? 'text-emerald-400 border-b-2 border-emerald-500'
                        : 'text-slate-400 hover:text-white'
                        }`}
                >
                    Popular
                </button>
                <button
                    onClick={() => setActiveTab('all')}
                    className={`px-4 py-2 font-medium transition-colors ${activeTab === 'all'
                        ? 'text-emerald-400 border-b-2 border-emerald-500'
                        : 'text-slate-400 hover:text-white'
                        }`}
                >
                    All Symbols {total > 0 && `(${total})`}
                </button>
                <button
                    onClick={() => setActiveTab('search')}
                    className={`px-4 py-2 font-medium transition-colors ${activeTab === 'search'
                        ? 'text-emerald-400 border-b-2 border-emerald-500'
                        : 'text-slate-400 hover:text-white'
                        }`}
                >
                    Search
                </button>
            </div>

            {/* Search Input */}
            {activeTab === 'search' && (
                <div className="mb-6">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearch}
                        placeholder="Search crypto symbols (e.g., BTC, ETH, USDT)..."
                        className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                </div>
            )}

            {/* Loading State */}
            {currentLoading && (
                <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
                </div>
            )}

            {/* Error State */}
            {currentError && (
                <div className="bg-red-900/20 border border-red-500 text-red-400 px-4 py-3 rounded-lg mb-6">
                    <p className="font-medium">Error</p>
                    <p className="text-sm">{currentError}</p>
                </div>
            )}

            {/* Symbols List */}
            {!currentLoading && !currentError && renderSymbols(currentSymbols)}

            {/* Load More Button */}
            {activeTab === 'all' && hasMore && !currentLoading && (
                <div className="mt-6 text-center">
                    <button
                        onClick={refetchAll}
                        className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors"
                    >
                        Load More
                    </button>
                </div>
            )}

            {/* Refresh Button */}
            {!currentLoading && (
                <div className="mt-6 text-center">
                    <button
                        onClick={() => {
                            if (activeTab === 'all') refetchAll();
                            else if (activeTab === 'popular') refetchPopular();
                        }}
                        className="px-6 py-2 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white rounded-lg transition-colors"
                    >
                        Refresh
                    </button>
                </div>
            )}
        </div>
    );
}
