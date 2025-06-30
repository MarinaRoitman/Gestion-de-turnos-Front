import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../../context/AuthContext';
import { getPacienteById } from '../../api/paciente';

export default function HistorialScreen({ navigation }) {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const { userId } = useContext(AuthContext);
  const [turnosAnteriores, setTurnosAnteriores] = useState([]);

  useEffect(() => {
    async function fetchTurnos() {
      try {
        const paciente = await getPacienteById(userId);
        const hoy = new Date();

        const filtrados = paciente.turnos.filter(turno => {
          const fechaTurno = new Date(turno.fecha);
          return fechaTurno < hoy;
        });

        setTurnosAnteriores(filtrados);
      } catch (error) {
        console.error("Error al obtener turnos:", error);
      }
    }

    if (userId) {
      fetchTurnos();
    }
  }, [userId]);

  return (
    <SafeAreaView style={{ backgroundColor: theme.backgroundTertiary, flex: 1 }}>
      <View style={styles.header}>
        <View style={[styles.contenedorHeader, { borderBottomColor: theme.borderBottomColor }]}>
          <TouchableOpacity style={styles.iconWrapper} onPress={() => navigation.navigate('Home')}>
            <MaterialIcons name="arrow-back-ios-new" size={28} style={{ color: theme.textColor }} />
          </TouchableOpacity>
          <View style={styles.centrar}>
            <Text style={[styles.tituloInicial, { color: theme.textColor }]}>{t('history')}</Text>
          </View>
        </View>
      </View>

      <ScrollView style={{ padding: 15 }}>
        {turnosAnteriores.map(turno => (
          <View key={turno.id} style={[styles.card, { backgroundColor: theme.colorBackgroundCard }]}>
            <View style={styles.row}>
              <Image
                source={
                    turno.profesional.foto
                    ? { uri: `data:image/jpeg;base64,${turno.profesional.foto}` }
                    : require('../../assets/images/medicaSilvia.jpg')
                }
                style={styles.avatar}
                />
              <View style={styles.info}>
                <Text style={[styles.name, { color: theme.textColor }]}>
                  {turno.profesional.nombre} {turno.profesional.apellido}
                </Text>
                <Text style={[styles.specialty, { color: theme.textColor }]}>
                  {t('Date')}: {turno.fecha} {turno.hora}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: theme.modalButton }]}
              onPress={() => navigation.navigate('Detalle', { turno })}
            >
              <Text style={[styles.buttonText, { color: theme.backgroundImput }]}>{t('details')}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contenedorHeader: {
    paddingTop: 80,
    paddingBottom: 16,
    borderBottomWidth: 5,
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
  },
  card: {
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  info: {
    marginLeft: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  specialty: {
    fontSize: 14,
  },
  button: {
    marginTop: 10,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
  },
});