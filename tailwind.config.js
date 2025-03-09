/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Couleurs principales
        'primary': '#577bf2', // Bleu/rouge remplacé par cette couleur
        'background': '#1a1a1a', // Gris de fond principal
        'text': '#f0f0f0', // Couleur de texte principale
        
        // Variations de blanc avec opacité pour remplacer les autres gris
        'surface': {
          100: 'rgba(255, 255, 255, 0.05)', // Très subtil, pour les éléments légèrement surélevés
          200: 'rgba(255, 255, 255, 0.08)', // Pour les cartes, boutons inactifs
          300: 'rgba(255, 255, 255, 0.12)', // Pour les éléments interactifs, bordures
          400: 'rgba(255, 255, 255, 0.16)', // Pour les éléments en surbrillance
          500: 'rgba(255, 255, 255, 0.24)', // Pour les éléments très en évidence
        },
        
        // Couleurs d'état
        'success': '#4ade80', // Vert pour les messages de succès
        'error': '#ef4444', // Rouge pour les messages d'erreur
        'warning': '#f59e0b', // Jaune/orange pour les avertissements
      },
    },
  },
  plugins: [],
};
