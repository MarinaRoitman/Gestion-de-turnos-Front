import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

export const Button = ({ title, onPress, backgroundColor = '#4F3680', color = '#fff' }) => {
    return (
        <TouchableOpacity
            style={[styles.button, { backgroundColor }]}
            onPress={onPress}
            activeOpacity={0.7}
            testID="button-touchable"
        >
            <Text style={[styles.text, { color }]}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
button: {
    justifyContent: 'center', 
    alignItems: 'center', 
    gap: 8, 
    display: 'inline-flex',
    elevation: 5, 
    borderRadius: 16,
    marginVertical: 10,
    width: 332,
    height: 63,
    padding: 8,
},
text: {
    fontSize: 18,
    fontWeight: '700',
},
});

export default Button;
