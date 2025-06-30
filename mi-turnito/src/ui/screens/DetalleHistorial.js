import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useRoute } from '@react-navigation/native';
import { useTheme } from '../../theme/ThemeContext';
import { useTranslation } from 'react-i18next';
import ImagenModal from '../../ui/components/ImagenModal';
import { getProfesionalPorId } from '../../api/profesional';

export default function DetalleScreen({ navigation }) {
  const route = useRoute();
  const { turno } = route.params;
  const { theme } = useTheme();
  const { t } = useTranslation();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalImage, setModalImage] = useState(null);

  const [profesional, setProfesional] = useState(null);

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
        <Text style={{ color: theme.textColor }}>Cargando datos del profesional...</Text>
      </View>
    );
  }

  const especialidadesStr = profesional.especialidades?.map((e) => e.nombre).join(', ') || 'No disponible';

  return (
    <>
      <ScrollView style={{ flex: 1, backgroundColor: theme.backgroundTertiary }}>
        <View style={[styles.header, { borderBottomColor: theme.borderBottomColor }]}>
          <TouchableOpacity style={styles.iconWrapper} onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back-ios-new" size={28} style={{ color: theme.textColor }} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.textColor }]}>{t('Detail')}</Text>
        </View>

        <View style={[styles.card, { backgroundColor: theme.colorBackgroundCard }]}>
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
            <Text style={[styles.specialty, { color: theme.textColor }]}>Matrícula: {profesional.matricula}</Text>
            <Text style={[styles.specialty, { color: theme.textColor }]}>Especialidad: {especialidadesStr}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textColor }]}>{t('Date')}</Text>
          <View style={[styles.noteBox, { backgroundColor: theme.colorBackgroundCard }]}>
            <Text style={[styles.noteText, { color: theme.textColor }]}>
              {turno.fecha} - {turno.hora?.slice(0, 5)}
            </Text>
            <Text style={[styles.noteDate, { color: theme.textColor }]}>
              Estado: {turno.estado?.nombre || 'Desconocido'}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.textColor }]}>{t('note')}</Text>
            <View style={[styles.noteBox, { backgroundColor: theme.colorBackgroundCard }]}>
                <Text style={[styles.noteText, { color: theme.textColor }]}>
                {turno.notas || t('No notes yet')}
                </Text>
            </View>
        </View>

        {turno.imagenes?.length > 0 && (
        <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.textColor }]}>{t('imageMedical')}</Text>
            {turno.imagenes.map((img, index) => (
            <TouchableOpacity
                key={img.id || index}
                style={[styles.radioCard, { backgroundColor: theme.colorBackgroundCard }]}
                onPress={() => {
                setModalTitle(img.nombre || `${t('image')} ${index + 1}`);
                setModalImage({ uri: `data:image/jpeg;base64,${img.imagen}` });
                setModalVisible(true);
                }}
            >
                <Image source={{ uri: `data:image/jpeg;base64,${img.imagen}` }} style={styles.radioImage} />
                <Text style={[styles.radioText, { color: theme.textColor }]}>{img.nombre || t('seeImg')}</Text>
            </TouchableOpacity>
            ))}
        </View>
        )}
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
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20,
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
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
    fontSize: 14,
    marginTop: 2,
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
    borderRadius: 10,
  },
  noteText: {
    fontSize: 14,
    marginBottom: 5,
  },
  noteDate: {
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
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
});
