import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Cookies from 'js-cookie';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type ErrorResponse = Record<string, string | string[]>;

export function formatErrorMessage(errors: ErrorResponse): string {
  return Object.entries(errors)
    .map(([key, messages]) => {
      const messageArray = Array.isArray(messages) ? messages : [messages];
      return `${key}: ${messageArray.join(' ')}`;
    })
    .join(' ');
}

export function setCookie(key: string | string[], value: string | string[]) {
  if (Array.isArray(key) && Array.isArray(value)) {
    key.forEach((k, index) => {
      Cookies.set(k, value[index], {
        secure: true,
      });
    });
  } else if (typeof key === 'string' && typeof value === 'string') {
    Cookies.set(key, value, {
      secure: true,
    });
  } else {
    throw new Error('Key and value must both be arrays or both be strings');
  }
}

export function getCookie(key: string) {
  return Cookies.get(key);
}

export function removeCookie(key: string | string[]) {
  if (Array.isArray(key)) {
    key.forEach(k => {
      Cookies.remove(k);
    });
  } else if (typeof key === 'string') {
    Cookies.remove(key);
  } else {
    throw new Error('Key must be an array or a string');
  }
}
