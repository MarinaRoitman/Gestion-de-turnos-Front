import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../theme/ThemeContext';
import { useTranslation } from 'react-i18next';
import { LinearGradient } from 'expo-linear-gradient';
import { getPacienteById } from '../../api/paciente';
import { AuthContext } from '../../context/AuthContext';

export default function Credencial({ navigation }) {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const { userId } = useContext(AuthContext);

  const [paciente, setPaciente] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPaciente() {
      try {
        const data = await getPacienteById(userId);
        setPaciente(data);
      } catch (error) {
        console.error("Error al cargar datos del paciente:", error);
      } finally {
        setLoading(false);
      }
    }

    if (userId) {
      fetchPaciente();
    }
  }, [userId]);

  const afiliacion = paciente?.afiliaciones?.[0] ?? null;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.backgroundTertiary }}>
      {/* Header */}
      <View style={[styles.contenedorHeader, { borderBottomColor: theme.borderBottomColor }]}>
        <TouchableOpacity style={styles.iconWrapper} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back-ios-new" size={28} style={{ color: theme.textColor }} />
        </TouchableOpacity>
        <Text style={[styles.tituloInicial, { color: theme.textColor }]}>{t('credential')}</Text>
      </View>

      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#4F3680" />
        </View>
      ) : afiliacion && paciente ? (
        <View style={styles.container}>
          <LinearGradient
            colors={['#a47de5', '#4F3680']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.card}
          >
            {/* Líneas decorativas */}
            <View style={styles.lines}>
              {[...Array(14)].map((_, i) => (
                <View key={i} style={styles.line} />
              ))}
            </View>

            <Image
              source={require('../../assets/images/LogoTurnito.png')}
              style={styles.logo}
              resizeMode="contain"
            />

            <Text style={styles.name}>
              {(paciente.nombre + ' ' + paciente.apellido).toUpperCase()}
            </Text>
            <Text style={styles.label}>{t('numCredential')}</Text>
            <Text style={styles.credentialNumber}>{afiliacion.nroAfiliado}</Text>
            <Text style={styles.plan}>Plan "{afiliacion.plan?.nombre || 'Desconocido'}"</Text>
          </LinearGradient>
        </View>
      ) : (
        <View style={styles.centered}>
          <Text style={[{ color: theme.textColor, fontSize: 18, textAlign: 'center', marginHorizontal: 40 }]}>
            {t('noCredentialFound') || 'No se encontró una afiliación válida para mostrar una credencial.'}
          </Text>
        </View>
      )}
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
    iconWrapper: {
        position: 'absolute',
        left: 30,
        top: 87,
    },
    tituloInicial: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 200,
    },
    card: {
        borderRadius: 20,
        padding: 25,
        width: '85%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
        overflow: 'hidden',
        position: 'relative',
    },
    lines: {
        position: 'absolute',
        top: 20,
        left: 20,
        right: 20,
    },
    line: {
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        marginBottom: 4,
    },
    logo: {
        width: 50,
        height: 50,
        alignSelf: 'center',
        marginBottom: 20,
    },
    name: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 8,
    },
    label: {
        color: '#eee',
        fontSize: 12,
    },
    credentialNumber: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    dateRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    dateText: {
        color: '#fff',
        fontSize: 14,
    },
    plan: {
        color: '#fff',
        fontSize: 14,
        textAlign: 'right',
        fontStyle: 'italic',
    },
    });
