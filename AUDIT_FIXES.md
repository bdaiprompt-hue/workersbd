# WorkersBD Audit Fixes

## Issues Fixed (March 2026)

### 1. `vercel.json` Schema Validation Error
- **Issue**: `envSecrets` is not a valid Vercel v2 schema property
- **Fix**: Removed `envSecrets` and the deprecated `name` field. Environment secrets must be set via Vercel Dashboard > Project Settings > Environment Variables
- **Reference**: [Vercel v2 schema](https://vercel.com/docs/projects/project-configuration)

### 2. `next.config.js` - Deprecated `images.domains`
- **Issue**: `images.domains` is deprecated in Next.js 13+
- **Fix**: Replaced with `images.remotePatterns` for each hostname

### 3. `next.config.js` - Unused webpack callback params
- **Issue**: Destructuring `{ buildId, dev, isServer, defaultLoaders, webpack }` but only using `isServer`
- **Fix**: Simplified to `{ isServer }` to avoid ESLint no-unused-vars warnings

### 4. SEO - Missing `robots.txt`
- **Issue**: No static `robots.txt` in `public/`
- **Fix**: Added `public/robots.txt` with proper allow/disallow rules and sitemap reference

### 5. SEO - Missing PWA `manifest.json`
- **Issue**: No web app manifest for PWA / mobile SEO
- **Fix**: Added `public/manifest.json` with correct app name, description, colors, and icon references

## Remaining Actions (Manual)
- Set env vars in Vercel Dashboard: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_SITE_NAME`, `DATABASE_URL`, etc.
- Add favicon and PWA icon files: `public/icons/icon-192x192.png`, `public/icons/icon-512x512.png`
- Ensure `<link rel="manifest" href="/manifest.json" />` is in `_document.jsx`
- Verify `/api/sitemap` endpoint returns valid XML
