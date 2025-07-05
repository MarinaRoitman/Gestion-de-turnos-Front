import { View, ScrollView, StyleSheet, Text, Modal, TouchableOpacity } from 'react-native';
import EmailInput from '../components/InputTabs';
import { useTheme } from '../../theme/ThemeContext';
import { useTranslation } from 'react-i18next';
import ButtonSecondary from '../components/ButtonSecondary';
import React, { useState, useEffect, useContext } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Picker } from '@react-native-picker/picker';
import { getPacienteById } from '../../api/paciente';
import { getObrasSociales } from '../../api/obraSocial';
import { updateAfiliacion } from '../../api/afiliacion';
import { AuthContext } from '../../context/AuthContext';

export default function ObraSocialTab() {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const { userId } = useContext(AuthContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [obrasSociales, setObrasSociales] = useState([]);
  const [planes, setPlanes] = useState([]);
  const [selectedObraSocialId, setSelectedObraSocialId] = useState(null);
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [nroAfiliado, setNroAfiliado] = useState('');
  const [afiliacionId, setAfiliacionId] = useState(null);
  const [fechaAlta, setFechaAlta] = useState('');
  const [fechaFin, setFechaFin] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const obras = await getObrasSociales();
        setObrasSociales(obras);

        const paciente = await getPacienteById(userId);
        const afiliacion = paciente.afiliaciones?.[0];
        if (afiliacion) {
          const obraId = afiliacion.obraSocial.id;
          const planId = afiliacion.plan.id;
          setAfiliacionId(afiliacion.id);
          setNroAfiliado(afiliacion.nroAfiliado);
          setFechaAlta(afiliacion.fechaAlta);
          setFechaFin(afiliacion.fechaFin);
          setSelectedObraSocialId(obraId);
          setSelectedPlanId(planId);

          const obra = obras.find(o => o.id === obraId);
          if (obra) {
            setPlanes(obra.planes);
          }
        }
      } catch (err) {
        console.error("Error cargando datos:", err);
      }
    };
    fetchData();
  }, [userId]);

  useEffect(() => {
    if (!selectedObraSocialId || obrasSociales.length === 0) return;
    const obraSeleccionada = obrasSociales.find(o => o.id === selectedObraSocialId);
    if (obraSeleccionada) {
      setPlanes(obraSeleccionada.planes);
      // si el plan actual no pertenece a la nueva obra social, seleccionar el primero
      if (!obraSeleccionada.planes.find(p => p.id === selectedPlanId)) {
        setSelectedPlanId(obraSeleccionada.planes[0]?.id || null);
      }
    }
  }, [selectedObraSocialId, obrasSociales]);

  const handleGuardar = async () => {
    try {
      await updateAfiliacion(
        afiliacionId,
        nroAfiliado,
        fechaAlta,
        fechaFin,
        selectedObraSocialId,
        selectedPlanId
      );
      setModalVisible(true);
    } catch (error) {
      console.error("Error al actualizar la afiliación:", error);
    }
  };

  return (
    <ScrollView style={{ backgroundColor: theme.backgroundSecondary }} contentContainerStyle={{ paddingBottom: 100 }}>
      <View style={styles.contenedorTabs}>
        {/* Obra social */}
        <View style={{ marginHorizontal: 37, marginBottom: 20 }}>
          <Text style={[{ color: theme.textColor, marginBottom: 6 }, styles.filtroLabel]}>{t('healthInsurance')}</Text>
          <View style={{ borderRadius: 16, overflow: 'hidden', backgroundColor: theme.backgroundImput }}>
            <Picker
              selectedValue={selectedObraSocialId}
              onValueChange={setSelectedObraSocialId}
              dropdownIconColor={theme.textColor}
              style={{ color: theme.modalButtonText, backgroundColor: theme.backgroundImput }}
            >
              {obrasSociales.map((obra) => (
                <Picker.Item key={obra.id} label={obra.nombre} value={obra.id} />
              ))}
            </Picker>
          </View>
        </View>

        {/* Plan */}
        <View style={{ marginHorizontal: 37, marginBottom: 20 }}>
          <Text style={[{ color: theme.textColor, marginBottom: 6 }, styles.filtroLabel]}>Plan</Text>
          <View style={{ borderRadius: 16, overflow: 'hidden', backgroundColor: theme.backgroundImput }}>
            <Picker
              selectedValue={selectedPlanId}
              onValueChange={setSelectedPlanId}
              dropdownIconColor={theme.textColor}
              style={{ color: theme.modalButtonText, backgroundColor: theme.backgroundImput }}
            >
              {planes.map((plan) => (
                <Picker.Item key={plan.id} label={plan.nombre} value={plan.id} />
              ))}
            </Picker>
          </View>
        </View>

        {/* Número de afiliado */}
        <EmailInput label={t('insuranceId')} value={nroAfiliado} onChangeText={setNroAfiliado} />
      </View>

      {/* Botón guardar */}
      <View style={styles.botonContainer}>
        <ButtonSecondary title={t('save')} onPress={handleGuardar} />
      </View>

      {/* Modal de éxito */}
      <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
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
marginTop: 284,
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
pickerContainer: {
borderRadius: 8,
overflow: 'hidden',
marginBottom: 10,
},
filtroLabel: {
fontWeight: 'bold',
fontSize: 20,
marginBottom: 4,
},
pickerContainer: {
borderRadius: 8,
height: 50,
justifyContent: 'center',
paddingHorizontal: 12,
overflow: 'hidden',
borderWidth: 1,
borderColor: '#ccc', // opcional
},

});