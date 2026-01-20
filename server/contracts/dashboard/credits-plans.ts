import type { CreditPlan } from "./credits-types";

export const CREDIT_PLANS: CreditPlan[] = [
  { id: "plan-1", credits: 50, price: 50.0, label: "Básico" },
  { id: "plan-2", credits: 250, price: 250.0, label: "Intermediário" },
  { id: "plan-3", credits: 500, price: 500.0, label: "Completo", popular: true },
];

