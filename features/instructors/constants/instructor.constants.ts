/**
 * Instructor Constants
 *
 * Constantes e configurações da feature de instrutores
 */

export const INSTRUCTOR_CONSTANTS = {
  MIN_PRICE_PER_HOUR: 50,
  MAX_PRICE_PER_HOUR: 500,
  MIN_BIO_LENGTH: 10,
  MAX_BIO_LENGTH: 500,
  DEFAULT_STALE_TIME: 5 * 60 * 1000, // 5 minutos
};

export const VEHICLE_TYPES = {
  MANUAL: "manual" as const,
  AUTOMATIC: "automatic" as const,
};

export const BRAZILIAN_STATES = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
] as const;
