import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import CustomButton from '../../ui/components/Button.js';
import RectangleLogin1 from '../components/RectangleLogin.js';
import InputField from '../../ui/components/Inputs.js';
import { useTheme } from '../../theme/ThemeContext.js';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { createPaciente } from '../../api/paciente.js';

export default function Registro( {navigation} ) {
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [nombre, setNombre] = useState('');
const [apellido, setApellido] = useState('');
const [telefono, setTelefono] = useState('');
const [dni, setDni] = useState('');
const [fechaNacimiento, setFechaNacimiento] = useState('');

const { isDark, toggleTheme, theme } = useTheme();

const handleRegistro = async () => {
  try {
    const paciente = await createPaciente(nombre, apellido, username, password, dni, fechaNacimiento, telefono);
    navigation.navigate("Login");
  } catch (error) {
    console.error("Error al registrar paciente:", error);
  }
};

const goToLogin = () => {
    navigation.navigate("Login"); 
};

return (
<View style={[styles.containerGlobal, { backgroundColor: theme.background }]}>
    <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
    <View style={[styles.contenedorHeader, { borderBottomColor: theme.borderBottomColor }]}>
        <TouchableOpacity style={styles.iconWrapper} onPress={goToLogin}>
            <MaterialIcons
                name="arrow-back-ios-new"
                size={28}
                color={theme.textColor}
                style={{ textShadowColor: theme.textColor, textShadowRadius: 1 }}
            />
        </TouchableOpacity>

    <View style={{ flex: 1, alignItems: 'flex-end' }}>
        <Image
            source={
                isDark
                    ? require('../../assets/images/turnitoDarkmode.png')
                    : require('../../assets/images/TurnitoLogin.png')
            }
            style={{ width: 160, height: 160, resizeMode: 'contain' }}
        />
    </View>
    </View>

    <View style={styles.containerContenido}>
        <RectangleLogin1 style={styles.rectangleRegistro}/>
        <Text style={styles.texto}>Registrarse</Text>
    </View>

    <View style={styles.containerForm}>
        <InputField
            label="Nombre"
            isPassword={false}
            onChangeText={setNombre}
            value={nombre}
            placeholder={"Ingresá tu nombre"}
        />

        <InputField
            label="Apellido"
            isPassword={false}
            onChangeText={setApellido}
            placeholder={"Ingresá tu apellido"}
            value={apellido}
        />

        <InputField
            label="Dni"
            isPassword={false}
            onChangeText={setDni}
            placeholder={"Ingresá tu DNI"}
            keyboardType="numeric"
            value={dni}
        />

        <InputField
            label="Teléfono"
            isPassword={false}
            onChangeText={setTelefono}
            value={telefono}
            placeholder={"Ingresá tu teléfono"}
            keyboardType="numeric"
        />

        <InputField
            label="Fecha de Nacimiento"
            isPassword={false}
            onChangeText={setFechaNacimiento}
            value={fechaNacimiento}
            placeholder={"Ingresá tu fecha de nacimiento"}
            keyboardType="date"
        />

        <InputField
            label="Correo"
            isPassword={false}
            onChangeText={setUsername}
            value={username}
            placeholder={"Ingresá tu correo"}
            keyboardType="mail-address"
        />

        <InputField
            label="Contraseña"
            isPassword={true}
            onChangeText={setPassword}
            value={password}
            placeholder={"Ingresá tu contraseña"}
            secureTextEntry={true}
        />
    </View>
    <View style={{ margin: 25, marginBottom:16 }}>
        <CustomButton title="Registrarme" onPress={handleRegistro} />
    </View>
    </ScrollView>
</View>
);
};

const styles = StyleSheet.create({
containerGlobal: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#8258D1',
},
containerFoto: {
    width: '100%',
    paddingRight: 10,
    marginTop: -50,
},
imagen: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
},
containerContenido: {
    alignItems: 'center',
    width: '90%',
    paddingTop: 38,
},
texto: {
    fontSize: 40,
    color: '#4F3680',
    fontWeight: 'bold',
    marginBottom: 8,
},
containerForm: {
    gap: 20,
    justifyContent: 'center',
    alignItems: 'center',
},
containerExtras: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 29,
},
rectangleRegistro: {
    flex: 1,
    top: 0,
    height: 1500,
    borderTopLeftRadius: 58,
    borderTopRightRadius: 58,
},
contenedorHeader: {
    width: '100%',
    flexDirection: 'row',      
    alignItems: 'center',      
    justifyContent: 'space-between', 
    paddingTop: 25,
    paddingHorizontal: 30,     
    position: 'relative', 
    },
iconWrapper: {
    padding: 8,
},
imagenHeader: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 20,
},
});