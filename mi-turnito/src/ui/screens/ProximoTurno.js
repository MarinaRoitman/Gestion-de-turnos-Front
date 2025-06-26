    import React from 'react';
    import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
    import { useTheme } from '../../theme/ThemeContext.js';
    import medicaSilvia from '../../assets/images/medicaSilvia.jpg';
    import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


    export default function ProximoCard({ nombre, foto, fechaTurno, onDelete }) {
    const { theme } = useTheme();


    return (
        <View style={[styles.card, { backgroundColor: theme.colorBackgroundCard }]}>
        <Image source={medicaSilvia} style={styles.avatar} />
        <View style={styles.info}>
            <Text style={[styles.nombre, { color: theme.textColor }]}>{nombre}</Text>
            <Text style={[styles.fecha, { color: theme.textColor }]}>agregar fecha del turno seleccionado</Text>
        </View>
        <TouchableOpacity onPress={onDelete}>
            <MaterialIcons name="delete" size={26} color="red" />
        </TouchableOpacity>
        </View>
    );
    }


    const styles = StyleSheet.create({
    card: {
        borderRadius: 12,
        padding: 13,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        width: '97%',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    info: {
        flex: 1,
        marginLeft: 10,
    },
    nombre: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    fecha: {
        fontSize: 14,
        marginTop: 4,
    },
    });
