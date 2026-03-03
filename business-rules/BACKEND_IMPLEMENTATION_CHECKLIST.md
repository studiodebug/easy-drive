# Backend implementation checklist

Checklist based on the current frontend feature map (`MISSING_IMPLEMENTATIONS.md`) and existing backend capabilities in `easydrive-backend`.

Use this as an implementation board for database + API work.

---

## 1) Current backend status (already implemented)

### Auth and account
- [x] `POST /users/login`
- [x] `POST /users/refresh-token`
- [x] `POST /users/signup`
- [x] `POST /users/confirm-email`
- [x] `POST /users/forgot-password`
- [x] `POST /users/reset-password`

### Profile and files
- [x] `GET /users/profile`
- [x] `PUT /users/profile/student`
- [x] `POST /files/images/upload`
- [x] `GET /files/images/transform`
- [x] `DELETE /files/images/:publicId`

### Existing tables
- [x] `users`
- [x] `addresses`
- [x] `students`
- [x] `instructors`

### Existing core relations
- [x] `users (1) -> (0..1) students`
- [x] `users (1) -> (0..1) instructors`
- [x] `addresses (1) -> (N) students`
- [x] `addresses (1) -> (N) instructors`

---

## 2) Missing tables (create migrations + models + repositories)

### Credits and wallet
- [ ] `student_wallets`
  - Suggested fields: `id`, `uuid`, `student_id (unique)`, `available_credits`, timestamps
- [ ] `wallet_transactions`
  - Suggested fields: `id`, `uuid`, `wallet_id`, `type (credit|debit|refund)`, `amount`, `status (pending|completed|failed|canceled)`, `description`, `payment_method`, `booking_id nullable`, `checkout_session_id nullable`, timestamps

### Billing and checkout
- [ ] `credit_quotes`
  - Suggested fields: `id`, `uuid`, `student_id`, `plan_id nullable`, `base_credits`, `bonus_credits`, `total_credits`, `total_price`, `currency`, `expires_at`, timestamps
- [ ] `checkout_sessions`
  - Suggested fields: `id`, `uuid`, `student_id`, `quote_id`, `provider`, `provider_session_id`, `checkout_url`, `status`, `paid_at nullable`, timestamps
- [ ] `payment_webhook_events` (idempotency/audit)
  - Suggested fields: `id`, `provider`, `provider_event_id (unique)`, `event_type`, `payload_json`, `processed_at`, `status`, timestamps

### Booking and scheduling
- [ ] `instructor_availability_slots`
  - Suggested fields: `id`, `uuid`, `instructor_id`, `start_at`, `end_at`, `timezone`, `is_active`, timestamps
- [ ] `bookings`
  - Suggested fields: `id`, `uuid`, `student_id`, `instructor_id`, `status (pending|confirmed|canceled|completed)`, `required_credits`, `confirmed_at nullable`, `canceled_at nullable`, `cancel_reason nullable`, timestamps
- [ ] `booking_slots` (supports multi-slot booking)
  - Suggested fields: `id`, `booking_id`, `availability_slot_id nullable`, `start_at`, `end_at`, `status`, `credits`, timestamps

### Reviews and waitlist
- [ ] `class_reviews`
  - Suggested fields: `id`, `uuid`, `booking_id (unique)`, `student_id`, `instructor_id`, `rating`, `comment`, timestamps
- [ ] `instructor_waitlist_entries`
  - Suggested fields: `id`, `uuid`, `name`, `email`, `phone nullable`, `city`, `state`, `notes nullable`, `status`, timestamps

---

## 3) Missing relations (add FKs, constraints, indexes)

### Wallet and billing
- [ ] `students (1) -> (1) student_wallets` (`student_wallets.student_id` unique)
- [ ] `student_wallets (1) -> (N) wallet_transactions`
- [ ] `students (1) -> (N) credit_quotes`
- [ ] `students (1) -> (N) checkout_sessions`
- [ ] `credit_quotes (1) -> (N) checkout_sessions`
- [ ] `checkout_sessions (1) -> (N) payment_webhook_events` (logical relation via provider/session)

### Booking domain
- [ ] `instructors (1) -> (N) instructor_availability_slots`
- [ ] `students (1) -> (N) bookings`
- [ ] `instructors (1) -> (N) bookings`
- [ ] `bookings (1) -> (N) booking_slots`
- [ ] `instructor_availability_slots (1) -> (0..1) booking_slots` with uniqueness to prevent double booking
- [ ] `bookings (1) -> (0..N) wallet_transactions` (debit/refund traceability)
- [ ] `bookings (1) -> (0..1) class_reviews`

### Integrity rules
- [ ] Add unique/index constraints for anti-double-booking (instructor + start/end time)
- [ ] Add idempotency constraints for payment webhook events (`provider_event_id`)
- [ ] Add transaction-safe credit debit/refund flow (DB transaction + row lock on wallet)

---

## 4) Missing endpoints (implement module by module)

### Credits and billing
- [ ] `GET /wallet/summary`  
  Return `availableCredits`, `totalSpent`, `lastTransactionDate`
- [ ] `GET /wallet/transactions`  
  Paginated credits history (credit/debit/refund)
- [ ] `POST /billing/credits/quote`  
  Input: `planId` or `customAmount`; output: `quoteId`, credits breakdown
- [ ] `POST /billing/credits/checkout`  
  Input: `quoteId`; output: provider checkout URL + session id
- [ ] `GET /billing/credits/checkout/:sessionId/status`  
  Output: `succeeded|failed|canceled` + `creditsAdded`
- [ ] `POST /billing/webhooks/:provider`  
  Validate signature, update session, credit wallet, record transaction/event

### Booking
- [ ] `POST /bookings/quote`  
  Input: instructor + selected slots; output required credits + availability result
- [ ] `POST /bookings/confirm`  
  Validates auth, availability, and credits; persists booking and debits credits atomically
- [ ] `POST /bookings/:bookingId/cancel`  
  Applies cancel policy and refund rules, updates booking/transactions

### Dashboard data
- [ ] `GET /dashboard/instructors`
- [ ] `GET /dashboard/scheduled-classes`
- [ ] `GET /dashboard/my-schedule`
- [ ] `GET /dashboard/week-classes`
- [ ] `GET /dashboard/history`

### Reviews and waitlist
- [ ] `POST /bookings/:bookingId/review`
- [ ] `POST /instructors/waitlist`

### Auth gap still mocked on frontend
- [ ] `POST /users/logout` (or equivalent invalidation strategy used by frontend)

---

## 5) Delivery order (backend-first)

### Phase 1 - Core booking and credits
- [ ] Create wallet, transaction, quote, checkout_session, webhook_event tables
- [ ] Implement quote, checkout, checkout status, webhook endpoints
- [ ] Implement bookings + booking_slots + booking quote/confirm
- [ ] Implement atomic credit debit at booking confirmation

### Phase 2 - User-facing dashboard data
- [ ] Replace mocked dashboard endpoints with DB-backed queries
- [ ] Replace credits history mock with `wallet_transactions`

### Phase 3 - Class lifecycle
- [ ] Implement cancel endpoint with policy + refund transaction
- [ ] Implement review endpoint and instructor rating aggregation

### Phase 4 - Conversion and support
- [ ] Implement instructor waitlist endpoint and persistence
- [ ] Add logout endpoint if frontend contract requires it

---

## 6) Definition of done (per feature)

- [ ] Migration created and reversible
- [ ] Sequelize model + association added
- [ ] Repository methods added
- [ ] Use case + validator + controller added
- [ ] Route registered
- [ ] Auth/authorization checks added
- [ ] Error codes aligned with frontend (`AUTH_REQUIRED`, `SLOT_UNAVAILABLE`, `INSUFFICIENT_CREDITS`)
- [ ] Integration tests for happy path and key failures
- [ ] Frontend contract switched from mock to real endpoint
