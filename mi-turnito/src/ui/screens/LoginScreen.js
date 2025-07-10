import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, ScrollView } from 'react-native';
import  CustomButton from '../../ui/components/Button.js';
import { RectangleLogin } from '../components/RectangleLogin.js';
import  InputField  from '../../ui/components/Inputs.js';
import { useTheme } from '../../theme/ThemeContext.js';
import ErrorModal from '../../ui/components/ErrorModal';
import { loginPaciente } from '../../api/paciente.js';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';
import SHA256 from 'crypto-js/sha256';

export default function LoginScreen( {navigation} ) {
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [modalType, setModalType] = useState('error');
const { login } = useAuth();
const { t } = useTranslation();

const goToRegistro = () => {
    navigation.navigate("Registro");
};

const goToRecupero = () => {
    navigation.navigate("Recupero");
};

const handleLogin = async () => {
    if (!username || !password) {
        setModalType('error');
        setErrorText(t('camposEmptys'));
        setModalVisible(true);
        return;
    }

    try {
        const hashedPassword = SHA256(password).toString();
        const pacienteId = await loginPaciente(username, hashedPassword);
        login(pacienteId);
        navigation.replace('Tabs', { screen: 'Home' });
    } catch (error) {
        setModalType('error');
        setErrorText(t('mailOrPassError'));
        setModalVisible(true);
    }
};

const { isDark, toggleTheme, theme } = useTheme();
const [modalVisible, setModalVisible] = useState(false);
const [errorText, setErrorText] = useState('');

return (
<ScrollView contentContainerStyle={[styles.containerGlobal, { backgroundColor: theme.background }]} keyboardShouldPersistTaps="handled">
    <ErrorModal
    visible={modalVisible}
    message={errorText}
    onClose={() => setModalVisible(false)}
    type={modalType}
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
    <RectangleLogin style={{ height: 718 }} />
    <Text style={[styles.texto, {color: theme.textColor} ]}>{t('welcome')}</Text>
    <Text style={[styles.subTexto, {color: theme.textColor}]}>{t('loginToContinue')}</Text>

    <View style={styles.containerForm}>
        <InputField
        label={t('email')}
        isPassword={false}
        onChangeText={setUsername}
        value={username}
        placeholder={t('enterEmail')}
        keyboardType="mail-address"
        />

        <InputField
        label={t('password')}
        isPassword={true}
        onChangeText={setPassword}
        value={password}
        placeholder={t('enterPassword')}
        secureTextEntry={true}
        />

        <View style={{ marginTop: 16 }}>
        <CustomButton onPress={handleLogin} title={t('login')} />

        <View style={styles.containerExtras}>
            {/*
            <Text style={[styles.subTexto1, {color: theme.textColor} ]}>{t('orLoginWith')}</Text>
            
            <View style={styles.containerFoto}>
                    <Image source={require('../../../src/assets/images/GoogleIcon.png')} style={styles.imagenGoogle} />
                    </View>
            */}
            <Text  onPress={goToRecupero} style={[styles.subTexto1, { paddingTop: 10 }, {color: theme.textColor} ]}>{t('forgotPassword')}</Text>
            <Text style={[styles.subTexto1, {color: theme.textColor}]}>
            {t('noAccount')} <Text onPress={goToRegistro} style={[{fontWeight: '900'}, {color: theme.textColor}]}>{t('register')}</Text>
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
    fontSize: 46,
    color: '#4F3680',
    fontWeight: 'bold',
    marginBottom: 8,
},
subTexto: {
    fontSize: 19,
    color: '#655873',
    fontWeight: 500,
    marginBottom: 20,
},
subTexto1: {
    fontSize: 18,
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
    marginTop: 40,
    gap: 10,
},
});