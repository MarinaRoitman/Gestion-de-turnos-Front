import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from '../../theme/ThemeContext';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import ImagenModal from '../../ui/components/ImagenModal';


export default function DetalleScreen( {navigation} ) {
const route = useRoute();
const { doctor } = route.params;
const { theme } = useTheme();
const { t } = useTranslation();

const [modalVisible, setModalVisible] = useState(false);
const [modalTitle, setModalTitle] = useState('');
const [modalImage, setModalImage] = useState(null);


return (
<>
<ScrollView style={{ flex: 1, backgroundColor: theme.backgroundTertiary }}>
    {/* Header */}
    <View style={[styles.header, { borderBottomColor: theme.borderBottomColor }]}>
    <TouchableOpacity style={styles.iconWrapper} onPress={() => navigation.goBack()}>
        <MaterialIcons name="arrow-back-ios-new" size={28} style={{ color: theme.textColor }} />
    </TouchableOpacity>
    <Text style={[styles.headerTitle, { color: theme.textColor }]}>{t('Detail') || 'Detalle'}</Text>
    </View>

    {/* Doctor Info */}
    <View style={[styles.card, { backgroundColor: theme.colorBackgroundCard }]}>
    <Image source={doctor.image} style={styles.avatar} />
    <View>
        <Text style={[styles.name, { color: theme.textColor }]}>{doctor.name}</Text>
        <Text style={[styles.specialty, { color: theme.textColor }]}>{doctor.specialty}</Text>
    </View>
    </View>

    {/* Notas */}
    <View style={styles.section}>
    <Text style={[styles.sectionTitle, { color: theme.textColor }]}>{t('note')}</Text>
    <View style={[styles.noteBox, { backgroundColor: theme.colorBackgroundCard }]}>
        <Text style={[styles.noteText, { color: theme.textColor }]}>
        {t('noteMedical')}
        </Text>
        <Text style={[styles.noteDate, {color: theme.textColor}]}>04/04/2025 15:30</Text>
    </View>
    </View>

    {/* Estudios anteriores */}
    <View style={styles.section}>
    <Text style={[styles.sectionTitle, { color: theme.textColor }]}>{t('last')}</Text>
    <TouchableOpacity style={[styles.studyCard, { backgroundColor: theme.colorBackgroundCard }]}>
        <Text style={[styles.studyText, { color: theme.textColor }]}>Análisis de sangre - Feb 2025</Text>
    </TouchableOpacity>
    <TouchableOpacity style={[styles.studyCard, { backgroundColor: theme.colorBackgroundCard }]}>
        <Text style={[styles.studyText, { color: theme.textColor }]}>Perfil tiroideo - Ene 2025</Text>
    </TouchableOpacity>
    </View>

    {/* Radiologías */}
    <View style={styles.section}>
    <Text style={[styles.sectionTitle, { color: theme.textColor }]}>{t('imageMedical')}</Text>
    <View style={[styles.radioCard, { backgroundColor: theme.colorBackgroundCard }]}>
        <Image
        source={require('../../assets/images/radiografia.png')}
        style={styles.radioImage}
        resizeMode="cover"
        />
        <View style={{ flex: 1, marginLeft: 10 }}>
        <Text style={[styles.radioText, { color: theme.textColor }]}>Ecografía de Tiroides - Nov 2024</Text>
        </View>
        <TouchableOpacity
        style={[styles.viewButton, {backgroundColor: theme.modalButton}]}
        onPress={() => {
            setModalTitle(t('image'));
            setModalImage(require('../../assets/images/radiografia.png'));
            setModalVisible(true);
        }}
        >
        <Text style={[styles.viewButtonText, {color: theme.backgroundImput}]}>{t('seeImg')}</Text>
        </TouchableOpacity>
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
fontSize: 16,
color: '#655873',
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
studyCard: {
padding: 12,
borderRadius: 10,
marginBottom: 10,
},
studyText: {
fontSize: 14,
},
radioCard: {
flexDirection: 'row',
alignItems: 'center',
padding: 12,
borderRadius: 10,
},
radioImage: {
width: 50,
height: 50,
borderRadius: 5,
},
radioText: {
fontSize: 14,
},
viewButton: {
backgroundColor: '#4F3680',
paddingVertical: 6,
paddingHorizontal: 5,
borderRadius: 6,
paddingLeft:'6',
},
viewButtonText: {
color: 'white',
fontSize: 12,
fontWeight: 'bold',
},
});
