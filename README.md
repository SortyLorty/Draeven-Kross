# Draeven Kross · scheda

Scheda interattiva di Draeven Kross (D&D 5e, Paladino della Conquista liv. 6) come web app installabile.

- `index.html` – la scheda (tutto in un file, immagini comprese)
- `manifest.webmanifest`, `icons/` – nome e icona quando la aggiungi alla schermata Home
- `sw.js` – copia offline: dopo la prima apertura funziona anche senza rete

I dati (PF, slot, risorse, zaino) si salvano nel browser del dispositivo.

## Pubblicare con GitHub Pages
Settings → Pages → Source: *Deploy from a branch* → branch `main`, cartella `/ (root)`.

## Aggiornare
Sostituisci `index.html` e cambia `VERSION` in `sw.js` (es. `draeven-v2`), così il tablet scarica la nuova versione.
