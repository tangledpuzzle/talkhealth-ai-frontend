import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateArray(n: number, a: string, b: string): string[] {
  const arrA = new Array(Math.min(n, 5)).fill(a); // Fills 'A' till n or 5, whichever is smaller
  const arrB = new Array(5 - arrA.length).fill(b); // Fills the rest with 'B'
  return arrA.concat(arrB);
}
