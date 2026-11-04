# My Life OS

Version 1 · application personnelle autonome, en français.

Une application personnelle de défis en HTML, CSS et JavaScript, sans bibliothèque ni service payant. Les validations, commentaires et préférences de catégories restent dans le stockage local du navigateur. Il n'y a ni compte, ni serveur de données, ni synchronisation entre appareils.

## Lancer l'application

Ouvrez `index.html` dans un navigateur pour utiliser l'application et enregistrer vos données localement.

Pour activer le fonctionnement hors connexion, servez le dossier avec un petit serveur local, puis ouvrez l'adresse affichée. Par exemple, avec Python installé :

```powershell
py -m http.server 8000
```

Ouvrez ensuite `http://localhost:8000`. Le service worker peut alors mettre l'application en cache. Une adresse HTTPS est nécessaire pour installer le site sur un téléphone ; sur iPhone, ouvrez-le dans Safari, touchez **Partager**, puis **Ajouter à l'écran d'accueil**.

## Données et sauvegardes

- **Accueil** : les actions du jour correspondant aux catégories choisies, avec validation rapide.
- **365 Challenges** : programme de 365 jours, avec choix de 1 à 5 catégories (365 à 1 825 actions), exemples, choix du jour, filtres, validations et commentaires. Le jour 1 commence à la première ouverture.
- **Progression** : calendrier, jours actifs, séries et avancement par catégorie.
- **Sauvegarder** : télécharge un fichier JSON contenant le parcours, les catégories choisies et les commentaires. Les anciennes notes restent préservées si elles se trouvent dans tes données.
- **Restaurer** : importe ce fichier sur le même appareil ou sur un autre. La restauration remplace les données présentes dans ce navigateur.

Les données du site ne quittent pas le navigateur. Une sauvegarde téléchargée est un fichier local à conserver dans un endroit sûr.
