# Site Web Cabinet Infirmier Qual'Idel

Site web professionnel pour le cabinet infirmier Qual'Idel - Delphine Bouqueret & Anne Charlotte Burel, infirmières libérales au Mesnil-Esnard (76240), près de Rouen.

## 📋 Description

Site moderne, responsive et performant présentant les services infirmiers proposés au cabinet et à domicile. Le cabinet est labellisé **Qual'Idel**, garantissant une démarche qualité rigoureuse.

## 🚀 Lancement du site

### Option 1 : Ouvrir directement le fichier HTML
1. Naviguez vers le dossier du projet
2. Double-cliquez sur `index.html`
3. Le site s'ouvrira dans votre navigateur par défaut

### Option 2 : Utiliser un serveur local (recommandé)

#### Avec Python 3 :
```bash
# Se placer dans le dossier du projet
cd /home/zone01student/code/site-cabinet-mesnil

# Lancer un serveur HTTP local sur le port 8000
python3 -m http.server 8000

# Ouvrir dans le navigateur : http://localhost:8000
```

#### Avec PHP :
```bash
# Se placer dans le dossier du projet
cd /home/zone01student/code/site-cabinet-mesnil

# Lancer un serveur PHP local
php -S localhost:8000

# Ouvrir dans le navigateur : http://localhost:8000
```

#### Avec Node.js (npx) :
```bash
# Se placer dans le dossier du projet
cd /home/zone01student/code/site-cabinet-mesnil

# Installer et lancer http-server
npx http-server -p 8000

# Ouvrir dans le navigateur : http://localhost:8000
```

#### Avec l'extension VSCode Live Server :
1. Ouvrir le dossier du projet dans Visual Studio Code
2. Clic droit sur `index.html`
3. Sélectionner "Open with Live Server"

## 📁 Structure du projet

```
site-cabinet-mesnil/
├── index.html                      # Page d'accueil
├── pages/
│   ├── services.html              # Page des services infirmiers
│   ├── cabinet.html               # Présentation du cabinet et du label Qual'Idel
│   ├── contact.html               # Page de contact avec formulaire
│   └── mentions-legales.html      # Mentions légales
├── assets/
│   ├── css/
│   │   ├── variables.css          # Variables CSS (couleurs, fonts, espacements)
│   │   ├── style.css              # Styles principaux
│   │   └── responsive.css         # Media queries pour le responsive
│   ├── js/
│   │   ├── main.js                # JavaScript principal (navigation, animations)
│   │   └── form.js                # Validation du formulaire de contact
│   └── images/
│       └── .gitkeep               # Dossier pour les futures images
└── README.md                       # Ce fichier
```

## 🎨 Charte graphique

### Couleurs
- **Primaire (Bleu canard)** : `#1B7A99`
- **Secondaire (Rose)** : `#E91E8C`
- **Neutre clair** : `#F8F9FA`
- **Neutre foncé** : `#2C3E50`
- **Texte** : `#333333`

### Typographie
- **Titres** : Poppins (Google Fonts)
- **Corps de texte** : Inter (Google Fonts)

## ✨ Fonctionnalités

### ✅ Implémentées
- ✓ Design responsive (mobile, tablette, desktop)
- ✓ Navigation avec menu burger sur mobile
- ✓ Smooth scroll pour la navigation interne
- ✓ Formulaire de contact avec validation côté client
- ✓ Animations au scroll (fade-in)
- ✓ Bouton d'appel cliquable (`tel:`)
- ✓ Bouton "retour en haut"
- ✓ Loader de page
- ✓ Header qui se masque au scroll
- ✓ Accessibilité WCAG AA
- ✓ SEO de base (meta tags, Schema.org)

### 🔧 À configurer (optionnel)
- [ ] Intégration d'une vraie carte Google Maps ou OpenStreetMap
- [ ] Connexion du formulaire à un service d'envoi d'emails (backend)
- [ ] Intégration de Doctolib ou autre système de prise de RDV
- [ ] Ajout de vraies photos du cabinet
- [ ] Mode sombre (code déjà préparé)

## 📝 Personnalisation

### Modifier les informations

#### Dans `index.html` et toutes les pages :
- **Téléphone** : Remplacer `02 35 23 42 19` et `tel:0235234219`
- **Adresse** : Modifier `61 route Paris, 76240 Le Mesnil-Esnard`

#### Dans `pages/mentions-legales.html` :
Compléter les placeholders suivants :
- `[À COMPLÉTER]` SIRET
- `[À COMPLÉTER]` N° RPPS
- `[À COMPLÉTER]` N° ADELI
- `[À COMPLÉTER]` Informations hébergeur
- `[À COMPLÉTER]` Informations assurance professionnelle
- `[DATE À COMPLÉTER]` Date de dernière mise à jour

### Ajouter des images

1. Placez vos images dans le dossier `assets/images/`
2. Remplacez les placeholders dans les fichiers HTML
3. Formats recommandés : WebP pour les photos, SVG pour les logos
4. Optimisez vos images avant de les ajouter (compression, redimensionnement)

### Modifier les couleurs

Éditez le fichier `assets/css/variables.css` et modifiez les valeurs dans `:root` :
```css
:root {
  --color-primary: #1B7A99;    /* Votre nouvelle couleur primaire */
  --color-secondary: #E91E8C;  /* Votre nouvelle couleur secondaire */
  /* etc. */
}
```

## 🌐 Intégration d'une carte interactive

### Option 1 : Google Maps (nécessite une clé API)

Dans `pages/contact.html`, décommentez et configurez :
```html
<iframe
  width="100%"
  height="100%"
  style="border:0; border-radius: var(--border-radius-lg);"
  loading="lazy"
  allowfullscreen
  referrerpolicy="no-referrer-when-downgrade"
  src="https://www.google.com/maps/embed/v1/place?key=VOTRE_CLE_API&q=61+route+Paris,Le+Mesnil-Esnard,France">
</iframe>
```

Obtenir une clé API : https://developers.google.com/maps/documentation/embed/get-api-key

### Option 2 : OpenStreetMap (gratuit, sans clé API)

Dans `pages/contact.html`, décommentez :
```html
<iframe
  width="100%"
  height="100%"
  style="border:0; border-radius: var(--border-radius-lg);"
  loading="lazy"
  src="https://www.openstreetmap.org/export/embed.html?bbox=1.0835,49.4115,1.1035,49.4315&layer=mapnik&marker=49.4215,1.0935">
</iframe>
```

Personnalisez les coordonnées selon votre adresse exacte.

## 📧 Connexion du formulaire de contact

Actuellement, le formulaire effectue uniquement une validation côté client et simule l'envoi.

### Pour connecter à un vrai service :

#### Option 1 : Backend PHP
Créez un fichier `send-mail.php` et décommentez le code fetch dans `assets/js/form.js`

#### Option 2 : Services tiers (sans backend)
- **Formspree** : https://formspree.io/
- **FormSubmit** : https://formsubmit.co/
- **Netlify Forms** : Si hébergé sur Netlify
- **EmailJS** : https://www.emailjs.com/

## 🔒 Sécurité et conformité

- ✅ HTTPS obligatoire en production
- ✅ Validation des formulaires côté client ET serveur (serveur à implémenter)
- ✅ Protection contre les injections XSS
- ✅ Conformité RGPD (mentions légales, politique de confidentialité)
- ⚠️ Compléter les informations légales dans `mentions-legales.html`

## 🌍 Navigateurs supportés

- Chrome/Edge (2 dernières versions)
- Firefox (2 dernières versions)
- Safari (2 dernières versions)
- iOS Safari (2 dernières versions)
- Chrome Android (2 dernières versions)

## 📱 Responsive design

Le site est optimisé pour :
- 📱 Mobile : 320px - 767px
- 📲 Tablette : 768px - 1023px
- 💻 Desktop : 1024px et plus
- 🖥️ Large desktop : 1280px et plus

## ⚡ Performance

### Optimisations déjà implémentées :
- CSS vanilla (pas de framework lourd)
- JavaScript vanilla (pas de jQuery)
- Lazy loading des images
- Smooth scroll natif CSS
- Minification recommandée pour la production

### Pour améliorer encore :
1. Minifier CSS/JS avant déploiement
2. Compresser les images (WebP, optimisation)
3. Activer la compression gzip sur le serveur
4. Mettre en cache les ressources statiques

## 📊 SEO

### Déjà implémenté :
- Balises meta (title, description)
- Open Graph pour réseaux sociaux
- Schema.org (LocalBusiness)
- Structure HTML sémantique
- Alt text sur les images (à compléter)

### À ajouter (optionnel) :
- `sitemap.xml`
- `robots.txt`
- Google Analytics ou Matomo
- Google Search Console

## 🐛 Débogage

### Le site ne s'affiche pas correctement ?
1. Vérifiez que tous les fichiers CSS sont bien chargés (F12 > Console)
2. Vérifiez les chemins relatifs (surtout dans les pages du dossier `pages/`)
3. Testez dans un autre navigateur
4. Videz le cache du navigateur (Ctrl + Shift + R ou Cmd + Shift + R)

### Le formulaire ne fonctionne pas ?
1. Ouvrez la console du navigateur (F12)
2. Vérifiez qu'il n'y a pas d'erreurs JavaScript
3. Vérifiez que `form.js` est bien chargé
4. Le formulaire est actuellement en mode "simulation" (pas de vrai envoi)

## 📞 Coordonnées du cabinet

**Cabinet Infirmier Qual'Idel**
Delphine Bouqueret & Anne Charlotte Burel
61 route Paris
76240 Le Mesnil-Esnard
Téléphone : 02 35 23 42 19
Horaires : 7j/7, 6h-20h
Zones d'intervention : Le Mesnil-Esnard, Bonsecours, Franqueville-Saint-Pierre, Belbeuf

## 📄 Licence

© 2024 Cabinet Infirmier Qual'Idel - Delphine Bouqueret & Anne Charlotte Burel. Tous droits réservés.

---

**Note** : Ce site est entièrement fonctionnel en local. Pour le mettre en production, pensez à :
1. Compléter les informations légales
2. Ajouter vos vraies images
3. Configurer le formulaire de contact
4. Tester sur différents appareils
5. Optimiser les performances
6. Configurer l'hébergement et le nom de domaine
