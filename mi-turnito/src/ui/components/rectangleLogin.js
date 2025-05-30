import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

export const RectangleLogin = ( {style} ) => {

    const { theme } = useTheme();

    return <View style={[styles.rectangle, style, { backgroundColor: theme.backgroundTertiary }]} />
};

const styles = StyleSheet.create({
rectangle: {
    width: 412,
    height: 704,
    top: -25,
    position: 'absolute',
    backgroundColor: '#F0F0F0',
    borderTopLeftRadius: 58,
    borderTopRightRadius: 58,
},
});

export default RectangleLogin;
