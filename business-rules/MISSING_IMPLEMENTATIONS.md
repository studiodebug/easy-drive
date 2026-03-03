# Implementation status

Current status of EasyDrive features grouped as:

- **Implemented**: real API/backend integration in code.
- **Mocked**: feature exists, but uses fake data/simulated behavior.
- **Not implemented / no-op**: no real logic and no meaningful mock behavior.

---

## 1) Implemented

| Feature | Where | Notes |
|--------|--------|--------|
| **Profile: get/update** | `queries/user/profile.query.ts`, `server/contracts/user/profile.ts` | Uses real API endpoints (`/users/profile`, `/users/profile/student`). |
| **Avatar upload** | `queries/user/avatar.query.ts`, `server/contracts/user/avatar.ts` | Uses real upload endpoint (`/files/images/upload`). |
| **Auth core (partial)** | `server/contracts/auth/login.tsx` and auth routes | Login, sign-up, refresh-token are implemented; `signOut` is still mocked (see section 2). |

---

## 2) Mocked (implemented with placeholders)

| Feature | Where | Status |
|--------|--------|--------|
| **Email confirmation** | `app/(public)/auth/confirm/route.ts`, `server/contracts/auth/login.tsx` | `confirmEmail` returns fake data; no real backend confirmation call. |
| **Get credits balance** | `server/contracts/dashboard/credits.ts`, `queries/dashboard/credits.query.ts` | Uses `localStorage` + fallback mock `{ availableCredits: 2 }`. |
| **Credits quote** | `server/contracts/billing/credits.ts` | Uses `fakePromises`; no real billing API integration. |
| **Credits checkout** | `server/contracts/billing/credits.ts` -> `createCreditsCheckout` | Returns local app URL instead of provider checkout URL. |
| **Credits checkout status** | `server/contracts/billing/credits.ts` -> `getCreditsCheckoutStatus` | Fixed/session mock status; no webhook/status API. |
| **Booking quote** | `queries/booking/booking-quote.query.ts` | Uses `fakePromises`; calculates locally; no backend quote. |
| **Confirm booking** | `mutations/booking/booking-confirm.mutation.ts` | Placeholder flow; fake booking IDs; no persistence/availability API. |
| **Dashboard: instructors** | `server/contracts/dashboard/instructors.ts`, `queries/dashboard/instructors.query.ts` | In-file mock arrays and generated mock schedule/reviews. |
| **Dashboard: scheduled classes** | `server/contracts/dashboard/scheduled-classes.ts`, `queries/dashboard/scheduled-classes.query.ts` | Uses mock list via `fakePromises`. |
| **Dashboard: my schedule** | `server/contracts/dashboard/my-schedule.ts`, `queries/dashboard/my-schedule.query.ts` | Uses mock list via `fakePromises`. |
| **Dashboard: week classes** | `server/contracts/dashboard/week-classes.ts`, `queries/dashboard/week-classes.query.ts` | Uses mock list via `fakePromises`. |
| **Dashboard: history** | `server/contracts/dashboard/history.ts`, `queries/dashboard/history.query.ts` | Uses mock list via `fakePromises`. |
| **Dashboard: credits history** | `queries/dashboard/credits-history.query.ts` | Uses `MOCK_TRANSACTIONS` and simulated latency. |
| **signOut** | `server/contracts/auth/login.tsx`, `app/api/auth/logout/route.ts` | Mocked `signOut` response; no real backend sign-out integration. |

---

## 3) Not implemented / no-op

| Feature | Where | Status |
|--------|--------|--------|
| **Forgot password** | `app/(public)/auth/forgot-password/page.tsx` | Form only toggles success; no API call. |
| **Update password (after reset link)** | `app/(public)/auth/update-password/page.tsx` | Redirect-only flow; no update-password API call. |
| **Cancel scheduled class** | `ScheduledClassDetailsModal/index.tsx` -> `handleCancelClass` | TODO; simulated delay; no cancel policy/refund logic/API. |
| **Submit class review** | `RateClassModal.tsx` -> `handleReviewSubmit` | TODO; simulated delay/log only; no API call. |
| **Entrar na lista de espera** (instructor waitlist) | `app/(public)/page.tsx` | Button has no `onClick` and no route. |
| **Footer links: Privacidade, Termos, Contato** | `app/(public)/page.tsx` | `href="#"` placeholders; no pages/real links. |
| **Header location link** | `components/blocks/Header/Header.tsx` | `href="#"`; no destination. |
| **"Minhas aulas" link (empty state)** | `ScheduledClassesEmpty.tsx` | `href="#"`; does not navigate to schedule/dashboard. |

---

## 4) Priority order (recommended)

1. **Critical for core journey**
   - Real credits balance, credits quote/checkout/status, booking quote, confirm booking (availability + persistence).
2. **Important for trust/support**
   - Forgot password, update password, cancel class (with policy/refund), review submission API, real sign-out.
3. **Legal/conversion**
   - Footer pages (Privacidade, Termos, Contato) and instructor waitlist CTA flow.
4. **Polish**
   - Real email confirmation and replacement of remaining dashboard mocks as backend endpoints become available.
