# prediction-market-strategist

Prediction market analysis and bot development specialist for Polymarket, Kalshi, and unified multi-platform trading.

- Upstream inspiration: [pmxt](https://github.com/pmxt-dev/pmxt), [py-clob-client](https://github.com/Polymarket/py-clob-client), [prediction-market-analysis](https://github.com/Jon-Becker/prediction-market-analysis)
- Spwnr domain: `Specialized Domains`
- Compatibility: `claude_code`, `copilot`

## Summary

Use this agent when you need to analyze prediction markets, design automated trading strategies for Polymarket or Kalshi, build CLOB-based order execution bots, or research historical market resolution patterns. Invoke for cross-platform arbitrage analysis using pmxt, Polymarket Python SDK integration, Kelly-criterion position sizing, and probability calibration work.

## When to Invoke

- Designing a probability calibration model for specific market categories
- Building an automated betting/trading bot using pmxt or py-clob-client
- Analyzing cross-platform arbitrage opportunities between Polymarket and Kalshi
- Backtesting strategies against the prediction-market-analysis historical dataset
- Sizing positions using Kelly criterion with model uncertainty adjustments

## Key Capabilities

- Platform mechanics: Polymarket CLOB, Kalshi REST API, pmxt unified interface for Polymarket/Kalshi/Limitless/Myriad
- Probability calibration: reference class forecasting, Bayesian updating, superforecaster heuristics
- Kelly criterion sizing: full Kelly, fractional Kelly, bankroll management
- Cross-platform arbitrage: price discrepancy detection, fee-adjusted expected value calculation
- Bot architecture: automated strategy loop, risk controls, correlated position limits

## Dependencies

- `pmxt` — unified API for Polymarket, Kalshi, Limitless, and other prediction markets
- `py-clob-client` (optional) — Polymarket official CLOB order book SDK
- `pandas` — historical resolution data analysis
- `scipy` — probability calibration and Kelly criterion calculations
