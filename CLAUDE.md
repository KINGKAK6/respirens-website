# Respirens — praktijkwebsite

Statische website (HTML/CSS/JS, geen build-stap, geen framework) voor de kinesitherapiepraktijk
**Respirens** van **Jeroen Rens** in Deurne. De eigenaar is geen programmeur: leg wijzigingen
altijd niet-technisch uit en antwoord in het Nederlands.

## Vaste feiten (niet wijzigen zonder expliciete vraag)

- Praktijk: Respirens, Gallifortlei 123, 2100 Deurne. De naam bevat de achternaam:
  RESPI + **RENS** — "RENS" staat in het groen, in het logo én in de header-tekst.
- De site vermeldt **geen UZA of andere werkgevers** bij naam — enkel "ervaring in de
  ziekenhuissetting en in de private praktijk" (expliciete keuze van Jeroen).
- **Niet geconventioneerd.** Tarieven: € 38 praktijk / € 43 huisbezoek. Drie tarieventabellen
  met terugbetaling en remgeld: courante, Fa/Fb én E-pathologie (RIZIV-tarieven 1 jan 2026).
- Het RIZIV-nummer mag **niet** op de site staan.
- Elke afspraak duurt 30 minuten, ook de eerste. Geen "langere consultaties" beloven.
- Voorlopige openingsuren: di/wo/do 18:30–20:30, za 09:00–12:00 (uitbreiding volgt).
  Staan op praktisch.html, contact.html én in de JSON-LD onderaan index.html.
- Parkeren voor de deur is **betalend** — dat staat expliciet vermeld (home, praktisch,
  over, contact).
- Afspraken: online via het formulier (komt in de mailbox, Jeroen belt terug) of via
  voicemail met naam + voornaam, korte reden van doorverwijzing en telefoonnummer.

## Toon en doelgroep

- Over Jeroen wordt in de **derde persoon** geschreven, nooit in de ik-vorm.
- Zorgverlenend, rustig en uitnodigend. **Geen verkooptaal** ("Maak vandaag nog…",
  "Klaar om te starten?" e.d. zijn eerder expliciet afgekeurd).
- Kort en eenvoudig: bezoekers zijn vaak ouderen of zieke mensen. Weinig tekst,
  grote letters, eenvoudige woorden (menu zegt "Longen & ademhaling", niet enkel
  "respiratoire kinesitherapie").

## Structuur en conventies

- 11 pagina's in de hoofdmap; `assets/css/style.css` (design tokens bovenaan),
  `assets/js/main.js`, foto's in `assets/img/foto/` (namenlijst in LEES-MIJ-fotos.md).
- **Header en footer zijn gedupliceerd in elk HTML-bestand.** Een wijziging daar moet in
  álle pagina's gebeuren (404.html gebruikt absolute paden met `/`).
- Foto's staan als inline `style="background-image: url('…')"` in de HTML — géén
  CSS-variabelen gebruiken voor foto's (Chrome lost die paden verkeerd op).
  Ontbreekt een foto, dan valt de site terug op een groen kleurverloop.
- Foto's komen van Unsplash (licentie: vrij commercieel te gebruiken). Vervangbaar door
  eigen praktijkfoto's met dezelfde bestandsnaam.
- Logo: `logo-mark.png` (header), `logo-full.png`, `logo-full-wit.png` (donkere footer).
- PWA: `manifest.webmanifest` + `sw.js`; verhoog `CACHE_VERSION` in sw.js bij grote updates.

## Preview voor op de gsm

Er is een gedeelde preview als Claude-artifact (alle pagina's gebundeld in één bestand):
https://claude.ai/code/artifact/6b542938-8143-45a2-8a0f-88a0d8891ffb
Na inhoudelijke wijzigingen: bundel opnieuw (alle pagina-`<main>`s + CSS/JS inline,
foto's als data-URI's, hash-routering) en publiceer op dezelfde artifact-URL.

## Nog openstaand vóór livegang

- Telefoonnummer is placeholder: `+32470000000` / `+32 (0)470 00 00 00` (overal vervangen).
- Ondernemingsnummer `BE 0000.000.000` (footer + privacybeleid).
- Formspree-endpoint in contact.html (`VUL-HIER-JE-FORMULIER-ID-IN`) — tot dan valt het
  formulier terug op een mailto-link.
- Domeinnaam: overal `https://www.respirens.be` aanpassen indien anders.
- Tariefbedragen laten nakijken door ziekenfonds/beroepsvereniging bij elke indexering.
