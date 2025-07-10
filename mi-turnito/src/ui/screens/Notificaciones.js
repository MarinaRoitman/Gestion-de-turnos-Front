import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, Text, Image, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../theme/ThemeContext.js';
import { useTranslation } from 'react-i18next';
import { CardNotificacion } from '../components/CardNotificacion.js';
import { AuthContext } from '../../context/AuthContext.js';
import { getNotificacionesVisibles, eliminarNotificacion } from '../../api/notificacion.js';
import { useFocusEffect } from '@react-navigation/native';

export default function Notificaciones({ navigation }) {
  const { theme, isDark } = useTheme();
  const { t } = useTranslation();
  const { userId } = useContext(AuthContext);

  const [notificaciones, setNotificaciones] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchNotificaciones = async () => {
        try {
          const data = await getNotificacionesVisibles(userId);

          // Ordenar por fechaEnvio y horaEnvio
          const dataOrdenada = [...data].sort((a, b) => {
            const fechaA = new Date(`${a.fechaEnvio}T${a.horaEnvio}`);
            const fechaB = new Date(`${b.fechaEnvio}T${b.horaEnvio}`);
            return fechaB - fechaA; // Más reciente primero
          });

          setNotificaciones(dataOrdenada);
        } catch (error) {
          console.error("Error al traer notificaciones:", error);
        }
      };

      fetchNotificaciones();
    }, [userId])
  );

  const handleDelete = async (idNotificacion) => {
    try {
      await eliminarNotificacion(idNotificacion);
      setNotificaciones(prev => prev.filter(n => n.id !== idNotificacion));
    } catch (error) {
      console.error("Error al eliminar notificación:", error);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: theme.backgroundTertiary, flex: 1 }}>
      <View style={styles.header}>
        <View style={[styles.contenedorHeader, { borderBottomColor: theme.borderBottomColor }]}>
          <TouchableOpacity style={styles.iconWrapper} onPress={() => navigation.navigate('Home')}>
            <MaterialIcons
              name="arrow-back-ios-new"
              size={28}
              style={{ color: theme.textColor, textShadowRadius: 1 }}
            />
          </TouchableOpacity>
          <View style={styles.centrar}>
            <Text style={[styles.tituloInicial, { color: theme.textColor }]}>
              {t("notification")}
            </Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        {notificaciones.length === 0 ? (
          <View style={styles.containerFoto}>
            <Image
              source={isDark
                ? require('../../assets/images/NotificacionDMode.png')
                : require('../../assets/images/NotificacionLMode.png')}
              style={styles.imagen}
            />
            <Text style={[styles.subTexto, { color: theme.textColor }]}>
              {t("emptyNotis")}
            </Text>
          </View>
        ) : (
          <View style={styles.contenedorCard}>
            {notificaciones.map((noti) => (
              <CardNotificacion
                key={noti.id}
                titulo={noti.titulo}
                nombre={noti.texto}
                onDelete={() => handleDelete(noti.id)}
              />
            ))}
          </View>
        )}
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
  body: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  imagen: {
    marginTop: 200,
  },
  contenedorCard: {
    margin: 10,
  },
});
