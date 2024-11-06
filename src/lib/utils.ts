import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const riotURL = "https://americas.api.riotgames.com";
export const API_KEY = process.env.API_KEY;
export const gameVersion = "14.21.1";
