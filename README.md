
# Royale | Business Suite

Royale is a production-ready, offline-first PWA designed for small retail shop owners in emerging markets. It enables inventory tracking, sales recording, and business intelligence without the need for constant internet access.

## Features
- **Offline Inventory**: Manage products and stock levels using IndexedDB.
- **Mobile-First Sales**: Quick checkout flow with Cash and Mobile Money tagging.
- **AI Business Consultant**: Integrated Gemini API for actionable shop advice.
- **Compliance Ready**: One-tap CSV export of sales history for accounting.
- **PWA Capabilities**: Installable on Android/iOS with service worker caching.

## Tech Stack
- **Frontend**: React 18, TypeScript, Tailwind CSS.
- **Persistence**: IndexedDB (Native API).
- **Intelligence**: Google Gemini API (@google/genai).
- **Icons/Visuals**: Premium deep olive green aesthetic.

## Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd royale-business-suite
   ```

2. **Environment Variables**:
   Ensure an `API_KEY` environment variable is available for the Gemini features.

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Run development server**:
   ```bash
   npm start
   ```

## Deployment Steps

This app is designed to be deployed on **Vercel**, **Netlify**, or **Firebase Hosting**.

1. Connect your GitHub repository to the hosting platform.
2. Set the build command to `npm run build` and output directory to `dist` or `build`.
3. Add your `API_KEY` to the platform's Environment Variables settings.
4. Ensure the domain is served over HTTPS to enable PWA features.

## PWA Installation
- **Android**: Open the site in Chrome, tap the three dots, and select "Install App".
- **iOS**: Open the site in Safari, tap the Share icon, and select "Add to Home Screen".
