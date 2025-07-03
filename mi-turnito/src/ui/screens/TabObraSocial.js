import { View, ScrollView, StyleSheet } from 'react-native';
import EmailInput from '../components/InputTabs';
import { useTheme } from '../../theme/ThemeContext';
import { useTranslation } from 'react-i18next';
import ButtonSecondary from '../components/ButtonSecondary';
import React, { useState } from 'react';
import { Modal, Text, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Picker } from '@react-native-picker/picker';


export default function ObraSocialTab() {
const { theme } = useTheme();
const { t } = useTranslation();

const [modalVisible, setModalVisible] = useState(false);
const [selectedObraSocial, setSelectedObraSocial] = useState('swiss');
const [selectedPlan, setSelectedPlan] = useState('210');

const obrasSociales = [
    { label: 'Swiss Medical', value: 'swiss' },
    { label: 'OSDE', value: 'osde' },
    { label: 'Galeno', value: 'galeno' },
];

const planesPorObra = {
    swiss: ['210', '310', '410'],
    osde: ['210', '310'],
    galeno: ['220', '330', '440'],
};

const handleConfirm = () => {
    setModalVisible(true);
};

return (
<ScrollView style={{ backgroundColor: theme.backgroundSecondary }} contentContainerStyle={{ paddingBottom: 100 }}>
    <View style={styles.contenedorTabs}>

        <View style={{ marginHorizontal: 37, marginBottom: 20 }}>
        <Text style={[{ color: theme.textColor, marginBottom: 6 }, styles.filtroLabel]}>{t('healthInsurance')}</Text>
            <View
            style={{
                borderRadius: 16,
                overflow: 'hidden',
                backgroundColor: theme.backgroundImput,
            }}
            >
                <Picker
                    selectedValue={selectedObraSocial}
                    onValueChange={(itemValue) => {
                    setSelectedObraSocial(itemValue);
                    setSelectedPlan(planesPorObra[itemValue][0]);
                    }}
                    dropdownIconColor={theme.textColor}
                    style={[{ color: theme.modalButtonText },{backgroundColor: theme.backgroundImput}]}
                >
                    {obrasSociales.map((obra) => (
                    <Picker.Item key={obra.value} label={obra.label} value={obra.value} />
                    ))}
                </Picker>
            </View>
        </View>

        <View style={{ marginHorizontal: 37, marginBottom: 20 }}>
        <Text style={[{ color: theme.textColor, marginBottom: 6 }, styles.filtroLabel]}>Plan</Text>
        <View style={{
                borderRadius: 16,
                overflow: 'hidden',
                backgroundColor: theme.backgroundImput,
            }}>
            <Picker
            selectedValue={selectedPlan}
            onValueChange={(itemValue) => setSelectedPlan(itemValue)}
            dropdownIconColor={theme.textColor}
            style={[{ color: theme.modalButtonText },{backgroundColor: theme.backgroundImput}]}
            >
            {planesPorObra[selectedObraSocial].map((plan) => (
                <Picker.Item key={plan} label={plan} value={plan} />
            ))}
            </Picker>
        </View>
        </View>
        <EmailInput label={t('insuranceId')} value="80004123201904" />
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