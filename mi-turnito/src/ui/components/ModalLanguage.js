import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../theme/ThemeContext.js';

export default function LanguageSelectorModal({ visible, onClose }) {
const { i18n, t } = useTranslation();
const { isDark, toggleTheme, theme } = useTheme();  

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
    <View style={[styles.modalContainer, {backgroundColor: theme.modalBackground}]}>
        <Text style={[styles.title, {color: theme.textColor}]}>{t('selectLanguage')}</Text>

        <View style={styles.buttonsContainer}>
        <TouchableOpacity
            style={[styles.button, {backgroundColor: theme.modalButton}]}
            onPress={() => changeLanguage('en')}
        >
            <Text style={[styles.buttonText, {color: theme.backgroundImput}]}>{t('english')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
            style={[styles.button, {backgroundColor: theme.modalButton}]}
            onPress={() => changeLanguage('es')}
        >
            <Text style={[styles.buttonText, {color: theme.backgroundImput}]}>{t('spanish')}</Text>
        </TouchableOpacity>
        </View>

        <TouchableOpacity
            style={[styles.buttonCancel, { backgroundColor: theme.modalButtonClose }]}
            onPress={onClose}
            >
            <Text style={[styles.buttonCancelText, { color: theme.modalButtonCloseText }]}>
            {t('cancel')}
            </Text>
        </TouchableOpacity>

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
buttonCancel: {
marginTop: 4,
marginHorizontal: 8,
paddingVertical: 12,
borderRadius: 6,
backgroundColor: '#ccc',
alignSelf: 'stretch',
alignItems: 'center',
},
buttonCancelText: {
fontSize: 16,
fontWeight: '600',
textAlign: 'center',
},
});
