import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function delay(length, value) {
  return new Promise((res) => {
    setTimeout(() => res(value), length);
  });
}
