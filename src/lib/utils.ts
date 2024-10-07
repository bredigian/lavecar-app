import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function toTimeString(value: number) {
  return value.toString().padStart(2, "0")
}

export function toReserveOfNumberToString(value: number) {
  return value.toString().padStart(6, "0")
}
