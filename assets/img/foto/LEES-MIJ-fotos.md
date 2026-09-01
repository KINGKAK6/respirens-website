# Foto's toevoegen

> **Stand van zaken:** een groot deel van de foto's is al ingevuld met gratis stockbeelden
> van Pexels (vrij te gebruiken, ook commercieel, zonder bronvermelding). Vervang ze gerust
> door eigen praktijkfoto's — gewoon het bestand overschrijven met dezelfde naam.
> Nog leeg (tonen een groen patroon): `wachtzaal.jpg`, `therapeut.jpg` (jouw portret!),
> `praktijk-ruimte.jpg`, `respiratoir-detail.jpg`, `techniek-ademhaling.jpg`,
> `cardiaal-detail.jpg` en `hero-over.jpg`.

Zet je foto's in deze map (`assets/img/foto/`) met **exact** de bestandsnaam uit de lijst
hieronder. Je hoeft dan niets aan de code te veranderen: de foto verschijnt automatisch.

Zolang een foto ontbreekt, toont de site een groen kleurverloop op die plek. De website ziet
er dus ook zonder foto's netjes uit — je kan ze rustig één voor één toevoegen.

## Lijst met bestandsnamen

| Bestandsnaam | Waar het verschijnt | Aanbevolen formaat |
|---|---|---|
| `hero-home.jpg` | Grote foto bovenaan de startpagina | 2400 × 1600 px, liggend |
| `respiratoir.jpg` | Kaart "Respiratoire kinesitherapie" (home + behandelingen) | 1200 × 1600 px, staand |
| `cardiaal.jpg` | Kaart "Cardiale kinesitherapie" | 1200 × 1600 px, staand |
| `algemeen.jpg` | Kaart "Algemene kinesitherapie" | 1200 × 1600 px, staand |
| `praktijk.jpg` | Fotoblok bij "Over Respirens" op de startpagina | 1400 × 1800 px, staand |
| `wachtzaal.jpg` | Fotoblok bij "Praktisch" op de startpagina | 1400 × 1600 px |
| `cta.jpg` | Achtergrond van de groene oproepbalk (op elke pagina) | 2400 × 1200 px, liggend |
| `og-image.jpg` | Voorbeeldafbeelding bij het delen op sociale media | 1200 × 630 px |
| `hero-behandelingen.jpg` | Kop van de pagina Behandelingen | 2400 × 1200 px |
| `hero-respiratoir.jpg` | Kop van de pagina Respiratoire kine | 2400 × 1200 px |
| `respiratoir-detail.jpg` | Fotoblok op de pagina Respiratoire kine | 1400 × 1800 px |
| `techniek-ademhaling.jpg` | Fotoblok bij de technieken (respiratoir) | 1400 × 1600 px |
| `hero-cardiaal.jpg` | Kop van de pagina Cardiale kine | 2400 × 1200 px |
| `cardiaal-detail.jpg` | Fotoblok op de pagina Cardiale kine | 1400 × 1800 px |
| `techniek-training.jpg` | Fotoblok bij het trainingsprogramma | 1400 × 1600 px |
| `hero-algemeen.jpg` | Kop van de pagina Algemene kine | 2400 × 1200 px |
| `algemeen-detail.jpg` | Fotoblok op de pagina Algemene kine | 1400 × 1800 px |
| `hero-over.jpg` | Kop van de pagina Over Respirens | 2400 × 1200 px |
| `therapeut.jpg` | Jouw portretfoto | 1400 × 1800 px, staand |
| `praktijk-ruimte.jpg` | Foto van de praktijkruimte | 1400 × 1600 px |
| `hero-tarieven.jpg` | Kop van de pagina Tarieven | 2400 × 1200 px |
| `administratie.jpg` | Fotoblok bij de uitleg over terugbetaling | 1400 × 1600 px |
| `hero-praktisch.jpg` | Kop van de pagina Praktisch | 2400 × 1200 px |
| `eerste-afspraak.jpg` | Fotoblok bij "de eerste afspraak" | 1400 × 1800 px |
| `hero-contact.jpg` | Kop van de contactpagina | 2400 × 1200 px |

## Tips voor goede foto's

- **Over de heroafbeeldingen ligt een donkergroen filter** zodat de witte tekst leesbaar blijft.
  Kies daar rustige beelden zonder te veel drukke details, en hou het linkerdeel van de foto
  relatief leeg — daar staat de tekst.
- **Comprimeer je foto's** vóór je ze uploadt, anders laadt de site traag. Gebruik
  [squoosh.app](https://squoosh.app) of [tinypng.com](https://tinypng.com) en mik op
  maximaal 300 kB per foto.
- **Liever `.webp`?** Dat is kleiner en sneller. Vervang dan ook de extensie in de HTML
  (zoek op `hero-home.jpg` en maak er `hero-home.webp` van).
- **Gebruik geen foto's van het internet** zonder licentie. Eigen praktijkfoto's werken het
  best; heb je die nog niet, dan zijn [unsplash.com](https://unsplash.com) en
  [pexels.com](https://pexels.com) gratis en vrij te gebruiken.
- **Herkenbare patiënten op de foto?** Vraag altijd schriftelijke toestemming.

## Een foto op een andere plaats zetten

In de HTML staat telkens een regel zoals:

```html
<div class="hero__media" style="background-image: url('assets/img/foto/hero-home.jpg');"></div>
```

Verander enkel de bestandsnaam tussen de aanhalingstekens om een andere foto te tonen.
