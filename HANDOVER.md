# Übergabe — Mareluna

---

## 1. Übernommene bestehende Inhalte

Alles, was die bisherige Website (`mareluna-restaurant-pizzeria.netlify.app`)
und die offizielle Karte `menu-mareluna-2026.pdf` enthielten, ist weitergeführt.

### Seiten und Funktionen

| Bisher | Jetzt | Status |
|---|---|---|
| Accueil | `/` | neu gestaltet, Inhalt erhalten |
| Histoire | `/histoire` · `/it/storia` · `/en/story` | vollständige Geschichte statt Kurzfassung |
| Menu (nur PDF-Link) | `/menu` | **komplette Karte digital** + PDF öffnen und herunterladen |
| Galerie | `/galerie` | alle Bilder, asymmetrisches Raster, Lightbox |
| Réservation | externer Link | unverändert auf `eat.thelemmon.ch` |
| Commande | `/commande` | echte Mailto-Bestellung statt Stripe-Attrappe |
| Avis | `/avis` | Google-Links, ohne erfundene Bewertung |
| Contact | `/contact` | Adresse, Telefon, E-Mail, Instagram, Itinéraire, Formular |
| Sprachwechsel FR/IT/EN | Header, Mobile-Menü und Footer | erstmals mit eigenen URLs pro Sprache |
| Klickbare Telefonnummer | Header, Footer, jede CTA-Sektion, Kontakt | `tel:+41218033000` |
| Menü-PDF | `/assets/menu-mareluna-2026.pdf` | Öffnen **und** Download |
| Kontaktformular | `/contact` | mit Validierung, ohne Fake-Versand |
| Bestellbereich (Prototyp) | `/commande` | sauber vorbereiteter, ehrlicher Prototyp |

Neu hinzugekommen: `/confidentialite` und `/mentions-legales` (vorbereitet,
ohne erfundene Rechtstexte) sowie eine 404-Seite.

### Texte

* **Familiengeschichte** — der französische Originaltext von Seite 1 der
  Menü-PDF, vollständig, in `src/content/story.ts`; ins Italienische und
  Englische übersetzt. Signatur „Ilaria et Biagio“ und „Buon Appetito!“
  erhalten. Keine biografischen Details ergänzt.
* **Werte Famille / Naples / Accueil / Partage** — jeweils direkt aus einem
  Satz dieser Geschichte abgeleitet, nichts erfunden.
* **Atmosphäre** — „Salle contemporaine, terrasse végétalisée et accueil
  familial …“ von der bisherigen Startseite.
* **Promotion** — „Livraison sans frais tous les soirs du mardi au samedi.“
  als zentral schaltbares Band.
* **Glutenfrei-Hinweis** — „Toutes nos pizzas sont disponibles sans gluten
  avec un supplément de 6 CHF.“ steht sichtbar über den Pizzas *und* den
  Pizzas blanches.
* **Allergenlegende und Fleischherkunft** — beides von der letzten PDF-Seite.

### Karte

Alle **16 Kategorien** und **134 Positionen** aus der PDF, mit Preisen in CHF,
Beschreibungen und Allergenbuchstaben — dreisprachig.

Pour bien commencer · Les salades · Nos pâtes · Pour continuer · Nos pizzas ·
Pizzas blanches · Les focaccie · Pour les enfants · Les boissons · Apéritifs ·
Les bières · Petites bulles · Vins rouges · Vins blancs · Vins rosés ·
Spiritueux et digestifs · Légende allergènes

**Preise wurden zeichengenau übernommen.** Wo die PDF Preise in einer
separaten Spalte setzt (Seiten 7, 8, 12–14), wurden sie über die
Y-Koordinaten der PDF eindeutig zugeordnet, nicht über die Lesereihenfolge —
eine reine Textextraktion ordnet dort mehrere Preise falsch zu.
Einziger Eingriff: Dezimaltrennzeichen vereinheitlicht (die PDF mischt
`7,50` und `22.50`). Kein Wert wurde gerundet, ergänzt oder weggelassen.

**Vier offensichtliche Schreibfehler der PDF wurden korrigiert** — bitte
gegenprüfen und gegebenenfalls in der PDF nachziehen:

| PDF | Website |
|---|---|
| „Salade étée“ | „Salade d’été“ |
| „Tentacules de pulpe grillé“ | „Tentacules de poulpe grillé“ |
| „stacciata di bufala“ (Pizza Nerano) | „stracciata di bufala“ |
| „PETITES BOULLES“ | „Petites bulles“ |

Ebenfalls zur Prüfung: „provolone de monaco“ wurde als „provolone del Monaco“
gesetzt (die Käsesorte), und die Karte führt **keine Desserts** — obwohl
Dessertfotos existieren. Die Bestellseite bietet deshalb keine Desserts an.

---

## 2. Bildquellen

**Alle verwendeten Fotos sind echte Mareluna-Aufnahmen** von der bisherigen
Website (`/assets/*.jpg`), lokal gespeichert unter
`public/assets/photos/`. Es wurde **kein Stockmaterial** hinzugefügt —
es war keines nötig.

| Datei | Motiv | Verwendung |
|---|---|---|
| `pizza-margherita.jpg` | Pizza Margherita | Hero, Signature, Bestellseite, Galerie |
| `linguine-homard.jpg` | Linguine all’astice | Signature, Bestellseite, Galerie |
| `ziti-genovese.jpg` | Ziti alla genovese | Signature, Bestellseite, Galerie |
| `fritto-misto.jpg` | Fritto misto partenopeo | Signature, Bestellseite, Histoire, Galerie |
| `bruschette.jpg` | Fantasia di bruschette | Startseite, Bestellseite, Galerie |
| `pasta-polpette.jpg` | Pasta mit Tomatensugo | Galerie |
| `baba.jpg` | Babà | Histoire, Galerie |
| `dessert-chocolat.jpg` | Schokoladenkuchen | Galerie |
| `desserts-maison.jpg` | Hausgemachte Desserts | Galerie |
| `terrasse.jpg` | Begrünte Terrasse | Startseite, Histoire, Galerie |
| `salle-terrasse.jpg` | Saal zur Terrasse | Startseite, Galerie |
| `salle-2.jpg` | Saal | Histoire, Galerie |
| `entree.jpg` | Eingang | Startseite, Galerie |
| `enseigne.jpg` | Leuchtschild Fassade | Startseite, Galerie |

Markenassets (`src/assets/brand/`): **Wortmarke** und **Mondmotiv** wurden
verlustfrei aus `menu-mareluna-2026.pdf` extrahiert. Die Wortmarke wird über
eine CSS-Alphamaske eingefärbt und bleibt in jeder Grösse scharf. Es wurde
kein Bildlogo erfunden.

**Zwei Dateien liegen im Repository, werden aber bewusst nicht gezeigt:**
`nerano.jpg` und `tiramisu.jpg`. Beide doppeln ein bereits verwendetes Foto
(`linguine-homard.jpg` bzw. `desserts-maison.jpg`) und tragen eingebrannte
Werbeschrift, die neben dem ruhigen Layout unsauber wirkt. Sie lassen sich
in `src/content/images.ts` mit je einem Eintrag wieder aktivieren.

**Bildfehlende Gerichte:** Spaghettone alla Nerano und Carpaccio di polpo
standen in der Aufgabe als Signature-Vorschläge, haben aber kein eigenes
Foto. Ein Gericht wird hier nie mit dem Foto eines anderen bebildert —
deshalb zeigen die Signature- und Bestellsektion vier bzw. fünf Gerichte,
zu denen es eine echte Aufnahme gibt. Sobald Fotos vorliegen, genügt je
eine Zeile in `signatureDishIds` / `signaturePhoto` (`src/content/menu.ts`)
bzw. `ordering.featured` / `orderingPhoto` (`src/content/business.ts`).

---

## 3. Austauschbare Konfigurationen

Alles Folgende ist ohne Codeänderung anpassbar.

### `src/content/business.ts`

| Schlüssel | Bedeutung |
|---|---|
| `business` | Name, Adresse, Telefon (Anzeige + `tel:`), E-Mail, Instagram, Google Maps, Reservierungslink, Pfad zur Menü-PDF |
| `openingHours.verified` | **auf `false`** — Öffnungszeiten erscheinen weder im Footer noch auf der Kontaktseite. Auf `true` setzen und `days` füllen, dann erscheinen sie automatisch |
| `promo.active` | **auf `true`** — steuert das Band auf Startseite und Bestellseite. `false` blendet es überall aus |
| `promo.surfaces` | wo das Band erscheinen darf (`home`, `order`) |
| `promo.label` / `.message` / `.cta` | Text und Aktion des Bandes, dreisprachig |
| `reviews.googleUrl` / `.writeReviewUrl` | Ziel der beiden Avis-Buttons |
| `reviews.showPlaceholderQuotes` | **auf `false`** — die drei generischen Zitate der alten Seite sind hinterlegt, werden aber nicht ausgegeben. Erst einschalten, wenn sie durch echte, freigegebene Google-Zitate ersetzt sind |
| `contactForm.endpoint` | `null` → Mailto-Modus. Sobald eine URL eingetragen ist, wird per JSON-POST gesendet |
| `ordering.checkoutProvider` | `null` → keine Zahlung. Schalter für eine spätere Stripe-/POS-/WooCommerce-Anbindung |
| `ordering.featured` | welche Gerichte die Bestellseite zeigt |

### Weitere Stellen

* `src/content/menu.ts` — die gesamte Karte, Allergenlegende, Fleischherkunft,
  Glutenfrei-Hinweis, Signature-Auswahl.
* `src/content/story.ts` — Geschichte, Zitat, Werte, Atmosphärentext.
* `src/content/images.ts` — Bildregister, Alt-Texte, Galerie-Kategorien.
* `src/i18n/fr.ts | it.ts | en.ts` — sämtliche Oberflächentexte und
  SEO-Titel/-Beschreibungen. `fr.ts` gibt die Struktur vor; TypeScript
  meldet jede fehlende Übersetzung.
* `src/i18n/routes.ts` — URL-Slugs pro Sprache und Reihenfolge der Navigation.
* `src/index.css` — Farb-Tokens, Schriften, Typo-Skala, Bewegungskurven.

### Noch offen / zu liefern

1. **Verifizierte Öffnungszeiten.**
2. **Rechtstexte** für `/confidentialite` und `/mentions-legales` — die
   markierten `[À compléter]`-Stellen (Handelsregister-/IDE-Nummer, Hosting,
   Datenschutzangaben).
3. **Domain** — danach `sitemap.xml` ergänzen; `robots.txt` liegt bereits vor.
4. **Open-Graph-Bild** — aktuell ist keines gesetzt; ein 1200×630-Motiv in
   `public/` und ein `og:image` in `src/components/layout/Seo.tsx` genügen.
5. **Google-Bewertungslink** — beide Avis-Buttons zeigen derzeit auf den
   Maps-Eintrag. Ein direkter „Bewertung schreiben“-Link kann in
   `reviews.writeReviewUrl` hinterlegt werden.

---

## 4. Echtes Bestellen und echter Formularversand anschliessen

### 4a. Kontaktformular

Der jetzige Zustand ist kein Platzhalter, sondern ein funktionierender
Mailto-Weg: Das Formular validiert clientseitig, öffnet dann das
Mailprogramm der Gäste mit fertiger Nachricht und meldet ausdrücklich, dass
noch nichts versendet wurde. Es erscheint zu keinem Zeitpunkt „Nachricht
gesendet“.

Um einen echten Versand zu aktivieren:

1. Endpunkt anlegen — z. B. ein Formspree-Formular oder eine kleine
   Serverless-Funktion, die Resend/SMTP anspricht.
2. In `src/content/business.ts`:

   ```ts
   export const contactForm = {
     endpoint: 'https://formspree.io/f/xxxxxxxx',
     method: 'POST',
   };
   ```

3. Fertig. `ContactPage.tsx` sendet dann
   `{ name, email, phone, message }` als JSON, zeigt bei HTTP 2xx
   `t.contact.sent` und bei Fehler `t.contact.sendError` mit direktem
   E-Mail-Link. Die Stelle ist im Code als
   `// ---- Real backend, when one is configured ----` markiert.
4. Spam-Schutz nicht vergessen (Honeypot-Feld oder der Schutz des Anbieters).
5. Datenschutztext auf `/confidentialite` entsprechend ergänzen — der dort
   stehende Absatz beschreibt aktuell korrekt den Mailto-Modus und muss
   angepasst werden, sobald Daten an einen Server gehen.

### 4b. Bestellung

Aktuell: echte `mailto:`-Links an `mareluna.resto@gmail.com` mit vorbereitetem
Betreff und Text (Gericht, Preis, Abholzeit, Name, Telefon) plus die
klickbare Telefonnummer. Kein Warenkorb, keine simulierte Zahlung, keine
erfundenen Lieferzonen oder -zeiten.

Für eine echte Bestellstrecke:

1. `ordering.checkoutProvider` in `src/content/business.ts` auf `'stripe'`,
   `'woocommerce'` oder `'pos'` setzen — der Schlüssel existiert bereits als
   einziger Schalter.
2. In `src/pages/OrderPage.tsx` die Mailto-Schaltfläche pro Gericht durch die
   Aktion des Anbieters ersetzen. Die Gerichte kommen bereits mit `id`,
   Anzeigename, Preis und Kategorie aus `src/content/menu.ts` — daraus lassen
   sich Stripe-`price`-IDs oder WooCommerce-SKUs direkt ableiten. Empfehlung:
   `id` der Karte als SKU verwenden.
3. Zahlungen müssen serverseitig autorisiert werden. Für Stripe: eine
   Serverless-Funktion, die die Checkout-Session aus den Artikel-IDs baut;
   niemals Preise aus dem Browser übernehmen, sonst sind sie manipulierbar.
4. Erst wenn Abholzeiten, Lieferzonen und Zahlungsarten vom Restaurant
   bestätigt sind, diese Angaben in `business.ts` ergänzen und anzeigen.
5. Die kostenlose Abendlieferung bleibt an `promo` gekoppelt und muss nicht
   separat gepflegt werden.

### 4c. Reservierung

Bleibt bewusst extern (`eat.thelemmon.ch`). Alle Buttons öffnen den Link in
einem neuen Tab mit `rel="noopener noreferrer"`, ein Hinweis erklärt den
Wechsel zur Buchungsplattform. Hier ist nichts nachzubauen.

---

## Qualität und Zugänglichkeit

* **Kontrast:** automatisierter Durchlauf über alle Routen — keine
  Verstösse gegen WCAG AA. Dafür wurde dem Rosé-Akzent ein zweiter,
  tieferer Ton derselben Farbe zur Seite gestellt: `--color-rose`
  (`#B86A61`, wie vorgegeben) für grosse Display-Typo und Grafik,
  `--color-rose-deep` (`#A85449`, 4.7:1 auf Porzellan) für Buttons, Links
  und kleine Beschriftungen. Messing bleibt auf Zeichen und Haarlinien;
  Beschriftungen daneben stehen in Tintenfarbe.
* **Allergene:** Die Buchstaben hinter einem Gericht sind direkt über der
  ersten Kategorie erklärt („Les lettres qui suivent un plat indiquent les
  allergènes : G Gluten · L Produits laitiers …“), zusätzlich per Chip
  „Allergènes“ in der Sticky-Leiste erreichbar, und die vollständige Legende
  steht weiterhin am Ende der Karte. Jeder Buchstabe trägt ausserdem seine
  Bedeutung als Tooltip und für Screenreader.
* **Kategoriesprünge:** Ein Klick in der Sticky-Leiste setzt die Kategorie
  exakt unter die Leiste — kein Rest der vorherigen bleibt stehen, und die
  Markierung stimmt sofort. Die Position wird aus den gemessenen Höhen von
  Header und Leiste berechnet, nicht über CSS-Anker (dort addieren sich
  `scroll-padding-top` und `scroll-margin-top`). Getestet: alle 17 Sprünge
  auf 1440 px und 390 px, FR und IT.
* **Tastatur:** Skip-Link, sichtbare Fokusringe, Mobile-Menü und Lightbox
  mit Escape und Fokusfalle, Signature-Sektion als echte Tabs mit
  Pfeiltasten.
* **Bewegung:** `prefers-reduced-motion` schaltet sämtliche Animationen,
  Mondbewegungen und das sanfte Scrollen ab; alle Inhalte bleiben sichtbar.
  Geprüft mit emulierter Einstellung.
* **Bilder:** WebP in 640/1024/1400 px mit JPEG-Fallback, Grössen im HTML
  deklariert (kein Layoutsprung), alles unterhalb des Sichtbereichs lazy.
  Die Startseite lädt rund 150 kB Bilddaten statt mehrerer Megabyte.
* **SEO:** pro Sprache eigene Titel, Beschreibungen, `canonical`,
  `hreflang` inklusive `x-default`, sowie `Restaurant`-Structured-Data —
  bewusst **ohne** Öffnungszeiten und **ohne** Bewertung, da beide nicht
  verifiziert sind.
