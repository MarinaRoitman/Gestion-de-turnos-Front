import React from 'react';
import { TextInput, StyleSheet, View, Text } from 'react-native';

const PasswordInput = ({ label, value, onChangeText }) => (
<View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>
<TextInput
    style={styles.input}
    placeholder="Contraseña"
    secureTextEntry
    value={value}
    onChangeText={onChangeText}
/>
</View>
);

const styles = StyleSheet.create({
inputContainer: {
    marginVertical: 10,
    marginHorizontal: 39,
    width: 332,
    height: 63,
},
input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 16,
    padding: 15,
    backgroundColor: '#fff',
},
label: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 22,
    color: '#4F3680',
},
});

export default PasswordInput;
