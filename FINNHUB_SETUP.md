# Finnhub WebSocket Integration for Live Crypto Prices

This implementation provides real-time cryptocurrency price updates using Finnhub's WebSocket API.

## Setup Instructions

### 1. Get Finnhub API Key

1. Visit [https://finnhub.io](https://finnhub.io)
2. Sign up for a free account
3. Get your API key from the dashboard

### 2. Configure Environment Variable

Create or update `.env.local` in the `web-frontend` directory:

```env
NEXT_PUBLIC_FINNHUB_API_KEY=your_api_key_here
```

**Important:** The variable must start with `NEXT_PUBLIC_` to be accessible in the browser.

### 3. Restart Development Server

After adding the API key, restart your Next.js development server:

```bash
npm run dev
```

## Usage

### Basic Hook Usage

```typescript
import { useFinnhubCrypto } from '@/hooks/useFinnhubCrypto'

function MyComponent() {
  const {
    isConnected,
    latestPrices,
    subscribe,
    unsubscribe
  } = useFinnhubCrypto({
    apiKey: process.env.NEXT_PUBLIC_FINNHUB_API_KEY || '',
    symbols: ['BINANCE:BTCUSDT', 'COINBASE:ETH-USD'],
    enabled: true,
    onPriceUpdate: (data) => {
      console.log(`${data.symbol}: $${data.price}`)
    }
  })

  return (
    <div>
      {isConnected ? 'Connected' : 'Disconnected'}
      {/* Display prices */}
    </div>
  )
}
```

### Supported Symbols

Finnhub supports various crypto exchanges:

- **Binance:** `BINANCE:BTCUSDT`, `BINANCE:ETHUSDT`, etc.
- **Coinbase:** `COINBASE:BTC-USD`, `COINBASE:ETH-USD`, etc.
- **Other exchanges:** Check [Finnhub Crypto Exchanges](https://finnhub.io/docs/api/crypto-exchanges)

### Dynamic Subscription

```typescript
// Subscribe to a new symbol
subscribe('BINANCE:SOLUSDT')

// Unsubscribe from a symbol
unsubscribe('BINANCE:BTCUSDT')
```

## Features

- ✅ Real-time price updates via WebSocket
- ✅ Automatic reconnection with exponential backoff
- ✅ Multiple symbol subscriptions
- ✅ Dynamic subscribe/unsubscribe
- ✅ Connection status tracking
- ✅ Error handling and logging
- ✅ TypeScript support

## API Response Format

Finnhub sends trade data in this format:

```json
{
  "type": "trade",
  "data": [
    {
      "p": 50000.5,    // Price
      "s": 0.05,       // Volume
      "t": 1638747660000,  // Timestamp (ms)
      "v": 2.5         // Total volume
    }
  ]
}
```

## Example Component

See `components/examples/FinnhubCryptoExample.tsx` for a complete working example with:

- Connection status indicator
- Symbol subscription management
- Live price display
- Popular symbols quick-add

## Files Created

1. **`hooks/useFinnhubCrypto.ts`** - Main WebSocket hook
2. **`components/examples/FinnhubCryptoExample.tsx`** - Example component
3. **`FINNHUB_SETUP.md`** - This documentation

## Troubleshooting

### "Invalid Finnhub API key" Error

- Ensure you've set `NEXT_PUBLIC_FINNHUB_API_KEY` in `.env.local`
- Restart your development server after adding the key
- Verify the key is correct from your Finnhub dashboard

### WebSocket Not Connecting

- Check your internet connection
- Verify the API key is valid
- Check browser console for error messages
- Ensure you're not hitting rate limits (free tier: 60 requests/minute)

### No Price Updates

- Verify the symbol format is correct (e.g., `BINANCE:BTCUSDT`)
- Check if the symbol is supported by Finnhub
- Ensure the WebSocket is connected (`isConnected === true`)

## Rate Limits

Finnhub free tier limits:
- 60 API calls/minute
- 30 WebSocket connections
- Real-time data for major crypto pairs

For higher limits, consider upgrading to a paid plan.

## Next Steps

1. Integrate with your existing crypto dashboard
2. Add price charts using the real-time data
3. Implement price alerts and notifications
4. Store historical data for analysis

## Resources

- [Finnhub API Documentation](https://finnhub.io/docs/api)
- [Finnhub WebSocket Documentation](https://finnhub.io/docs/api/websocket-trades)
- [Supported Crypto Symbols](https://finnhub.io/docs/api/crypto-symbols)
