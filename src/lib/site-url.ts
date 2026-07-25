/**
 * Centralised site URL.
 *
 * - Local dev / any environment: set VITE_SITE_URL (falls back to the
 *   deployed-domain placeholder so canonical tags and JSON-LD always resolve).
 * - On Vercel, set VITE_SITE_URL in Project Settings → Environment Variables.
 */

export const SITE = (import.meta.env.VITE_SITE_URL as string | undefined) ??
  "https://rank-zio-digitaly.vercel.app";
