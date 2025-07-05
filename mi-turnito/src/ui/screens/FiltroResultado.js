import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Text, SafeAreaView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { CardsMedicos } from '../components/CardsMedicos.js';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../theme/ThemeContext.js';
import { useTranslation } from 'react-i18next';
import { getProfesionalesPorEspecialidad } from '../../api/profesional.js';

export default function Resultados({ route, navigation }) {
    const { theme } = useTheme();
    const { t } = useTranslation();
    const { especialidad, especialidadId } = route.params;

    const [medicos, setMedicos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProfesionales() {
            try {
                const data = await getProfesionalesPorEspecialidad(especialidadId);
                const conDisponibles = data.filter(m =>
                    m.turnos?.some(turno => turno.estado?.id === 4)
                );
                setMedicos(conDisponibles);
            } catch (error) {
                console.error('Error al traer profesionales filtrados:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchProfesionales();
    }, [especialidadId]);

    return (
        <SafeAreaView style={{ backgroundColor: theme.backgroundTertiary, flex: 1 }}>
            <View style={[styles.header, { borderBottomColor: theme.borderBottomColor }]}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialIcons
                        name="arrow-back-ios-new"
                        size={28}
                        style={{ color: theme.textColor }}
                    />
                </TouchableOpacity>
                <View style={styles.centrar}>
                    <Text style={[styles.titulo, { color: theme.textColor }]}>
                        {t('scheduleAppointment')}
                    </Text>
                </View>
            </View>

            {loading ? (
                <ActivityIndicator size="large" color={theme.textColor} style={{ marginTop: 30 }} />
            ) : (
                <ScrollView contentContainerStyle={styles.body}>
                    {medicos.length > 0 ? (
                        medicos.map((medico) => (
                            <CardsMedicos
                                key={medico.id}
                                nombre={`${medico.nombre} ${medico.apellido}`}
                                especialidad={especialidad}
                                direccion={medico.direccion || "Clínica Central"}
                                imagen={
                                    medico.foto
                                        ? { uri: `data:image/jpeg;base64,${medico.foto}` }
                                        : require('mi-turnito/src/assets/images/medicaSilvia.jpg')
                                }
                                onPress={() => navigation.navigate("SeleccionarHorario", { medico })}
                            />
                        ))
                    ) : (
                        <Text style={{ color: theme.textColor }}>
                            {t('noProfessionalsFound')}
                        </Text>
                    )}
                </ScrollView>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 80,
        paddingBottom: 20,
        paddingHorizontal: 16,
        borderBottomWidth: 5,
    },
    centrar: {
        flex: 1,
        alignItems: 'center',
    },
    titulo: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    body: {
        padding: 16,
        gap: 12,
        alignItems: 'center',
    },
});
