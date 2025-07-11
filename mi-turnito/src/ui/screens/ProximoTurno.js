import { View, StyleSheet, Text, Image, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../theme/ThemeContext.js';
import { useTranslation } from 'react-i18next';
import { useState, useEffect, useContext } from 'react';
import ProximoCard from '../components/CardProximoTurno.js';
import ConfirmationModal from '../components/ConfirmacionModal.js';
import { AuthContext } from '../../context/AuthContext.js';
import { getTurnosFuturosPorPaciente, cancelarTurno } from '../../api/turno.js';
import { crearNotificacion } from '../../api/notificacion.js';

export default function ProximoTurno({ navigation }) {
  const { theme, isDark } = useTheme();
  const { t } = useTranslation();
  const { userId } = useContext(AuthContext);

  const [turnosProximos, setTurnosProximos] = useState([]);
  const [selectedTurno, setSelectedTurno] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const formatearFechaHora = (fecha, hora) => {
    const [año, mes, dia] = fecha.split("-");
    const horaCorta = hora.slice(0, 5);
    return `${dia}/${mes}/${año} ${horaCorta}`;
  };

useEffect(() => {
  const fetchTurnos = async () => {
    try {
      const turnos = await getTurnosFuturosPorPaciente(userId);
      const turnosValidos = turnos
        .filter(t => t.estado?.id !== 1)
        .sort((a, b) => new Date(a.fecha + 'T' + a.hora) - new Date(b.fecha + 'T' + b.hora)); // 👈 Orden correcto

      setTurnosProximos(turnosValidos);
    } catch (error) {
      console.error("Error al cargar turnos futuros:", error);
    }
  };

  fetchTurnos();
}, []);

  const handleDelete = async () => {
    try {
      await cancelarTurno(selectedTurno.id, userId);

      const fechaFormateada = selectedTurno.fecha.split('-').reverse().join('/');
      const horaFormateada = selectedTurno.hora.slice(0, 5);
      const nombreProfesional = `${selectedTurno.profesional.nombre} ${selectedTurno.profesional.apellido}`;

      const mensaje = t('notificationMessageCancel', {
        fecha: fechaFormateada,
        hora: horaFormateada,
        nombre: nombreProfesional,
      });

      await crearNotificacion(mensaje, selectedTurno.id, userId, t("notiTitleCancel"));

      setTurnosProximos(prev => prev.filter(t => t.id !== selectedTurno.id));
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error al cancelar el turno o crear la notificación:", error);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: theme.backgroundTertiary, flex: 1 }}>
      <View style={styles.header}>
        <View style={[styles.contenedorHeader, { borderBottomColor: theme.borderBottomColor }]}>
          <TouchableOpacity
            style={styles.iconWrapper}
            onPress={() =>
              navigation.navigate('Tabs', {
                screen: 'Turnos',
                params: {
                  screen: 'TurnosMain',
                },
              })
            }>
            <MaterialIcons name="arrow-back-ios-new" size={28} style={{ color: theme.textColor }} />
          </TouchableOpacity>
          <View style={styles.centrar}>
            <Text style={[styles.tituloInicial, { color: theme.textColor }]}>{t("next")}</Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        {turnosProximos.length === 0 ? (
          <View style={styles.containerFoto}>
            <Image
              source={isDark
                ? require('../../assets/images/NotificacionDMode.png')
                : require('../../assets/images/NotificacionLMode.png')}
              style={styles.imagen}
            />
            <Text style={[styles.subTexto, { color: theme.textColor }]}>
              {t("emptyAppointment")}
            </Text>
          </View>
        ) : (
          <View style={styles.contenedorCard}>
            {turnosProximos.map(turno => (
              <ProximoCard
                key={turno.id}
                nombre={`${turno.profesional.nombre} ${turno.profesional.apellido}`}
                foto={turno.profesional.foto}
                fechaTurno={formatearFechaHora(turno.fecha, turno.hora)}
                onDelete={() => {
                  setSelectedTurno(turno);
                  setShowDeleteModal(true);
                }}
              />
            ))}
          </View>
        )}
      </ScrollView>

      <ConfirmationModal
        visible={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title={t('titleDelete')}
        message={t('messageDelete')}
        confirmText={t('confirmDelete')}
        icon="delete"
        actionType="delete"
      />
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
    paddingBottom: 20,
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
    fontSize: 18,
    color: '#655873',
    fontWeight: '500',
    alignSelf: 'center',
  },
  iconWrapper: {
    position: 'absolute',
    left: 30,
    top: 87,
    borderColor: '#4F3680',
  },
  centrar: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  contenedorCard: {
    margin: 10,
    paddingTop: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20,
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  specialty: {
    fontSize: 16,
    color: '#655873',
  },
  body: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  imagen: {
    marginTop: '200',
    alignSelf: 'center',
  },
});
