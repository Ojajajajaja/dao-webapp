/**
 * Fichier de thème centralisé pour l'application
 * Contient des classes CSS réutilisables basées sur notre système de design
 */

// Classes communes pour les conteneurs
export const containers = {
  page: "flex flex-col min-h-screen bg-background text-text",
  section: "w-full p-4",
  card: "bg-surface-200 rounded-lg p-4 border-2 border-surface-300",
};

// Classes communes pour les éléments d'interface
export const ui = {
  header: "w-full p-2 border-b-2 border-surface-300",
  sidebar: "bg-background border-r-2 border-surface-300",
  input: "bg-surface-200 border-2 border-surface-300 rounded-md p-2 text-text focus:outline-none focus:ring-2 focus:ring-primary",
  button: {
    primary: "bg-primary hover:bg-opacity-90 text-text font-bold py-2 px-4 rounded-md transition-colors",
    secondary: "bg-surface-300 hover:bg-surface-400 text-text py-2 px-4 rounded-md transition-colors",
    danger: "bg-error hover:bg-opacity-90 text-text py-2 px-4 rounded-md transition-colors",
  },
  badge: "bg-surface-300 text-text px-2 py-1 rounded-md text-sm",
};

// Classes communes pour la typographie
export const typography = {
  h1: "text-3xl font-bold text-text",
  h2: "text-2xl font-bold text-text",
  h3: "text-xl font-bold text-text",
  body: "text-text",
  small: "text-sm text-text opacity-80",
  link: "text-primary hover:underline cursor-pointer",
};

// Classes pour les états
export const states = {
  success: "text-success",
  error: "text-error",
  warning: "text-warning",
  disabled: "opacity-50 cursor-not-allowed",
};

// Exporter un objet combiné pour faciliter l'importation
const theme = {
  containers,
  ui,
  typography,
  states,
};

export default theme; 