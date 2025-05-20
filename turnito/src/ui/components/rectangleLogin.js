import React from 'react';
import { View, StyleSheet } from 'react-native';

const rectangleLogin = ( {style} ) => {
    return <View style={[styles.rectangle, style]} />;
};

const styles = StyleSheet.create({
rectangle: {
    width: 412,
    height: 1200,
    top: -25,
    position: 'absolute',
    backgroundColor: '#F0F0F0',
    borderTopLeftRadius: 58,
    borderTopRightRadius: 58,
},
});

export default rectangleLogin;
