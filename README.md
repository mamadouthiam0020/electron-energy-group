# Site institutionnel — Electron Energy Group

Site statique en HTML5, CSS3 et JavaScript (ES6+) pour Electron Energy Group (EEG),
entreprise sénégalaise spécialisée dans les infrastructures électriques, la mobilité
électrique et la transition énergétique.

## Pages

| Fichier | Contenu |
| --- | --- |
| `index.html` | Accueil : héros, chiffres clés, à propos, expertises, réalisations, partenaires, CTA |
| `a-propos.html` | Histoire, mission, atouts, valeurs, ambition, citation |
| `expertises.html` | Quatre domaines d'expertise, volet travaux, process IRVE, qualification des bornes, formations, adaptateurs, badges RFID |
| `realisations.html` | Réalisation phare FAST CHARGING et portfolio de 12 projets |
| `partenaires.html` | Mur des 13 partenaires et engagements partagés |
| `contact.html` | Formulaire de contact et informations pratiques |

## Arborescence

```
.
├── index.html
├── a-propos.html
├── expertises.html
├── realisations.html
├── partenaires.html
├── contact.html
├── robots.txt
├── sitemap.xml
└── assets/
    ├── css/style.css
    ├── js/main.js
    ├── fonts/          # Space Grotesk + Inter (woff2 variables, latin & latin-ext)
    └── img/            # Photos AVIF/WebP/JPG, logos partenaires, favicons
```

## À remplacer avant mise en ligne

1. **Domaine** — le domaine `https://electron-energy-group.example` est un espace
   réservé. Il apparaît dans les balises `canonical`, les balises Open Graph, le
   JSON-LD de l'accueil, `robots.txt` et `sitemap.xml`. Remplacez-le par le domaine
   définitif.
2. **Coordonnées** — la page `contact.html` affiche volontairement des mentions
   « à venir » pour le Sénégal, la France, l'e-mail et le téléphone. Aucune
   coordonnée n'a été inventée. Complétez ces champs avec les informations officielles.
3. **Formulaire** — le formulaire de contact est piloté par l'attribut
   `data-endpoint` sur `<form id="formulaire-contact">` dans `contact.html`.
   Tant que cet attribut est vide, la validation fonctionne mais aucun envoi n'est
   effectué : un message d'information s'affiche. Renseignez l'URL d'un service
   compatible (Formspree, Netlify Forms, API interne…) pour activer l'envoi.
4. **Mentions légales / politique de confidentialité** — non demandées dans le
   brief. Si elles sont nécessaires, ajoutez les pages correspondantes et les liens
   dans le pied de page.

## Fonctionnement

- **En-tête collant** et menu mobile accessible (fermeture avec `Échap`, gestion
  du focus, verrouillage du défilement).
- **Animations au défilement** via `IntersectionObserver`, désactivées avec
  `prefers-reduced-motion`.
- **Formulaire** : validation native (`required`, `type="email"`), statut
  accessible (`role="status"`, `aria-live="polite"`), envoi asynchrone si un
  endpoint est configuré.
- **Images** : balises `<picture>` AVIF → WebP → JPG, dimensions déclarées,
  `loading="lazy"` sauf l'image du héros de l'accueil (`fetchpriority="high"`).
- **Typographie** auto-hébergée, `font-display: swap`, préchargement des deux
  polices principales.
- **SEO** : titres et descriptions uniques, Open Graph, Twitter Cards, JSON-LD
  `Organization`, `robots.txt` et `sitemap.xml`.

## Tests rapides

Ouvrir le site avec un petit serveur local (pour éviter les restrictions `file://`) :

```powershell
npx serve .
```

Puis vérifier :

- navigation clavier complète (lien d'évitement, menu, formulaire) ;
- affichage desktop, tablette et mobile ;
- absence de lien mort et d'image manquante ;
- validation du formulaire et message affiché lorsque `data-endpoint` est vide.

## Crédits

Photographies, logos et éléments de marque fournis par Electron Energy Group dans
les documents de présentation de l'entreprise. Les textes reprennent les
informations documentaires transmises ; aucune donnée, citation ou référence
client n'a été ajoutée.
