# Projet-Artiste — Portfolio Photographe

Projet développé dans le cadre d’une soutenance pour le diplôme de Développeur Front-End sans et avec framework React.  
L’objectif était de créer un site vitrine statique, respectant les bonnes pratiques en termes de performance, responsivité et accessibilité.

---

## Repository et Démo en ligne
Repository GitHub :  https://github.com/medfc/Projet-Artist
Le projet est accessible en ligne ici :  https://ton-nom-utilisateur.github.io/Projet-Artiste/

---

## Outils et Technologies

- Langages : HTML5, CSS3, JavaScript Vanilla
- Accessibilité : utilisation de rôles ARIA, structure sémantique et bonnes pratiques WCAG
- Outils de test :
  - Google Lighthouse : tests de performance, accessibilité et SEO
  - LambdaTest : tests de compatibilité navigateurs et responsivité
- Déploiement : GitHub Pages

---

## Fonctionnalités principales

- Affichage des œuvres : templates avec images, titres et descriptions
- Page biographique : section “À propos” dédiée à la présentation de l’artiste
- Formulaire de contact : intégration avec validation côté client
- Responsivité : media queries pour un affichage optimisé sur desktop, tablette et mobile
- Accessibilité : balises ARIA, structure HTML sémantique, contraste et navigation clavier
- Optimisation :
  - Images en WebP avec lazy loading
  - Chargement conditionnel des médias via Cloudinary
  - Bannière cookies avec gestion du localStorage

---

## Tests et Validation

- **Lighthouse (desktop et mobile)** :
  - Performance : > 90
  - Accessibilité : > 90
  - Bonnes pratiques : > 90
  - SEO : > 90

- **Tests de responsivité** :
  - Réalisés avec LambdaTest
  - Compatibilité confirmée sur différentes résolutions (320px, 360px, 430px, 768px, 1024px, desktop)
  - Navigation et mise en page correctes sur Chrome, Firefox et Safari

- **Tests de performance** :
  - Optimisation des ressources (images WebP, lazy loading, `fetchpriority`)
  - Vitesse de chargement validée par Lighthouse

---

## Structure du projet

Projet-Artiste/
├─ index.html # Page d'accueil
├─ portfolio.html # Page portfolio
├─ apropos.html # Page biographique
├─ contact.html # Page contact
├─ style.css # Styles globaux
├─ script.js # Fonctions JavaScript
├─ images/ # Images locales (logos, favicons, bannières…)
├─ video/ # Vidéos et posters
└─ README.md


---

## Documentation

- **Conception** : le site a été pensé comme un portfolio minimaliste et clair, avec une navigation intuitive.  
- **Approche responsive** : utilisation de `flexbox`, `grid` et `media queries` pour une adaptation fluide aux différents écrans.  
- **Accessibilité** : respect des normes WCAG avec des rôles ARIA, balises alternatives (`alt`), navigation clavier et contrastes adaptés.  
- **Tests effectués** :  
  - Lighthouse (performances, SEO, accessibilité)  
  - LambdaTest (responsivité et compatibilité multi-navigateurs)  
  - Vérification manuelle sur mobile, tablette et desktop.  

---

## Licence

Projet créé pour une soutenance académique.  
Le code source est réutilisable sous licence MIT.  
Les images et vidéos utilisées proviennent de banques d’images libres de droit (Unsplash, Pexels, etc.)
