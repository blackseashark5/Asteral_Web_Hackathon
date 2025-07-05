export const translations = {
  en: {
    welcome: "Welcome to Cosmic Explorer",
    todaysEvents: "Today's Events",
    timeline: "3D Timeline",
    spaceAI: "Space AI",
    search: "Search space events, missions, or explore...",
    loading: "Loading...",
    error: "An error occurred",
    // Add more translations as needed
  },
  es: {
    welcome: "Bienvenido a Cosmic Explorer",
    todaysEvents: "Eventos de Hoy",
    timeline: "Línea de Tiempo 3D",
    spaceAI: "IA Espacial",
    search: "Buscar eventos espaciales, misiones o explorar...",
    loading: "Cargando...",
    error: "Ocurrió un error",
  },
  fr: {
    welcome: "Bienvenue dans Cosmic Explorer",
    todaysEvents: "Événements d'Aujourd'hui",
    timeline: "Chronologie 3D",
    spaceAI: "IA Spatiale",
    search: "Rechercher des événements spatiaux, des missions ou explorer...",
    loading: "Chargement...",
    error: "Une erreur s'est produite",
  },
  de: {
    welcome: "Willkommen bei Cosmic Explorer",
    todaysEvents: "Heutige Ereignisse",
    timeline: "3D-Zeitlinie",
    spaceAI: "Weltraum-KI",
    search: "Weltraumereignisse, Missionen suchen oder erkunden...",
    loading: "Wird geladen...",
    error: "Ein Fehler ist aufgetreten",
  },
  // Add more languages as needed
};

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.en;

export const getTranslation = (language: Language, key: TranslationKey): string => {
  return translations[language]?.[key] || translations.en[key] || key;
};