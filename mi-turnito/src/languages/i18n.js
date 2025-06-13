import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
const locales = Localization.getLocales();

const supportedLanguages = ['es', 'en'];

const deviceLanguage = Array.isArray(locales) && locales.length > 0
    ? locales[0].languageCode
    : 'es';

const initialLanguage = supportedLanguages.includes(deviceLanguage) ? deviceLanguage : 'es';

const resources = {
en: {
translation: {
    profile: "Profile",
    name: "First Name",
    lastName: "Last Name",
    myData: "My Data",
    darkMode: "Dark Mode",
    help: "Help",
    language: "Languages",
    deleteAccount: "Delete Account",
    logout: "Log Out",
    selectLanguage: "Select Language",
    spanish: "Spanish",
    english: "English",
}
},
es: {
translation: {
    profile: "Perfil",
    name: "Nombre",
    lastName: "Apellido",
    myData: "Mis Datos",
    darkMode: "Modo Oscuro",
    help: "Ayuda",
    language: "Idiomas",
    deleteAccount: "Eliminar Cuenta",
    logout: "Cerrar Sesión",
    selectLanguage: "Seleccionar Idioma",
    spanish: "Español",
    english: "Inglés",
}
}
};

i18n
.use(initReactI18next)
.init({
resources,
lng: initialLanguage,
fallbackLng: 'es',
interpolation: {
    escapeValue: false,
},
});

export default i18n;
