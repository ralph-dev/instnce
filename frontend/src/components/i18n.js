import i18n from 'i18next';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { reactI18nextModule } from 'react-i18next';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(reactI18nextModule)
  .init({
    fallbackLng: 'en',

    // have a common namespace used around the full app
    //ns: ['translations'],
    //defaultNS: 'translations',
    resources:{
      en:{
        translations: {
          "notestitle": "Notes",
          "clearbutton": "Clear",
          "settingstitle": "Settings",
          "language": "Language",
          "weather": "Weather",
          "font": "Font Size",
          "location": "Current Location",
          "set": "Set",
          "refresh": "Refresh",
          "greeting": "Welcome to your Instnce",
          "weathererror": "Could Not Get Weather",
          "time": "h:mmA",
          "loading" : "Loading Weather...",
          "username": "Username",
          "password": "Password",
          "links": "Links"
        }
      },
      fr:{
        translations: {
          "notestitle": "La Notes",
          "clearbutton": "Effacer",
          "settingstitle": "Paramètres",
          "language": "Langue",
          "weather": "Temps",
          "font" : "Taille De Police",
          "location": "Localisation actuelle",
          "set": "Confirmer",
          "refresh": "Actualiser",
          "greeting": "Bienvenue à votre Instnce",
          "weathererror": "Impossible d'obtenir la météo",
          "time": "HH [h] mm",
          "loading": "Chargement en cours, veuillez patienter... ",
          "username": "	Nom d'utilisateur",
          "password": "Mot de passe",
          "links": "Liens"
        }
      }
    },
    debug: true,

    interpolation: {
      escapeValue: false, // not needed for react!!
    },

    react: {
      wait: true
    }
  });


export default i18n;
