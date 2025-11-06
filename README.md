# AudioSampler

Serveur + client pour sampler audio avec presets locaux.

## Contrôles de l'interface

Les contrôles principaux se trouvent en haut et dans le panneau « Waveform (mix en temps réel) ».

### Sélecteur de preset
- Choisir un style de sons (808, Hip‑Hop, etc.).
- Par défaut aucun preset n’est sélectionné; la grille reste vide tant que vous n’avez rien choisi.

### Boutons
- Charger tout (GUI)
  - Télécharge et décode tous les samples du preset en parallèle.
  - Affiche la progression par pad (octets reçus → %), puis l’état « Prêt ».
- Annuler tout
  - Annule les téléchargements en cours (AbortController) et remet les barres à zéro.
- Stop tout
  - Arrête toutes les lectures en cours (stoppe les BufferSource actifs).

### Pads 
- Chaque pad représente un sample; cliquer pour le jouer.
- États affichés : Connexion… → Décodage… → Prêt.
- Une bordure « ready » et une courte animation signalent l’état prêt / la lecture.

### Panneau Waveform (apparaît quand tous les sons sont prêts)
- Waveform (mix en temps réel)
  - Visualise le mix global via un AnalyserNode.
  - La courbe reste lisible sur le fond grâce à un halo; les sliders reprennent la même couleur que la courbe.

#### Égaliseur (6 bandes, type peaking)
Chaque slider agit en dB (de −30 à +30) sur une bande de fréquences :
- 60 Hz — extrêmes graves (sub‑bass, kick très bas)
- 170 Hz — graves (corps du kick/basse)
- 350 Hz — bas‑médiums
- 1000 Hz — médiums
- 3500 Hz — hauts‑médiums (présence, attaques)
- 10000 Hz — aigus (air, brillance)

#### Volume global
- Échelle 0 → 10 (converti en gain 0.0 → 1.0 sur le master).

#### Balance (stéréo)
- Échelle −1 → +1 (gauche → droite) via un StereoPanner.

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





