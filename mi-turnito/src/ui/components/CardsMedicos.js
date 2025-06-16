import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../theme/ThemeContext.js';
import medicaSilvia from '../../assets/images/medicaSilvia.jpg';
import { useTranslation } from 'react-i18next';

export const CardsMedicos = ({ nombre, especialidad, matricula, onPress}) => {

        const { isDark, toggleTheme, theme } = useTheme();

return (
    <TouchableOpacity style={[styles.card, {backgroundColor: theme.colorBackgroundCard}]} onPress={onPress}>
        <Image source={medicaSilvia} style={styles.avatar} />
        <View style={styles.info}>
            <Text style={[styles.nombre, {color: theme.textColor}]}>{nombre}</Text>
            <Text style={[styles.especialidad, {color: theme.textColor}]}>{especialidad}</Text>
            <Text style={[styles.matricula, {color: theme.textColor}]}>{matricula}</Text>
        </View>
    </TouchableOpacity>
);
};

const styles = StyleSheet.create({
card: {
    borderRadius: 12,
    padding: 13,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    width: '97%',
},
avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
},
info: {
    flex: 1,
    marginLeft: 10,
},
nombre: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4F3680',
},
especialidad: {
    fontSize: 14,
    color: '#4F3680',
},
matricula: {
    fontSize: 13,
    color: '#6D6D6D',
},
});
