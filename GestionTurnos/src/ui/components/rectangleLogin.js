import React from 'react';
import { View, StyleSheet } from 'react-native';

const rectangleLogin = () => {
    return <View style={styles.rectangle} />;
};

const styles = StyleSheet.create({
rectangle: {
    width: 412,
    height: 747,
    top: -25,
    position: 'absolute',
    backgroundColor: '#F0F0F0',
    borderTopLeftRadius: 58,
    borderTopRightRadius: 58,
},
});

export default rectangleLogin;
