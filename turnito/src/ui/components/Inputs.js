import React from 'react';
import { TextInput, StyleSheet, View, Text } from 'react-native';

const EmailInput = ({ label, value, onChangeText, placeholder, keyboardType, secureTextEntry }) => (
<View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>
<TextInput
    style={styles.input}
    placeholder= {placeholder}
    keyboardType= {keyboardType}
    secureTextEntry={secureTextEntry}
    autoCapitalize="none"
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

export default EmailInput;
