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
    //Login
    welcome: "Welcome",
    loginToContinue: "Log in to continue",
    email: "Email",
    password: "Password",
    login: "Log In",
    forgotPassword: "Forgot your password?",
    noAccount: "Don't have an account?",
    register: "Sign up",
    orLoginWith: "Or login with",
    enterEmail: "Enter your email",
    enterPassword: "Enter your password",
    recoverPassword: "Recover password",
    resetInstructions: "Enter your email address and we will send you a link to reset your password",
    send: "Send",
    signUp: "Sign up",
    //sign up
    enterFirstName: "Enter your first name",
    enterLastName: "Enter your last name",
    enterDNI: "Enter your ID",
    enterBirthDate: "Enter your birth date",
    enterPhone: "Enter your phone number",
    enterEmail: "Enter your email",
    enterPassword: "Enter your password",
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
    logoutTitle: "Do you want to log out?",
    logoutMessage: "Are you sure you want to log out?",
    logoutConfirm: "Log out",
    deleteAccountTitle: "Delete account? 😥",
    deleteAccountMessage: "If you delete your account, all your data, appointments, and saved studies will be erased. This action cannot be undone.",
    deleteAccountConfirm: "Delete account",
    //centro de ayuda
    center: "Help center",
    question: "How can we help?",
    assistance: "Request personalized assistance to resolve any issue related to your healthcare.",
    info: "For more information call:",
    //historial
    history: "History",
    detail: "Detail",
    details: "See detail",
    matricula: "License",
    image: "View medical image",
    close: "Close",
    note: "Doctor's notes",
    date: "Date",
    last: "Previous studies",
    imageMedical: "X-ray / Ultrasounds",
    seeImg: "See image",
    noteMedical: "Medication adjustment to improve glycemic control. A thyroid study is ordered.",
    unknown: "Unknown",
    state: "State",
    reserved: "Reserved",
    cancelled: "Cancelled",
    completed: "Completed",
    available: "Available",
    noAvailable: "No available",
    loadDetails: "Loading profesional data",
    fechaAgendada: "Scheduled date",
    noImages: "No medical images available",
    //my data
    personalData: "Personal Data",
    contact: "Login Info",
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
    textNoti:"We have confirmed your appointment with specialist {{nombre}}",
    notification: "Notifications",
    emptyNotis: "You don't have notifications.",
    appointmentMessage: "You booked an appointment for {{fecha}} at {{hora}} with professional {{nombre}} {{apellido}}",
    //next turn
    next: "Next appointment",
    emptyAppointment: "You don't have any upcoming appointments.",
    //my credential
    credential:"My Credential",
    numCredential: "N° Credencial:",
    //extras
    home:"Home",
    turno: "Appointments",
    //appointments
    agendar:"Schedule a new appointment",
    programa: "Schedule general medicine appointments.",
    consultar: "Check upcoming appointments",
    consultarSub:"View and cancel your scheduled appointments.",
    sinDirectory: "No directory",
    //Home
    hi: '¡Hi',
    helpTitle: "How can we help you today? 💜",
    myCredential: "My credential",
    directory: "Directory",
    filters: "Filters",
    scheduleAppointment: "Schedule Appointment",
    confirmAppointment: "Confirm Appointment",
    dateAndTime: "Date and time",
    place: 'Place',
    chooseDateTime: "Choose date and time according to availability",
    selectTimeFirst: "Please select a time first",
    applyFilters: "Apply filters",
    specialty: "Specialty",
    professional: "Professional",
    all: 'All',
    confirm: "Confirm",
    titleDelete: "Delete appointment?",
    messageDelete: "This action cannot be undone",
    confirmDelete: "Delete",
    //No specialty
    noSpecialty: "No specialty",
    //CodigoRecupero
    mailValidation: "Please enter a valid email address.",
    mailNoExist: "The email address does not exist in our records.",
    IngresaCodigo: "Enter code",
    IngresaCodigoSub: "Enter the code you received in your email to recover your account",
    confirmCode: "Confirm Code",
    code: "Code",
    codeEmpty: "Please enter the code.",
    errorCode: "The code you entered is incorrect. Please try again.",
    confirmPassword: "Confirm Password",
    newPassword: "New Password",
    repeatPassword: "Repeat Password",
    updatePassword: "Update Password",
    newPasswordSub: "Enter your new password to recover your account",
    passwordUpdated: "Your password has been updated successfully.",
    passwordUnmatched: "The passwords do not match. Please try again.",
    passwordSame: "The new password cannot be the same as the old one.",
    passwordEmpty: "Please enter a password.",

}




},
es: {
translation: {
    //Login
    welcome: "Bienvenido",
    loginToContinue: "Inicia sesión para continuar",
    email: "Correo",
    password: "Contraseña",
    login: "Iniciar sesión",
    forgotPassword: "¿Olvidaste tu contraseña?",
    noAccount: "¿No tenés una cuenta?",
    register: "Registrate",
    orLoginWith: "O acceder con",
    enterEmail: "Ingresá tu correo",
    enterPassword: "Ingresa tu contraseña",
    recoverPassword: "Recuperar contraseña",
    resetInstructions: "Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña",
    send: "Enviar",
    signUp: "Registrarse",
    //sign up
    enterFirstName: "Ingresá tu nombre",
    enterLastName: "Ingresá tu apellido",
    enterDNI: "Ingresá tu DNI",
    enterBirthDate: "Ingresá tu fecha de nacimiento",
    enterPhone: "Ingresá tu teléfono",
    enterEmail: "Ingresá tu correo",
    enterPassword: "Ingresá tu contraseña",
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
    logoutTitle: "¿Querés cerrar sesión?",
    logoutMessage: "¿Estás seguro que deseas salir?",
    logoutConfirm: "Cerrar sesión",
    deleteAccountTitle: "¿Eliminar cuenta? 😥",
    deleteAccountMessage: "Si eliminás tu cuenta, se borrarán todos tus datos, turnos y estudios guardados. Esta acción no se puede deshacer.",
    deleteAccountConfirm: "Eliminar cuenta",
    //help center
    center: "Centro de ayuda",
    question: "¿Con qué podemos ayudar?",
    assistance: "Solicitá asistencia personalizada para resolver cualquier problema relacionado con tu atención médica.",
    info: "Para más información llamar a:",
    //history
    history: "Historial",
    detail: "Detalle",
    matricula: "Matrícula",
    details: "Ver detalle",
    image: "Imagen del estudio",
    close: "Cerrar",
    note: "Notas del médico",
    date: "Fecha",
    last: "Estudios anteriores",
    imageMedical: "Radiografía / Ecografías",
    seeImg: "Ver imagen",
    noteMedical: "Ajuste en la medicación para mejorar el control glucémico. Se solicita estudio de tiroides.",
    unknown: "Desconocido",
    state: "Estado",
    reserved: "Reservado",
    cancelled: "Cancelado",
    completed: "Cumplido",
    available: "Disponible",
    noAvailable: "No disponible",
    loadDetails: "Cargando datos del profesional...",
    fechaAgendada: "Fecha agendada",
    noImages: "No hay imágenes médicas disponibles",
    //my data
    myData: "Mis Datos",
    personalData: "Datos personales",
    contact: "Info Login",
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
    textNoti: "Hemos confirmado su cita con el especialista {{nombre}}",
    notification: "Notificaciones",
    emptyNotis: "No tenés notificaciones.",
    appointmentMessage: "Reservaste un turno para el día {{fecha}} a las {{hora}} con el/la profesional {{nombre}} {{apellido}}",
    //nextTurn
    next: "Próximo Turno",
    emptyAppointment: "No tenés próximos turnos.",
    //my credential
    credential:"Mi credencial",
    numCredential: "N° de Credencial:",
    //extras
    home:"Inicio",
    turno:"Turnos",
    //Appointments
    agendar:"Agendar nuevo turno",
    programa: "Programá turnos de medicina general.",
    consultar: "Consultar próximos turnos",
    consultarSub:"Consultá y cancela tus turnos agendados",
    sinDirectory: "Sin Dirección",
    //home
    hi: '¡Hola',
    helpTitle: "¿Cómo podemos ayudarte hoy? 💜",
    myCredential: "Mi credencial",
    directory: "Cartilla",
    filters: "Filtros",
    scheduleAppointment: "Agendar Turno",
    confirmAppointment: "Confirmar Turno",
    confirm: "Confirmar",
    dateAndTime: "Día y horario",
    place: 'Lugar',
    chooseDateTime: "Elegí día y horario según la disponibilidad",
    selectTimeFirst: "Por favor, primero seleccioná un horario",
    applyFilters: "Aplicar filtros",
    specialty: "Especialidad",
    professional: "Profesional",
    all: 'Todos',
    titleDelete: "¿Eliminar turno?",
    messageDelete: "Esta acción no se puede deshacer",
    confirmDelete: "Eliminar turno",
    //Sin especialidad
    mailValidation: "Por favor, ingresá un correo electrónico válido.",
    mailNoExist: "El correo electrónico ingresado no existe en nuestros registros.",
    noSpecialty: "Sin especialidad",
    IngresaCodigo: "Ingresá tu código",
    code: "Código",
    IngresaCodigoSub: "Ingresá el código que recibiste en tu correo para recuperar tu cuenta",
    confirmCode: "Confirmar código",
    errorCode: "El código que ingresaste es incorrecto. Por favor, intentá nuevamente.",
    codeEmpty: "Por favor, ingresá el código.",
    confirmPassword: "Confirmar contraseña",
    newPassword: "Nueva contraseña",
    repeatPassword: "Repetir contraseña",
    updatePassword: "Actualizar contraseña",
    newPasswordSub: "Ingresá tu nueva contraseña para recuperar tu cuenta",
    passwordUpdated: "Tu contraseña se actualizó correctamente.",
    passwordUnmatched: "Las contraseñas no coinciden. Por favor, intentá nuevamente.",
    passwordSame: "La nueva contraseña no puede ser igual a la anterior.",
    passwordEmpty: "Please enter a password.",
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
