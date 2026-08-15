# Decisions and limitations

- The prototype uses one canonical hourly UTC fixture and renders the same canonical bars for the 1h/4h/1d selectors. The selector boundary and overlay-clearing behavior are implemented; production-quality deterministic aggregation is the principal remaining v0.1 limitation.
- Sessions use `America/New_York` through Temporal/IANA. The fixture intentionally omits the US holiday on 2024-01-15 and one exact midnight bar for `MISSING`.
- Regular-session eligibility is the first exact 09:00 New York bar. The generated fixture is deliberately synthetic and deterministic.
- The optional LLM boundary is represented by an interface only: there is no key, network call, analysis, or `.env` file.
- Overlay IDs are presentation identities generated only after deterministic resolution; they are not market data.
