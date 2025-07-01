import React, { useState, useEffect, useContext } from 'react';
import { View, ScrollView, StyleSheet, Modal, Text, TouchableOpacity } from 'react-native';
import EmailInput from '../components/InputTabs';
import { useTheme } from '../../theme/ThemeContext';
import { useTranslation } from 'react-i18next';
import ButtonSecondary from '../components/ButtonSecondary';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { AuthContext } from '../../context/AuthContext';
import { getPacienteById, modifyPaciente } from "../../api/paciente";

export default function DatosPersonalesTab() {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const { userId } = useContext(AuthContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [dni, setDni] = useState('');
  const [telefono, setTelefono] = useState('');

  const [pacienteOriginal, setPacienteOriginal] = useState(null);

  useEffect(() => {
    async function cargarDatosPaciente() {
      if (!userId) return;
      try {
        const paciente = await getPacienteById(userId);
        setPacienteOriginal(paciente); // Copia del original
        setNombre(paciente.nombre || "");
        setApellido(paciente.apellido || "");
        setFechaNacimiento(paciente.fechaNacimiento || "");
        setDni(paciente.dni || "");
        setTelefono(paciente.telefono || "");
      } catch (error) {
        console.error("Error al cargar datos del paciente:", error);
      }
    }
    cargarDatosPaciente();
  }, [userId]);

  const handleConfirm = async () => {
    if (!pacienteOriginal) return;

    try {
      await modifyPaciente(
        pacienteOriginal.id,
        nombre || pacienteOriginal.nombre,
        apellido || pacienteOriginal.apellido,
        pacienteOriginal.mail,
        pacienteOriginal.password,
        dni || pacienteOriginal.dni,
        fechaNacimiento || pacienteOriginal.fechaNacimiento,
        telefono || pacienteOriginal.telefono
      );

      setModalVisible(true);
      setErrorMessage(null);
    } catch (error) {
      console.error("Error al modificar paciente:", error);
      setErrorMessage(t("errorUpdatingData") || "Error actualizando datos");
    }
  };

  return (
    <ScrollView style={{ backgroundColor: theme.backgroundSecondary }} contentContainerStyle={{ paddingBottom: 100 }}>
      <View style={styles.contenedorTabs}>
        <EmailInput label={t('name')} value={nombre} onChangeText={setNombre} />
        <EmailInput label={t('lastName')} value={apellido} onChangeText={setApellido} />
        <EmailInput
          label={t('birthDate')}
          value={fechaNacimiento}
          onChangeText={setFechaNacimiento}
          placeholder="YYYY-MM-DD"
        />
        <EmailInput label={t('dni')} value={dni} onChangeText={setDni} keyboardType="numeric" />
        <EmailInput label={t('phone')} value={telefono} onChangeText={setTelefono} keyboardType="phone-pad" />
      </View>

      <View style={styles.botonContainer}>
        <ButtonSecondary title={t('save')} onPress={handleConfirm} />
      </View>

      <Modal animationType="fade" transparent visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContainer, { backgroundColor: theme.modalBackground }]}>
            <View style={styles.modalContent}>
              <MaterialIcons name="check-circle" size={43} color="#4CAF50" style={styles.iconCheck} />
              <View style={styles.textContainer}>
                <Text style={[styles.modalTitle, { color: theme.textColor }]}>{t('successTitle')}</Text>
                <Text style={[styles.modalSubtitle, { color: theme.textColor }]}>{t('success')}</Text>
              </View>
            </View>
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: theme.modalButton }]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Ok</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenedorTabs: {
    gap: 8,
    paddingTop: 10,
  },
  botonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: 340,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  modalContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: 300,
  },
  iconCheck: {
    marginRight: 19,
  },
  textContainer: {
    flex: 1,
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  modalSubtitle: {
    fontSize: 15,
    marginTop: 4,
  },
  modalButton: {
    backgroundColor: '#4F3680',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: 270,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 14,
  },
});
