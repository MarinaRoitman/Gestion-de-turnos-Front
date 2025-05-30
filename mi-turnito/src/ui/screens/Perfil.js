import { View, StyleSheet, Text,Button, Image, ScrollView,TouchableOpacity, SafeAreaView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../theme/ThemeContext.js';

export default function Perfil({ navigation }) {

const { isDark, toggleTheme, theme } = useTheme();

    const goToLogin = () => {
    navigation.navigate("Login")
};

return (
<SafeAreaView style={[styles.safeArea, { backgroundColor: theme.backgroundSecondary }]}>
    <View style={[styles.containerGlobal, { backgroundColor: theme.backgroundSecondary }]}>
        <View style={[styles.contenedorHeader, { borderBottomColor: theme.borderBottomColor }]}>
            <TouchableOpacity style={[styles.iconWrapper]} onPress={() => navigation.navigate('Home')}>
                <MaterialIcons name="arrow-back-ios-new" size={28} style={[{textShadowColor: theme.textColor}, {textShadowRadius: 1}, {color: theme.textColor}]} />
            </TouchableOpacity>
            <Text style={[styles.tituloInicial, { width: "20%"}, {color: theme.textColor}]}>Perfil</Text>
        </View>
    </View>

    <ScrollView contentContainerStyle={[styles.body, {backgroundColor: theme.backgroundTertiary}]}>
        <Text style={styles.text}>Modo actual: {isDark ? 'Dark' : 'Light'}</Text>
            <Button title="Cambiar tema" onPress={toggleTheme} />
        <TouchableOpacity>
        <View style={styles.option}>
            <Text style={styles.optionTitle}>Agendar nuevo turno</Text>
            <Text style={styles.optionSub}>Programá turnos de medicina general o pediatría</Text>
            <MaterialIcons name="chevron-right" size={24} color="#4F3680" style={styles.arrow} />
        </View>
        </TouchableOpacity>
        <TouchableOpacity>
                <View style={[styles.option, {backgroundColor: theme.backgroundTertiary}]}>
                    <Text style={[styles.optionTitle, {color: theme.textColor}]}>Mis Datos</Text>
                    <MaterialIcons name="chevron-right" size={24} style={[styles.arrow,{color: theme.textColor}]} />
                </View>
        </TouchableOpacity>
        <TouchableOpacity>
                <View style={[styles.option, {backgroundColor: theme.backgroundTertiary}]}>
                    <Text style={[styles.optionTitle, {color: theme.textColor}]}>Ayuda</Text>
                    <MaterialIcons name="chevron-right" size={24} style={[styles.arrow,{color: theme.textColor}]} />
                </View>
        </TouchableOpacity>
        <TouchableOpacity>
                <View style={[styles.option, {backgroundColor: theme.backgroundTertiary}]}>
                    <Text style={[styles.optionTitle, {color: theme.textColor}]}>Idiomas</Text>
                    <MaterialIcons name="chevron-right" size={24} style={[styles.arrow,{color: theme.textColor}]} />
                </View>
        </TouchableOpacity>
        <TouchableOpacity>
                <View style={[styles.option, {backgroundColor: theme.backgroundTertiary}]}>
                    <Text style={[styles.optionTitle, {color: theme.textColor}]}>Eliminar Cuenta</Text>
                    <MaterialIcons name="chevron-right" size={24} style={[styles.arrow,{color: theme.textColor}]} />
                </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={goToLogin}>
                <View style={[styles.option, {backgroundColor: theme.backgroundTertiary}]}>
                    <Text style={[styles.optionTitle, {color: theme.textColor}]}>Cerrar Sesión</Text>
                    <MaterialIcons name="chevron-right" size={24} style={[styles.arrow,{color: theme.textColor}]} />
                </View>
        </TouchableOpacity>
        </ScrollView>

</SafeAreaView>
);
}

const styles = StyleSheet.create({
containerGlobal: {
    alignItems: 'center',
},
//TurnitoHeader
contenedorHeader: {
    paddingTop: 80,
    paddingBottom: 16,
    borderBottomWidth: 5,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    
},
tituloInicial: {
    fontSize: 30,
    color: '#4F3680',
    fontWeight: 'bold',
},
subTexto: {
    fontSize: 16,
    fontWeight: 500,
},
iconWrapper: {
    position: 'absolute',
    left: 30,
    top: 87,

},
//BodyTurnos
option: {
    backgroundColor: '#F0F0F0',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#DEDEDE',
    position: 'relative',

},
optionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 5,
},
optionSub: {
    fontSize: 15,
    color: '#6D6D6D',
},
arrow: {
    position: 'absolute',
    right: 15,
    top: 20,
},
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    text: { fontSize: 18, marginBottom: 10 }
});





