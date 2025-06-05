import { View, StyleSheet, Text,Button, Image, ScrollView,TouchableOpacity, SafeAreaView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../theme/ThemeContext.js';
import { Switch } from 'react-native';

export default function Perfil({ navigation }) {

const { isDark, toggleTheme, theme } = useTheme();

    const goToLogin = () => {
    navigation.navigate("Login")
};

return (
<SafeAreaView style={[{ backgroundColor: theme.backgroundSecondary }]}>
    <View style={[styles.containerGlobal, { backgroundColor: theme.backgroundSecondary }]}>
        <View style={[styles.contenedorHeader, { borderBottomColor: theme.borderBottomColor }]}>
            <TouchableOpacity style={[styles.iconWrapper]} onPress={() => navigation.navigate('Home')}>
                <MaterialIcons name="arrow-back-ios-new" size={28} style={[{textShadowColor: theme.textColor}, {textShadowRadius: 1}, {color: theme.textColor}]} />
            </TouchableOpacity>
            <Text style={[styles.tituloInicial, { width: "20%"}, {color: theme.textColor}]}>Perfil</Text>
        </View>
    </View>

    <ScrollView style={{ backgroundColor: theme.backgroundSecondary }} contentContainerStyle={{ paddingBottom: 200 }}>
        <View style={[styles.option, {backgroundColor: theme.backgroundPerfil}]}>
            <Text style={[styles.optionSub, {color: theme.textColor}]}>Nombre</Text>
            <Text style={[styles.optionTitle, {color: theme.textColor}]}>Macarena</Text>
        </View>
        <View style={[styles.option, {backgroundColor: theme.backgroundPerfil}]}>
            <Text style={[styles.optionSub, {color: theme.textColor}]}>Apellido</Text>
            <Text style={[styles.optionTitle, {color: theme.textColor}]}>López</Text>
        </View>

        <View style={{ height: 20, backgroundColor: theme.backgroundSecondary }} />

        <TouchableOpacity>
                <View style={[styles.option, {backgroundColor: theme.backgroundPerfil}]}>
                    <Text style={[styles.optionTitle, {color: theme.textColor}]}>Mis Datos</Text>
                    <MaterialIcons name="chevron-right" size={24} style={[styles.arrow,{color: theme.textColor}]} />
                </View>
        </TouchableOpacity>

        <View style={[styles.option, { backgroundColor: theme.backgroundPerfil, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
        <Text style={[styles.optionTitle, { color: theme.textColor }]}>Modo Oscuro</Text>
        
        <Switch
            value={isDark}
            onValueChange={toggleTheme}
            thumbColor={isDark ? '#4F3680' : '#f4f3f4'}
            trackColor={{ false: '#ccc', true: '#b19cd9' }}
        />
        </View>

        <TouchableOpacity>
                <View style={[styles.option, {backgroundColor: theme.backgroundPerfil}]}>
                    <Text style={[styles.optionTitle, {color: theme.textColor}]}>Ayuda</Text>
                    <MaterialIcons name="chevron-right" size={24} style={[styles.arrow,{color: theme.textColor}]} />
                </View>
        </TouchableOpacity>

        <TouchableOpacity>
                <View style={[styles.option, {backgroundColor: theme.backgroundPerfil}]}>
                    <Text style={[styles.optionTitle, {color: theme.textColor}]}>Idiomas</Text>
                    <MaterialIcons name="chevron-right" size={24} style={[styles.arrow,{color: theme.textColor}]} />
                </View>
        </TouchableOpacity>

        <TouchableOpacity>
                <View style={[styles.option, {backgroundColor: theme.backgroundPerfil}]}>
                    <Text style={[styles.optionTitle, {color: theme.textColor}]}>Eliminar Cuenta</Text>
                    <MaterialIcons name="chevron-right" size={24} style={[styles.arrow,{color: theme.textColor}]} />
                </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={goToLogin}>
                <View style={[styles.option, {backgroundColor: theme.backgroundPerfil}]}>
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
},
arrow: {
    position: 'absolute',
    right: 15,
    top: 20,
},
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    text: { fontSize: 18, marginBottom: 10 }
});





