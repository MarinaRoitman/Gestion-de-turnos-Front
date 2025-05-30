import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native';
import Button from '../components/Button.js';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Picker } from '@react-native-picker/picker';
import { medicos } from '../../../medicos.js';

export default function Seleccionar({ navigation }) {
    const [especialidadSeleccionada, setEspecialidadSeleccionada] = useState(null);
    const [profesionalSeleccionado, setProfesionalSeleccionado] = useState(null);

    const especialidades = [...new Set(medicos.map(m => m.especialidad))];

    const profesionalesDeEspecialidad = especialidadSeleccionada
    ? [...new Set(medicos
        .filter(m => m.especialidad === especialidadSeleccionada)
        .map(m => m.nombre))]
    : [];

    return (
        <SafeAreaView style={{ backgroundColor: '#F0F0F0', flex: 1 }}>
            <View style={styles.containerGlobal}>
                <View style={styles.contenedorHeader}>
                    <TouchableOpacity style={styles.iconWrapper} onPress={() => navigation.goBack()}>
                        <MaterialIcons
                            name="arrow-back-ios-new"
                            size={28}
                            color="#4F3680"
                            style={{ textShadowColor: '#4F3680', textShadowRadius: 1 }}
                        />
                    </TouchableOpacity>
                    <Text style={[styles.tituloInicial, { width: "70%", paddingLeft: 100 }]}>Filtros</Text>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.body}>
                <View style={{ width: '100%', marginBottom: 20 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 4 }}>Especialidad</Text>
                    <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={especialidadSeleccionada}
                        onValueChange={(value) => {
                            setEspecialidadSeleccionada(value);
                            setProfesionalSeleccionado(null); // Reset profesional when especialidad changes
                        }}
                    >
                        <Picker.Item label="Todas" value={null} />
                        {especialidades.map((esp, index) => (
                            <Picker.Item key={index} label={esp} value={esp} />
                        ))}
                    </Picker>
                    </View>
                </View>

                {especialidadSeleccionada && (
                    <View style={{ width: '100%', marginBottom: 20 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 4 }}>Profesional</Text>
                        <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={profesionalSeleccionado}
                            onValueChange={(value) => setProfesionalSeleccionado(value)}
                        >
                            <Picker.Item label="Todos" value={null} />
                            {profesionalesDeEspecialidad.map((prof, index) => (
                                <Picker.Item key={index} label={prof} value={prof} />
                            ))}
                        </Picker>
                        </View>
                    </View>
                )}
                <Button
                title="Aplicar Filtros"
                onPress={() => navigation.navigate('Resultados', {
                    especialidad: especialidadSeleccionada,
                    profesional: profesionalSeleccionado,
                })}
                />

            </ScrollView>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    containerGlobal: {
        alignItems: 'center',
        backgroundColor: '#F0F0F0',
    },
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
    iconWrapper: {
        position: 'absolute',
        left: 30,
        top: 87,
        borderColor: '#4F3680',
    },
    body: {
        paddingHorizontal: 16,
        paddingTop: 20,
        paddingBottom: 40,
        alignItems: 'center',
    },
    filtroContainer: {
        width: '100%',
        marginBottom: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    filtroLabel: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 4,
        color: '#4F3680',
    },

    filtroBtn: {
    backgroundColor: '#4F3680',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginTop: 20,
},
filtroText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
},
pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 10,
},
});
