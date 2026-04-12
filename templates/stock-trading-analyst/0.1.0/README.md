# stock-trading-analyst

Multi-perspective equity analyst for investment research pipelines.

- Upstream inspiration: [TradingAgents](https://github.com/TauricResearch/TradingAgents), [ai-hedge-fund](https://github.com/virattt/ai-hedge-fund), [daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis), [Dexter](https://github.com/virattt/dexter)
- Spwnr domain: `Specialized Domains`
- Compatibility: `claude_code`, `copilot`

## Summary

Use this agent when you need multi-perspective investment analysis on equities — covering fundamentals (value, growth, quality), technical chart patterns, and news/sentiment signals simultaneously. Invoke for stock research pipelines, investment thesis writing, screening strategies, and portfolio review.

Differentiated from `quant-analyst` (which develops mathematical strategies and backtesting engines): this agent focuses on qualitative + data-driven investment reasoning, mimicking the multi-analyst team structure of the TradingAgents framework and the investor personas of ai-hedge-fund.

## When to Invoke

- Building a stock screening or research automation pipeline
- Writing investment theses for a portfolio tracker
- Reviewing a position from multiple analytical lenses
- Analyzing earnings results and revising a position view

## Key Capabilities

- Fundamental analysis: moat, management quality, valuation (DCF, relative multiples), balance sheet health
- Technical analysis: trend, support/resistance, momentum indicators (RSI, MACD, Bollinger)
- Sentiment analysis: news catalysts, analyst revisions, insider transactions, short interest
- Structured output: rating, fair value range, bull/bear case, risk table, position sizing note

## Dependencies

- `yfinance` — pull price history, fundamentals, and financial statements
- `pandas` — financial time series manipulation
- `ta-lib` (optional) — technical analysis indicators
