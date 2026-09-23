# Mareluna — Restaurant & Pizzeria, Tolochenaz

Dreisprachige Website (FR / IT / EN) für Mareluna Restaurant & Pizzeria,
Chemin des Noyers 8E, 1131 Tolochenaz.

Standardsprache ist Französisch. Die französischen URLs sind identisch mit
denen der bisherigen Website (`/`, `/histoire`, `/menu`, `/galerie`,
`/commande`, `/avis`, `/contact`), damit kein bestehender Link bricht.
Italienisch und Englisch liegen unter `/it/…` und `/en/…`.

---

## Stack

| | |
|---|---|
| Build | Vite 8 |
| Framework | React 19 + TypeScript (strict) |
| Styling | Tailwind CSS 4 (CSS-first, Tokens in `src/index.css`) |
| Routing | react-router-dom 7 |
| Abhängigkeiten | keine weiteren — Animation, Lightbox und Scroll-Spy sind eigener Code |

## Loslegen

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # Typprüfung + Produktions-Build nach dist/
npm run preview    # dist/ lokal ausliefern
npm run typecheck  # nur Typprüfung
```

## Deployment

Der Build ist eine statische SPA. Sie läuft sowohl im Wurzelverzeichnis einer
Domain als auch in einem Unterordner — gesteuert über die Umgebungsvariable
`VITE_BASE` zur Buildzeit (siehe `src/lib/base.ts`).

### Netlify (empfohlen)

`netlify.toml` enthält Build-Befehl, Ausgabeverzeichnis und Node-Version;
`public/_redirects` liefert die SPA-Regel (`/* /index.html 200`). Repository
verbinden, fertig. Direktaufrufe von `/menu` antworten korrekt mit 200.

### GitHub Pages

`.github/workflows/deploy.yml` baut bei jedem Push auf `main` und
veröffentlicht nach `https://<user>.github.io/<repo>/`. Der Workflow setzt
`VITE_BASE` auf den Repository-Namen und legt `404.html` als Kopie von
`index.html` ab, damit Direktaufrufe vom Router übernommen werden.

Einmalig einzurichten: **Settings → Pages → Source: GitHub Actions**.

Zwei Einschränkungen gegenüber Netlify:

* Pages funktioniert bei **privaten** Repositories nur mit einem
  kostenpflichtigen Konto.
* Pages kennt keine Rewrites. Ein Direktaufruf von `/menu` wird zwar korrekt
  angezeigt, antwortet aber mit HTTP **404** statt 200 — für Suchmaschinen
  ein Nachteil.

### Andere Hoster

Ein Fallback auf `index.html` muss eingerichtet sein, sonst liefern
Direktaufrufe von `/menu` oder `/en/story` einen 404 des Servers.

---

## Projektstruktur

```
src/
  content/          ← alle Inhalte und Geschäftsdaten, sonst nirgends
    business.ts       Adresse, Telefon, Links, Promo, Öffnungszeiten,
                      Formular- und Bestell-Konfiguration
    menu.ts           die komplette Karte aus der offiziellen PDF
    images.ts         Bildregister inkl. Alt-Texten und Bildquellen
    story.ts          die Familiengeschichte, dreisprachig
  i18n/
    routes.ts         Sprachen, Seiten, URL-Slugs pro Sprache
    fr.ts it.ts en.ts UI-Texte (fr.ts ist die Referenzstruktur)
    index.tsx         Provider, useI18n(), Platzhalter-Ersetzung
  components/
    layout/           Header, Footer, Layout, SEO
    sections/         PromoBand, ReserveCta, PageHero
    ui/               Primitives (Buttons, Wortmarke, Mond), Media
  pages/              eine Datei pro Seite
  lib/                Hooks (Reveal, Scroll-Spy, Scroll-Lock) und Helfer
  assets/brand/       Wortmarke und Mondmotiv aus der offiziellen PDF
public/
  assets/menu-mareluna-2026.pdf     offizielle Karte zum Öffnen/Download
  assets/photos/                    Original-Fotos
  assets/photos/opt/                komprimierte, responsive Varianten
scripts/
  optimize-images.py                erzeugt die Varianten in opt/
```

**Grundregel:** Inhalte werden ausschliesslich in `src/content/` und
`src/i18n/` gepflegt. Keine Komponente enthält eine Adresse, eine Telefon-
nummer, einen Preis oder einen Bildpfad im Klartext.

## Bilder ersetzen

1. Neue Datei nach `public/assets/photos/` legen (JPEG).
2. `python scripts/optimize-images.py` ausführen (benötigt Pillow) —
   erzeugt WebP in 640/1024/1400 px plus JPEG-Fallback in `opt/`.
3. In `src/content/images.ts` `src`, `w`, `h` und die drei Alt-Texte
   eintragen bzw. anpassen.

Die Originale werden nie überschrieben und bleiben die Quelle.

## Was bewusst *nicht* gebaut wurde

Die Website erfindet keine Geschäftsfakten und täuscht keine Funktion vor:

* **Keine Öffnungszeiten** — es lagen keine verifizierten vor. Die Komponente
  existiert und erscheint automatisch, sobald sie in `business.ts` eingetragen
  sind.
* **Keine Sternebewertung, keine echten Kundenzitate** — die Avis-Seite
  verlinkt auf die Google-Fiche, die immer aktuell ist.
* **Kein Warenkorb, keine Zahlung** — Bestellungen laufen über echte
  Mailto-Links und Telefon.
* **Kein simulierter Formularversand** — solange kein Endpunkt konfiguriert
  ist, übergibt das Formular die Nachricht an das Mailprogramm der Gäste und
  sagt das auch so.
* **Keine erfundenen Rechtstexte** — Impressum und Datenschutz enthalten die
  belegten Firmendaten und klar markierte Lücken.

Details und die nächsten Schritte: **[HANDOVER.md](HANDOVER.md)**.
Gestaltungssystem: **[DESIGN.md](DESIGN.md)**.
