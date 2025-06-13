import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { useTranslation } from 'react-i18next';

export default function LanguageSelectorModal({ visible, onClose }) {
const { i18n, t } = useTranslation();

const changeLanguage = (lng) => {
i18n.changeLanguage(lng);
onClose(); 
};

return (
<Modal
    visible={visible}
    transparent={true}
    animationType="fade"
    onRequestClose={onClose}
>
    <View style={styles.overlay}>
    <View style={styles.modalContainer}>
        <Text style={styles.title}>{t('selectLanguage')}</Text>

        <View style={styles.buttonsContainer}>
        <TouchableOpacity
            style={styles.button}
            onPress={() => changeLanguage('en')}
        >
            <Text style={styles.buttonText}>{t('english')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
            style={styles.button}
            onPress={() => changeLanguage('es')}
        >
            <Text style={styles.buttonText}>{t('spanish')}</Text>
        </TouchableOpacity>
        </View>

        <Button title={t('cancel') || 'Cancelar'} onPress={onClose} />
    </View>
    </View>
</Modal>
);
}

const styles = StyleSheet.create({
overlay: {
flex:1,
backgroundColor: 'rgba(0,0,0,0.4)',
justifyContent: 'center',
alignItems: 'center',
},
modalContainer: {
backgroundColor: '#fff',
padding: 25,
borderRadius: 8,
width: 280,
alignItems: 'center',
},
title: {
fontSize: 20,
fontWeight: 'bold',
marginBottom: 20,
},
buttonsContainer: {
flexDirection: 'row',
marginBottom: 15,
justifyContent: 'space-between',
width: '100%',
},
button: {
flex:1,
marginHorizontal: 5,
backgroundColor: '#4F3680',
paddingVertical: 12,
borderRadius: 6,
},
buttonText: {
color: '#fff',
fontWeight: '600',
textAlign: 'center',
},
});
