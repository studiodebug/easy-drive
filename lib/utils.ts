import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fakePromises = <T>(cb: () => T, ms = 100) => new Promise<T>(resolve => setTimeout(() => resolve(cb()), ms));
