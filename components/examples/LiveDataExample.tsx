/**
 * Example component demonstrating WebSocket live data usage
 */

'use client';

import { useLiveSymbols } from '@/hooks/useLiveData';

export function LiveDataExample() {
    // Example 1: Subscribe to crypto symbols
    const { data: cryptoData, isConnected, error } = useLiveSymbols(
        'crypto',
        ['BTCUSDT', 'ETHUSDT', 'BNBUSDT']
    );

    // Example 2: Subscribe to Indian stocks
    const { data: stockData } = useLiveSymbols(
        'stock',
        ['RELIANCE', 'TCS', 'INFY']
    );

    // Example 3: Subscribe to forex pairs
    const { data: forexData } = useLiveSymbols(
        'forex',
        ['EURUSD', 'GBPUSD', 'USDJPY']
    );

    if (error) {
        return (
            <div className="p-4 bg-red-50 border border-red-200 rounded">
                <p className="text-red-600">Error: {error}</p>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className="text-sm font-medium">
                    {isConnected ? 'Connected' : 'Disconnected'}
                </span>
            </div>

            {/* Crypto Section */}
            <div>
                <h2 className="text-xl font-bold mb-3">Crypto Live Prices</h2>
                <div className="grid gap-3">
                    {cryptoData.map((crypto) => (
                        <div key={crypto.symbol} className="p-4 bg-white border rounded-lg shadow-sm">
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">{crypto.displaySymbol}</span>
                                <span className="text-lg font-mono">${crypto.price.toFixed(2)}</span>
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                                Volume: {crypto.volume.toLocaleString()} | {new Date(crypto.timestamp).toLocaleTimeString()}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Stock Section */}
            <div>
                <h2 className="text-xl font-bold mb-3">Indian Stocks Live Prices</h2>
                <div className="grid gap-3">
                    {stockData.map((stock) => (
                        <div key={stock.symbol} className="p-4 bg-white border rounded-lg shadow-sm">
                            <div className="flex justify-between items-center">
                                <div>
                                    <span className="font-semibold">{stock.symbol}</span>
                                    <span className="text-sm text-gray-600 ml-2">{stock.companyName}</span>
                                </div>
                                <div className="text-right">
                                    <div className="text-lg font-mono">₹{stock.price.toFixed(2)}</div>
                                    {stock.changePercent && (
                                        <div className={`text-sm ${stock.changePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                            {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                                {stock.exchange} | {stock.marketState} | {new Date(stock.timestamp).toLocaleTimeString()}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Forex Section */}
            <div>
                <h2 className="text-xl font-bold mb-3">Forex Live Rates</h2>
                <div className="grid gap-3">
                    {forexData.map((forex) => (
                        <div key={forex.symbol} className="p-4 bg-white border rounded-lg shadow-sm">
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">{forex.displaySymbol}</span>
                                <span className="text-lg font-mono">{forex.price.toFixed(5)}</span>
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                                {new Date(forex.timestamp).toLocaleTimeString()}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
