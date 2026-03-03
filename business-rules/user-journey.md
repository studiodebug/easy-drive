# User journey: LP → Vitrine → Instructor → Booking → Login → Payment

This document describes the main flow of a visitor who lands on the EasyDrive website, finds an instructor, books a class, logs in (if needed), and completes payment (if they need credits).

---

## 1. Landing page (LP)

**Route:** `/`  
**File:** `app/(public)/page.tsx`

- User lands on the homepage.
- Sees value proposition, “Para alunos” / “Para instrutores” cards, and “Como funciona?”.
- **Actions:**
  - **Começar grátis** → `/auth/sign-up`
  - **City search** (card “Comece pela sua cidade”): user types a city, can pick a suggestion or submit → goes to **Vitrine** with `?city=...` and optionally `?state=...`.
  - **Buscar instrutores** (bottom CTA) → `/vitrine`.

---

## 2. Vitrine (instructor listing)

**Route:** `/vitrine` or `/vitrine?city=...&state=...`  
**File:** `app/(public)/vitrine/page.tsx` → `VitrineInstructors`

- User sees the list of instructors, optionally filtered by city/state from the LP.
- Can change city/state via the search banner.
- **Action:** Clicks an instructor card → **Instructor profile** at `/vitrine/instructor/[id]`.

---

## 3. Instructor profile & selecting a class

**Route:** `/vitrine/instructor/[id]`  
**Files:** `app/(public)/vitrine/instructor/[id]/page.tsx`, `InstructorProfile.tsx`, `WeeklySchedule.tsx`

- User sees instructor details: bio, vehicle, reviews, **Agenda** (weekly schedule), and credits per lesson.
- **If not logged in:** sees “Fazer login” and a notice that they can select slots but must log in to confirm.
- **Booking flow:**
  1. User selects one or more time slots in the **Agenda**.
  2. Optionally clicks **Limpar** to clear selection.
  3. Clicks **Revisar agendamento** → opens the **Booking summary** sheet (slide-out). The draft is stored in `localStorage` and survives navigation.

---

## 4. Booking summary (confirm or login/payment)

**Component:** `BookingSummarySheet` (opened from header or after “Revisar agendamento”)

- User sees: instructor, selected slots, required credits, and (if logged in) current balance and “Saldo final”.
- **Primary CTA depends on state:**
  - **No slots** → “Selecione horários” (disabled).
  - **Not authenticated** → **“Entrar para confirmar”** → redirect to **Login** with `?next=/vitrine/instructor/[id]` and a “resume booking” flag so the summary reopens after login.
  - **Authenticated but insufficient credits** → **“Comprar X créditos”** → opens **Add credits / Payment** flow.
  - **Authenticated and enough credits** → **“Confirmar agendamento”** → confirm mutation; on success, draft is cleared and sheet closes.
- **Continuar escolhendo** closes the sheet and keeps the user on the instructor page with the draft intact.

Related rules (e.g. AUTH_REQUIRED, INSUFFICIENT_CREDITS, SLOT_UNAVAILABLE) are described in `booking-and-credits.md`.

---

## 5. Login (when required to confirm booking)

**Route:** `/auth/login` or `/auth/login?next=...`  
**File:** `app/(public)/auth/login/page.tsx`

- User enters email and password.
- On success, app redirects to `next` (e.g. `/vitrine/instructor/[id]`) or `/dashboard` if no `next`.
- If they came from the booking summary, the “resume booking” flag causes the **Booking summary** sheet to open again on the instructor page so they can confirm or go to payment.

---

## 6. Payment (add credits)

**Trigger:** From Booking summary when the user is logged in but has **insufficient credits** (“Comprar X créditos”), or from Dashboard → Credits tab.

**Component:** `AddCreditsModal`  
**Dashboard:** `app/(authentitated)/dashboard/` → Credits tab (`CreditsTab`, `AddCreditsModal`)

- User selects a credit plan and sees quote (credits + bonus if any).
- Clicks checkout → redirect to external **checkout URL** (payment provider).
- After payment, user returns (e.g. with `?creditsAdded=...` on dashboard); balance is updated.
- If they opened the modal from the **Booking summary**, they can then click **Confirmar agendamento** in the summary to complete the booking.

Pricing and quote rules are in `booking-and-credits.md`.

---

## End-to-end flow (summary)

1. **LP** (`/`) → user searches city or clicks “Buscar instrutores”.
2. **Vitrine** (`/vitrine`) → user chooses an instructor.
3. **Instructor profile** (`/vitrine/instructor/[id]`) → user selects slots and clicks “Revisar agendamento”.
4. **Booking summary** opens → user clicks “Entrar para confirmar” (if not logged in).
5. **Login** (`/auth/login?next=...`) → user signs in and is sent back to the instructor page; summary reopens.
6. If balance is insufficient, user clicks “Comprar X créditos” → **Payment** (AddCreditsModal → external checkout) → returns and confirms booking from the summary.
7. User clicks **Confirmar agendamento** → booking is confirmed; draft is cleared.

---

## Persistence and resume

- **Booking draft** is stored in `localStorage` under `easy-drive-booking-draft` so slot selection persists across reloads and navigation.
- **Resume after login** is triggered by `easy-drive-booking-resume` in `localStorage`; when set before redirecting to login, the summary sheet opens again when the user lands back on the app.
