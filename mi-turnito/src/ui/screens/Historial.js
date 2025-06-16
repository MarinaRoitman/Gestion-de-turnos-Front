// HistorialScreen.js
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { useNavigation, route } from '@react-navigation/native';
import { useTheme } from '../../theme/ThemeContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTranslation } from 'react-i18next';

const doctors = [
{ id: '1', name: 'Martín Ferreyra', specialty: 'Cardiología', image: require('../../assets/images/medicaSilvia.jpg') },
{ id: '2', name: 'Javier Paredes', specialty: 'Oftalmología', image: require('../../assets/images/medicaSilvia.jpg') },
{ id: '3', name: 'Federico López', specialty: 'Ginecología', image: require('../../assets/images/medicaSilvia.jpg') },
];

export default function HistorialScreen( {navigation} ) {
const { theme } = useTheme();
const { t } = useTranslation();

return (
<SafeAreaView style={{ backgroundColor:theme.backgroundTertiary , flex: 1 }}>   

    <View style={styles.header}>
        <View style={[styles.contenedorHeader, { borderBottomColor: theme.borderBottomColor }]}>
            <TouchableOpacity style={styles.iconWrapper} onPress={() => navigation.navigate('Home')}>
                <MaterialIcons 
                    name="arrow-back-ios-new" 
                    size={28}
                    style={[{color: theme.textColor}, 
                    {textShadowRadius: 1}]} />
            </TouchableOpacity>
            <View style={styles.centrar}>
                <Text style={[styles.tituloInicial, { width: "54%"}, {color: theme.textColor}]}>{t('history')}</Text>
            </View>
        </View>
    </View>

    <View style={styles.contenedorCards}>
        {doctors.map((doc) => (
        <View key={doc.id} style={[styles.card, { backgroundColor: theme.colorBackgroundCard }]}> 
            <View style={styles.row}>
            <Image source={doc.image} style={styles.avatar} />
            <View style={styles.info}>
                <Text style={[styles.name, { color: theme.textColor }]}>{doc.name}</Text>
                <Text style={[styles.specialty, { color: theme.textColor }]}>{doc.specialty}</Text>
            </View>
            </View>
            <TouchableOpacity 
            style={[styles.button,{backgroundColor: theme.modalButton}]} 
            onPress={() => navigation.navigate('Detalle', { doctor: doc })}
            >
            <Text style={[styles.buttonText, {color: theme.backgroundImput}]}>{t('details')}</Text>
            </TouchableOpacity>
    </View>
    ))}
    </View>
</SafeAreaView>
);
}

const styles = StyleSheet.create({
contenedorHeader: {
    paddingTop: 80,
    paddingBottom: 16,
    borderBottomColor: '#4F3680',
    borderBottomWidth: 5,
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
title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
card: { borderRadius: 12, padding: 15, marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 },
row: { flexDirection: 'row', alignItems: 'center' },
avatar: { width: 50, height: 50, borderRadius: 25 },
info: { marginLeft: 12 },
name: { fontSize: 18, fontWeight: 'bold' },
specialty: { fontSize: 14 },
button: { marginTop: 10, backgroundColor: '#4F3680', padding: 10, borderRadius: 8, alignItems: 'center' },
buttonText: { color: 'white', fontWeight: 'bold' },
contenedorCards:{
    margin: '17',
    gap: '10',
    paddingTop: '5',
},
});