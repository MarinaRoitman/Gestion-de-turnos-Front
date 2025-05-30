import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, ScrollView } from 'react-native';
import CustomButton from '../../../../turnitoapp/src/ui/components/Button.js';
import RectangleLogin1 from '../../../../turnitoapp/src/ui/components/rectangleLogin.js';
import InputField from '../../../../turnitoapp/src/ui/components/Inputs.js';

export default function Recuperar() {

const [correo, setCorreo] = useState('');

return (
<ScrollView contentContainerStyle={styles.containerGlobal} keyboardShouldPersistTaps="handled">
    <View style={styles.containerFoto}>
        <Image source={require('../../../src/assets/images/TurnitoLogin.png')} style={styles.imagen} />
    </View>

    <View style={styles.containerContenido}>
    <RectangleLogin1 />
    <Text style={styles.texto}>Recuperar constraseña</Text>
    <Text style={styles.subTexto}>
        Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
    </Text>

    <View style={styles.containerForm}>
        <InputField
        label="Correo electrónico"
        onChangeText={setCorreo}
        value={correo}
        placeholder={"pepe@example.com"}
        />

        <View style={{ marginTop: 290 }}>
            <CustomButton title="Enviar" />
        </View>

    </View>
    </View>
</ScrollView>
);
};

const styles = StyleSheet.create({
containerGlobal: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#8258D1',
},
containerFoto: {
    alignItems: 'center',
},
imagen: {
    width: 180,
    height: 180,
    resizeMode: 'contain',
},
containerContenido: {
    alignItems: 'center',
    width: '90%',
    paddingTop: 38,
},
texto: {
    fontSize: 42,
    color: '#4F3680',
    fontWeight: 'bold',
    paddingBottom: 20,
    textAlign: 'center'
},
subTexto: {
    fontSize: 16,
    color: '#655873',
    fontWeight: 500,
    marginBottom: 20,
    textAlign: 'center'
},
containerForm: {
    gap: 20,
    justifyContent: 'center',
    alignItems: 'center',
},
});
