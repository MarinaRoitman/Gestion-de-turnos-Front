import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Alert } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { CardsMedicos } from '../components/CardsMedicos';
import { useTheme } from '../../../src/theme/ThemeContext';
import ButtonSecondary from '../components/ButtonSecondary';
import { useTranslation } from 'react-i18next';
import { reservarTurno } from '../../api/turno';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';

export default function ConfirmarTurno({ route, navigation }) {
  const { medico, turno } = route.params;
  const { theme } = useTheme();
  const { t } = useTranslation();

  const fechaFormateada = turno.fecha.split('-').reverse().join('/');
  const horaFormateada = turno.hora.slice(0, 5);

  const { userId } = useContext(AuthContext);

  const handleConfirmar = async () => {
    try {
      await reservarTurno(turno, userId);
      Alert.alert(t('success'), t('appointmentConfirmed'), [
        { text: 'OK', onPress: () => navigation.popToTop() }
      ]);
    } catch (error) {
      Alert.alert(t('error'), t('errorConfirmingAppointment'));
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.backgroundSecondary }}>
      <View style={[styles.containerGlobal, { backgroundColor: theme.backgroundSecondary }]}>
        <View style={[styles.contenedorHeader, { borderBottomColor: theme.borderBottomColor }]}>
          <TouchableOpacity style={styles.iconWrapper} onPress={() => navigation.goBack()}>
            <MaterialIcons
              name="arrow-back-ios-new"
              size={28}
              style={{ color: theme.textColor, textShadowColor: theme.textColor, textShadowRadius: 1 }}
            />
          </TouchableOpacity>
          <Text style={[styles.tituloInicial, { color: theme.textColor }]}>
            {t('confirmAppointment')}
          </Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={styles.card}>
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
        </View>

        <View style={styles.infoContainer}>
          <MaterialIcons name="calendar-today" size={25} color={theme.colorIconBackground} />
          <View style={styles.infoText}>
            <Text style={[styles.infoLabel, { color: theme.textColor }]}>{t('dateAndTime')}</Text>
            <Text style={[styles.infoLabelSecundario, { color: theme.textColor }]}>
              {fechaFormateada} - {horaFormateada}
            </Text>
          </View>
        </View>

        <View style={styles.infoContainer}>
          <MaterialIcons name="location-on" size={25} color={theme.colorIconBackground} />
          <View style={styles.infoText}>
            <Text style={[styles.infoLabel, { color: theme.textColor }]}>{t('place')}</Text>
            <Text style={[styles.infoLabelSecundario, { color: theme.textColor }]}>{/* vacío */}</Text>
          </View>
        </View>

        <View style={styles.botonContainer}>
          <ButtonSecondary
            title={t('confirm')}
            onPress={handleConfirmar}
          />
        </View>
      </ScrollView>
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
    fontWeight: 500,
},
iconWrapper: {
    position: 'absolute',
    left: 30,
    top: 87,
},
  card: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 15,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 30,
    gap: 12,
    marginLeft: 20,
  },
  infoText: {
    flexDirection: 'column',
  },
  infoLabel: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  infoLabelSecundario: {
        fontSize: 15,
  },
  infoValue: {
    color: 'white',
    fontSize: 15,
    marginTop: 4,
  },
  botonContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  botonContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 190,
  }
});