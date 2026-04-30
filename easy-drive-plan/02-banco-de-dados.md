# 02 — Banco de Dados: Models e Schemas

> Todos os models Sequelize com cada campo, tipo, constraint, valor default, e associações.
> Banco: **MySQL**. ORM: **Sequelize 6.37**.

---

## Diagrama de Relacionamentos

```
users ──────────────────────────────────────────────┐
  │                                                  │
  ├─ 1:1 ─► students                                 │
  │             │                                    │
  │             ├─ 1:1 ─► student_wallets            │
  │             │             └─ 1:N ─► wallet_transactions
  │             │                                    │
  │             ├─ 1:N ─► credit_quotes              │
  │             │             └─ 1:N ─► checkout_sessions
  │             │                           └─ 1:N ─► payment_webhook_events
  │             │                           └─ 1:N ─► wallet_transactions
  │             │                                    │
  │             └─ 1:N ─► bookings ──────────────────┤
  │                           ├─ 1:N ─► booking_slots│
  │                           └─ 1:1 ─► class_reviews│
  │                                                  │
  └─ 1:1 ─► instructors ◄──────────────────────────┘
                │
                ├─ 1:N ─► instructor_weekly_schedules
                ├─ 1:N ─► instructor_availability_slots
                ├─ 1:N ─► bookings
                └─ 1:N ─► class_reviews

addresses ─► students (FK: addressId)
addresses ─► instructors (FK: addressId)

instructor_waitlist_entries  (tabela independente, sem FK)
```

---

## Model: User

**Tabela:** `users`

| Coluna | Tipo Sequelize | SQL Type | Nullable | Default | Notas |
|--------|---------------|----------|----------|---------|-------|
| id | INTEGER | INT AUTO_INCREMENT | N | – | PK |
| uuid | CHAR(36) | CHAR(36) | N | – | UNIQUE |
| email | STRING(255) | VARCHAR(255) | N | – | UNIQUE |
| password | STRING(255) | VARCHAR(255) | N | – | hash bcrypt |
| name | STRING(255) | VARCHAR(255) | N | – | |
| photoUrl | TEXT | TEXT | Y | NULL | URL Cloudinary |
| documentType | ENUM | ENUM('CPF','RG','CNH') | Y | NULL | |
| document | STRING(50) | VARCHAR(50) | Y | NULL | |
| phone | STRING(20) | VARCHAR(20) | Y | NULL | |
| status | ENUM | ENUM('ACTIVE','INACTIVE','BLOCKED') | N | 'ACTIVE' | |
| emailVerifiedAt | DATE | DATETIME | Y | NULL | |
| emailConfirmToken | STRING(64) | VARCHAR(64) | Y | NULL | hex de 32 bytes |
| emailConfirmTokenExpiresAt | DATE | DATETIME | Y | NULL | +24h do signup |
| passwordResetToken | STRING(64) | VARCHAR(64) | Y | NULL | hex de 32 bytes |
| passwordResetTokenExpiresAt | DATE | DATETIME | Y | NULL | +1h |
| createdAt | DATE | DATETIME | N | NOW() | auto |
| updatedAt | DATE | DATETIME | N | NOW() | auto |

**Hooks:**
```typescript
beforeCreate: async (user) => { user.password = await bcrypt.hash(user.password, 10) }
beforeUpdate: async (user) => {
  if (user.changed('password')) user.password = await bcrypt.hash(user.password, 10)
}
```

**Associações:**
```typescript
User.hasOne(Instructor, { foreignKey: 'userId', as: 'instructor' })
User.hasOne(Student,    { foreignKey: 'userId', as: 'student' })
```

**Métodos adicionais do model:**
```typescript
user.comparePassword(candidatePassword: string): Promise<boolean>  // bcrypt.compare
user.isInstructor(): boolean
user.isStudent(): boolean
```

**Nota:** `id` é `INTEGER.UNSIGNED` (não apenas INTEGER). `uuid` tem `defaultValue: DataTypes.UUIDV4` — gerado automaticamente pelo Sequelize. `underscored: true` — colunas em snake_case no banco (`photo_url`, `email_confirmed_at`, etc.).

---

## Model: Address

**Tabela:** `addresses`

| Coluna | Tipo | SQL Type | Nullable | Default |
|--------|------|----------|----------|---------|
| id | INTEGER | INT AUTO_INCREMENT | N | – |
| uuid | CHAR(36) | CHAR(36) | N | – |
| zipcode | STRING(10) | VARCHAR(10) | N | – |
| street | STRING(255) | VARCHAR(255) | Y | NULL |
| number | STRING(20) | VARCHAR(20) | Y | NULL |
| complement | STRING(255) | VARCHAR(255) | Y | NULL |
| neighborhood | STRING(255) | VARCHAR(255) | Y | NULL |
| city | STRING(255) | VARCHAR(255) | N | – |
| state | STRING(2) | VARCHAR(2) | N | – | ex: 'SP' |
| country | STRING(50) | VARCHAR(50) | N | 'BRAZIL' | |
| coordinates | STRING(100) | VARCHAR(100) | Y | NULL | "lat,lon" |
| createdAt | DATE | DATETIME | N | – | |
| updatedAt | DATE | DATETIME | N | – | |

**Associações:**
```typescript
Address.hasMany(Instructor, { foreignKey: 'addressId', as: 'instructors' })
Address.hasMany(Student,    { foreignKey: 'addressId', as: 'students' })
```

---

## Model: Student

**Tabela:** `students`

| Coluna | Tipo | SQL Type | Nullable | Default |
|--------|------|----------|----------|---------|
| id | INTEGER | INT AUTO_INCREMENT | N | – |
| uuid | CHAR(36) | CHAR(36) | N | – |
| userId | INTEGER | INT | N | – | FK users.id, UNIQUE |
| addressId | INTEGER | INT | Y | NULL | FK addresses.id |
| targetLicenseType | ENUM | ENUM('A','B','C','D','E','ACC','AB') | Y | NULL | |
| hasTheoreticalCompleted | BOOLEAN | TINYINT(1) | N | false | |
| totalPracticalHours | INTEGER | INT UNSIGNED | N | 0 | |
| isActive | BOOLEAN | TINYINT(1) | N | true | |
| createdAt | DATE | DATETIME | N | – | |
| updatedAt | DATE | DATETIME | N | – | |

**Associações:**
```typescript
Student.belongsTo(User,    { foreignKey: 'userId',    as: 'user' })
Student.belongsTo(Address, { foreignKey: 'addressId', as: 'address' })
Student.hasOne(StudentWallet,    { foreignKey: 'studentId', as: 'wallet' })
Student.hasMany(CreditQuote,     { foreignKey: 'studentId', as: 'creditQuotes' })
Student.hasMany(CheckoutSession, { foreignKey: 'studentId', as: 'checkoutSessions' })
Student.hasMany(Booking,         { foreignKey: 'studentId', as: 'bookings' })
Student.hasMany(ClassReview,     { foreignKey: 'studentId', as: 'classReviews' })
```

---

## Model: Instructor

**Tabela:** `instructors`

| Coluna | Tipo | SQL Type | Nullable | Default |
|--------|------|----------|----------|---------|
| id | INTEGER | INT AUTO_INCREMENT | N | – |
| uuid | CHAR(36) | CHAR(36) | N | – |
| userId | INTEGER | INT | N | – | FK users.id, UNIQUE |
| addressId | INTEGER | INT | Y | NULL | FK addresses.id |
| age | INTEGER | INT | Y | NULL | |
| specialty | TEXT | TEXT | Y | NULL | |
| description | TEXT | TEXT | Y | NULL | bio |
| yearsOfExperience | INTEGER | INT | Y | NULL | |
| driversLicense | STRING(20) | VARCHAR(20) | Y | NULL | número CNH |
| driversLicenseType | ENUM | ENUM('A','B','C','D','E','ACC','AB') | Y | NULL | |
| isProfessional | BOOLEAN | TINYINT(1) | Y | false | instrutor profissional |
| rating | DECIMAL(3,2) | DECIMAL(3,2) | N | 0 | média 0.00–5.00 |
| totalReviews | INTEGER | INT | N | 0 | contador |
| isActive | BOOLEAN | TINYINT(1) | N | true | |
| createdAt | DATE | DATETIME | N | – | |
| updatedAt | DATE | DATETIME | N | – | |

**Associações:**
```typescript
Instructor.belongsTo(User,    { foreignKey: 'userId',    as: 'user' })
Instructor.belongsTo(Address, { foreignKey: 'addressId', as: 'address' })
Instructor.hasMany(InstructorWeeklySchedule,   { foreignKey: 'instructorId', as: 'weeklySchedules' })
Instructor.hasMany(InstructorAvailabilitySlot, { foreignKey: 'instructorId', as: 'availabilitySlots' })
Instructor.hasMany(Booking,     { foreignKey: 'instructorId', as: 'bookings' })
Instructor.hasMany(ClassReview, { foreignKey: 'instructorId', as: 'classReviews' })
```

---

## Model: StudentWallet

**Tabela:** `student_wallets`

| Coluna | Tipo | SQL Type | Nullable | Default |
|--------|------|----------|----------|---------|
| id | INTEGER | INT AUTO_INCREMENT | N | – |
| uuid | CHAR(36) | CHAR(36) | N | – |
| studentId | INTEGER | INT | N | – | FK students.id, UNIQUE |
| availableCredits | INTEGER | INT UNSIGNED | N | 0 | saldo atual |
| createdAt | DATE | DATETIME | N | – | |
| updatedAt | DATE | DATETIME | N | – | |

**Associações:**
```typescript
StudentWallet.belongsTo(Student, { foreignKey: 'studentId', as: 'student' })
StudentWallet.hasMany(WalletTransaction, { foreignKey: 'walletId', as: 'transactions' })
```

---

## Model: WalletTransaction

**Tabela:** `wallet_transactions`

| Coluna | Tipo | SQL Type | Nullable | Default |
|--------|------|----------|----------|---------|
| id | INTEGER | INT AUTO_INCREMENT | N | – |
| uuid | CHAR(36) | CHAR(36) | N | – |
| walletId | INTEGER | INT | N | – | FK student_wallets.id |
| type | ENUM | ENUM('credit','debit','refund') | N | – | |
| amount | INTEGER | INT UNSIGNED | N | – | em créditos |
| status | ENUM | ENUM('pending','completed','failed','canceled') | N | 'pending' | |
| description | STRING(255) | VARCHAR(255) | N | – | texto legível |
| paymentMethod | STRING(100) | VARCHAR(100) | Y | NULL | |
| bookingId | INTEGER | INT | Y | NULL | FK bookings.id |
| checkoutSessionId | INTEGER | INT | Y | NULL | FK checkout_sessions.id |
| createdAt | DATE | DATETIME | N | – | |
| updatedAt | DATE | DATETIME | N | – | |

**Associações:**
```typescript
WalletTransaction.belongsTo(StudentWallet,    { foreignKey: 'walletId' })
WalletTransaction.belongsTo(Booking,          { foreignKey: 'bookingId' })
WalletTransaction.belongsTo(CheckoutSession,  { foreignKey: 'checkoutSessionId' })
```

---

## Model: CreditQuote

**Tabela:** `credit_quotes`

| Coluna | Tipo | SQL Type | Nullable | Default |
|--------|------|----------|----------|---------|
| id | INTEGER | INT AUTO_INCREMENT | N | – |
| uuid | CHAR(36) | CHAR(36) | N | – |
| studentId | INTEGER | INT | N | – | FK students.id |
| planId | STRING(64) | VARCHAR(64) | Y | NULL | ID do plano (se houver) |
| baseCredits | INTEGER | INT UNSIGNED | N | – | créditos solicitados |
| bonusCredits | INTEGER | INT UNSIGNED | N | 0 | créditos bônus |
| totalCredits | INTEGER | INT UNSIGNED | N | – | base + bonus |
| totalPrice | DECIMAL(10,2) | DECIMAL(10,2) | N | – | preço total |
| currency | STRING(3) | VARCHAR(3) | N | 'BRL' | |
| status | ENUM | ENUM('active','expired','consumed') | N | 'active' | |
| expiresAt | DATE | DATETIME | N | – | +15min do create |
| createdAt | DATE | DATETIME | N | – | |
| updatedAt | DATE | DATETIME | N | – | |

**Associações:**
```typescript
CreditQuote.belongsTo(Student, { foreignKey: 'studentId' })
CreditQuote.hasMany(CheckoutSession, { foreignKey: 'quoteId' })
```

---

## Model: CheckoutSession

**Tabela:** `checkout_sessions`

| Coluna | Tipo | SQL Type | Nullable | Default |
|--------|------|----------|----------|---------|
| id | INTEGER | INT AUTO_INCREMENT | N | – |
| uuid | CHAR(36) | CHAR(36) | N | – |
| studentId | INTEGER | INT | N | – | FK students.id |
| quoteId | INTEGER | INT | N | – | FK credit_quotes.id |
| provider | ENUM | ENUM('stripe','mercadopago','mock') | N | 'mock' | |
| providerSessionId | STRING(191) | VARCHAR(191) | N | – | ID externo do provider |
| checkoutUrl | TEXT | TEXT | N | – | URL de pagamento |
| status | ENUM | ENUM('pending','succeeded','failed','canceled') | N | 'pending' | |
| paidAt | DATE | DATETIME | Y | NULL | preenchido via webhook |
| createdAt | DATE | DATETIME | N | – | |
| updatedAt | DATE | DATETIME | N | – | |

**Associações:**
```typescript
CheckoutSession.belongsTo(Student,     { foreignKey: 'studentId' })
CheckoutSession.belongsTo(CreditQuote, { foreignKey: 'quoteId' })
CheckoutSession.hasMany(PaymentWebhookEvent, { foreignKey: 'checkoutSessionId' })
CheckoutSession.hasMany(WalletTransaction,   { foreignKey: 'checkoutSessionId' })
```

---

## Model: PaymentWebhookEvent

**Tabela:** `payment_webhook_events`

| Coluna | Tipo | SQL Type | Nullable | Default |
|--------|------|----------|----------|---------|
| id | INTEGER | INT AUTO_INCREMENT | N | – |
| checkoutSessionId | INTEGER | INT | Y | NULL | FK checkout_sessions.id |
| provider | ENUM | ENUM('stripe','mercadopago','mock') | N | – | |
| providerEventId | STRING(191) | VARCHAR(191) | N | – | UNIQUE (idempotência) |
| eventType | STRING(100) | VARCHAR(100) | N | – | ex: 'checkout.session.completed' |
| payloadJson | JSON | JSON | N | – | payload completo do webhook |
| status | ENUM | ENUM('pending','processed','failed') | N | 'pending' | |
| processedAt | DATE | DATETIME | Y | NULL | |
| createdAt | DATE | DATETIME | N | – | |
| updatedAt | DATE | DATETIME | N | – | |

**Associações:**
```typescript
PaymentWebhookEvent.belongsTo(CheckoutSession, { foreignKey: 'checkoutSessionId' })
```

---

## Model: Booking

**Tabela:** `bookings`

| Coluna | Tipo | SQL Type | Nullable | Default |
|--------|------|----------|----------|---------|
| id | INTEGER | INT AUTO_INCREMENT | N | – |
| uuid | CHAR(36) | CHAR(36) | N | – |
| studentId | INTEGER | INT | N | – | FK students.id |
| instructorId | INTEGER | INT | N | – | FK instructors.id |
| status | ENUM | ENUM('pending','confirmed','canceled','completed') | N | 'pending' | |
| requiredCredits | INTEGER | INT UNSIGNED | N | – | total de créditos usados |
| confirmedAt | DATE | DATETIME | Y | NULL | |
| canceledAt | DATE | DATETIME | Y | NULL | |
| completedAt | DATE | DATETIME | Y | NULL | |
| cancelReason | TEXT | TEXT | Y | NULL | |
| createdAt | DATE | DATETIME | N | – | |
| updatedAt | DATE | DATETIME | N | – | |

**Associações:**
```typescript
Booking.belongsTo(Student,    { foreignKey: 'studentId',    as: 'student' })
Booking.belongsTo(Instructor, { foreignKey: 'instructorId', as: 'instructor' })
Booking.hasMany(BookingSlot,  { foreignKey: 'bookingId',    as: 'slots' })
Booking.hasOne(ClassReview,   { foreignKey: 'bookingId',    as: 'review' })
Booking.hasMany(WalletTransaction, { foreignKey: 'bookingId', as: 'walletTransactions' })
```

---

## Model: BookingSlot

**Tabela:** `booking_slots`

| Coluna | Tipo | SQL Type | Nullable | Default |
|--------|------|----------|----------|---------|
| id | INTEGER | INT AUTO_INCREMENT | N | – |
| bookingId | INTEGER | INT | N | – | FK bookings.id |
| availabilitySlotId | INTEGER | INT | Y | NULL | FK instructor_availability_slots.id |
| startAt | DATE | DATETIME | N | – | |
| endAt | DATE | DATETIME | N | – | |
| status | ENUM | ENUM('pending','confirmed','canceled','completed') | N | 'pending' | |
| credits | INTEGER | INT UNSIGNED | N | – | créditos desse slot |
| createdAt | DATE | DATETIME | N | – | |
| updatedAt | DATE | DATETIME | N | – | |

**Associações:**
```typescript
BookingSlot.belongsTo(Booking, { foreignKey: 'bookingId' })
BookingSlot.belongsTo(InstructorAvailabilitySlot, { foreignKey: 'availabilitySlotId' })
```

---

## Model: ClassReview

**Tabela:** `class_reviews`

| Coluna | Tipo | SQL Type | Nullable | Default |
|--------|------|----------|----------|---------|
| id | INTEGER | INT AUTO_INCREMENT | N | – |
| uuid | CHAR(36) | CHAR(36) | N | – |
| bookingId | INTEGER | INT | N | – | FK bookings.id, UNIQUE |
| studentId | INTEGER | INT | N | – | FK students.id |
| instructorId | INTEGER | INT | N | – | FK instructors.id |
| rating | TINYINT | TINYINT UNSIGNED | N | – | 1–5 |
| comment | TEXT | TEXT | Y | NULL | |
| createdAt | DATE | DATETIME | N | – | |
| updatedAt | DATE | DATETIME | N | – | |

**Associações:**
```typescript
ClassReview.belongsTo(Booking,    { foreignKey: 'bookingId' })
ClassReview.belongsTo(Student,    { foreignKey: 'studentId' })
ClassReview.belongsTo(Instructor, { foreignKey: 'instructorId' })
```

---

## Model: InstructorAvailabilitySlot

**Tabela:** `instructor_availability_slots`

| Coluna | Tipo | SQL Type | Nullable | Default |
|--------|------|----------|----------|---------|
| id | INTEGER | INT AUTO_INCREMENT | N | – |
| uuid | CHAR(36) | CHAR(36) | N | – |
| instructorId | INTEGER | INT | N | – | FK instructors.id |
| startAt | DATE | DATETIME | N | – | |
| endAt | DATE | DATETIME | N | – | |
| timezone | STRING(50) | VARCHAR(50) | N | 'America/Sao_Paulo' | |
| slotStatus | ENUM | ENUM('open','blocked','booked') | N | 'open' | |
| isActive | BOOLEAN | TINYINT(1) | N | true | |
| createdAt | DATE | DATETIME | N | – | |
| updatedAt | DATE | DATETIME | N | – | |

**Associações:**
```typescript
InstructorAvailabilitySlot.belongsTo(Instructor, { foreignKey: 'instructorId' })
// HasOne BookingSlot (via availabilitySlotId)
```

---

## Model: InstructorWeeklySchedule

**Tabela:** `instructor_weekly_schedules`

| Coluna | Tipo | SQL Type | Nullable | Default |
|--------|------|----------|----------|---------|
| id | INTEGER | INT AUTO_INCREMENT | N | – |
| uuid | CHAR(36) | CHAR(36) | N | – |
| instructorId | INTEGER | INT | N | – | FK instructors.id |
| dayOfWeek | TINYINT | TINYINT | N | – | 0=Dom, 1=Seg, ..., 6=Sáb |
| startTime | TIME | TIME | N | – | HH:MM:SS |
| endTime | TIME | TIME | N | – | HH:MM:SS |
| isActive | BOOLEAN | TINYINT(1) | N | true | |
| createdAt | DATE | DATETIME | N | – | |
| updatedAt | DATE | DATETIME | N | – | |

**Associações:**
```typescript
InstructorWeeklySchedule.belongsTo(Instructor, { foreignKey: 'instructorId' })
```

---

## Model: InstructorWaitlistEntry

**Tabela:** `instructor_waitlist_entries`

| Coluna | Tipo | SQL Type | Nullable | Default |
|--------|------|----------|----------|---------|
| id | INTEGER | INT AUTO_INCREMENT | N | – |
| uuid | CHAR(36) | CHAR(36) | N | – |
| name | STRING(255) | VARCHAR(255) | N | – | |
| email | STRING(255) | VARCHAR(255) | N | – | |
| phone | STRING(30) | VARCHAR(30) | Y | NULL | |
| city | STRING(120) | VARCHAR(120) | N | – | |
| state | STRING(2) | VARCHAR(2) | N | – | |
| notes | TEXT | TEXT | Y | NULL | |
| status | ENUM | ENUM('pending','contacted','approved','rejected') | N | 'pending' | |
| createdAt | DATE | DATETIME | N | – | |
| updatedAt | DATE | DATETIME | N | – | |

**Sem associações** — tabela independente.
