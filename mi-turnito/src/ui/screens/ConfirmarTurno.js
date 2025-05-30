import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';

export default function ConfirmarTurno({ route, navigation }) {
  const { medico, horario } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Confirmación del Turno</Text>
      <Text style={styles.texto}>Médico: {medico.nombre}</Text>
      <Text style={styles.texto}>Especialidad: {medico.especialidad}</Text>
      <Text style={styles.texto}>Dirección: {medico.direccion}</Text>
      <Text style={styles.texto}>Horario Seleccionado: {horario}</Text>

      <TouchableOpacity
        style={styles.boton}
        onPress={() => {
          // Acá iría lógica para guardar la reserva
          navigation.popToTop(); // o navegar a otra pantalla final
        }}
      >
        <Text style={styles.botonTexto}>Confirmar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#F0F0F0' },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#4F3680' },
  texto: { fontSize: 16, marginBottom: 10 },
  boton: { backgroundColor: '#4F3680', padding: 12, borderRadius: 10, marginTop: 20 },
  botonTexto: { color: 'white', textAlign: 'center', fontSize: 16 }
});
