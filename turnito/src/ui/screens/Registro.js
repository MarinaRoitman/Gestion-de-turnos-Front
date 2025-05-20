import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, ScrollView } from 'react-native';
import CustomButton from '../../../../turnito/src/ui/components/Button.js';
import RectangleLogin1 from '../../../../turnito/src/ui/components/rectangleLogin.js';
import InputField from '../../../../turnito/src/ui/components/Inputs.js';
import PasswordInput from '../../../../turnito/src/ui/components/PasswordForm.js';

export default function LoginScreen( ) {
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [nombre, setNombre] = useState('');
const [apellido, setApellido] = useState('');
const [telefono, setTelefono] = useState('');
const [dni, setDni] = useState('');
const [fechaNacimiento, setFechaNacimiento] = useState('');


return (
<View style={styles.containerGlobal}>
    <ScrollView contentContainerStyle={styles.containerExtras}> 
    <View style={styles.containerFoto}>
        <Image source={require('../../../src/assets/images/TurnitoLogin.png')} style={styles.imagen} />
    </View>

    <View style={styles.containerContenido}>
        <RectangleLogin1/>
        <Text style={styles.texto}>Registrarse</Text>
    </View>

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

        <PasswordInput
        label="Contraseña"
        isPassword={true}
        onChangeText={setPassword}
        value={password}
        placeholder={"Ingresá tu contraseña"}
        secureTextEntry={true}
        />

        <View style={{ marginTop: 10 }}>
        <CustomButton title="Registrarme" />
        </View>

    </ScrollView>
</View>
);
};

const styles = StyleSheet.create({
containerGlobal: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#8258D1',
},
containerFoto: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    paddingRight: 10
},
imagenGoogle: {
    width: 67,
    height: 67,
    resizeMode: 'contain',
},
imagen: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    alignSelf: 'flex-end',
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
});
