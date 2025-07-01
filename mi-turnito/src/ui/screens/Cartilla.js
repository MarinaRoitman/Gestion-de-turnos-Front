import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { CardsMedicos } from '../components/CardsMedicos.js';
import { useTheme } from '../../theme/ThemeContext.js';
import { getProfesionales } from '../../api/profesional.js';

export default function Cartilla({ navigation }) {
  const { isDark, toggleTheme, theme } = useTheme();
  const [profesionales, setProfesionales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfesionales() {
      try {
        const data = await getProfesionales();
        setProfesionales(data);
      } catch (error) {
        console.error("Error cargando profesionales:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProfesionales();
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: theme.backgroundTertiary, flex: 1 }}>
      <View style={styles.containerGlobal}>
        <View
          style={[
            styles.contenedorHeader,
            { backgroundColor: theme.backgroundTertiary },
            { borderBottomColor: theme.borderBottomColor },
          ]}
        >
          <TouchableOpacity style={styles.iconWrapper} onPress={() => navigation.goBack()}>
            <MaterialIcons
              name="arrow-back-ios-new"
              size={28}
              style={[{ color: theme.textColor }, { textShadowRadius: 1 }]}
            />
          </TouchableOpacity>
          <Text style={[styles.tituloInicial, { color: theme.textColor }, { width: '60%', paddingLeft: 70 }]}>
            Cartilla
          </Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        {loading && <Text style={{ color: theme.textColor }}>{"Loading professionals" || "Cargando profesionales..."}</Text>}

        {!loading && profesionales.length === 0 && (
          <Text style={{ color: theme.textColor }}>No se encontraron profesionales.</Text>
        )}

        {profesionales.map((profesional) => {
          // Convertir especialidades a string separados por comas
          const especialidadesStr = profesional.especialidades
            .map((esp) => esp.nombre)
            .join(', ');

          // Componer nombre completo
          const nombreCompleto = `${profesional.nombre} ${profesional.apellido}`;

          return (
            <CardsMedicos
              key={profesional.id}
              nombre={nombreCompleto}
              especialidad={especialidadesStr}
              matricula={profesional.matricula || 'Sin matrícula'}
              imagen={
                profesional.foto
                  ? { uri: `data:image/jpeg;base64,${profesional.foto}` }
                  : require('../../assets/images/medicaSilvia.jpg')
              }
            />
          );
        })}
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
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
});
