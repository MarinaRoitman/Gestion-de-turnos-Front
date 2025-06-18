import { View, StyleSheet, Text, Image, ScrollView,TouchableOpacity, SafeAreaView } from 'react-native';
import { RectangleLogin } from '../../ui/components/rectangleLogin.js';
import { ButtonHome }  from '../../ui/components/ButtonHome.js';
import { CardsHome } from '../../ui/components/CardsHome.js';
import { useTheme } from '../../theme/ThemeContext.js';

export default function Home( {navigation} ) {
const goToTurnos = () => {
    navigation.navigate("Turnos");
};

const goToCartilla = () => {
    navigation.navigate("Cartilla");
};

const goToHistorial = () => {
    navigation.navigate("Historial");
};

const goToCredencial = () => {
    navigation.navigate("Credencial");
};


const { isDark, toggleTheme, theme } = useTheme();

return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background, flex: 1 }]}>
        <ScrollView contentContainerStyle={styles.containerGlobal}>
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
                <RectangleLogin style={[{ borderTopLeftRadius: 0, borderTopRightRadius: 0, top: -45, borderBottomLeftRadius: 35, borderBottomRightRadius: 35}]} />
                <View style={{ alignItems: 'flex-start', width: '100%' }}>
                    <Text style={[styles.tituloInicial, { textAlign: 'left', width: '100%' },{color: theme.textColor}]}>¡Hola Macarena!</Text>
                    <Text style={[styles.subTexto, { textAlign: 'left', width: '100%' }, {color: theme.textColor}]}>
                        ¿Cómo podemos ayudarte hoy? 💜
                    </Text>
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <ButtonHome title="Turnos" onPress={goToTurnos} iconName="calendar"/>
                <ButtonHome title="Historial" onPress={goToHistorial} iconName="archive"/>
                <ButtonHome title="Mi credencial" onPress={goToCredencial} iconName="vcard" />
                <ButtonHome title="Cartilla" onPress={goToCartilla} iconName="users"/>
            </View>
        
        <Text style={[styles.proximoTurnoTitle, { alignItems: 'flex-start', width: '100%' }, {color: theme.textColor}]}>Próximos Turnos</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cardScroll}>
                <CardsHome
                    especialidad="Clínica médica"
                    fecha="21/05/25 09:00AM"
                    imagen={require('../../../src/assets/images/medicaSilvia.jpg')}
                    medico="Julia Martínez"
                />
                <CardsHome
                    especialidad="Cardiología"
                    fecha="22/05/25 11:30AM"
                    imagen={require('../../../src/assets/images/medicaSilvia.jpg')}
                    medico="Ricardo Gómez"
                />
        </ScrollView>
    </ScrollView>
    </SafeAreaView>
);
}

const styles = StyleSheet.create({
containerGlobal: {
    flexGrow: 1,
    height: 850,
    alignItems: 'center',
},
//TurnitoFoto
containerFoto: {
    alignItems: 'center',
},
imagen: {
    width: 190,
    height: 190,
    resizeMode: 'contain',
},
//TurnitoContenido
containerContenido: {
    alignItems: 'center',
    width: '88%',
},
tituloInicial: {
    fontSize: 38,
    color: '#4F3680',
    fontWeight: 'bold',
    paddingBottom: 9,
    marginTop: -11,
},
subTexto: {
    fontSize: 16,
    color: '#655873',
    fontWeight: 500,
},
proximoTurnoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#4F3680',
    paddingLeft: 25,
},
//Botones
title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4F3680',
},
subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: '#555',
},
buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 1,
    marginTop: 30,
},
//Cards
cardScroll: {
    flexGrow: 0,
    marginLeft: 25,
},
});
