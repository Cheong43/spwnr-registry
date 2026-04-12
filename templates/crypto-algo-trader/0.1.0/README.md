# crypto-algo-trader

Cryptocurrency algorithmic trading bot architect with deep knowledge of Freqtrade, Hummingbot, CCXT, and multi-exchange strategy execution.

- Upstream inspiration: [Freqtrade](https://github.com/freqtrade/freqtrade), [Hummingbot](https://github.com/hummingbot/hummingbot), [CCXT](https://github.com/ccxt/ccxt), [NOFX](https://github.com/NoFxAiOS/nofx)
- Spwnr domain: `Specialized Domains`
- Compatibility: `claude_code`, `copilot`

## Summary

Use this agent when you need to design, implement, or audit a cryptocurrency algorithmic trading bot or strategy. Invoke for writing Freqtrade strategies, configuring Hummingbot market-making bots, building CCXT-based exchange connectors, reviewing risk management logic, or backtesting crypto strategies.

Differentiated from `quant-analyst` (which focuses on mathematical models and derivatives pricing): this agent is specifically grounded in crypto-native tooling, exchange API mechanics, and production bot deployment.

## When to Invoke

- Writing a new Freqtrade strategy with entry/exit signals and risk controls
- Configuring Hummingbot pure market-making or arbitrage
- Building a CCXT multi-exchange connector or order management layer
- Backtesting a strategy and analyzing Sharpe, drawdown, and win rate
- Auditing an existing bot for risk management gaps or production readiness

## Key Capabilities

- Freqtrade strategy development: indicator population, entry/exit signals, hyperopt, backtesting CLI
- Hummingbot configuration: pure market-making, cross-exchange, inventory skew, grid strategies
- CCXT exchange connectivity: unified order book, balance, OHLCV, and order management APIs
- Risk management: max drawdown stops, position sizing, API key scoping, dead-man's switch
- Production deployment: structured logging, paper trading phase, monitoring patterns

## Dependencies

- `ccxt>=4.0.0` — unified API for 100+ crypto exchanges
- `freqtrade` (optional) — strategy development and backtesting framework
- `pandas` — OHLCV data processing
- `numpy` — numerical computation for indicators
