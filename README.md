# Wash Work – maquette du site

Site statique (HTML / CSS / JS), sans dépendance ni build.

## Structure
- `index.html` : les 5 pages (Accueil, Tarifs, À propos, Galerie, Contact) en une seule page, navigation par `#/tarifs`, `#/galerie`…
- `css/style.css` : styles (couleur d'accent : variable `--ac`)
- `js/main.js` : tarifs, galerie, formulaire (envoi via WhatsApp), avant/après, animations
- `images/` : photos (à remplacer par celles du client)

## Mettre en ligne avec GitHub Pages
1. Créer un dépôt et y pousser tout le contenu de ce dossier.
2. Settings > Pages > Source : branche `main`, dossier `/ (root)`.
3. Le site est disponible sur `https://<utilisateur>.github.io/<depot>/`.

## À faire avant la mise en production
- Remplacer les photos Unsplash par les réalisations du client (hero, galerie, avant/après).
- Ajouter une vidéo ou photo de hero, et de vraies photos avant/après.
- Pour le SEO : passer à une page HTML par section (URL propres), ajouter `sitemap.xml`, balises Open Graph et pages locales (Mons, Frameries, Saint-Ghislain).
- Faire valider les textes et les prestations par le client.
