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

Render crée le service `electron-energy-group` et sert le site sur son CDN
global à l'adresse **https://electron-energy-group.onrender.com**. Chaque `git
push` sur `main` déclenche automatiquement une nouvelle publication
(`autoDeployTrigger: commit`).

Le Blueprint configure aussi :

- redirection `301` de `/index.html` vers `/` (contenu dupliqué) ;
- en-têtes de sécurité (`X-Content-Type-Options`, `X-Frame-Options`,
  `Referrer-Policy`) ;
- politiques de cache par type de fichier (HTML toujours revalidé, polices
  immuables, images 1 jour, CSS/JS 4 heures).

**Important — cache des assets** : quand une image, le CSS ou le JS est
modifié **sans changer de nom de fichier**, incrémentez le paramètre de
version dans les pages (ex. `style.css?v=2` → `?v=3`,
`partenaire-schneider.webp?v=2` → `?v=3`). Sans cela, les navigateurs des
visiteurs peuvent continuer à servir l'ancienne version depuis leur cache.

### Domaine personnalisé

Dans le tableau de bord Render (service → **Settings → Custom Domains**),
ajouter le domaine définitif. Les balises `canonical`, Open Graph, le JSON-LD
de l'accueil, `robots.txt` et `sitemap.xml` utilisent actuellement
`https://electron-energy-group.onrender.com` : les remplacer par le domaine
définitif (recherche/remplacement global du texte
`electron-energy-group.onrender.com`), puis ajouter le domaine dans
`render.yaml` :

```yaml
    domains:
      - electron-energy-group.com
```

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
