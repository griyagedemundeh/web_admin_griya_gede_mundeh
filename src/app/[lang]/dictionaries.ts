import "server-only";

// Import your dictionary files
import en from "./dictionaries/en.json";
import id from "./dictionaries/id.json";

// Create a dictionary object with imported language files
const dictionaries = {
  en,
  id,
};

export const getDictionary = async (locale: Locale) => {
  if (locale in dictionaries) {
    return dictionaries[locale];
  }

  console.warn(`Locale '${locale}' not found. Falling back to English.`);
  return dictionaries.id; // Fallback to English if the locale is not found
};
