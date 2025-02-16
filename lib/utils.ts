import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type ErrorResponse = Record<string, string | string[]>;

export function formatErrorMessage(errors: ErrorResponse): string {
  return Object.entries(errors)
    .map(([key, messages]) => {
      const messageArray = Array.isArray(messages) ? messages : [messages];
      return `${key}: ${messageArray.join(' ')}`;
    })
    .join(' ');
}
