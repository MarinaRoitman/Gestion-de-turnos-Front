import { View, StyleSheet, Text, Image, ScrollView,TouchableOpacity, SafeAreaView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../theme/ThemeContext.js';
import { useTranslation } from 'react-i18next';

export default function Ayuda({ navigation }) {

const { isDark, toggleTheme, theme } = useTheme();
const { t } = useTranslation();

return (
<SafeAreaView style={{ backgroundColor:theme.backgroundTertiary , flex: 1 }}>   

    <View style={styles.header}>
        <View style={[styles.contenedorHeader, { borderBottomColor: theme.borderBottomColor }]}>
            <TouchableOpacity style={styles.iconWrapper} onPress={() => navigation.goBack()}>
                <MaterialIcons 
                    name="arrow-back-ios-new" 
                    size={28}
                    style={[{color: theme.textColor}, 
                    {textShadowRadius: 1}]} />
            </TouchableOpacity>
            <View style={styles.centrar}>
                <Text style={[styles.tituloInicial, { width: "54%"}, {color: theme.textColor}]}>{t('center')}</Text>
            </View>
        </View>
    </View>

    <ScrollView contentContainerStyle={styles.body}>

        <View style={styles.contenedorTexto}>
            <Text style={[styles.titulo1,{paddingBottom:'5'}, {color: theme.textColor}]}>
                {t('question')}
            </Text>
            <Text style={[styles.titulo2,{color: theme.textColorFourth}]}>
                {t('assistance')}
            </Text>
        </View>

        <View style={styles.containerFoto}>
            <Image
                source={
                        require('../../assets/images/imgCenter.png')
                }
                style={styles.imagen}
            />
        </View>

        <View style={[{ paddingTop: 300 }, styles.centrar]}>
        <Text style={[styles.titulo1,{paddingBottom:'5'}, {color: theme.textColor}]}>
            {t('info')}
        </Text>
        <TouchableOpacity style={[styles.callButton,{backgroundColor: theme.placeholderColor},{borderColor: theme.textColor}]}>
            <MaterialIcons name="phone" size={20} style={{color: '#4F3680'}} />
            <Text style={[styles.callText,{color: '#4F3680'}]}>+54 9 11 4972-1415</Text>
        </TouchableOpacity>
        </View>

        </ScrollView>
</SafeAreaView>
);
}

const styles = StyleSheet.create({
containerGlobal: {
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
},
//TurnitoHeader
contenedorHeader: {
    paddingTop: 80,
    paddingBottom: 16,
    borderBottomColor: '#4F3680',
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
    color: '#655873',
    fontWeight: 500,
},
iconWrapper: {
    position: 'absolute',
    left: 30,
    top: 87,
    borderColor: '#4F3680', 
},
//BodyTurnos
option: {
    backgroundColor: '#F0F0F0',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#DEDEDE',
    position: 'relative',

},
optionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#4F3680',
    marginBottom: 5,
},
optionSub: {
    fontSize: 15,
    color: '#6D6D6D',
},
arrow: {
    position: 'absolute',
    right: 15,
    top: 20,
},
containerFoto: {
    alignItems: 'center',
    position: 'absolute',
    top: 150,
    left: 0,
    right: 0,
},
centrar:{
    alignItems: 'center',
    justifyContent: 'center',
},
contenedorTexto:{
    margin: '30',
    paddingTop: '5',
},
titulo1:{
    fontSize: 19,
    fontWeight: 'bold',
},
titulo2:{
    fontSize: 15,
},
callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    padding: 16,
    borderRadius: 13,
    alignSelf: 'center',
},
callText: { 
    marginLeft: 10, 
    color: '#5E35B1', 
    fontSize: 16 },
});
