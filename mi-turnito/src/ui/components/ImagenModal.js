import React from 'react';
import { Modal, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../theme/ThemeContext.js';
import { useTranslation } from 'react-i18next';

export default function ImageModal({ visible, onClose, title, imageSource }) {

    const { theme } = useTheme();
    const { t } = useTranslation();

return (
<Modal visible={visible} animationType="slide" transparent={true}>
    <View style={styles.overlay}>
    <View style={[styles.modalContainer, {backgroundColor: theme.modalBackground}]}>
        <Text style={[styles.title, {color: theme.textColor}]}>{title}</Text>
        <Image source={imageSource} style={styles.image} resizeMode="contain" />
        <TouchableOpacity style={[styles.button, {backgroundColor: theme.modalButton}]} onPress={onClose}>
        <Text style={[styles.buttonText, {color: theme.placeholderColor}]}>{t('close')}</Text>
        </TouchableOpacity>
    </View>
    </View>
</Modal>
);
}

const styles = StyleSheet.create({
overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
},
modalContainer: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
},
title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
    alignSelf: 'center', 
},
image: {
    width: '100%',
    height: 250,
    marginBottom: 20,
},
button: {
    paddingVertical: 14,
    borderRadius: 8,
    width: '100%',
    alignContent: 'center',
    justifyContent:'center',
    alignItems: 'center', 
},
buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center', 
},
});
