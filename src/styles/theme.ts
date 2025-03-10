/**
 * Système de design centralisé
 * 
 * Ce fichier contient des classes CSS réutilisables pour les composants communs.
 * Il permet de maintenir une cohérence visuelle dans toute l'application.
 */

// Classes communes pour les conteneurs
export const containers = {
  page: "flex flex-col min-h-screen bg-background text-text",
  card: "bg-surface-200 rounded-lg p-4 border-2 border-surface-300",
};

// Classes communes pour les éléments d'interface
export const ui = {
  header: "w-full p-2 border-b-2 border-surface-300",
  sidebar: "bg-background border-r-2 border-surface-300",
  button: {
    primary: "bg-primary hover:bg-opacity-90 text-text font-bold py-2 px-4 rounded-md transition-colors",
  },
  badge: "bg-surface-300 text-text px-2 py-1 rounded-md text-sm",
};

// Classes communes pour la typographie
export const typography = {
  h1: "text-3xl font-bold text-text",
  h2: "text-2xl font-bold text-text",
  h3: "text-xl font-bold text-text",
};

// Exporter un objet combiné pour faciliter l'importation
const theme = {
  containers,
  ui,
  typography,
};

export default theme; 