import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import DatosPersonalesTab from './TabDatosPersonales';
import ContactoTab from './TabContacto';
import ObraSocialTab from './TabObraSocial';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../theme/ThemeContext';
import { useTranslation } from 'react-i18next';

const Tab = createMaterialTopTabNavigator();

export default function MisDatosScreen({ navigation }) {
const { theme } = useTheme();
const { t } = useTranslation();

return (
<View style={{ flex: 1, backgroundColor: theme.backgroundSecondary }}>
    <View style={[styles.header, { borderBottomColor: theme.borderBottomColor }]}>
    <TouchableOpacity style={styles.iconWrapper} onPress={() => navigation.goBack()}>
        <MaterialIcons name="arrow-back-ios-new" size={28} style={{ color: theme.textColor }} />@
    </TouchableOpacity>
    <Text style={[styles.title, { color: theme.textColor }]}>{t('myData')}</Text>
    </View>
    <Tab.Navigator
    screenOptions={{
        tabBarActiveTintColor: theme.colorIconBackground,
        tabBarInactiveTintColor: theme.colorIconBackground,
        tabBarStyle: { backgroundColor: theme.backgroundButtomHome },
        tabBarLabelStyle: { fontWeight: 'bold' },
        tabBarIndicatorStyle: { backgroundColor: theme.colorIconBackground },
    }}
    >
    <Tab.Screen name={t('personalData')} component={DatosPersonalesTab} />
    <Tab.Screen name={t('contact')} component={ContactoTab} />
    <Tab.Screen name={t('healthInsurance')} component={ObraSocialTab} />
    </Tab.Navigator>
</View>
);
}

const styles = StyleSheet.create({
header: {
paddingTop: 80,
paddingBottom: 16,
borderBottomWidth: 3,
alignItems: 'center',
justifyContent: 'center',
position: 'relative',
},
iconWrapper: {
position: 'absolute',
left: 20,
top: 80,
},
title: {
fontSize: 26,
fontWeight: 'bold',
},
});
