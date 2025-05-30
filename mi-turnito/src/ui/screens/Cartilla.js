import React from 'react';
import { View, StyleSheet, Text, Image, ScrollView,TouchableOpacity, SafeAreaView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { CardsMedicos } from '../components/CardsMedicos.js';
import { medicos } from '../../../medicos.js'; 
import { useTheme } from '../../theme/ThemeContext.js';

export default function Cartilla( {navigation} ) {
    const { isDark, toggleTheme, theme } = useTheme();
return (
<SafeAreaView style={{ backgroundColor: '#F0F0F0', flex: 1 }}>
    <View style={styles.containerGlobal}>
        <View style={styles.contenedorHeader}>
            <TouchableOpacity style={styles.iconWrapper} onPress={() => navigation.goBack()}>
                <MaterialIcons name="arrow-back-ios-new" size={28} color="#4F3680" style={{textShadowColor: '#4F3680', textShadowRadius: 1}} />
            </TouchableOpacity>
            <Text style={[styles.tituloInicial, { width: "60%", paddingLeft:70}]}>Cartilla</Text>
        </View>
    </View>

    <ScrollView contentContainerStyle={styles.body}>
        {medicos.map((medico) => (
            <CardsMedicos
                key={medico.id}
                nombre={medico.nombre}
                especialidad={medico.especialidad}
                direccion={medico.direccion}
                imagen={medico.imagen}
            />
        ))}
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
arrow: {
    position: 'absolute',
    right: 15,
    top: 20,
},
imagen: {
    width: 240,
    height: 240,
},
filtroBtn: {
    flexDirection: 'row',
    backgroundColor: '#4F3680',
    padding: 8,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginTop: 15,
    marginLeft: 15,
    alignItems: 'center',
    gap: 6,
    width: 100,
    justifyContent: 'center',
},
filtroText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
},
body: {
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
},
});
