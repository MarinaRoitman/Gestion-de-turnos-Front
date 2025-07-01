import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import { CardsMedicos } from '../components/CardsMedicos';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../theme/ThemeContext.js';
import ButtonSecondary from '../components/ButtonSecondary.js';
import ErrorModal from '../components/ErrorModal';
import { useTranslation } from 'react-i18next';
import { getTurnosPorProfesional } from '../../api/turno';

export default function Horario({ route, navigation }) {
  const { medico } = route.params;
  const [horarioSeleccionado, setHorarioSeleccionado] = useState(null);
  const [turnosDisponibles, setTurnosDisponibles] = useState({});
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();
  const [modalErrorVisible, setModalErrorVisible] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    async function cargarTurnos() {
      try {
        const turnos = await getTurnosPorProfesional(medico.id);
        const disponibles = turnos.filter(t => t.estado?.nombre === 'Disponible');
        const agrupados = {};

        disponibles.forEach(turno => {
          const dia = turno.fecha;
          const hora = turno.hora.slice(0, 5);
          if (!agrupados[dia]) agrupados[dia] = [];
          agrupados[dia].push({ hora, turno });
        });

        setTurnosDisponibles(agrupados);
      } catch (e) {
        console.error('Error al cargar turnos disponibles:', e);
      } finally {
        setLoading(false);
      }
    }

    cargarTurnos();
  }, [medico.id]);

  const handleConfirmar = () => {
    if (!horarioSeleccionado) {
      setModalErrorVisible(true);
      return;
    }

    navigation.navigate('ConfirmarTurno', {
      turno: horarioSeleccionado.turno, // enviamos el objeto completo
      medico,
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.backgroundTertiary }}>
      {/* Header */}
      <View style={styles.containerGlobal}>
        <View style={[styles.contenedorHeader, { borderBottomColor: theme.borderBottomColor }]}>
          <TouchableOpacity style={styles.iconWrapper} onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back-ios-new" size={28} color={theme.textColor} />
          </TouchableOpacity>
          <Text style={[styles.tituloInicial, { color: theme.textColor }]}>{t('scheduleAppointment')}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        <CardsMedicos
          nombre={`${medico.nombre} ${medico.apellido}`}
          especialidad={medico.especialidades?.map(e => e.nombre).join(', ') || 'Sin especialidad'}
          direccion="Clínica Central"
          imagen={
            medico.foto
              ? { uri: `data:image/jpeg;base64,${medico.foto}` }
              : require('mi-turnito/src/assets/images/medicaSilvia.jpg')
          }
        />

        <View style={styles.infoContainer}>
          <MaterialIcons name="calendar-today" size={22} color={theme.colorIconBackground} />
          <View style={styles.infoText}>
            <Text style={[styles.infoLabel, { color: theme.textColor }]}>{t('dateAndTime')}</Text>
            <Text style={[styles.infoLabelSecundario, { color: theme.textColor }]}>{t('chooseDateTime')}</Text>
          </View>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color={theme.textColor} style={{ marginTop: 30 }} />
        ) : (
          Object.entries(turnosDisponibles).map(([fecha, horarios]) => (
            <View key={fecha} style={styles.diaContainer}>
              <Text style={[styles.subtitulo, { color: theme.textColor }]}>{fecha}</Text>
              <View style={styles.horariosContainer}>
                {horarios.map(({ hora, turno }, i) => {
                  const isSelected = horarioSeleccionado?.turno?.id === turno.id;
                  return (
                    <TouchableOpacity
                      key={i}
                      style={[
                        styles.horarioButton,
                        {
                          backgroundColor: isSelected ? theme.buttonColor : theme.backgroundSecondary,
                          borderColor: theme.buttonColor,
                        },
                      ]}
                      onPress={() => setHorarioSeleccionado({ dia: fecha, hora, turno })}
                    >
                      <Text
                        style={{
                          color: isSelected ? theme.textColorSecondary : theme.buttonColor,
                          fontWeight: 'bold',
                        }}
                      >
                        {hora}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          ))
        )}

        <View style={{ paddingTop: 5 }}>
          <ButtonSecondary
            style={[styles.botonConfirmar, !horarioSeleccionado && { opacity: 0.5 }]}
            disabled={!horarioSeleccionado}
            onPress={handleConfirmar}
            title={t('confirmAppointment')}
          />
        </View>
      </ScrollView>

      <ErrorModal
        visible={modalErrorVisible}
        message={t('selectTimeFirst')}
        onClose={() => setModalErrorVisible(false)}
      />
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
    infoContainer: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 12,
    alignItems: 'flex-start',
    paddingLeft: 20,
    },

    infoText: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    },
    infoLabel: {
        fontWeight: 'bold',
        fontSize: 15,
    },
    infoLabelSecundario: {
        fontSize: 15,
    },

});
