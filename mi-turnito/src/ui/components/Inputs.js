import React from 'react';
import { TextInput, StyleSheet, View, Text } from 'react-native';
import { useTheme } from '../../theme/ThemeContext.js';

const EmailInput = ({ label, value, onChangeText, placeholder, keyboardType, secureTextEntry }) => {
  const { isDark, toggleTheme, theme } = useTheme();

  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, { color: theme.textColor }]}>{label}</Text>
      <TextInput
        style={[styles.input, { backgroundColor: theme.backgroundSecondary, color: theme.textColor }]}
        placeholder={placeholder}
        Color={theme.placeholderText}
        backgroundColor = {theme.placeholderColor}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

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
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 22,
  },
});

export default EmailInput;
