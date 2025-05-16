import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, ScrollView } from 'react-native';
import CustomButton from '../../../../GestionTurnos/src/ui/components/Button.js';
import RectangleLogin1 from '../../../../GestionTurnos/src/ui/components/rectangleLogin.js';
import InputField from '../../../../GestionTurnos/src/ui/components/Inputs.js';
import PasswordInput from '../../../../GestionTurnos/src/ui/components/PasswordForm.js';

const LoginScreen = () => {
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');

return (
<ScrollView contentContainerStyle={styles.containerGlobal} keyboardShouldPersistTaps="handled">
    <View style={styles.containerFoto}>
    <Image source={require('../../../src/assets/images/TurnitoLogin.png')} style={styles.imagen} />
    </View>

    <View style={styles.containerContenido}>
    <RectangleLogin1 />
    <Text style={styles.texto}>Bienvenido</Text>
    <Text style={styles.subTexto}>Inicia sesión para continuar</Text>

    <View style={styles.containerForm}>
        <InputField
        label="Correo"
        isPassword={false}
        onChangeText={setUsername}
        value={username}
        />

        <PasswordInput
        label="Contraseña"
        isPassword={true}
        onChangeText={setPassword}
        value={password}
        />

        <View style={{ marginTop: 10 }}>
        <CustomButton title="Iniciar sesión" onPress={() => {}} />

        <View style={styles.containerExtras}>
            <Text style={styles.subTexto1}>O acceder con</Text>
            <View style={styles.containerFoto}>
                    <Image source={require('../../../src/assets/images/GoogleIcon.png')} style={styles.imagenGoogle} />
                    </View>
            <Text style={[styles.subTexto1, { paddingTop: 10 }]}>¿Olvidaste tu contraseña?</Text>
            <Text style={styles.subTexto1}>
            ¿No tenés una cuenta? <Text style={{fontWeight: '900'}}>Registrate</Text>
            </Text>
        </View>
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
imagenGoogle: {
    width: 67,
    height: 67,
    resizeMode: 'contain',
},
imagen: {
    width: 230,
    height: 230,
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
subTexto: {
    fontSize: 16,
    color: '#655873',
    fontWeight: 500,
    marginBottom: 20,
},
subTexto1: {
    fontSize: 16,
    color: '#4F3680',
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: 500,
},
containerForm: {
    gap: 20,
    justifyContent: 'center',
    alignItems: 'center',
},
containerExtras: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
},
});

export default LoginScreen;
