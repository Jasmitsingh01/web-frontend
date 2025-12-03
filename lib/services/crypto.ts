/**
 * Crypto Symbols Fetch Service for Frontend
 * Fetches cryptocurrency symbols directly from Finnhub API
 */

interface FinnhubCryptoSymbol {
    symbol: string;
    description: string;
    displaySymbol: string;
}

interface CryptoServiceConfig {
    apiKey: string;
    baseUrl: string;
}

interface PaginatedCryptoResponse {
    symbols: FinnhubCryptoSymbol[];
    total: number;
    hasMore: boolean;
}

export class CryptoSymbolsService {
    private config: CryptoServiceConfig;

    constructor(apiKey?: string) {
        this.config = {
            apiKey: apiKey || process.env.NEXT_PUBLIC_FINNHUB_API_KEY || '',
            baseUrl: 'https://finnhub.io/api/v1'
        };

        if (!this.config.apiKey) {
            console.warn('Finnhub API key is not configured. Crypto symbols fetching may fail.');
        }
    }

    /**
     * Fetch all cryptocurrency symbols from Finnhub
     * @param exchange - The crypto exchange to fetch symbols from (default: 'binance')
     * @returns Promise with array of crypto symbols
     */
    async fetchAllCryptoSymbols(exchange: string = 'binance'): Promise<FinnhubCryptoSymbol[]> {
        try {
            if (!this.config.apiKey) {
                throw new Error('Finnhub API key is required');
            }

            const url = `${this.config.baseUrl}/crypto/symbol?exchange=${exchange}&token=${this.config.apiKey}`;

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'User-Agent': 'TradeVault/1.0'
                }
            });

            if (!response.ok) {
                throw new Error(
                    `Finnhub API error: ${response.status} ${response.statusText}`
                );
            }

            const symbols: FinnhubCryptoSymbol[] = await response.json();

            return symbols;

        } catch (error) {
            console.error('Failed to fetch crypto symbols from Finnhub:', error);
            throw new Error(
                `Failed to fetch crypto symbols: ${error instanceof Error ? error.message : 'Unknown error'}`
            );
        }
    }

    /**
     * Fetch crypto symbols with pagination support
     * @param limit - Maximum number of symbols to return (default: 100)
     * @param exchange - The crypto exchange to fetch symbols from (default: 'binance')
     * @returns Promise with paginated crypto symbols
     */
    async fetchCryptoSymbolsPaginated(
        limit: number = 100,
        exchange: string = 'binance'
    ): Promise<PaginatedCryptoResponse> {
        const allSymbols = await this.fetchAllCryptoSymbols(exchange);

        return {
            symbols: allSymbols.slice(0, limit),
            total: allSymbols.length,
            hasMore: allSymbols.length > limit
        };
    }

    /**
     * Search crypto symbols by query string
     * @param query - Search query string
     * @param exchange - The crypto exchange to fetch symbols from (default: 'binance')
     * @returns Promise with filtered crypto symbols
     */
    async searchCryptoSymbols(
        query: string,
        exchange: string = 'binance'
    ): Promise<FinnhubCryptoSymbol[]> {
        const allSymbols = await this.fetchAllCryptoSymbols(exchange);
        const lowerQuery = query.toLowerCase();

        return allSymbols.filter(symbol =>
            symbol.symbol.toLowerCase().includes(lowerQuery) ||
            symbol.description.toLowerCase().includes(lowerQuery) ||
            symbol.displaySymbol.toLowerCase().includes(lowerQuery)
        );
    }

    /**
     * Get popular crypto symbols (top N by common usage)
     * @param count - Number of popular symbols to return (default: 20)
     * @param exchange - The crypto exchange to fetch symbols from (default: 'binance')
     * @returns Promise with popular crypto symbols
     */
    async getPopularCryptoSymbols(
        count: number = 20,
        exchange: string = 'binance'
    ): Promise<FinnhubCryptoSymbol[]> {
        const allSymbols = await this.fetchAllCryptoSymbols(exchange);

        // Filter for popular cryptocurrencies (those paired with USDT)
        const popularSymbols = allSymbols.filter(symbol =>
            symbol.symbol.includes('USDT')
        );

        return popularSymbols.slice(0, count);
    }

    /**
     * Get crypto symbol by exact symbol match
     * @param symbolName - Exact symbol name to search for
     * @param exchange - The crypto exchange to fetch symbols from (default: 'binance')
     * @returns Promise with matching crypto symbol or null
     */
    async getCryptoSymbolByName(
        symbolName: string,
        exchange: string = 'binance'
    ): Promise<FinnhubCryptoSymbol | null> {
        const allSymbols = await this.fetchAllCryptoSymbols(exchange);

        return allSymbols.find(symbol =>
            symbol.symbol === symbolName ||
            symbol.displaySymbol === symbolName
        ) || null;
    }
}

// Singleton instance factory
let cryptoServiceInstance: CryptoSymbolsService | null = null;

/**
 * Get singleton instance of CryptoSymbolsService
 * @param apiKey - Optional Finnhub API key (uses env var if not provided)
 * @returns CryptoSymbolsService instance
 */
export const getCryptoService = (apiKey?: string): CryptoSymbolsService => {
    if (!cryptoServiceInstance) {
        cryptoServiceInstance = new CryptoSymbolsService(apiKey);
    }

    return cryptoServiceInstance;
};

// Export types
export type { FinnhubCryptoSymbol, PaginatedCryptoResponse };
