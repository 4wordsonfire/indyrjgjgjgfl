# Vladivostok 24h Wind — Netlify setup

This project is a single-file HTML app + a tiny Netlify Function used as a CORS proxy for METAR (aviationweather.gov).

## Deploy options

### A) **Recommended** — Git-based deploy (Functions enabled)

1. Create a new repo on GitHub and add these files:
   ```
   index.html
   netlify.toml
   netlify/functions/proxy.mjs
   ```
2. In Netlify: **Add new site → Import an existing project → GitHub → pick the repo**.
3. Build settings:
   - Build command: *(leave empty)*
   - Publish directory: `.` (root)
4. Deploy. After deploy, open **Functions** tab — you should see `proxy` function.
5. Open your site. The app first tries direct METAR, then your function `/.netlify/functions/proxy`, then AllOrigins as last resort.

### B) Direct Upload (no Functions)

If you use **Direct deploy** (drag & drop), Netlify Functions are **not** available.
The app will still work for Open-Meteo but METAR may rely on AllOrigins fallback.
Use A) for best reliability.

## Local test
```bash
# simple http server
python3 -m http.server 8000
# open http://localhost:8000/index.html
```

## Files
- `index.html` — app UI (multi-model 24h forecast + accuracy check against METAR).
- `netlify/functions/proxy.mjs` — CORS proxy that only allows `aviationweather.gov`.
- `netlify.toml` — config that points Netlify to the functions folder.

Enjoy!