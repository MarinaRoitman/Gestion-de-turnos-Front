import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, ScrollView } from 'react-native';
import  CustomButton from '../../ui/components/Button.js';
import  RectangleLogin1 from '../../ui/components/rectangleLogin.js';
import  InputField  from '../../ui/components/Inputs.js';
import { useTheme } from '../../theme/ThemeContext.js';
import ErrorModal from '../../ui/components/ErrorModal';

export default function LoginScreen( {navigation} ) {
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');

const goToRegistro = () => {
    navigation.navigate("Registro"); 
};

const goToRecupero = () => {
    navigation.navigate("Recupero"); 
};

const handleLogin = () => {
if (!username || !password) {
    setErrorText("Por favor, completá todos los campos.");
    setModalVisible(true);
    return;
}

if (username !== MOCK_EMAIL || password !== MOCK_PASSWORD) {
    setErrorText("Correo o contraseña incorrectos.");
    setModalVisible(true);
    return;
}

navigation.replace('Tabs', { screen: 'Home' });
};

const { isDark, toggleTheme, theme } = useTheme();

const MOCK_EMAIL = "macarena@uade.com";
const MOCK_PASSWORD = "password";

const [modalVisible, setModalVisible] = useState(false);
const [errorText, setErrorText] = useState('');

return (
<ScrollView contentContainerStyle={[styles.containerGlobal, { backgroundColor: theme.background }]} keyboardShouldPersistTaps="handled">
    <ErrorModal
    visible={modalVisible}
    message={errorText}
    onClose={() => setModalVisible(false)}
    />
    <View style={styles.containerFoto}>
    <Image
        source={
            isDark
                ? require('../../assets/images/turnitoDarkmode.png')
                : require('../../assets/images/TurnitoLogin.png')
        }
        style={styles.imagen}
    />
    </View>

    <View style={styles.containerContenido}>
    <RectangleLogin1 style={{ height: 718 }} />
    <Text style={[styles.texto, {color: theme.textColor} ]}>Bienvenido</Text>
    <Text style={[styles.subTexto, {color: theme.textColor}]}>Inicia sesión para continuar</Text>

    <View style={styles.containerForm}>
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

        <View style={{ marginTop: 10 }}>
        <CustomButton onPress={handleLogin} title="Iniciar sesión" />

        <View style={styles.containerExtras}>
            <Text style={[styles.subTexto1, {color: theme.textColor} ]}>O acceder con</Text>
            <View style={styles.containerFoto}>
                    <Image source={require('../../../src/assets/images/GoogleIcon.png')} style={styles.imagenGoogle} />
                    </View>
            <Text  onPress={goToRecupero} style={[styles.subTexto1, { paddingTop: 10 }, {color: theme.textColor} ]}>¿Olvidaste tu contraseña?</Text>
            <Text style={[styles.subTexto1, {color: theme.textColor}]}>
            ¿No tenés una cuenta? <Text onPress={goToRegistro} style={[{fontWeight: '900'}, {color: theme.textColor}]}>Registrate</Text>
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
