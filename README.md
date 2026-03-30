# Parcel Tracker

A parcel tracking system built in TypeScript, using a finite state machine to manage and validate parcel state transitions.

## States

A parcel moves through the following states:

`pending` → `processing` → `dispatched` → `out_for_delivery` → `delivered`

With additional states for failure cases:

`failed` → `returned`

## Rules

- Not every transition is valid. A parcel cannot jump from `pending` to `delivered`
- Once `delivered`, a parcel cannot change state
- Failed parcels can be returned but not redelivered

## Planned Expansion

- REST API layer to trigger transitions via HTTP endpoints
- MongoDB persistence to store parcel state history
- Webhook notifications on state change
- Frontend status view

## Tech Stack

- TypeScript (strict mode)
- Node.js

## Running Locally

```bash
npm install
npx tsc
node dist/index.js
```

---

Built by [Kali Hinder](https://github.com/S3RK4L)
