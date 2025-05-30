import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { CardsMedicos } from '../components/CardsMedicos';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../theme/ThemeContext.js';
import ButtonSecondary from '../components/ButtonSecondary.js';

export default function Horario({ route, navigation }) {
    const { medico } = route.params;

const [horarioSeleccionado, setHorarioSeleccionado] = useState(null);


    const { isDark, toggleTheme, theme } = useTheme();


    return (
        <SafeAreaView style={[{backgroundColor:theme.backgroundTertiary}, {flex: 1}]}>
            <View style={styles.containerGlobal}>
                <View style={[styles.contenedorHeader, { borderBottomColor: theme.borderBottomColor }, {backgroundColor: theme.backgroundTertiary}]}>
                    <TouchableOpacity style={styles.iconWrapper} onPress={() => navigation.goBack()}>
                        <MaterialIcons name="arrow-back-ios-new" size={28} style={[{textShadowColor: theme.textColor}, {textShadowRadius: 1}, {color: theme.textColor}]} />
                    </TouchableOpacity>
                    <Text style={[styles.tituloInicial, { width: "80%", paddingLeft:60}, {color: theme.textColor}]}>Agendar Turno</Text>
                </View>
            </View>
            <ScrollView contentContainerStyle={styles.body}>
                <CardsMedicos
                    nombre={medico.nombre}
                    especialidad={medico.especialidad}
                    direccion={medico.direccion}
                    imagen={medico.imagen}
                />

{Object.entries(medico.disponibilidad || {}).map(([dia, horarios]) => (
    <View key={dia} style={styles.diaContainer}>
        <Text style={[styles.subtitulo, { color: theme.textColor }]}>{dia}</Text>
        <View style={styles.horariosContainer}>
            {horarios.map((hora, i) => {
                const isSelected = horarioSeleccionado?.dia === dia && horarioSeleccionado?.hora === hora;
                return (
                    <TouchableOpacity
                        key={i}
                        style={[
                            styles.horarioButton,
                            {
                                backgroundColor: isSelected ? theme.buttonColor : theme.backgroundSecondary,
                                borderColor: theme.buttonColor,
                            }
                        ]}
                        onPress={() => setHorarioSeleccionado({ dia, hora })}
                    >
                        <Text style={[
                            styles.horarioTexto,
                            { color: isSelected ? theme.textColorSecondary : theme.buttonColor }
                        ]}>
                            {hora}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    </View>
))}

            <ButtonSecondary
            style={[
                styles.botonConfirmar,
                !horarioSeleccionado && { opacity: 0.5 }
            ]}
            disabled={!horarioSeleccionado}
            onPress={() => {
                if (horarioSeleccionado) {
                navigation.navigate('ConfirmarTurno', {
                    medico,
                    horario: `${horarioSeleccionado.dia} a las ${horarioSeleccionado.hora}`,
                });
                }
            }}
            title="Confirmar Turno"
            />

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 80,
        paddingBottom: 20,
        paddingHorizontal: 16,
        borderBottomWidth: 5,
    },
    titulo: {
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: 20,
    },
    body: {
        padding: 16,
        gap: 12,
        alignItems: 'center',
    },
    subtitulo: {
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 3,
    },
    texto: {
        fontSize: 14,
        marginVertical: 2,
    },
    botonConfirmar: {
        padding: 12,
        borderRadius: 10,
        marginTop: 20,
        alignItems: 'center',
    },
    textoBoton: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    horarioButton: {
        padding: 10,
        marginVertical: 9,
        borderRadius: 8,
        borderWidth: 1,
        width: '30%',
        alignItems: 'center'
    },
    horarioTexto: {
        fontWeight: 'bold'
    },
    diaContainer: {
        width: '100%',
        marginTop: 10,
    },
    horariosContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        justifyContent: 'flex-start',
    },
});
