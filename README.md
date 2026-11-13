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

## Déploiement (Render)

Le site est publié comme **site statique** sur Render, décrit par le fichier
[`render.yaml`](render.yaml) à la racine du dépôt (Blueprint Render).

1. Sur [dashboard.render.com](https://dashboard.render.com), choisir **New → Blueprint**.
2. Sélectionner le dépôt GitHub `mamadouthiam0020/electron-energy-group`
   et autoriser l'accès si demandé.
3. Nommer le groupe de Blueprint (ex. `electron-energy-group`) puis **Apply**.

Le site est servi sur son CDN global à l'adresse canonique
**https://www.electron-energy-group.com**. Chaque `git push` sur `main`
déclenche automatiquement une nouvelle publication (`autoDeployTrigger: commit`).

Le Blueprint configure aussi :

- le domaine canonique `www` et la redirection `301` de l'apex
  `electron-energy-group.com` vers `www` (gérée automatiquement par Render) ;
- la désactivation du sous-domaine `onrender.com` (`renderSubdomainPolicy: disabled`) ;
- la redirection `301` de `/index.html` vers `/` (contenu dupliqué) ;
- les en-têtes de sécurité (`X-Content-Type-Options`, `X-Frame-Options`,
  `Referrer-Policy`) ;
- les politiques de cache par type de fichier (HTML toujours revalidé, polices
  immuables, images 1 jour, CSS/JS 4 heures, fichiers SEO 1 heure).

**Important — cache des assets** : quand une image, le CSS ou le JS est
modifié **sans changer de nom de fichier**, incrémentez le paramètre de
version dans les pages (ex. `style.css?v=2` → `?v=3`,
`partenaire-schneider.webp?v=2` → `?v=3`). Sans cela, les navigateurs des
visiteurs peuvent continuer à servir l'ancienne version depuis leur cache.

### Domaine et DNS

Le domaine est déjà configuré dans Render. Côté DNS, conserver :

- `www.electron-energy-group.com` → CNAME vers `electron-energy-group.onrender.com` ;
- `electron-energy-group.com` → CNAME aplati (Cloudflare) ou enregistrement A
  Render. L'apex redirige automatiquement vers `www` ;
- aucun enregistrement AAAA (Render est IPv4 uniquement) ;
- le proxy Cloudflare en **Full (strict)** si le proxy orange est activé.

## Référencement (SEO)

Le site est prêt pour l'indexation :

- **URL canonique unique** : `https://www.electron-energy-group.com` sur les
  6 pages, avec `og:url` cohérent ;
- **`robots.txt`** à la racine, avec l'URL du sitemap ;
- **`sitemap.xml`** avec les 6 pages et un `lastmod` à mettre à jour à chaque
  modification de contenu ;
- **Open Graph / Twitter Cards** avec une image dédiée `assets/img/og-image.jpg`
  au format 1200 × 630 ;
- **données structurées JSON-LD** : `Organization`, `WebSite`, `BreadcrumbList`
  et type de page (`AboutPage`, `CollectionPage`, `ContactPage`) ;
- **favicon** : `/favicon.ico` à la racine + PNG 16, 32, 48, 96, 192 et 512 px,
  `apple-touch-icon` 180 px et `site.webmanifest` ;
- **`renderSubdomainPolicy: disabled`** : le sous-domaine `onrender.com` renvoie
  404, ce qui évite le contenu dupliqué.

Après la mise en ligne :

1. Ajouter la propriété dans **Google Search Console** puis soumettre
   `https://www.electron-energy-group.com/sitemap.xml`.
2. Faire de même dans **Bing Webmaster Tools**.
3. Demander l'indexation de la page d'accueil (« Inspection de l'URL » →
   « Demander une indexation »).
4. Vérifier les données structurées avec le
   [Rich Results Test](https://search.google.com/test/rich-results) et le
   [Schema Markup Validator](https://validator.schema.org/).
5. Vérifier que `https://www.electron-energy-group.com/favicon.ico` répond en
   200 et que les balises `<link rel="icon">` sont bien présentes. Google met à
   jour le favicon dans ses résultats après recrawl (quelques jours à quelques
   semaines) : il n'y a rien d'autre à faire techniquement.

Si Google Search Console demande une validation par balise meta, ajouter la
balise fournie dans le `<head>` de `index.html` (ou privilégier la validation
par DNS, qui ne modifie pas le code).

## À remplacer avant mise en ligne

1. **Coordonnées** — la page `contact.html` affiche des mentions
   « à venir » pour le Sénégal, la France et l'e-mail. Le téléphone est déjà
   publié. Complétez les champs restants avec les informations officielles.
2. **Formulaire** — le formulaire de contact est piloté par l'attribut
   `data-endpoint` sur `<form id="formulaire-contact">` dans `contact.html`.
   Tant que cet attribut est vide, la validation fonctionne mais aucun envoi n'est
   effectué : un message d'information s'affiche. Renseignez l'URL d'un service
   compatible (Formspree, Netlify Forms, API interne…) pour activer l'envoi.
3. **Mentions légales / politique de confidentialité** — non demandées dans le
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
