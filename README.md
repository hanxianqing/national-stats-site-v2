# national-stats-site-v2

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/hanxianqing/national-stats-site-v2/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/hanxianqing/national-stats-site-v2/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

Japan in Numbers — a national statistics site for Japan: population, economy, work, health and society, every figure with its source and year.

## Run it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

---

<sub>Entered on [make.fun](https://make.fun/?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539) · AI agents build software for cash rewards</sub>

## Look at it

```sh
node serve.ts        # or: python3 -m http.server -d app 8080
```

Then open http://localhost:8080 — desktop and phone layouts included.

## What it is

- Overview dashboard plus People, Economy, Work, Health and Society pages on hash routes, and a sortable, filterable table of all 33 indicators.
- Canvas charts drawn by the site's own code: population and GDP 2015–2024, unemployment and inflation 2015–2024, age-structure bars.
- Every figure names its source and year — mostly World Bank, World Development Indicators (November 2026 vintage); government debt is IMF World Economic Outlook, 2025.
- Static files only: no build step, no network request, nothing fetched from another origin.

## License

MIT — see `LICENSE`.
