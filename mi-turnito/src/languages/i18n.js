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
    //perfil
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
    cancel: "Cancel",
    spanish: "Spanish",
    english: "English",
    //centro de ayuda
    center: "Help center",
    question: "How can we help?",
    assistance: "Request personalized assistance to resolve any issue related to your healthcare.",
    info: "For more information call:",
    //historial
    history: "History",
    details: "See detail",
    image: "View medical image",
    close: "Close",
    note: "Doctor's notes",
    last: "Previous studies",
    imageMedical: "X-ray / Ultrasounds",
    seeImg: "See image",
    noteMedical: "Medication adjustment to improve glycemic control. A thyroid study is ordered.",
    //my data
    personalData: "Personal Data",
    contact: "Contact",
    healthInsurance: "Health Insurance",
    birthDate: "Birth Date",
    phone: "Phone",
    email: "E-mail",
    password: "Password",
    insuranceId: "Insurance ID",
    dni: 'ID',
    success: "The data was updated successfully.",
    successTitle: "Data saved successfully!",
    save: "Save data",
    //notifications
    notiTitle:"We've confirmed your appointment! 🥳",
    textNoti:"We have confirmed your appointment with specialist {{nombre}} (si se puede aca agregar el horario seleccionado).",
    notification: "Notifications",
    emptyNotis: "You don't have notifications.",
    //next turn
    next: "Next appointment",
    emptyAppointment: "You don't have any upcoming appointments.",
    //my credential
    credential:"My Credential",
    numCredential: "N° Credential:",
}

},
es: {
translation: {
    //profile
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
    cancel: "Cancelar",
    spanish: "Español",
    english: "Inglés",
    //help center
    center: "Centro de ayuda",
    question: "¿Con qué podemos ayudar?",
    assistance: "Solicitá asistencia personalizada para resolver cualquier problema relacionado con tu atención médica.",
    info: "Para más información llamar a:",
    //history
    history: "Historial",
    details: "Ver detalle",
    image: "Imagen del estudio",
    close: "Cerrar",
    note: "Notas del médico",
    last: "Estudios anteriores",
    imageMedical: "radiografía / Ecografías",
    seeImg: "Ver imagen",
    noteMedical: "Ajuste en la medicación para mejorar el control glucémico. Se solicita estudio de tiroides.",
    //my data
    myData: "Mis Datos",
    personalData: "Datos personales",
    contact: "Contacto",
    healthInsurance: "Obra social",
    birthDate: "Fecha de nacimiento",
    phone: "Teléfono",
    email: "Correo electrónico",
    password: "Contraseña",
    insuranceId: "N.º Credencial",
    dni:"DNI",
    success: "Los datos fueron actualizados correctamente.",
    successTitle: "¡Datos guardados con éxito!",
    save:"Guardar datos",
    //notificacions
    notiTitle:"¡Confirmamos tu Turno! 🥳",
    textNoti: "Hemos confirmado su cita con el especialista {{nombre}} (si se puede aca agregar el horario seleccionado).",
    notification: "Notificaciones",
    emptyNotis: "No tenés notificaciones.",
    //nextTurn
    next: "Próximo Turno",
    emptyAppointment: "No tenés próximos turnos.",
    //my credential
    credential:"Mi credencial",
    numCredential: "N° de Credencial:",

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
