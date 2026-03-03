# Backend implementation guide (step-by-step)

This guide is based on:

- The current frontend/business feature map.
- The existing backend code and routes.
- A live database inspection of `easydrive` (tables, columns, indexes, and foreign keys).

---

## 1) Baseline snapshot (live DB today)

### Existing tables
- `SequelizeMeta`
- `users`
- `addresses`
- `students`
- `instructors`

### Existing relations (foreign keys)
- `instructors.user_id -> users.id`
- `instructors.address_id -> addresses.id`
- `students.user_id -> users.id`
- `students.address_id -> addresses.id`

### What this means
- Auth and profile foundation is ready (`users`, `students`, `instructors`, `addresses`).
- Booking, wallet/credits, payments, reviews, and waitlist still need their own domain tables.

---

## 1.1) Finalized DB contract (implemented)

Migrations were implemented and validated with rollback/re-apply. The following tables and contracts are now active:

- `student_wallets`
  - Key fields: `uuid`, `student_id (unique)`, `available_credits`
- `credit_quotes`
  - Key fields: `student_id`, `plan_id`, `base_credits`, `bonus_credits`, `total_credits`, `total_price`, `currency`, `status`, `expires_at`
  - `status` enum: `active | expired | consumed`
- `checkout_sessions`
  - Key fields: `student_id`, `quote_id`, `provider`, `provider_session_id`, `checkout_url`, `status`, `paid_at`
  - `provider` enum: `stripe | mercadopago | mock`
  - `status` enum: `pending | succeeded | failed | canceled`
- `payment_webhook_events`
  - Key fields: `checkout_session_id`, `provider`, `provider_event_id`, `event_type`, `payload_json`, `status`, `processed_at`
  - `status` enum: `pending | processed | failed`
  - Unique idempotency key: `(provider, provider_event_id)`
- `instructor_availability_slots`
  - Key fields: `uuid`, `instructor_id`, `start_at`, `end_at`, `timezone`, `slot_status`, `is_active`
  - `slot_status` enum: `open | blocked | booked`
  - Unique anti-overlap anchor: `(instructor_id, start_at, end_at)`
- `bookings`
  - Key fields: `uuid`, `student_id`, `instructor_id`, `status`, `required_credits`, `confirmed_at`, `canceled_at`, `completed_at`, `cancel_reason`
  - `status` enum: `pending | confirmed | canceled | completed`
- `booking_slots`
  - Key fields: `booking_id`, `availability_slot_id`, `start_at`, `end_at`, `status`, `credits`
  - `status` enum: `pending | confirmed | canceled | completed`
  - Unique anti-double-booking key: `availability_slot_id`
- `wallet_transactions`
  - Key fields: `uuid`, `wallet_id`, `type`, `amount`, `status`, `description`, `payment_method`, `booking_id`, `checkout_session_id`
  - `type` enum: `credit | debit | refund`
  - `status` enum: `pending | completed | failed | canceled`
- `class_reviews`
  - Key fields: `uuid`, `booking_id (unique)`, `student_id`, `instructor_id`, `rating`, `comment`
- `instructor_waitlist_entries`
  - Key fields: `uuid`, `name`, `email`, `phone`, `city`, `state`, `notes`, `status`
  - `status` enum: `pending | contacted | approved | rejected`

Implemented migration files:
- `20260302000006-create-student-wallets.js`
- `20260302000007-create-credit-quotes.js`
- `20260302000008-create-checkout-sessions.js`
- `20260302000009-create-payment-webhook-events.js`
- `20260302000010-create-instructor-availability-slots.js`
- `20260302000011-create-bookings.js`
- `20260302000012-create-booking-slots.js`
- `20260302000013-create-wallet-transactions.js`
- `20260302000014-create-class-reviews.js`
- `20260302000015-create-instructor-waitlist-entries.js`

Implemented seed file:
- `20260302000002-demo-domain-data.js`

---

## 2) Step 1 - Credits wallet foundation

Goal: replace mocked credits balance/history with real persistence.

### Tables to add
- [ ] `student_wallets`
  - Columns: `id`, `uuid`, `student_id (unique fk)`, `available_credits`, `created_at`, `updated_at`
- [ ] `wallet_transactions`
  - Columns: `id`, `uuid`, `wallet_id (fk)`, `type`, `amount`, `status`, `description`, `payment_method`, `booking_id nullable`, `checkout_session_id nullable`, `created_at`, `updated_at`

### Relations/indexes to add
- [ ] `student_wallets.student_id -> students.id` (unique)
- [ ] `wallet_transactions.wallet_id -> student_wallets.id`
- [ ] Indexes:
  - [ ] `wallet_transactions(wallet_id, created_at)`
  - [ ] `wallet_transactions(type, status)`

### Endpoints to implement
- [ ] `GET /wallet/summary`
- [ ] `GET /wallet/transactions` (paginated)

### Frontend mocks replaced after this step
- `server/contracts/dashboard/credits.ts`
- `queries/dashboard/credits-history.query.ts`

---

## 3) Step 2 - Billing quote + checkout + webhook

Goal: replace mocked credits checkout flow with real provider-backed flow.

### Tables to add
- [ ] `credit_quotes`
  - Columns: `id`, `uuid`, `student_id (fk)`, `plan_id nullable`, `base_credits`, `bonus_credits`, `total_credits`, `total_price`, `currency`, `expires_at`, timestamps
- [ ] `checkout_sessions`
  - Columns: `id`, `uuid`, `student_id (fk)`, `quote_id (fk)`, `provider`, `provider_session_id`, `checkout_url`, `status`, `paid_at nullable`, timestamps
- [ ] `payment_webhook_events`
  - Columns: `id`, `provider`, `provider_event_id (unique)`, `event_type`, `payload_json`, `status`, `processed_at`, timestamps

### Relations/indexes to add
- [ ] `credit_quotes.student_id -> students.id`
- [ ] `checkout_sessions.student_id -> students.id`
- [ ] `checkout_sessions.quote_id -> credit_quotes.id`
- [ ] Unique: `payment_webhook_events(provider, provider_event_id)`
- [ ] Unique: `checkout_sessions(provider, provider_session_id)`

### Endpoints to implement
- [ ] `POST /billing/credits/quote`
- [ ] `POST /billing/credits/checkout`
- [ ] `GET /billing/credits/checkout/:sessionId/status`
- [ ] `POST /billing/webhooks/:provider`

### Rules to implement
- [ ] Idempotent webhook processing
- [ ] On successful payment: create `wallet_transactions` credit entry and increment wallet balance atomically

### Frontend mocks replaced after this step
- `server/contracts/billing/credits.ts`

---

## 4) Step 3 - Booking core (quote + confirm)

Goal: replace mocked booking quote/confirmation with real availability and persistence.

### Tables to add
- [ ] `instructor_availability_slots`
  - Columns: `id`, `uuid`, `instructor_id (fk)`, `start_at`, `end_at`, `timezone`, `is_active`, timestamps
- [ ] `bookings`
  - Columns: `id`, `uuid`, `student_id (fk)`, `instructor_id (fk)`, `status`, `required_credits`, `confirmed_at nullable`, `canceled_at nullable`, `cancel_reason nullable`, timestamps
- [ ] `booking_slots`
  - Columns: `id`, `booking_id (fk)`, `availability_slot_id nullable fk`, `start_at`, `end_at`, `status`, `credits`, timestamps

### Relations/indexes to add
- [ ] `instructor_availability_slots.instructor_id -> instructors.id`
- [ ] `bookings.student_id -> students.id`
- [ ] `bookings.instructor_id -> instructors.id`
- [ ] `booking_slots.booking_id -> bookings.id`
- [ ] `booking_slots.availability_slot_id -> instructor_availability_slots.id`
- [ ] Anti-double-booking uniqueness strategy:
  - [ ] Unique on `booking_slots.availability_slot_id` (if using slot table as source of truth), or
  - [ ] Unique composite on `(instructor_id, start_at, end_at)` via denormalized index strategy

### Endpoints to implement
- [ ] `POST /bookings/quote`
- [ ] `POST /bookings/confirm`

### Error contract to respect
- [ ] `AUTH_REQUIRED`
- [ ] `SLOT_UNAVAILABLE`
- [ ] `INSUFFICIENT_CREDITS`

### Transactional behavior required
- [ ] Confirm booking and debit credits in one DB transaction
- [ ] Lock wallet row during debit to prevent race conditions

### Frontend mocks replaced after this step
- `queries/booking/booking-quote.query.ts`
- `mutations/booking/booking-confirm.mutation.ts`

---

## 5) Step 4 - Dashboard read endpoints

Goal: replace all dashboard mock lists with DB-backed reads.

### Endpoints to implement
- [ ] `GET /dashboard/instructors`
- [ ] `GET /dashboard/scheduled-classes`
- [ ] `GET /dashboard/my-schedule`
- [ ] `GET /dashboard/week-classes`
- [ ] `GET /dashboard/history`

### Data sources
- [ ] `instructors` + user/address tables for instructor cards
- [ ] `bookings` + `booking_slots` for schedule/week/history views
- [ ] `wallet_transactions` for credits history and totals

### Frontend mocks replaced after this step
- `server/contracts/dashboard/instructors.ts`
- `server/contracts/dashboard/scheduled-classes.ts`
- `server/contracts/dashboard/my-schedule.ts`
- `server/contracts/dashboard/week-classes.ts`
- `server/contracts/dashboard/history.ts`

---

## 6) Step 5 - Class actions and reviews

Goal: implement cancellation policy and review persistence.

### Tables to add
- [ ] `class_reviews`
  - Columns: `id`, `uuid`, `booking_id (unique fk)`, `student_id (fk)`, `instructor_id (fk)`, `rating`, `comment`, timestamps

### Endpoints to implement
- [ ] `POST /bookings/:bookingId/cancel`
- [ ] `POST /bookings/:bookingId/review`

### Rules to implement
- [ ] Cancellation policy (time-based)
- [ ] Refund rule creates `wallet_transactions` refund record when applicable
- [ ] Review allowed only for completed classes and booking owner
- [ ] Optional: update instructor `rating` and `total_reviews` aggregate safely

---

## 7) Step 6 - Waitlist and remaining auth gap

Goal: cover no-op features and frontend contract gaps.

### Tables to add
- [ ] `instructor_waitlist_entries`
  - Columns: `id`, `uuid`, `name`, `email`, `phone nullable`, `city`, `state`, `notes nullable`, `status`, timestamps

### Endpoints to implement
- [ ] `POST /instructors/waitlist`
- [ ] `POST /users/logout` (if frontend keeps explicit logout endpoint contract)

---

## 8) Executed migration order

- [x] `create-student-wallets`
- [x] `create-credit-quotes`
- [x] `create-checkout-sessions`
- [x] `create-payment-webhook-events`
- [x] `create-instructor-availability-slots`
- [x] `create-bookings`
- [x] `create-booking-slots`
- [x] `create-wallet-transactions`
- [x] `create-class-reviews`
- [x] `create-instructor-waitlist-entries`
- [x] indexes/constraints for idempotency and anti-double-booking

---

## 9) Done criteria per step

- [ ] Migration + model + associations created
- [ ] Repository + use case + validator + controller wired in DI
- [ ] Routes registered
- [ ] Unit/integration tests for happy + failure paths
- [ ] Idempotency/concurrency safeguards (webhook + booking/credits)
- [ ] Frontend contract switched from mock to endpoint
