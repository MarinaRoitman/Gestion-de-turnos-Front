import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/ThemeContext.js';

export const ButtonSecondary = ({ title, onPress }) => {
    const { theme } = useTheme();

    return (
        <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.buttonColor }]}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <Text style={[styles.text, { color: theme.textColorSecondary }]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
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

export default ButtonSecondary;
