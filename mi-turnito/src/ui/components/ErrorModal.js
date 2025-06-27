import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../theme/ThemeContext';
import { useTranslation } from 'react-i18next';

export default function ErrorModal({ visible, message, onClose }) {
const { theme } = useTheme();
const { t } = useTranslation();

return (
<Modal
    transparent
    animationType="fade"
    visible={visible}
    onRequestClose={onClose}
>
    <View style={[styles.modalContainer]}>
    <View style={[styles.modalContent, { backgroundColor: theme.modalBackground}]}>
        <View style={styles.row}>
        <MaterialIcons name="error-outline" size={30} color="#D32F2F" style={styles.icon} />
        <Text style={[styles.modalText, { color: theme.textColor }]}>
            {message}
        </Text>
        </View>
        <TouchableOpacity onPress={onClose} style={[styles.modalButton, { backgroundColor: theme.modalButton}]}>
        <Text style={styles.modalButtonText}>{t('close')}</Text>
        </TouchableOpacity> 
    </View>
    </View>
</Modal>
);
}

const styles = StyleSheet.create({
modalContainer: {
flex: 1,
justifyContent: 'center',
alignItems: 'center',
backgroundColor: 'rgba(0,0,0,0.5)',
},
modalContent: {
width: '80%',
padding: 20,
borderRadius: 10,
alignItems: 'center',
gap: 15,
},
row: {
flexDirection: 'row',
alignItems: 'center',
gap: 10,
},
icon: {
marginRight: 5,
},
modalText: {
fontSize: 16,
flexShrink: 1,
fontWeight: '500',
},
modalButton: {
backgroundColor: '#4F3680',
paddingVertical: 10,
paddingHorizontal: 20,
alignItems: 'center',
width: '100%',
borderRadius: 5,
},
modalButtonText: {
color: '#fff',
fontWeight: 'bold',
},
});
