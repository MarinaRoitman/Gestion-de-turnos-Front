import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import  CustomButton from '../../ui/components/Button.js';
import  RectangleLogin1 from '../components/RectangleLogin.js';
import  InputField  from '../../ui/components/Inputs.js';
import { useTheme } from '../../theme/ThemeContext.js';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTranslation } from 'react-i18next';
import ErrorModal from '../../ui/components/ErrorModal';
import { enviarCorreo } from '../../api/recupero.js';


export default function Recuperar( {navigation} ) {


const [correo, setCorreo] = useState('');
const [modalVisible, setModalVisible] = useState(false);
const [modalMessage, setModalMessage] = useState('');

const { isDark, toggleTheme, theme } = useTheme();
const { t } = useTranslation();

const goToCodigoRecupero = async () => {
  if (correo.trim() === "") {
    setModalMessage(t('mailValidation'));
    setModalVisible(true);
    return;
  }

  try {
    const codigo = Math.floor(1000 + Math.random() * 9000);

    // Mandar correo
    await enviarCorreo({
      to: correo,
      subject: t('recoverPasswordSubject'),
      text: t('recoverPasswordText', { codigo }),
    });

    navigation.navigate("CodigoRecupero", { codigo, correo });

  } catch (error) {
    setModalMessage(t('errorSendingMail') || "Hubo un problema al enviar el correo.");
    setModalVisible(true);
    console.error("Error al enviar correo:", error);
  }
};



return (
<View style={[styles.containerGlobal, { backgroundColor: theme.background }]}>
    <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
        <View style={[styles.contenedorHeader, { borderBottomColor: theme.borderBottomColor }]}>
            <TouchableOpacity style={styles.iconWrapper} onPress={() => navigation.goBack()}>
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


        <View style={[styles.containerContenido, { paddingTop: 10 }]}>
            <RectangleLogin1 style={{ height: 800 }}  />
            <Text style={[styles.texto, {color: theme.textColor}]}>{t('recoverPassword')}</Text>
            <Text style={[styles.subTexto,{color: theme.textColor}]}>
                {t('resetInstructions')}
            </Text>


            <View style={[styles.containerForm, { marginTop: 0 }]}>
                <InputField
                    label={t('email')}
                    onChangeText={setCorreo}
                    value={correo}
                    placeholder={"pepe@example.com"}
                />

                <View style={{ paddingTop: 299 }}>
                <CustomButton 
                    title={t('send')}
                    onPress={goToCodigoRecupero} />
                </View>
            </View>
        </View>
        <ErrorModal
        visible={modalVisible}
        message={modalMessage}
        onClose={() => setModalVisible(false)}
        />

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
    position: 'absolute',
    top: -10,
    left: '30%',
    transform: [{ translateX: -100 }],
}
});
