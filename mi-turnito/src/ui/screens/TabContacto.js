import React, { useState, useEffect, useContext } from 'react';
import { ScrollView, StyleSheet, View, Modal, Text, TouchableOpacity } from 'react-native';
import EditableInput from '../components/InputTabs';
import { useTheme } from '../../theme/ThemeContext';
import { useTranslation } from 'react-i18next';
import ButtonSecondary from '../components/ButtonSecondary';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { AuthContext } from '../../context/AuthContext';
import { getPacienteById, modifyPaciente } from '../../api/paciente';
import SHA256 from 'crypto-js/sha256';

export default function ContactoTab() {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const { userId } = useContext(AuthContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // Guardamos todo el paciente original para enviar datos que no se modifican acá
  const [pacienteOriginal, setPacienteOriginal] = useState(null);

  // Solo la contraseña editable
  const [password, setPassword] = useState('');
  const [passwordPlaceholder, setPasswordPlaceholder] = useState('********');

  useEffect(() => {
    async function fetchPaciente() {
        if (!userId) return;
        try {
        const paciente = await getPacienteById(userId);
        setPacienteOriginal(paciente);
        
        if (paciente.password) {
            setPasswordPlaceholder('*'.repeat(8));
        } else {
            setPasswordPlaceholder('********');
        }
        setPassword('');
        } catch (error) {
        console.error("Error al cargar datos del paciente:", error);
        }
    }
    fetchPaciente();
    }, [userId]);

  const handleConfirm = async () => {
    if (!pacienteOriginal) return;

    try {
      const hashedPassword = SHA256(password).toString();
      await modifyPaciente(
        pacienteOriginal.id,
        pacienteOriginal.nombre,
        pacienteOriginal.apellido,
        pacienteOriginal.mail,
        hashedPassword || pacienteOriginal.password,
        pacienteOriginal.dni,
        pacienteOriginal.fechaNacimiento,
        pacienteOriginal.telefono
      );
      setModalVisible(true);
      setErrorMessage(null);
    } catch (error) {
      console.error("Error al modificar contraseña:", error);
      setErrorMessage(t("errorUpdatingData") || "Error actualizando datos");
    }
  };

  return (
    <ScrollView
      style={{ backgroundColor: theme.backgroundSecondary }}
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      <View style={styles.contenedorTabs}>
        <EditableInput
          label={t('email')}
          value={pacienteOriginal?.mail || '...'}
          keyboardType="email-address"
          editable={false}
          inputStyle={{ backgroundColor: 'lightgray' }}
        />
        <EditableInput
          label={t('password')}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder={passwordPlaceholder}
        />
      </View>

      {errorMessage && (
        <Text style={{ color: 'red', textAlign: 'center', marginTop: 10 }}>{errorMessage}</Text>
      )}

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
marginTop: 390,
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
width:300,
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