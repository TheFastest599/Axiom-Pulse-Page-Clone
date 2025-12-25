# Axiom Pulse Clone - UI Implementation Plan

## Phase 1: Grid Structure & Layout ✅ (Current)

### Responsive Breakpoints

- **lg (≥1024px)**: 3-column grid (New Pairs | Final Stretch | Migrated)
- **sm (640px - 1024px)**: 1-column with inline tabs
- **xs (<640px)**: 1-column with top tabs

### Component Structure

```
app/
├── page.tsx                    # Main page
└── components/
    ├── layout/
    │   ├── Header.tsx          # Top navigation bar
    │   └── PulseHeader.tsx     # "Pulse" title + display controls
    ├── tokens/
    │   ├── TokenGrid.tsx       # Main responsive grid container
    │   ├── TokenColumn.tsx     # Single column (New Pairs/Final Stretch/Migrated)
    │   ├── TokenCard.tsx       # Individual token card
    │   ├── TokenTabs.tsx       # Mobile tab navigation
    │   └── ColumnHeader.tsx    # Column title + count + filters
    └── ui/
        └── (shared components)
```

---

## Phase 2: Token Card Components

### TokenCard Layout

- Token image (left)
- Token info (name, ticker, time, icons)
- Metrics (right - MC, Volume, Floor, TX)
- Bottom stats row (dev%, bundle%, etc.)
- Progress bar indicator

### Data Fields to Display

- `image_url`, `name`, `ticker`
- `created_at` (relative time: "6s", "1m", "3h")
- `metrics.market_cap` (MC)
- `metrics.volume_24h` (V)
- `metrics.price_sol` (F - Floor)
- `metrics.transactions` (TX)
- `metrics.bonding_progress` (progress bar)
- `distribution.holders`
- `distribution.dev_status.dev_hold_percent`
- `distribution.bundle_holding`
- `distribution.snipers_holding`
- `distribution.insiders_holding`
- `security.top_10_holders_pct`
- Social links from `influence.social_links`

---

## Phase 3: Column Features

### Column Header

- Room name (New Pairs, Final Stretch, Migrated)
- Token count
- Sort controls (+/- buttons)
- Filter buttons (P1, P2, P3)

### Auto-scroll & Updates

- New tokens appear at top with animation
- Real-time price updates (green/red flash)
- Scroll position preservation

---

## Phase 4: Interactivity

### Token Card Actions

- Hover effects
- Click to select (show details panel)
- Copy contract address
- Open social links

### Display Controls

- Display dropdown (card size)
- Sound toggle
- Settings

---

## Phase 5: Polish

### Animations

- New token slide-in
- Price change flash
- Tab transitions

### Performance

- Virtualized list for large token counts
- Memoized components
- Throttled updates

---

## Current Task: Phase 1 - Grid Structure

### Files to Create

1. `components/tokens/TokenGrid.tsx` - Main responsive container
2. `components/tokens/TokenColumn.tsx` - Room column wrapper
3. `components/tokens/ColumnHeader.tsx` - Column title + controls
4. `components/tokens/TokenTabs.tsx` - Mobile tabs
5. `components/tokens/TokenCard.tsx` - Placeholder card
6. Update `app/page.tsx` - Integrate grid

### Responsive Behavior

```
lg:  [New Pairs] [Final Stretch] [Migrated]  <- 3 columns side by side
sm:  [Tab: New Pairs | Final Stretch | Migrated]  <- Inline tabs
     [Token List]
xs:  [New Pairs ▼]  <- Dropdown/tabs at top
     [Token List]
```
