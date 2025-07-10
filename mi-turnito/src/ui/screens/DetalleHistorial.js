import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useRoute } from '@react-navigation/native';
import { useTheme } from '../../theme/ThemeContext';
import { useTranslation } from 'react-i18next';
import ImagenModal from '../../ui/components/ImagenModal';
import { getProfesionalPorId } from '../../api/profesional';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function DetalleScreen({ navigation }) {
  const route = useRoute();
  const { turno } = route.params;
  const { theme } = useTheme();
  const { t } = useTranslation();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalImage, setModalImage] = useState(null);
  const [profesional, setProfesional] = useState(null);

  const formatearFechaHora = (fecha, hora) => {
    const [año, mes, dia] = fecha.split("-");
    const horaCorta = hora.slice(0, 5);
    return `${dia}/${mes}/${año} ${horaCorta}`;
  };

  const getEstadoStyle = (estado) => {
    switch (estado) {
      case 'Reservado':
        return { backgroundColor: '#DCC6F8' };
      case 'Cancelado':
        return { backgroundColor: '#F8D6D6' };
      case 'Cumplido':
        return { backgroundColor: '#C6F8DB' };
      case 'Disponible':
        return { backgroundColor: '#D6EAF8' };
      default:
        return { backgroundColor: '#E0E0E0' };
    }
  };

  const getEstadoTextStyle = (estado) => {
    switch (estado) {
      case 'Reservado':
        return { color: '#6A0DAD' };
      case 'Cancelado':
        return { color: '#C62828' };
      case 'Cumplido':
        return { color: '#2E7D32' };
      case 'Disponible':
        return { color: '#1565C0' };
      default:
        return { color: '#555' };
    }
  };

  const fechaFormateada = formatearFechaHora(turno.fecha, turno.hora);

  useEffect(() => {
    async function fetchProfesionalCompleto() {
      try {
        const data = await getProfesionalPorId(turno.profesional.id);
        setProfesional(data);
      } catch (error) {
        console.error('Error al cargar profesional:', error);
      }
    }

    fetchProfesionalCompleto();
  }, [turno.profesional.id]);

  if (!profesional) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.backgroundTertiary }}>
        <Text style={{ color: theme.textColor }}>{t('loadDetails')}</Text>
      </View>
    );
  }

  const especialidadesStr = profesional.especialidades?.map((e) => e.nombre).join(', ') || t('noAvailable');

  return (
    <>
      <ScrollView style={{ flex: 1, backgroundColor: theme.backgroundTertiary }}>
        <View style={[styles.header, { borderBottomColor: theme.borderBottomColor }]}>
          <TouchableOpacity style={styles.iconWrapper} onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back-ios-new" size={28} style={{ color: theme.textColor }} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.textColor }]}>{t('detail')}</Text>
        </View>

        <View style={[styles.cardGrande, { backgroundColor: theme.colorBackgroundCard }]}>
          <View style={styles.cardSimple}>
            <Image
              source={
                profesional.foto
                  ? { uri: `data:image/jpeg;base64,${profesional.foto}` }
                  : require('../../assets/images/medicaSilvia.jpg')
              }
              style={styles.avatar}
            />
            <View>
              <Text style={[styles.name, { color: theme.textColor }]}>
                {profesional.nombre} {profesional.apellido}
              </Text>
              <Text style={[styles.specialty, { color: theme.textColor }]}>
                <FontAwesome name="stethoscope" size={20} style={{ color: theme.textColor }} />  {especialidadesStr}
              </Text>
              <Text style={[styles.noteText, { color: theme.textColor }]}>
                <FontAwesome name="clock-o" size={20} style={{ color: theme.textColor }} />  {fechaFormateada}
              </Text>
            </View>
          </View>

          <View style={styles.estadoWrapper}>
            <Text style={[styles.estadoLabel, { color: theme.textColor }]}>{t('state')}</Text>
            <View style={[styles.estadoBadge, getEstadoStyle(turno.estado?.nombre)]}>
              <Text style={[styles.estadoTexto, getEstadoTextStyle(turno.estado?.nombre)]}>
                {turno.estado?.nombre || t('unknown')}
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.textColor }]}>{t('note')}</Text>
            <View style={[styles.noteBox, { backgroundColor: theme.backgroundImput }]}>
              <Text style={[styles.noteText, { color: theme.placeholderText }]}>
                {turno.notas || t('noNotes')}
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.textColor }]}>{t('imageMedical')}</Text>

            {turno.imagenes?.length > 0 ? (
              turno.imagenes.map((img, index) => (
                <TouchableOpacity
                  key={img.id || index}
                  style={[styles.radioCard, { backgroundColor: theme.colorBackgroundCard }]}
                  onPress={() => {
                    setModalTitle(img.titulo || `${t('image')} ${index + 1}`);
                    setModalImage({ uri: `data:image/jpeg;base64,${img.imagen}` });
                    setModalVisible(true);
                  }}
                >
                  <Image source={{ uri: `data:image/jpeg;base64,${img.imagen}` }} style={styles.radioImage} />
                  <Text style={[styles.radioText, { color: theme.textColor }]}>{img.nombre || t('seeImg')}</Text>
                </TouchableOpacity>
              ))
            ) : (
              <View style={{ padding: 20, alignItems: 'center' }}>
                <Text style={{ color: theme.textColor }}>{t('noImages')}</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      <ImagenModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title={modalTitle}
        imageSource={modalImage}
      />
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 70,
    paddingBottom: 16,
    borderBottomWidth: 5,
    alignItems: 'center',
    position: 'relative',
  },
  iconWrapper: {
    position: 'absolute',
    left: 20,
    top: 70,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  cardSimple: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    marginLeft: 20,
    marginTop: 20,
    padding: 15,
  },
  cardGrande: {
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    margin: 20,
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
    fontSize: 15,
    marginTop: 4,
    marginBottom: 4,
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  noteBox: {
    padding: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
    borderColor: '#ccc',
    borderWidth: 0.5,
  },
  noteText: {
    fontSize: 14,
    marginBottom: 5,
  },
  radioCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  radioImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  radioText: {
    fontSize: 14,
    marginLeft: 10,
  },
  estadoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginRight: 20,
  },
  estadoLabel: {
    fontSize: 14,
    marginRight: 6,
    fontWeight: '500',
  },
  estadoBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 15,
  },
  estadoTexto: {
    fontSize: 13,
    fontWeight: '600',
  },
});