# Website Respirens

Statische website voor de kinesitherapiepraktijk Respirens. Gemaakt met gewone HTML, CSS en
JavaScript — **geen build-stap, geen framework, geen database**. Je opent de bestanden gewoon
in een browser, past ze aan met een teksteditor en zet ze later op eender welke hosting.

---

## 1. De site bekijken

Dubbelklik op `index.html` — klaar. Alles werkt lokaal, ook zonder internet (behalve de
lettertypes van Google Fonts).

Wil je het netjes doen, start dan een kleine lokale server. Dat is nodig als je later mappen
of nette URL's gebruikt:

```powershell
# In de map van de website:
python -m http.server 8000
# Surf daarna naar http://localhost:8000
```

Werk je in VS Code, dan is de extensie **Live Server** het handigst: rechtsklik op
`index.html` → *Open with Live Server*. De pagina herlaadt dan automatisch bij elke wijziging.

---

## 2. Wat staat waar?

```
website respirens/
├── index.html                        Startpagina
├── behandelingen.html                Overzicht van het aanbod
├── respiratoire-kinesitherapie.html  Specialisatie longen/ademhaling
├── cardiale-kinesitherapie.html      Specialisatie hart
├── algemene-kinesitherapie.html      Algemene kine
├── over-respirens.html               Over de praktijk en de therapeut
├── tarieven.html                     Tarieven en terugbetaling
├── praktisch.html                    Eerste afspraak, uren, FAQ, annuleren
├── contact.html                      Contactgegevens, formulier, kaart
├── privacybeleid.html                Privacyverklaring (GDPR)
├── 404.html                          Foutpagina
├── favicon.svg                       Icoontje in het browsertabblad
├── robots.txt / sitemap.xml          Voor Google
└── assets/
    ├── css/style.css                 Alle vormgeving
    ├── js/main.js                    Menu, animaties, formulier
    └── img/
        ├── logo-mark.svg             Vereenvoudigd logo-symbool
        └── foto/                     ⬅ hier komen jouw foto's
            └── LEES-MIJ-fotos.md     Lijst met de juiste bestandsnamen
```

---

## 3. ⚠ Nog in te vullen plaatshouders

Al ingevuld: adres (Gallifortlei 123, 2100 Deurne), naam (Jeroen Rens), tarieven
(€ 38 praktijk / € 43 huisbezoek, niet geconventioneerd, incl. Fa/Fb-tabel) en het logo.

Nog te vervangen — zoek en vervang **in alle HTML-bestanden tegelijk**
(in VS Code: `Ctrl+Shift+H`):

| Zoek naar | Vervang door |
|---|---|
| `+32470000000` | je telefoonnummer zonder spaties (voor de belknop) |
| `+32 (0)470 00 00 00` | je telefoonnummer zoals je het toont |
| `info@respirens.be` | je echte e-mailadres |
| `BE 0000.000.000` | je ondernemingsnummer |
| `https://www.respirens.be` | je definitieve domeinnaam |

Daarnaast nog even nakijken:

- **`praktisch.html`** — de openingsuren en de uitleg over bus/trein (halte, station).
- **`contact.html`** — dezelfde openingsuren (staan daar ook nog eens) + de Google Maps-kaart.
- **`tarieven.html`** — leg de remgeldbedragen even voor aan je ziekenfonds of
  beroepsvereniging vóór je live gaat; ze wijzigen bij elke indexering.
- **`privacybeleid.html`** — nakijken en laten nalezen; het is een vertrekpunt, geen
  juridisch advies.

De openingsuren staan ook in de gestructureerde gegevens onderaan `index.html`
(het blok `openingHoursSpecification`). Pas ze daar mee aan, dan toont Google ze correct.

---

## 4. Foto's toevoegen

Alle achtergrondfoto's zijn al voorbereid. Je hoeft enkel je eigen beelden in
`assets/img/foto/` te zetten met de juiste bestandsnaam.

👉 **De volledige lijst met bestandsnamen en afmetingen staat in
[`assets/img/foto/LEES-MIJ-fotos.md`](assets/img/foto/LEES-MIJ-fotos.md).**

Ontbreekt een foto, dan toont de site gewoon een groen kleurverloop. Je kan dus perfect
online gaan met een deel van de foto's en de rest later aanvullen.

### Het logo

Het echte Respirens-logo staat in de site verwerkt (met transparant gemaakte achtergrond):

- `assets/img/logo-mark.png` — het beeldmerk (de cirkel), in de header van elke pagina
- `assets/img/logo-full.png` — het volledige logo met tekst, voor gebruik op lichte vlakken
- `assets/img/logo-full-wit.png` — witte versie van het volledige logo, in de donkere footer

Krijg je ooit een verbeterde versie van het logo (bv. als echte SVG van een ontwerper),
vervang dan gewoon deze drie bestanden met dezelfde namen. De grootte in de header pas je
aan in `assets/css/style.css` bij `.brand__mark { width: 62px; }`.

---

## 5. Het contactformulier laten werken

Een statische website kan zelf geen e-mail versturen. Zolang je niets instelt, opent het
formulier gewoon het e-mailprogramma van de bezoeker — dat werkt, maar het is niet ideaal.

Beter is een gratis formulierdienst:

1. Maak een account op [formspree.io](https://formspree.io) (gratis tot 50 berichten/maand).
   Alternatieven: [Web3Forms](https://web3forms.com), [FormSubmit](https://formsubmit.co).
2. Maak een nieuw formulier aan en kopieer je endpoint, bv.
   `https://formspree.io/f/abcdwxyz`.
3. Open `contact.html`, zoek `VUL-HIER-JE-FORMULIER-ID-IN` en vervang de volledige
   `action="..."` door jouw endpoint.

Klaar. De aanvragen komen dan rechtstreeks in je mailbox, en de bezoeker krijgt een
bevestiging op de pagina zelf.

> **Belangrijk:** vraag via het formulier nooit medische gegevens of rijksregisternummers op.
> Die horen niet thuis in een gewone mailbox. Die tekst staat al onder het formulier.

---

## 6. Een kaart toevoegen

1. Ga naar [Google Maps](https://maps.google.com) en zoek je praktijkadres.
2. Klik op **Delen** → **Een kaart insluiten** → kopieer de `<iframe>`-code.
3. Open `contact.html`, zoek het blok `<div class="map-embed">` en vervang de inhoud door je
   iframe. Zet er `loading="lazy"` bij zodat de pagina snel blijft laden.

---

## 7. Online zetten

Je hebt twee dingen nodig: een **domeinnaam** (bv. respirens.be) en **hosting**.

### Snelste en gratis: Netlify

1. Maak een account op [netlify.com](https://netlify.com).
2. Klik op *Add new site* → *Deploy manually* en sleep de volledige projectmap in het venster.
3. Je site staat meteen online op een adres zoals `respirens.netlify.app`.
4. Koppel daarna je eigen domeinnaam via *Domain settings*. HTTPS wordt automatisch geregeld.

Bij een latere aanpassing sleep je gewoon de map opnieuw. Werk je met Git, dan kan Netlify
ook automatisch bijwerken bij elke commit.

### Andere opties

- **Vercel** of **Cloudflare Pages** — werken net als Netlify, ook gratis.
- **GitHub Pages** — gratis, handig als je je bestanden toch al in Git bijhoudt.
- **Belgische hoster** (Combell, One.com, Hostnet …) — je sleept de bestanden via FTP naar de
  map `www` of `public_html`. Praktisch als je bij dezelfde partij ook je `.be`-domein en je
  e-mailadres wil.

### Domeinnaam

Een `.be`-domein kost ongeveer 10 tot 20 euro per jaar. Registreer het bij je hoster of bij
een registrar zoals Combell of Gandi. Kies best `respirens.be` en laat `www.respirens.be`
ernaar doorverwijzen.

---

## 8. Checklist vóór je live gaat

- [ ] Alle plaatshouders uit punt 3 vervangen
- [ ] Tarieven ingevuld en nagekeken
- [ ] Openingsuren correct (op 3 plaatsen: praktisch, contact, gestructureerde data)
- [ ] Minstens de belangrijkste foto's toegevoegd
- [ ] Contactformulier getest — komt de mail effectief toe?
- [ ] Telefoonnummer en e-mailadres aangeklikt op je gsm om te testen
- [ ] Privacybeleid nagelezen
- [ ] Alle pagina's bekeken op een smartphone
- [ ] `sitemap.xml` en `robots.txt` aangepast aan je echte domeinnaam
- [ ] Site aangemeld bij [Google Search Console](https://search.google.com/search-console)
- [ ] Een **Google Bedrijfsprofiel** aangemaakt — voor een lokale praktijk levert dat meer
      bezoekers op dan de website zelf. Zet daar dezelfde naam, adres en telefoonnummer als
      op de site.

---

## 9. Kleine aanpassingen zelf doen

**Kleuren wijzigen** — bovenaan `assets/css/style.css` staan alle kleuren bij elkaar:

```css
--green:      #5C9E82;   /* hoofdkleur, uit het logo */
--green-dark: #3F7B62;   /* hover en accenten */
--ink:        #2B3A40;   /* tekst en donkere vlakken */
```

**Een menu-item toevoegen** — kopieer een `<li class="nav__item">…</li>` in het `<nav>`-blok.
Dat blok staat in elk HTML-bestand: pas je het menu aan, doe het dan overal.

**Een nieuwe pagina maken** — kopieer een bestaande pagina (bv. `praktisch.html`), hernoem
het bestand, en pas de titel, de `<h1>` en de inhoud aan. Vergeet de pagina niet toe te
voegen aan `sitemap.xml`.

**Privacyvriendelijker** — de lettertypes komen nu van Google Fonts. Wil je dat vermijden,
download ze dan via [google-webfonts-helper](https://gwfh.mranftl.com), zet ze in
`assets/fonts/` en vervang de `<link>` naar fonts.googleapis.com door een `@font-face`-blok
in `style.css`.

---

## 10. Beveiliging

De site is statisch: geen databank, geen loginpagina, geen beheersysteem zoals WordPress.
Daardoor valt er op de site zelf vrijwel niets te hacken — er draait geen code op de server
die misbruikt kan worden. De echte risico's zitten in de accounts eromheen:

- **Hostingaccount (Netlify/Combell/…)**: wie daar kan inloggen, kan de site vervangen.
  Gebruik een sterk, uniek wachtwoord en zet **tweestapsverificatie (2FA)** aan.
- **Domeinnaam-account**: idem — wie het domein beheert, kan bezoekers omleiden. 2FA aan.
- **E-mail**: je mailbox is de sleutel tot al je accounts ("wachtwoord vergeten"). 2FA aan.
- **Formspree-account**: daar komen de afspraakaanvragen binnen. 2FA aan.
- **Back-up**: deze map op je computer ís de site. Bewaar er een kopie van (OneDrive,
  USB-stick). Gaat er ooit iets mis bij de hoster, dan zet je alles in 2 minuten terug.

Wat al in de site zelf zit:

- `_headers` (Netlify/Cloudflare) en `.htaccess` (klassieke hosters) sturen
  beveiligingsheaders mee: alles verplicht via https, de site mag niet in een frame van een
  andere site geladen worden (tegen "clickjacking"), en de browser mag enkel scripts en
  stijlen van de site zelf en van Google Fonts laden (tegen het injecteren van vreemde code).
- Externe links openen met `rel="noopener"`, het formulier heeft een spamval en vraagt
  bewust geen medische gegevens, en de site verzamelt zelf geen persoonsgegevens.
- Hosting via Netlify/Cloudflare/GitHub Pages geeft automatisch https met een geldig
  certificaat (het slotje in de browser).
