# AudioSampler

Serveur + client pour sampler audio avec presets locaux.

## Démarrer

- Installer les dépendances (si besoin):
  - `npm install`
- Lancer le serveur:
  - `npm run start`
- Ouvrir http://localhost:3000

## Structure

- `index.mjs` — serveur Express: statiques + `/api/presets`, sert `/presets` depuis `public/presets`.
- `public/` — client web et assets.
- `public/presets/` — presets JSON + dossiers audio (copie locale).

