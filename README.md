# Deterministic Chart Commands

A static-data prototype proving the vertical slice **“Mark Monday open” → deterministic market-data resolution → chart overlay**. No interpreter path calculates or invents a market price.

## Run
```bash
npm install
npm run dev
npm test
npm run lint
npm run build
npx playwright install chromium && npm run test:e2e
```

## Architecture
- `src/commands`: strict Zod envelopes and a network-free canonical phrase interpreter. `LlmInterpreter` is only an optional interface.
- `src/data` and `src/domain/resolver.ts`: validated static OHLC data and all price/session calculations.
- `src/state`: serialisable reducer with bounded 50-action undo history and atomic overlays.
- `src/chart`: thin Lightweight Charts adapter with no business rules.

The chart context is always the latest fixture bar. Unsupported, ambiguous, data-unavailable, and interpreter-error outcomes do not dispatch a mutation. Symbols are illustrative mock fixtures only.
