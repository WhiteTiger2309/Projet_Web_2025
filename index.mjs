import express from "express";
import fsPromises from "node:fs/promises";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import cors from "cors";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1) Détermination des répertoires statiques et des presets avec fallback robuste
const PUBLIC_IN_PLACE = path.resolve(__dirname, "public");
const PUBLIC_FALLBACK = path.resolve(
  __dirname,
  "..",
  "Git",
  "M1InfoWebTechnos2025_2026",
  "Seance5",
  "WebServicesWithCrossDomainSupport",
  "public"
);

const STATIC_DIR = process.env.PUBLIC_DIR
  ? path.resolve(process.env.PUBLIC_DIR)
  : (fs.existsSync(PUBLIC_IN_PLACE) ? PUBLIC_IN_PLACE : PUBLIC_FALLBACK);

const IN_PLACE_PRESETS = path.join(PUBLIC_IN_PLACE, "presets");
const FALLBACK_PRESETS = path.join(PUBLIC_FALLBACK, "presets");

const PRESETS_DIR = process.env.DATA_DIR
  ? path.resolve(process.env.DATA_DIR)
  : (fs.existsSync(IN_PLACE_PRESETS) ? IN_PLACE_PRESETS : FALLBACK_PRESETS);

console.log("STATIC_DIR  =", STATIC_DIR);
console.log("PRESETS_DIR =", PRESETS_DIR);

// Servir la page d'accueil et les éventuels fichiers statiques
app.use(express.static(STATIC_DIR));
// Servir explicitement /presets depuis le bon dossier (local ou fallback)
app.use("/presets", express.static(PRESETS_DIR));
app.use(cors());

app.get("/api/presets", async (req, res) => {
  try {
    const files = await fsPromises.readdir(PRESETS_DIR);
    const jsonFiles = files.filter(f => f.endsWith(".json"));

    const results = await Promise.all(
      jsonFiles.map(async (file) => {
        const filePath = path.join(PRESETS_DIR, file);
        const content = await fsPromises.readFile(filePath, "utf8");
        return JSON.parse(content);
      })
    );
    res.json(results);
  } catch (e) {
    console.error("/api/presets error:", e);
    res.status(500).json({ error: String(e?.message || e) });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`AudioSampler server running on http://localhost:${PORT}`);
});
