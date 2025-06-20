import React, { useState } from 'react';
import { View, StyleSheet, Text,Button, Image, ScrollView,TouchableOpacity, SafeAreaView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../theme/ThemeContext.js';
import { Switch } from 'react-native';
import { useTranslation } from 'react-i18next';
import LanguageSelectorModal from '../components/ModalLanguage.js';
import ConfirmationModal from '../components/ConfirmacionModal.js';

export default function Perfil({ navigation }) {

const { isDark, toggleTheme, theme } = useTheme();
const { t } = useTranslation();
const [modalVisible, setModalVisible] = useState(false);
const [showLogoutModal, setShowLogoutModal] = useState(false);
const [showDeleteModal, setShowDeleteModal] = useState(false);


    const goToLogin = () => {
    navigation.navigate("Login")
};

    const goToAyuda = () => {
    navigation.navigate("Ayuda")
};

    const goToMisDatos = () => {
    navigation.navigate("MisDatos")
};

return (
<SafeAreaView style={[{ backgroundColor: theme.backgroundSecondary }]}>
    <View style={[styles.containerGlobal, { backgroundColor: theme.backgroundSecondary }]}>
        <View style={[styles.contenedorHeader, { borderBottomColor: theme.borderBottomColor }]}>
            <TouchableOpacity style={[styles.iconWrapper]} onPress={() => navigation.navigate('Home')}>
                <MaterialIcons name="arrow-back-ios-new" size={28} style={[{textShadowColor: theme.textColor}, {textShadowRadius: 1}, {color: theme.textColor}]} />
            </TouchableOpacity>
            <Text style={[styles.tituloInicial, { width: "22%" }, { color: theme.textColor }]}>
                {t('profile')}
            </Text>
        </View>
    </View>

    <ScrollView style={{ backgroundColor: theme.backgroundSecondary }} contentContainerStyle={{ paddingBottom: 200 }}>
        <View style={[styles.option, {backgroundColor: theme.backgroundPerfil}]}>
            <Text style={[styles.optionSub, {color: theme.textColor}]}>{t('name')}</Text>
            <Text style={[styles.optionTitle, {color: theme.textColor}]}>Macarena</Text>
        </View>
        <View style={[styles.option, {backgroundColor: theme.backgroundPerfil}]}>
            <Text style={[styles.optionSub, {color: theme.textColor}]}>{t('lastName')}</Text>
            <Text style={[styles.optionTitle, {color: theme.textColor}]}>López</Text>
        </View>

        <View style={{ height: 20, backgroundColor: theme.backgroundSecondary }} />

        <TouchableOpacity onPress={goToMisDatos}>
                <View style={[styles.option, {backgroundColor: theme.backgroundPerfil}]}>
                    <Text style={[styles.optionTitle, {color: theme.textColor}]}>{t('myData')}</Text>
                    <MaterialIcons name="chevron-right" size={24} style={[styles.arrow,{color: theme.textColor}]} />
                </View>
        </TouchableOpacity>

        <View style={[styles.option, { backgroundColor: theme.backgroundPerfil, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
        <Text style={[styles.optionTitle, { color: theme.textColor }]}>{t('darkMode')}</Text>
        
        <Switch
            value={isDark}
            onValueChange={toggleTheme}
            thumbColor={isDark ? '#4F3680' : '#f4f3f4'}
            trackColor={{ false: '#ccc', true: '#b19cd9' }}
        />
        </View>

        <TouchableOpacity onPress={goToAyuda}>
                <View style={[styles.option, {backgroundColor: theme.backgroundPerfil}]}>
                    <Text style={[styles.optionTitle, {color: theme.textColor}]}>{t('help')}</Text>
                    <MaterialIcons name="chevron-right" size={24} style={[styles.arrow,{color: theme.textColor}]} />
                </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setModalVisible(true)}>
                <View style={[styles.option, {backgroundColor: theme.backgroundPerfil}]}>
                    <Text style={[styles.optionTitle, {color: theme.textColor}]}>{t('language')}</Text>
                    <MaterialIcons name="chevron-right" size={24} style={[styles.arrow,{color: theme.textColor}]} />
                </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setShowDeleteModal(true)}>
        <View style={[styles.option, { backgroundColor: theme.backgroundPerfil }]}>
            <Text style={[styles.optionTitle, { color: theme.textColor }]}>{t('deleteAccount')}</Text>
            <MaterialIcons name="chevron-right" size={24} style={[styles.arrow, { color: theme.textColor }]} />
        </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setShowLogoutModal(true)}>
        <View style={[styles.option, { backgroundColor: theme.backgroundPerfil }]}>
            <Text style={[styles.optionTitle, { color: theme.textColor }]}>{t('logout')}</Text>
            <MaterialIcons name="chevron-right" size={24} style={[styles.arrow, { color: theme.textColor }]} />
        </View>
        </TouchableOpacity>

        </ScrollView>
        <LanguageSelectorModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        />
        <ConfirmationModal
        visible={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={goToLogin}
        title="¿Querés cerrar sesión?"
        message="¿Estás seguro que deseas salir?"
        confirmText="Cerrar sesión"
        icon="exit-to-app"
        actionType="logout"
        />

        <ConfirmationModal
        visible={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => {
            {goToLogin}
            console.log('Cuenta eliminada');
            setShowDeleteModal(false);
        }}
        title="¿Eliminar cuenta? 😥"
        message="Si eliminás tu cuenta, se borrarán todos tus datos, turnos y estudios guardados. Esta acción no se puede deshacer."
        confirmText="Eliminar cuenta"
        />
</SafeAreaView>

);
}

const styles = StyleSheet.create({
containerGlobal: {
    alignItems: 'center',
},
//TurnitoHeader
contenedorHeader: {
    paddingTop: 80,
    paddingBottom: 16,
    borderBottomWidth: 5,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    
},
tituloInicial: {
    fontSize: 30,
    color: '#4F3680',
    fontWeight: 'bold',
},
subTexto: {
    fontSize: 16,
    fontWeight: 500,
},
iconWrapper: {
    position: 'absolute',
    left: 30,
    top: 87,

},
//BodyTurnos
option: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1.3,
    borderBottomColor: '#DEDEDE',
    position: 'relative',
},
optionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 5,
},
optionSub: {
    fontSize: 15,
},
arrow: {
    position: 'absolute',
    right: 15,
    top: 20,
},
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    text: { fontSize: 18, marginBottom: 10 }
});





