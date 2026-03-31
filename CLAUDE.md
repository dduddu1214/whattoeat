# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

WhatToEat (오늘 뭐 먹지?) is a React web app that recommends Korean meals based on user-selected filters (food category, weather, time of day, group size, mood). All UI text is in Korean. Deployed on Vercel.

## Build & Run Commands

```bash
npm install          # Install dependencies
npm start            # Dev server at localhost:3000
npm run build        # Production build
npm test             # Run tests (Jest + React Testing Library, interactive watch mode)
npm test -- --watchAll=false              # Run tests once (CI mode)
npm test -- --testPathPattern=App.test    # Run a single test file
```

## Architecture

Single-page React 18 app with no router. All state lives in `App.jsx` via `useState` and two custom hooks. No external state library.

- **App.jsx**: Orchestrates all state (filters, recommendations, history, favorites) and contains the recommendation algorithm inline. This is the central file to understand.
- **Components** (`src/components/`): Presentational components receiving props from App. `FilterPanel` for filter UI, `MenuCard` for recommendation results (grid of cards), `RecommendButton`, `HistoryList`, `FavoritesList`, `Header`.
- **Data** (`src/data/`): `menuData.js` contains ~140 menu items as a static array. Each menu has `category`, `weatherPreference`, `timePreference`, `groupSize`, `mood`, `calories`, and `ingredients`. `constants.js` defines filter option labels.
- **Hooks** (`src/hooks/`): `useLocalStorage` persists state to localStorage (keys: `whattoeat-history`, `whattoeat-favorites`). `useCurrentTime` auto-detects time slot (breakfast/lunch/dinner/late/snack) from system clock.
- **Utils** (`src/utils/`): `menuRecommender.js` has a standalone weighted recommendation function (currently unused — App.jsx has its own inline version). `iconHelpers.js` maps mood/weather keys to emoji.

## Key Patterns

- **Recommendation algorithm** (in `App.jsx`): Filters menus by all active filters, then selects 3-5 using weighted random (time match: +2, weather match: +1). Selected menus are removed from the pool to avoid duplicates. A 2-second artificial delay simulates "thinking".
- **History exclusion**: Last 3 selected menu IDs are excluded from recommendations. If fewer than 3 menus match filters, history exclusion is skipped.
- **Styling**: Tailwind CSS utility classes throughout. Orange/red gradient theme. Responsive grid: 1-col mobile, 2-col tablet, 3-col desktop. Font: Noto Sans KR.
- **ESLint**: Extends `react-app` and `react-app/jest` (configured in package.json, not a separate config file).
