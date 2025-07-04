import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { CardsMedicos } from '../components/CardsMedicos.js';
import { useTheme } from '../../theme/ThemeContext.js';
import { useTranslation } from 'react-i18next';
import { getProfesionales } from '../../api/profesional';

export default function Seleccionar({ navigation }) {
    const { isDark, toggleTheme, theme } = useTheme();
    const { t } = useTranslation();

    const [medicos, setMedicos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProfesionales() {
        try {
            const data = await getProfesionales();
            const disponibles = data.filter(profesional =>
              profesional.turnos?.some(turno => turno.estado?.id === 4) // Solo turnos disponibles
            );
            setMedicos(disponibles);
        } catch (error) {
            console.error('Error al obtener profesionales:', error);
        } finally {
            setLoading(false);
        }
        }

        fetchProfesionales();
    }, []);

    const goToFiltro = () => {
    navigation.navigate("Filtro");
};

return (
    <SafeAreaView style={{ backgroundColor: theme.backgroundTertiary , flex: 1 }}>
      <View style={styles.containerGlobal}>
        <View style={[styles.contenedorHeader, { borderBottomColor: theme.borderBottomColor }]}>
          <TouchableOpacity style={styles.iconWrapper} onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back-ios-new" size={28} style={{ color: theme.textColor }} />
          </TouchableOpacity>
          <View style={styles.centrar}>
            <Text style={[styles.tituloInicial, { color: theme.textColor }]}>
              {t('scheduleAppointment')}
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={[styles.filtroBtn, { backgroundColor: theme.buttonColor }]} onPress={goToFiltro}>
        <MaterialIcons name="tune" size={23} style={{ color: theme.textColorSecondary }} />
        <Text style={[styles.filtroText, { color: theme.textColorSecondary }]}>
          {t('filters')}
        </Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color={theme.textColor} style={{ marginTop: 30 }} />
      ) : (
        <ScrollView contentContainerStyle={styles.body}>
          {medicos.map((medico) => (
            <CardsMedicos
              key={medico.id}
              nombre={`${medico.nombre} ${medico.apellido}`}
              especialidad={medico.especialidades?.map(e => e.nombre).join(', ') || 'Sin especialidad'}
              direccion="Clínica Central"
              imagen={
                medico.foto
                  ? { uri: `data:image/jpeg;base64,${medico.foto}` }
                  : require('mi-turnito/src/assets/images/medicaSilvia.jpg')
              }
              onPress={() => navigation.navigate("SeleccionarHorario", { medico })}
            />
          ))}
        </ScrollView>
      )}
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
    borderBottomColor: '#4F3680',
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
