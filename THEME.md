# Guide du système de thème

Ce document explique comment modifier les couleurs et les styles de l'application.

## Structure du système de thème

Le système de thème est organisé en deux parties principales :

1. **tailwind.config.js** - Définit toutes les couleurs de base
2. **src/index.css** - Contient les variables CSS correspondantes

## Comment modifier les couleurs

Pour modifier les couleurs de l'application, suivez ces étapes :

1. **Modifiez d'abord les couleurs dans `tailwind.config.js`**
   ```js
   colors: {
     'primary': '#577bf2',    // Changez cette valeur pour modifier la couleur primaire
     'background': '#0c0c0c', // Changez cette valeur pour modifier la couleur de fond
     // ...
   }
   ```

2. **Mettez à jour les variables CSS correspondantes dans `src/index.css`**
   ```css
   :root {
     --color-primary: #577bf2;    /* Doit correspondre à la valeur dans tailwind.config.js */
     --color-background: #0c0c0c; /* Doit correspondre à la valeur dans tailwind.config.js */
     // ...
   }
   ```

## Palette de couleurs

### Couleurs principales
- **primary** (#577bf2) - Couleur d'accentuation principale (boutons, liens, etc.)
- **background** (#0c0c0c) - Couleur de fond de l'application
- **text** (#f0f0f0) - Couleur de texte principale

### Surfaces
- **surface-100** (rgba(255, 255, 255, 0.05)) - Très subtil (éléments légèrement surélevés)
- **surface-200** (rgba(255, 255, 255, 0.08)) - Léger (cartes, boutons inactifs)
- **surface-300** (rgba(255, 255, 255, 0.12)) - Moyen (éléments interactifs, bordures)
- **surface-400** (rgba(255, 255, 255, 0.16)) - Prononcé (éléments en surbrillance)
- **surface-500** (rgba(255, 255, 255, 0.24)) - Très prononcé (éléments très en évidence)
- **surface-menu** (rgba(37, 37, 37, 1)) - Menu de navigation (dropdowns)

### Couleurs d'état
- **success** (#4ade80) - Vert (succès, validation)
- **error** (#ef4444) - Rouge (erreur, alerte)
- **warning** (#f59e0b) - Jaune/orange (avertissement)

## Composants de style réutilisables

Le fichier `src/styles/theme.ts` contient quelques styles réutilisables pour les composants communs :

### Conteneurs
```tsx
import { containers } from '../styles/theme';

// Page complète
<div className={containers.page}>...</div>

// Carte
<div className={containers.card}>...</div>
```

### Éléments d'interface
```tsx
import { ui } from '../styles/theme';

// En-tête
<header className={ui.header}>...</header>

// Barre latérale
<div className={ui.sidebar}>...</div>

// Bouton principal
<button className={ui.button.primary}>...</button>

// Badge
<span className={ui.badge}>...</span>
```

### Typographie
```tsx
import { typography } from '../styles/theme';

<h1 className={typography.h1}>...</h1>
<h2 className={typography.h2}>...</h2>
<h3 className={typography.h3}>...</h3>
``` 