import { View, ScrollView, StyleSheet, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { medicos } from '../../../medicos.js';
import { CardsMedicos } from '../components/CardsMedicos.js';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../theme/ThemeContext.js';

export default function Resultados({ route, navigation }) {
    const { isDark, toggleTheme, theme } = useTheme();
    const { especialidad, profesional } = route.params;

    const medicosFiltrados = medicos.filter(m =>
        (!especialidad || m.especialidad === especialidad) &&
        (!profesional || m.nombre === profesional)
    );

    return (
        <SafeAreaView style={{ backgroundColor:theme.backgroundTertiary , flex: 1 }}>
            
            <View style={[styles.header, { borderBottomColor: theme.borderBottomColor }]}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialIcons 
                        name="arrow-back-ios-new" size={28} 
                        style={[ {color: theme.textColor}, 
                        {textShadowRadius: 1} ]} />
                </TouchableOpacity>
                <Text style={[styles.titulo, { width: "80%", paddingLeft: 55 }, {color: theme.textColor} ]}>Agendar Turno</Text>
            </View>

            <ScrollView contentContainerStyle={styles.body}>
                {medicosFiltrados.length > 0 ? (
                    medicosFiltrados.map(medico => (
                        <CardsMedicos
                            key={medico.id}
                            nombre={medico.nombre}
                            especialidad={medico.especialidad}
                            direccion={medico.direccion}
                            imagen={medico.imagen}
                            onPress={() => navigation.navigate("SeleccionarHorario", { medico })}
                        />
                    ))
                ) : (
                    <Text>No se encontraron médicos con esos filtros.</Text>
                )}
            </ScrollView>
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
