import localFont from "next/font/local";

export const EXPIRY_OPTIONS = [
  { label: "1 hour", ms: 1000 * 60 * 60 },
  { label: "6 hours", ms: 1000 * 60 * 60 * 6 },
  { label: "12 hours", ms: 1000 * 60 * 60 * 12 },
  { label: "24 hours", ms: 1000 * 60 * 60 * 24 },
  { label: "48 hours", ms: 1000 * 60 * 60 * 48 },
  { label: "1 week", ms: 1000 * 60 * 60 * 24 * 7 },
  { label: "1 month", ms: 1000 * 60 * 60 * 24 * 30 },
];
export const TOAST_TIMEOUT = 5000;
export const MAX_INPUT_LENGTH = 40;

export const FONT_CLIMATE_CRISIS = localFont({
  src: "./assets/ClimateCrisis.ttf",
});
export const FONT_OUTFIT = localFont({
  src: "./assets/Outfit.ttf",
  weight: "400 800",
});
