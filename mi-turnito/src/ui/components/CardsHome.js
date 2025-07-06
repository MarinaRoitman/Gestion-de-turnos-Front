import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/ThemeContext.js';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


export const CardsHome = ({ especialidad, fecha, imagen, medico }) => {


    const { isDark, toggleTheme, theme } = useTheme();


return (
    <View style={[styles.card, {backgroundColor: theme.colorBackgroundCard}]}>
        <View style={styles.cardHeader}>
            <Text style={[styles.specialty, {color: theme.textColor}]}>{medico}</Text>
            <Text style={[styles.date, {color: theme.colorBackgroundCard}, {backgroundColor: theme.textColor}]}>{fecha}</Text>
        </View>
        <View style={styles.cardBody}>
            <Image source={imagen} style={styles.avatar} />
            <View style={[styles.doctorName,{ flexDirection: 'row', alignItems: 'center' }]}>
                <FontAwesome name="map-marker" size={20} style={{ color: theme.textColor }} />
                <Text style={[{color: theme.textColor, marginLeft: 5, paddingLeft: 0}]}>
                    {especialidad}
                </Text>
            </View>
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
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: 5,
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
    width: 200,
    borderRadius: 17,
    paddingLeft: 16,
},
directionLogo: {
    paddingRight: 5,
},
});
