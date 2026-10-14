# Car’actère Detailing – maquette du site

Site statique (HTML / CSS / JS), sans dépendance ni build. Couleurs : noir, blanc, rouge `#e00c19` (variable `--ac` dans `css/style.css`).

## Structure
- `index.html` : les 5 pages (Accueil, Tarifs, À propos, Galerie, Contact), navigation par `#/tarifs`, `#/galerie`…
- `css/style.css` · `js/main.js` (formules et tarifs, galerie, formulaire, avant/après, animations)
- `images/` : logo du client (`logo.svg`, version sans fond) et photos provisoires à remplacer

## Démo : à retirer avant la mise en ligne finale
- `<meta name="robots" content="noindex, nofollow">` dans `index.html`
- `robots.txt` (contient `Disallow: /`) : le remplacer par `Allow: /`

## À valider avec le client
- Tarifs : seuls les prix « à partir de » (65 / 89 / 139 €) figurent sur son site actuel.
- Options polissage, céramique, ozone, moteur : affichées « Sur devis » (à confirmer).
- Remplacer les photos Unsplash par ses réalisations (hero, galerie, avant/après).
- Le formulaire ouvre le mail du visiteur vers caractere.detailing@gmail.com.
