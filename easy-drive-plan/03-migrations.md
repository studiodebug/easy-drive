# 03 — Migrations (DDL Completo)

> Todas as migrations em ordem cronológica.
> Execute com: `npm run migrate`

---

## Ordem de Execução

| # | Timestamp | Tabela |
|---|-----------|--------|
| 1 | 20260120000001 | `users` |
| 2 | 20260120000002 | `addresses` |
| 3 | 20260120000003 | `instructors` |
| 4 | 20260120000004 | `students` |
| 5 | 20260120000005 | Adiciona colunas de token em `users` |
| 6 | 20260302000006 | `student_wallets` |
| 7 | 20260302000007 | `credit_quotes` |
| 8 | 20260302000008 | `checkout_sessions` |
| 9 | 20260302000009 | `payment_webhook_events` |
| 10 | 20260302000010 | `instructor_availability_slots` |
| 11 | 20260302000011 | `bookings` |
| 12 | 20260302000012 | `booking_slots` |
| 13 | 20260302000013 | `wallet_transactions` |
| 14 | 20260302000014 | `class_reviews` |
| 15 | 20260302000015 | `instructor_waitlist_entries` |
| 16 | 20260303000016 | `instructor_weekly_schedules` |

---

## Migration 1 — `users`

```javascript
// 20260120000001-create-users.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      uuid: { type: Sequelize.CHAR(36), allowNull: false, unique: true },
      email: { type: Sequelize.STRING(255), allowNull: false, unique: true },
      password: { type: Sequelize.STRING(255), allowNull: false },
      name: { type: Sequelize.STRING(255), allowNull: false },
      photoUrl: { type: Sequelize.TEXT, allowNull: true },
      documentType: { type: Sequelize.ENUM('CPF', 'RG', 'CNH'), allowNull: true },
      document: { type: Sequelize.STRING(50), allowNull: true },
      phone: { type: Sequelize.STRING(20), allowNull: true },
      status: {
        type: Sequelize.ENUM('ACTIVE', 'INACTIVE', 'BLOCKED'),
        allowNull: false,
        defaultValue: 'ACTIVE'
      },
      emailVerifiedAt: { type: Sequelize.DATE, allowNull: true },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('users');
  }
};
```

---

## Migration 2 — `addresses`

```javascript
// 20260120000002-create-addresses.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('addresses', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      uuid: { type: Sequelize.CHAR(36), allowNull: false, unique: true },
      zipcode: { type: Sequelize.STRING(10), allowNull: false },
      street: { type: Sequelize.STRING(255), allowNull: true },
      number: { type: Sequelize.STRING(20), allowNull: true },
      complement: { type: Sequelize.STRING(255), allowNull: true },
      neighborhood: { type: Sequelize.STRING(255), allowNull: true },
      city: { type: Sequelize.STRING(255), allowNull: false },
      state: { type: Sequelize.STRING(2), allowNull: false },
      country: { type: Sequelize.STRING(50), allowNull: false, defaultValue: 'BRAZIL' },
      coordinates: { type: Sequelize.STRING(100), allowNull: true },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('addresses');
  }
};
```

---

## Migration 3 — `instructors`

```javascript
// 20260120000003-create-instructors.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('instructors', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      uuid: { type: Sequelize.CHAR(36), allowNull: false, unique: true },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        references: { model: 'users', key: 'id' },
        onDelete: 'CASCADE'
      },
      addressId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'addresses', key: 'id' },
        onDelete: 'SET NULL'
      },
      age: { type: Sequelize.INTEGER, allowNull: true },
      specialty: { type: Sequelize.TEXT, allowNull: true },
      description: { type: Sequelize.TEXT, allowNull: true },
      yearsOfExperience: { type: Sequelize.INTEGER, allowNull: true },
      driversLicense: { type: Sequelize.STRING(20), allowNull: true },
      driversLicenseType: {
        type: Sequelize.ENUM('A', 'B', 'C', 'D', 'E', 'ACC', 'AB'),
        allowNull: true
      },
      isProfessional: { type: Sequelize.BOOLEAN, allowNull: true, defaultValue: false },
      rating: { type: Sequelize.DECIMAL(3, 2), allowNull: false, defaultValue: 0 },
      totalReviews: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      isActive: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('instructors');
  }
};
```

---

## Migration 4 — `students`

```javascript
// 20260120000004-create-students.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('students', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      uuid: { type: Sequelize.CHAR(36), allowNull: false, unique: true },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        references: { model: 'users', key: 'id' },
        onDelete: 'CASCADE'
      },
      addressId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'addresses', key: 'id' },
        onDelete: 'SET NULL'
      },
      targetLicenseType: {
        type: Sequelize.ENUM('A', 'B', 'C', 'D', 'E', 'ACC', 'AB'),
        allowNull: true
      },
      hasTheoreticalCompleted: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
      totalPracticalHours: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, defaultValue: 0 },
      isActive: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('students');
  }
};
```

---

## Migration 5 — Colunas de token em `users`

```javascript
// 20260120000005-add-token-columns-to-users.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'emailConfirmToken', {
      type: Sequelize.STRING(64), allowNull: true, after: 'emailVerifiedAt'
    });
    await queryInterface.addColumn('users', 'emailConfirmTokenExpiresAt', {
      type: Sequelize.DATE, allowNull: true, after: 'emailConfirmToken'
    });
    await queryInterface.addColumn('users', 'passwordResetToken', {
      type: Sequelize.STRING(64), allowNull: true, after: 'emailConfirmTokenExpiresAt'
    });
    await queryInterface.addColumn('users', 'passwordResetTokenExpiresAt', {
      type: Sequelize.DATE, allowNull: true, after: 'passwordResetToken'
    });
  },
  down: async (queryInterface) => {
    await queryInterface.removeColumn('users', 'emailConfirmToken');
    await queryInterface.removeColumn('users', 'emailConfirmTokenExpiresAt');
    await queryInterface.removeColumn('users', 'passwordResetToken');
    await queryInterface.removeColumn('users', 'passwordResetTokenExpiresAt');
  }
};
```

---

## Migration 6 — `student_wallets`

```javascript
// 20260302000006-create-student-wallets.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('student_wallets', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      uuid: { type: Sequelize.CHAR(36), allowNull: false, unique: true },
      studentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        references: { model: 'students', key: 'id' },
        onDelete: 'CASCADE'
      },
      availableCredits: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, defaultValue: 0 },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('student_wallets');
  }
};
```

---

## Migration 7 — `credit_quotes`

```javascript
// 20260302000007-create-credit-quotes.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('credit_quotes', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      uuid: { type: Sequelize.CHAR(36), allowNull: false, unique: true },
      studentId: {
        type: Sequelize.INTEGER, allowNull: false,
        references: { model: 'students', key: 'id' }, onDelete: 'CASCADE'
      },
      planId: { type: Sequelize.STRING(64), allowNull: true },
      baseCredits: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false },
      bonusCredits: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, defaultValue: 0 },
      totalCredits: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false },
      totalPrice: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
      currency: { type: Sequelize.STRING(3), allowNull: false, defaultValue: 'BRL' },
      status: {
        type: Sequelize.ENUM('active', 'expired', 'consumed'),
        allowNull: false, defaultValue: 'active'
      },
      expiresAt: { type: Sequelize.DATE, allowNull: false },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('credit_quotes');
  }
};
```

---

## Migration 8 — `checkout_sessions`

```javascript
// 20260302000008-create-checkout-sessions.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('checkout_sessions', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      uuid: { type: Sequelize.CHAR(36), allowNull: false, unique: true },
      studentId: {
        type: Sequelize.INTEGER, allowNull: false,
        references: { model: 'students', key: 'id' }, onDelete: 'CASCADE'
      },
      quoteId: {
        type: Sequelize.INTEGER, allowNull: false,
        references: { model: 'credit_quotes', key: 'id' }, onDelete: 'CASCADE'
      },
      provider: {
        type: Sequelize.ENUM('stripe', 'mercadopago', 'mock'),
        allowNull: false, defaultValue: 'mock'
      },
      providerSessionId: { type: Sequelize.STRING(191), allowNull: false },
      checkoutUrl: { type: Sequelize.TEXT, allowNull: false },
      status: {
        type: Sequelize.ENUM('pending', 'succeeded', 'failed', 'canceled'),
        allowNull: false, defaultValue: 'pending'
      },
      paidAt: { type: Sequelize.DATE, allowNull: true },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('checkout_sessions');
  }
};
```

---

## Migration 9 — `payment_webhook_events`

```javascript
// 20260302000009-create-payment-webhook-events.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('payment_webhook_events', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      checkoutSessionId: {
        type: Sequelize.INTEGER, allowNull: true,
        references: { model: 'checkout_sessions', key: 'id' }, onDelete: 'SET NULL'
      },
      provider: {
        type: Sequelize.ENUM('stripe', 'mercadopago', 'mock'), allowNull: false
      },
      providerEventId: { type: Sequelize.STRING(191), allowNull: false, unique: true },
      eventType: { type: Sequelize.STRING(100), allowNull: false },
      payloadJson: { type: Sequelize.JSON, allowNull: false },
      status: {
        type: Sequelize.ENUM('pending', 'processed', 'failed'),
        allowNull: false, defaultValue: 'pending'
      },
      processedAt: { type: Sequelize.DATE, allowNull: true },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('payment_webhook_events');
  }
};
```

---

## Migration 10 — `instructor_availability_slots`

```javascript
// 20260302000010-create-instructor-availability-slots.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('instructor_availability_slots', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      uuid: { type: Sequelize.CHAR(36), allowNull: false, unique: true },
      instructorId: {
        type: Sequelize.INTEGER, allowNull: false,
        references: { model: 'instructors', key: 'id' }, onDelete: 'CASCADE'
      },
      startAt: { type: Sequelize.DATE, allowNull: false },
      endAt: { type: Sequelize.DATE, allowNull: false },
      timezone: { type: Sequelize.STRING(50), allowNull: false, defaultValue: 'America/Sao_Paulo' },
      slotStatus: {
        type: Sequelize.ENUM('open', 'blocked', 'booked'),
        allowNull: false, defaultValue: 'open'
      },
      isActive: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('instructor_availability_slots');
  }
};
```

---

## Migration 11 — `bookings`

```javascript
// 20260302000011-create-bookings.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('bookings', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      uuid: { type: Sequelize.CHAR(36), allowNull: false, unique: true },
      studentId: {
        type: Sequelize.INTEGER, allowNull: false,
        references: { model: 'students', key: 'id' }, onDelete: 'CASCADE'
      },
      instructorId: {
        type: Sequelize.INTEGER, allowNull: false,
        references: { model: 'instructors', key: 'id' }, onDelete: 'CASCADE'
      },
      status: {
        type: Sequelize.ENUM('pending', 'confirmed', 'canceled', 'completed'),
        allowNull: false, defaultValue: 'pending'
      },
      requiredCredits: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false },
      confirmedAt: { type: Sequelize.DATE, allowNull: true },
      canceledAt: { type: Sequelize.DATE, allowNull: true },
      completedAt: { type: Sequelize.DATE, allowNull: true },
      cancelReason: { type: Sequelize.TEXT, allowNull: true },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('bookings');
  }
};
```

---

## Migration 12 — `booking_slots`

```javascript
// 20260302000012-create-booking-slots.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('booking_slots', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      bookingId: {
        type: Sequelize.INTEGER, allowNull: false,
        references: { model: 'bookings', key: 'id' }, onDelete: 'CASCADE'
      },
      availabilitySlotId: {
        type: Sequelize.INTEGER, allowNull: true,
        references: { model: 'instructor_availability_slots', key: 'id' }, onDelete: 'SET NULL'
      },
      startAt: { type: Sequelize.DATE, allowNull: false },
      endAt: { type: Sequelize.DATE, allowNull: false },
      status: {
        type: Sequelize.ENUM('pending', 'confirmed', 'canceled', 'completed'),
        allowNull: false, defaultValue: 'pending'
      },
      credits: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('booking_slots');
  }
};
```

---

## Migration 13 — `wallet_transactions`

```javascript
// 20260302000013-create-wallet-transactions.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('wallet_transactions', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      uuid: { type: Sequelize.CHAR(36), allowNull: false, unique: true },
      walletId: {
        type: Sequelize.INTEGER, allowNull: false,
        references: { model: 'student_wallets', key: 'id' }, onDelete: 'CASCADE'
      },
      type: { type: Sequelize.ENUM('credit', 'debit', 'refund'), allowNull: false },
      amount: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false },
      status: {
        type: Sequelize.ENUM('pending', 'completed', 'failed', 'canceled'),
        allowNull: false, defaultValue: 'pending'
      },
      description: { type: Sequelize.STRING(255), allowNull: false },
      paymentMethod: { type: Sequelize.STRING(100), allowNull: true },
      bookingId: {
        type: Sequelize.INTEGER, allowNull: true,
        references: { model: 'bookings', key: 'id' }, onDelete: 'SET NULL'
      },
      checkoutSessionId: {
        type: Sequelize.INTEGER, allowNull: true,
        references: { model: 'checkout_sessions', key: 'id' }, onDelete: 'SET NULL'
      },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('wallet_transactions');
  }
};
```

---

## Migration 14 — `class_reviews`

```javascript
// 20260302000014-create-class-reviews.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('class_reviews', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      uuid: { type: Sequelize.CHAR(36), allowNull: false, unique: true },
      bookingId: {
        type: Sequelize.INTEGER, allowNull: false, unique: true,
        references: { model: 'bookings', key: 'id' }, onDelete: 'CASCADE'
      },
      studentId: {
        type: Sequelize.INTEGER, allowNull: false,
        references: { model: 'students', key: 'id' }, onDelete: 'CASCADE'
      },
      instructorId: {
        type: Sequelize.INTEGER, allowNull: false,
        references: { model: 'instructors', key: 'id' }, onDelete: 'CASCADE'
      },
      rating: { type: Sequelize.TINYINT.UNSIGNED, allowNull: false },
      comment: { type: Sequelize.TEXT, allowNull: true },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('class_reviews');
  }
};
```

---

## Migration 15 — `instructor_waitlist_entries`

```javascript
// 20260302000015-create-instructor-waitlist-entries.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('instructor_waitlist_entries', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      uuid: { type: Sequelize.CHAR(36), allowNull: false, unique: true },
      name: { type: Sequelize.STRING(255), allowNull: false },
      email: { type: Sequelize.STRING(255), allowNull: false },
      phone: { type: Sequelize.STRING(30), allowNull: true },
      city: { type: Sequelize.STRING(120), allowNull: false },
      state: { type: Sequelize.STRING(2), allowNull: false },
      notes: { type: Sequelize.TEXT, allowNull: true },
      status: {
        type: Sequelize.ENUM('pending', 'contacted', 'approved', 'rejected'),
        allowNull: false, defaultValue: 'pending'
      },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('instructor_waitlist_entries');
  }
};
```

---

## Migration 16 — `instructor_weekly_schedules`

```javascript
// 20260303000016-create-instructor-weekly-schedules.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('instructor_weekly_schedules', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      uuid: { type: Sequelize.CHAR(36), allowNull: false, unique: true },
      instructorId: {
        type: Sequelize.INTEGER, allowNull: false,
        references: { model: 'instructors', key: 'id' }, onDelete: 'CASCADE'
      },
      dayOfWeek: { type: Sequelize.TINYINT, allowNull: false },
      startTime: { type: Sequelize.TIME, allowNull: false },
      endTime: { type: Sequelize.TIME, allowNull: false },
      isActive: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('instructor_weekly_schedules');
  }
};
```
