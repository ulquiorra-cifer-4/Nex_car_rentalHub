# Nex.RentalHub — Frontend

React frontend for the Nex.RentalHub car rental platform.

**Backend API:** `https://nex-rental-hub.onrender.com/api`

---

## Tech Stack

| Tool | Purpose |
|---|---|
| React 18 | UI library |
| React Router v6 | Client-side routing |
| Axios | HTTP client |
| Bootstrap 5 | Responsive grid & utilities |
| CSS Modules | Scoped component styles |

---

## Project Structure

```
src/
├── components/
│   ├── AuthModal/          # Login & Register modal
│   ├── BookingModal/       # Car booking flow with price calc
│   ├── CarCard/            # Individual car listing card
│   ├── FilterBar/          # Sticky filter bar (type, fuel, price)
│   ├── Footer/             # Site footer
│   ├── HeroCarousel/       # Auto-advancing hero slideshow
│   ├── Navbar/             # Sticky top navigation
│   ├── Spinner/            # Apple-style activity indicator
│   └── Toast/              # Global notification toasts
├── context/
│   └── AppContext.js       # User session + toast state (React Context)
├── hooks/
│   ├── useCars.js          # Fetching + filter state for car listings
│   └── useBookings.js      # Fetching user bookings
├── pages/
│   ├── HomePage/           # Hero + filters + car grid
│   ├── MyBookingsPage/     # User's booking history
│   └── NotFoundPage.js     # 404
├── styles/
│   └── global.css          # Design tokens, resets, shared utilities
├── utils/
│   ├── api.js              # Axios instance + typed API helpers
│   └── helpers.js          # Pure utility functions & icon maps
├── App.js                  # Root: router + global modals
└── index.js                # React entry point
```

---

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm start

# 3. Open in browser
http://localhost:3000
```

---

## Features

- **Homepage** — hero carousel, sticky filter bar (carType, fuelType, min/max price), responsive car grid
- **Booking modal** — date pickers, live total price calculation, POST to `/bookings`
- **Auth modals** — login & register with session stored in `localStorage`
- **My Bookings** — per-user booking history with status filter tabs
- **Apple Activity Indicator** — 12-spoke spinner used throughout for loading states
- **Toast notifications** — global success/error/info toasts
- **Fully responsive** — Bootstrap grid, mobile-first layout
