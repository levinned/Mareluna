# Gestaltungssystem — „Mare & Luna“

Die Leitidee ist die Verbindung von Meer, Mond und heutiger neapolitanischer
Gastlichkeit: luftig, warm, redaktionell. Mediterran ohne Klischee,
italienisch ohne Flaggenästhetik, modern ohne generischen Luxus-Look.

---

## Farbe

Tokens in `src/index.css` unter `@theme`. Keine Komponente schreibt einen
Hex-Wert in die Klasse (Ausnahme: die zwei Hover-Töne der Primärschaltfläche).

| Token | Wert | Rolle |
|---|---|---|
| `navy` | `#102A3B` | Basis Dunkel: Footer, CTA-Bänder, Kontaktpanel |
| `night` | `#071B2A` | tiefere Stufe für aufeinanderfolgende dunkle Bänder |
| `mist` | `#B9CDD2` | Flächen und Beschriftungen auf Dunkel |
| `coast` | `#DCE8E8` | helle Sektionsflächen, Mondformen |
| `porcelain` | `#F6F3EC` | Basis Hell, Seitenhintergrund |
| `sand` | `#DED1BE` | warme Akzentfläche: Promo-Band, Allergenlegende |
| `rose` | `#B86A61` | kulinarischer Akzent — **grosse** Display-Typo, Mondzeichen, Unterstriche |
| `rose-deep` | `#A85449` | derselbe Farbton, vertieft für **interaktive** Flächen und kleine Schrift (WCAG AA) |
| `brass` | `#B99762` | sehr sparsam: Mondzeichen und Haarlinien, nie Fliesstext |
| `ink` | `#172127` | Textfarbe dunkel |
| `seafoam` | `#CFDFE2` | Fliesstext auf Dunkel |

**Warum zwei Rosé-Töne.** `#B86A61` erreicht auf Porzellan 3,6:1. Das genügt
für Display-Typo (dort verlangt WCAG 3:1), nicht aber für Buttons, Links und
Beschriftungen. `rose-deep` erreicht 4,7:1 und bleibt im selben Farbton — die
Markenwirkung bleibt, die Lesbarkeit stimmt.

Nicht verwendet: knalliges Blau, reines Schwarz, Rot-Grün-Weiss, Neon,
starke Verläufe, flächige Goldoptik.

### Rhythmus der Flächen

Die Seiten wechseln bewusst zwischen drei Gründen, nie zwei gleiche
nebeneinander:

```
Porzellan  →  Sand (Promo)  →  Porzellan  →  Küstenblau  →  Nacht  →  Marineblau
```

---

## Typografie

| Rolle | Schrift |
|---|---|
| Display | **Instrument Serif** — editorial, mediterran, kursiv als Betonung |
| Fliesstext und Interface | **Manrope** |
| Beschriftungen, Preise, Metadaten | **DM Mono** |

Fluide Grössen als Tokens (`--text-d1`, `--text-d2`, `--text-d3`,
`--text-lede`) mit `clamp()`: Überschriften dürfen gross werden, Fliesstext
wird nie unter 15 px gesetzt und nie künstlich gesperrt.

Die Wortmarke ist die **echte Mareluna-Logodatei** aus der Menü-PDF. Sie wird
als CSS-Alphamaske gerendert (`@utility wordmark`) und nimmt darum jede
Markenfarbe an, ohne an Schärfe zu verlieren. Es gibt kein erfundenes
Bildlogo.

---

## Das Mondmotiv

Der Halbmond aus dem Logo — er ersetzt dort das „n“ in „luna“ — ist das
wiederkehrende Gestaltungselement. Als `<Crescent>` (Inline-SVG mit Maske)
erscheint er in drei Massstäben:

1. **Gross und ruhig** — als Hintergrundfläche, oft aus dem Seitenrand
   tretend, in sehr niedriger Deckkraft (`TideField`, `MoonAccent`).
2. **Mittel** — als Bogenform der Bilder: `mask-arch` und `mask-arch-lg`
   runden Fotos oben zu einem Mondbogen.
3. **Klein** — als Zeichen vor dem Promo-Label und der Signatur
   „Ilaria et Biagio“.

Hinweiszeilen in der Karte (Glutenfrei-Hinweis, „Nous adaptons volontiers …“)
tragen bewusst **kein** Mondzeichen, sondern ein Info-Icon (`<InfoIcon>`):
Dort ist die Aufgabe eine Information, keine Markendekoration.

Er liegt immer hinter dem Inhalt, nie über Text, und ist stets
`aria-hidden`.

---

## Bewegung

Eine langsame Gezeitenbewegung, nie verspielt.

| Element | Verhalten |
|---|---|
| Sektionen | Einblenden mit 22 px Aufwärtsbewegung, 0,9 s, gestaffelt |
| Mondformen | 26–38 s Drift, kaum wahrnehmbar |
| Buttons, Bilder | feiner Hover, 0,3–1,2 s |
| Navigation | Unterstrich wächst von links |
| Lightbox | sanftes Einblenden, 0,28 s |

Kurve durchgehend `cubic-bezier(.22,.8,.3,1)` (Token `--ease-tide`).

Kein Scroll-Jacking, kein dauerndes Parallax, keine Autoplay-Videos, kein
Intro-Screen. Unter `prefers-reduced-motion` entfallen alle Animationen und
das sanfte Scrollen; Inhalte bleiben vollständig sichtbar — das Einblenden
wird per CSS neutralisiert, nicht per JavaScript, und ist damit auch ohne JS
unkritisch.

---

## Layout

* Raster: `shell` (max. 82,5 rem) mit 20/32/56 px Innenabstand.
* Asymmetrie als Prinzip: versetzte Bildpaare, ungleiche Spalten
  (`1.08fr / 0.92fr`), vertikal verschobene Galeriekacheln.
* **Kein Kartenraster für Inhalte.** Die Karte ist eine Liste mit Haarlinien,
  die Signature-Sektion sind Tabs, die Galerie ein handgesetzter Rhythmus.
* Die Speisekarte kennt zwei Takte: Gerichte mit Beschreibung laufen einspaltig
  auf maximal 62 rem, damit Name und Preis zusammenbleiben; Getränke, Weine und
  Digestifs laufen ab `lg` zweispaltig, statt über die ganze Breite zu zerfasern.
* Die Sticky-Kategorieleiste der Karte führt die Sprünge selbst aus: Ziel ist
  immer `Header-Höhe + Leistenhöhe`, gemessen zur Laufzeit. Die Dauer liegt
  unabhängig von der Distanz zwischen 0,36 s und 0,9 s — Chromes eigenes
  Smooth-Scroll bräuchte über die 18 000 px lange Seite mehrere Sekunden.
* Header über dem Hero transparent, ab 28 px Scroll Porzellan mit Blur.
  Pro Seite steuert `tone` (`onLight` / `onDark`), welche Farbe die
  Navigation im transparenten Zustand trägt.

---

## Komponentenübersicht

| Datei | Inhalt |
|---|---|
| `ui/Primitives.tsx` | `Reveal`, `Wordmark`, `Crescent`, `Eyebrow`, Buttons, Pfeile, `SectionHeading` |
| `ui/Media.tsx` | `Picture` (WebP + Fallback, feste Seitenverhältnisse), `TideField`, `MoonAccent`, `Horizon` |
| `sections/Shared.tsx` | `PromoBand`, `ReserveCta`, `PageHero` |
| `layout/Header.tsx` | Navigation, Sprachumschalter, Mobile-Panel |
| `layout/Footer.tsx` | Marke, Navigation, Kontakt, Reservierung, Sprache, Rechtliches |
| `layout/Seo.tsx` | Titel, Beschreibung, `canonical`, `hreflang`, Structured Data |
