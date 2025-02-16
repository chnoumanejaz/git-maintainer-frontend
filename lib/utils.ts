import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type ErrorResponse = Record<string, string[]>;

export function formatErrorMessage(errors: ErrorResponse): string {
  return Object.entries(errors)
    .map(([key, messages]) => `${key}: ${messages.join(' ')}`)
    .join(' ');
}
