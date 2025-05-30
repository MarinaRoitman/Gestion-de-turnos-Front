import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/ThemeContext.js';

export const CardsHome = ({ especialidad, fecha, imagen, medico }) => {

    const { isDark, toggleTheme, theme } = useTheme();

return (
    <View style={[styles.card, {backgroundColor: theme.colorBackgroundCard}]}>
        <View style={styles.cardHeader}>
            <Text style={[styles.specialty, {color: theme.textColor}]}>{especialidad}</Text>
            <Text style={[styles.date, {color: theme.textColor}]}>{fecha}</Text>
        </View>
        <View style={styles.cardBody}>
            <Image source={imagen} style={styles.avatar} />
            <Text style={[styles.doctorName, {color: theme.textColor}]}>{medico}</Text>
        </View>
    </View>
);
};

const styles = StyleSheet.create({
card: {
    borderRadius: 16,
    padding: 16,
    marginRight: 12,
    width: 300,
    borderColor: '#AFAFAF',
    borderWidth: 0.6,
},
cardHeader: {
    marginBottom: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
},
specialty: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4F3680',
},
date: {
    fontSize: 12,
    borderColor: '#AFAFAF',
    borderWidth: 0.6,
    padding: 6,
    borderRadius: 17,
    width: 120,
    fontWeight: 'bold',
    textAlign: 'center',
},
cardBody: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
},
avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 5,
},
doctorName: {
    fontSize: 13,
    fontWeight: '500',
    borderColor: '#AFAFAF',
    borderWidth: 0.7,
    padding: 8,
    width: 210,
    borderRadius: 17,
    paddingLeft: 16,
},
});
