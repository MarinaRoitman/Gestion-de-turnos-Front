import { View, ScrollView, StyleSheet } from 'react-native';
import EmailInput from '../components/InputTabs';
import { useTheme } from '../../theme/ThemeContext';
import { useTranslation } from 'react-i18next';
import ButtonSecondary from '../components/ButtonSecondary';
import React, { useState } from 'react';
import { Modal, Text, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function DatosPersonalesTab() {
const { theme } = useTheme();
const { t } = useTranslation();
const [modalVisible, setModalVisible] = useState(false);

const handleConfirm = () => {
setModalVisible(true);
// agregar lógica para guardar los datos
};

return (
<ScrollView style={{ backgroundColor: theme.backgroundSecondary }} contentContainerStyle={{ paddingBottom: 100 }}>
<View style={styles.contenedorTabs}> 
    <EmailInput label={t('name')} value="Macarena" />
    <EmailInput label={t('lastName')} value="López" />
    <EmailInput label={t('birthDate')} value="20/12/2003" />
    <EmailInput label={t('dni')}value="45489641" keyboardType="numeric" />
    <EmailInput label={t('phone')} value="+5491157297403" keyboardType="phone-pad" />
</View>

    <View style={styles.botonContainer}>
    <ButtonSecondary
        title={t('save')}
        onPress={handleConfirm}
    />
    </View>

<Modal
animationType="fade"
transparent={true}
visible={modalVisible}
onRequestClose={() => setModalVisible(false)}
>
<View style={styles.modalOverlay}>
        <View style={[styles.modalContainer, { backgroundColor: theme.modalBackground }]}>
        <View style={styles.modalContent}>
            <MaterialIcons name="check-circle" size={43} color="#4CAF50" style={styles.iconCheck} />
            <View style={styles.textContainer}>
            <Text style={[styles.modalTitle, { color: theme.textColor }]}>
                {t('successTitle')}
            </Text>
            <Text style={[styles.modalSubtitle, { color: theme.textColor }]}>
                {t('success')}
            </Text>
            </View>
        </View>
        <TouchableOpacity style={[styles.modalButton, {backgroundColor: theme.modalButton}]} onPress={() => setModalVisible(false)}>
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