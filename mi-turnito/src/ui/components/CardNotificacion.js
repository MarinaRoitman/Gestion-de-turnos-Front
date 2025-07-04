import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../theme/ThemeContext.js';
import medicos from '../../assets/images/medicaSilvia.jpg';
import { useTranslation } from 'react-i18next';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


export const CardNotificacion = ({ titulo, nombre , onDelete}) => {
const { theme, isDark } = useTheme();
const { t } = useTranslation();

return (
    <View style={[styles.card, {backgroundColor: theme.colorBackgroundCard}]}>
        <Image source={medicos} style={styles.avatar} />
        <View style={styles.info}>
            <Text style={[styles.nombre,{color: theme.textColor}]}>
                { titulo }
            </Text>
            <Text style={[styles.subinfo, {color: theme.textColor}]}>
                {t('textNoti', { nombre })}
            </Text>
        </View>
        <TouchableOpacity
            style={styles.deleteIcon}
            onPress={() => onDelete(nombre)}
            activeOpacity={0.7}
        >
            <MaterialIcons name="delete" size={24} color="#BA000D" />
        </TouchableOpacity>
    </View>
);
};

const styles = StyleSheet.create({
card: {
    borderRadius: 12,
    padding: 13,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    width: '97%',
},
avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight:10,
    marginLeft:'16',
},
info: {
    marginLeft: 10,
    width:290,
},
subinfo:{
width:'270',
size:'15',

},
nombre: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#4F3680',
    width:300,
    paddingBottom:7,
},
deleteIcon: {
    paddingRight: 17,
    paddingTop:17,
    borderRadius: 20,
},
});
