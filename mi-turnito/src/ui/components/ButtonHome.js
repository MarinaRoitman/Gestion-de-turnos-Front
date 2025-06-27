import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useTheme } from '../../theme/ThemeContext.js';

export const ButtonHome = ({ title, onPress, iconName}) => {

    const { isDark, toggleTheme, theme } = useTheme();

return (
    <TouchableOpacity style={[styles.button, {backgroundColor: theme.backgroundButtomHome}]} onPress={onPress}>
        {iconName && <FontAwesome name={iconName} size={28} style={[styles.icon, {color: theme.colorIcon, backgroundColor: theme.colorIconBackground}]} />}
        <Text style={[styles.buttonText, {color: theme.textColor}]}>{title}</Text>
    </TouchableOpacity>
);
};

const styles = StyleSheet.create({
button: {
    width: '40%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#AFAFAF',
    borderWidth: 1,
    margin: 10,
},
buttonText: {
    fontSize: 19,
    fontWeight: 'bold',
    paddingTop: 10,
},
icon: {
    borderWidth: 0.6,
    padding: 12,
    borderRadius: 17,
    fontSize: 33,
},
});
