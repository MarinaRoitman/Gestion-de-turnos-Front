import React from 'react';
import { View, StyleSheet, Text, Image, ScrollView,TouchableOpacity, SafeAreaView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../theme/ThemeContext.js';

export default function Turnos({ navigation }) {

    const goToNuevoTurno = () => {
    navigation.navigate("SeleccionarMedico")
};

    const { isDark, toggleTheme, theme } = useTheme();

return (
<SafeAreaView style={{ backgroundColor:theme.backgroundTertiary , flex: 1 }}>
    <View style={styles.containerGlobal}>
        <View style={[styles.contenedorHeader, { borderBottomColor: theme.borderBottomColor }, {backgroundColor: theme.backgroundTertiary}]}>
            <TouchableOpacity style={styles.iconWrapper} onPress={() => navigation.navigate('Home')}>
                <MaterialIcons name="arrow-back-ios-new" size={28} style={[{textShadowColor: theme.textColor}, {textShadowRadius: 1}, {color: theme.textColor}]} />
            </TouchableOpacity>
            <Text style={[styles.tituloInicial, { width: "30%"}, {color: theme.textColor}]}>Turnos</Text>
        </View>
    </View>

    <ScrollView contentContainerStyle={[styles.body, {backgroundColor:theme.backgroundSecondary}]}>
        <TouchableOpacity onPress={goToNuevoTurno}>
        <View style={[styles.option, {backgroundColor: theme.backgroundTertiary}]}>
            <Text style={[styles.optionTitle, {color: theme.textColor}]}>Agendar nuevo turno</Text>
            <Text style={[styles.optionSub, {color: theme.textColor}]}>Programá turnos de medicina general o pediatría</Text>
            <MaterialIcons name="chevron-right" size={24} style={[styles.arrow,{color: theme.textColor}]} />
        </View>
        </TouchableOpacity>
        <TouchableOpacity>
            <View style={[styles.option, {backgroundColor: theme.backgroundTertiary}]}>
                <Text style={[styles.optionTitle, {color: theme.textColor}]}>Consultar próximos turnos</Text>
                <Text style={[styles.optionSub, {color: theme.textColor}]}>Consultá y cancelá tus turnos agendados.</Text>
                <MaterialIcons name="chevron-right" size={24} style={[styles.arrow,{color: theme.textColor}]} />
            </View>
        </TouchableOpacity>
        <TouchableOpacity>
            <View style={[styles.option, {backgroundColor: theme.backgroundTertiary}]}>
                <Text style={[styles.optionTitle, {color: theme.textColor} ]}>Mostrar historial de turnos</Text>
                <Text style={[styles.optionSub, {color: theme.textColor} ]}>Revisá tus turnos pasados.</Text>
                <MaterialIcons name="chevron-right" size={24} color="#4F3680" style={[styles.arrow,{color: theme.textColor}]} />
            </View>
        </TouchableOpacity>
        </ScrollView>

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 150 }}>
            <Image source={require('../../../src/assets/images/ImageTurnos.png')} style={styles.imagen}/>
        </View>

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
    borderBottomWidth: 5,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    
},
tituloInicial: {
    fontSize: 30,
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
    borderColor: '#4F3680', 
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
imagen: {
    width: 240,
    height: 240,
},
});
