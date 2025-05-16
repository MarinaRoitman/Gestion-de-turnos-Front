import React from 'react';
import { Text, StyleSheet } from 'react-native';

const FormLabel = ({ text }) => {
return <Text style={styles.label}>{text}</Text>;
};

const styles = StyleSheet.create({
label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 6,
    fontWeight: '600',
    display: 'inline-flex',  
},
});

export default FormLabel;
