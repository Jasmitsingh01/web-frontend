






import WebSocket from "ws";

export function useBinanceCrypto(symbols:[]) {
    const streamUrl = `wss://stream.binance.com:9443/stream?streams=${symbols.map(s => `${s}@ticker`).join('/')}`;

    const ws = new WebSocket(streamUrl);

 
    ws.on('open', () => {
  console.log('🚀 Binance Multi-Stream Connected');
  console.log(`📡 Tracking: ${symbols.length} pairs`);
});

ws.on('message', (data) => {
  const stream = JSON.parse(data.toString());
  if (stream.data) {
    const ticker = stream.data;
    const changeEmoji = parseFloat(ticker.P) > 0 ? '📈' : '📉';
    console.log(`${ticker.s.toUpperCase()}: $${parseFloat(ticker.c).toFixed(4)} ${changeEmoji} ${ticker.P}%`);
  }
});

}