# Finnhub WebSocket Troubleshooting

## Current Issue: Not Receiving Live Data

### Symptoms
- ✅ WebSocket connects successfully
- ✅ Symbols are subscribed
- ❌ No trade data received

### Likely Causes

#### 1. **Low Trading Volume Symbols**
Many of the symbols being subscribed to have very low trading volume:
- `BINANCE:BLURBTC` - BTC pairs have low volume
- `BINANCE:TWTBTC` - BTC pairs have low volume
- `BINANCE:BCHABCBUSD` - BUSD pairs deprecated
- `BINANCE:BNBIDRT` - Exotic fiat pairs
- `BINANCE:SHIBBUSD` - BUSD pairs deprecated

**Solution:** Focus on high-volume USDT pairs like:
- `BINANCE:BTCUSDT` ✅
- `BINANCE:ETHUSDT` ✅
- `BINANCE:BNBUSDT` ✅
- `BINANCE:SOLUSDT` ✅

#### 2. **Deprecated Quote Currencies**
Binance deprecated BUSD pairs. Symbols like:
- `BINANCE:BCHABCBUSD` ❌
- `BINANCE:SHIBBUSD` ❌
- `BINANCE:PHABUSD` ❌
- `BINANCE:GBPBUSD` ❌

**Solution:** Filter out BUSD pairs from your crypto symbol list.

#### 3. **Finnhub Free Tier Limitations**
Free tier may not support all symbols or have delayed data for low-volume pairs.

### Testing Steps

#### Step 1: Test with HTML File
1. Open `test-finnhub-connection.html` in your browser
2. Enter your Finnhub API key
3. Click "Connect"
4. Click "Test Popular Symbols"
5. You should see trade data within 10-30 seconds

#### Step 2: Check Console Logs
With the updated hook, you should see:
```
📨 Finnhub message: {type: 'ping'}
🏓 Pong sent
📨 Finnhub message: {type: 'trade', data: [...]}
💰 BINANCE:BTCUSDT: $43250.50 | Vol: 0.5 | ...
```

#### Step 3: Verify Symbol Format
Valid Finnhub crypto symbols:
- ✅ `BINANCE:BTCUSDT`
- ✅ `BINANCE:ETHUSDT`
- ✅ `COINBASE:BTC-USD`
- ❌ `BINANCE:BTCUSD` (no USDT)
- ❌ `BTC/USD` (missing exchange prefix)

### Recommended Fixes

#### Fix 1: Filter Backend Crypto Symbols
Update your backend to return only liquid USDT pairs:

```typescript
// Filter for high-volume USDT pairs only
const liquidPairs = cryptoSymbols.filter(symbol => 
  symbol.includes('USDT') && 
  !symbol.includes('BUSD') &&
  !symbol.includes('BTC') && // Exclude BTC pairs (low volume)
  !symbol.includes('ETH')    // Exclude ETH pairs (low volume)
);
```

#### Fix 2: Hardcode Popular Symbols for Testing
In `app/dashboard/market/page.tsx`, temporarily use popular symbols:

```typescript
// For testing - use popular symbols
const testSymbols = [
  'BINANCE:BTCUSDT',
  'BINANCE:ETHUSDT',
  'BINANCE:BNBUSDT',
  'BINANCE:SOLUSDT',
  'BINANCE:ADAUSDT',
  'BINANCE:DOGEUSDT',
  'BINANCE:MATICUSDT',
  'BINANCE:DOTUSDT',
  'BINANCE:AVAXUSDT',
  'BINANCE:LINKUSDT'
];

// Use test symbols instead of backend symbols
if (activeTab === 'Crypto') {
  symbolsToFetch = testSymbols.map(s => ({
    symbol: s,
    type: 'crypto',
    category: 'Crypto',
    name: s.replace('BINANCE:', '').replace('USDT', '/USD')
  }));
}
```

#### Fix 3: Add Symbol Validation
Filter out invalid symbols before subscribing:

```typescript
const validSymbols = symbols.filter(sym => {
  // Only USDT pairs
  if (!sym.includes('USDT')) return false;
  
  // Exclude deprecated BUSD
  if (sym.includes('BUSD')) return false;
  
  // Exclude low-volume BTC/ETH pairs
  if (sym.match(/BTC$|ETH$/)) return false;
  
  return true;
});
```

### Expected Behavior

Once fixed, you should see:
1. ✅ Connection established
2. ✅ Symbols subscribed
3. ✅ Ping/Pong messages every ~20 seconds
4. ✅ Trade data for active symbols (may take 10-60 seconds for first trade)
5. ✅ Price updates in the UI

### Debug Checklist

- [ ] API key is valid (check Finnhub dashboard)
- [ ] WebSocket connects (see "✅ Connected" message)
- [ ] Symbols are subscribed (see "📤 Subscribing" messages)
- [ ] Console shows "📨 Finnhub message" logs
- [ ] Using high-volume USDT pairs
- [ ] No BUSD or deprecated pairs
- [ ] Waited 30-60 seconds for first trade

### Common Issues

#### Issue: No messages at all
- **Cause:** Invalid API key or rate limit
- **Fix:** Check API key, verify free tier limits

#### Issue: Only ping messages
- **Cause:** Low-volume symbols, no active trades
- **Fix:** Use popular USDT pairs (BTC, ETH, BNB)

#### Issue: Connection drops after subscribe
- **Cause:** Invalid symbol format or too many subscriptions
- **Fix:** Validate symbols, limit to 10-20 at a time

### Resources

- [Finnhub WebSocket Docs](https://finnhub.io/docs/api/websocket-trades)
- [Supported Crypto Symbols](https://finnhub.io/docs/api/crypto-symbols)
- [Binance Trading Pairs](https://www.binance.com/en/markets)

### Next Steps

1. ✅ Test with `test-finnhub-connection.html`
2. ✅ Verify popular symbols work
3. ✅ Filter backend symbols to only liquid USDT pairs
4. ✅ Add symbol validation
5. ✅ Monitor console for trade data
