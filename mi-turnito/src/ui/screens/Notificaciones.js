import { View, StyleSheet, Text, Image, ScrollView,TouchableOpacity, SafeAreaView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../theme/ThemeContext.js';

export default function Notificaciones({ navigation }) {

const { isDark, toggleTheme, theme } = useTheme();

return (
<SafeAreaView style={{ backgroundColor:theme.backgroundTertiary , flex: 1 }}>   

    <View style={styles.header}>
        <View style={[styles.contenedorHeader, { borderBottomColor: theme.borderBottomColor }]}>
            <TouchableOpacity style={styles.iconWrapper} onPress={() => navigation.navigate('Home')}>
                <MaterialIcons 
                    name="arrow-back-ios-new" 
                    size={28} color="#4F3680" 
                    style={[{color: theme.textColor}, 
                    {textShadowRadius: 1}]} />
            </TouchableOpacity>
            <Text style={[styles.tituloInicial, { width: "49%"}, {color: theme.textColor}]}>Notificaciones</Text>
        </View>
    </View>

    <ScrollView contentContainerStyle={styles.body}>
        <View style={styles.containerFoto}>
            <Image
                source={
                    isDark
                        ? require('../../assets/images/NotificacionDMode.png')
                        : require('../../assets/images/NotificacionLMode.png')
                }
                style={styles.imagen}
            />
        </View>

        {/*
        //espacio para agregar un componente de notificación
        <TouchableOpacity>
            <View style={styles.option}>
            <Text style={styles.optionTitle}>Agendar nuevo turno</Text>
            <Text style={styles.optionSub}>Programá turnos de medicina general o pediatría</Text>
            <MaterialIcons name="chevron-right" size={24} color="#4F3680" style={styles.arrow} />
        </View>
        </TouchableOpacity>*/}

        </ScrollView>
</SafeAreaView>
);
}

const styles = StyleSheet.create({
containerGlobal: {
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
},
//TurnitoHeader
contenedorHeader: {
    paddingTop: 80,
    paddingBottom: 16,
    borderBottomColor: '#4F3680',
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
    color: '#655873',
    fontWeight: 500,
},
iconWrapper: {
    position: 'absolute',
    left: 30,
    top: 87,
    borderColor: '#4F3680', 
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
    color: '#4F3680',
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
containerFoto: {
    alignItems: 'center',
    position: 'absolute',
    top: 150,
    left: 0,
    right: 0,
},
});
