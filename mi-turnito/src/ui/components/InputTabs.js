import React from 'react';
import { TextInput, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../theme/ThemeContext.js';

const EditableInput = ({
label,
value,
onChangeText,
placeholder,
keyboardType,
secureTextEntry,
editable = true,
onPressIcon,
iconName = 'edit',
inputStyle = {}, // nuevo
}) => {
const { theme } = useTheme();

return (
<View style={styles.inputContainer}>
    <Text style={[styles.label, { color: theme.textColor }]}>{label}</Text>

    <View style={styles.inputWrapper}>
    <TextInput
        style={[
        styles.input,
        {
            backgroundColor: theme.backgroundImput,
            color: theme.textColorLogin,
        },
        inputStyle, // se aplica el override acá
        ]}
        placeholder={placeholder}
        placeholderTextColor={theme.placeholderText}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
        value={value}
        editable={editable}
        onChangeText={onChangeText}
    />

    {editable && (
        <TouchableOpacity style={styles.iconContainer} onPress={onPressIcon}>
        <MaterialIcons
            name={iconName}
            size={20}
            color={theme.textColorLogin}
        />
        </TouchableOpacity>
    )}
    </View>
</View>
);
};


const styles = StyleSheet.create({
inputContainer: {
marginVertical: 10,
marginHorizontal: 39,
width: 332,
},
label: {
fontWeight: 'bold',
marginBottom: 5,
fontSize: 22,
},
inputWrapper: {
position: 'relative',
justifyContent: 'center',
},
input: {
borderWidth: 1,
borderColor: '#ccc',
borderRadius: 16,
paddingVertical: 15,
paddingLeft: 15,
paddingRight: 40, // espacio para el ícono
fontSize: 16,
},
iconContainer: {
position: 'absolute',
right: 15,
top: '50%',
transform: [{ translateY: -10 }],
zIndex: 1,
},
});

export default EditableInput;
