import { View, StyleSheet, Text, Image, ScrollView,TouchableOpacity, SafeAreaView } from 'react-native';
import { RectangleLogin } from '../components/RectangleLogin.js';
import { ButtonHome }  from '../../ui/components/ButtonHome.js';
import { CardsHome } from '../../ui/components/CardsHome.js';
import { useTheme } from '../../theme/ThemeContext.js';
import { useTranslation } from 'react-i18next';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext.js';
import { getPacienteById } from '../../api/paciente.js';


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


const { userId } = useContext(AuthContext);
const [paciente, setPaciente] = useState(null);
const [loading, setLoading] = useState(true);


const formatearFechaHora = (fecha, hora) => {
  const [año, mes, dia] = fecha.split("-");
  const horaCorta = hora.slice(0, 5);
  return `${dia}/${mes}/${año} ${horaCorta}`;
};


const hoy = new Date();
const fechaHoyString = hoy.toISOString().split('T')[0]; // YYYY-MM-DD


const turnosFiltrados = paciente?.turnos?.filter(turno =>
  turno.fecha >= fechaHoyString && turno.estado?.id === 3
) || [];


useEffect(() => {
  async function fetchPaciente() {
    try {
      const data = await getPacienteById(userId);
      setPaciente(data);
    } catch (error) {
      console.error("Error al cargar datos del paciente:", error);
    } finally {
      setLoading(false);
    }
  }


  if (userId) {
    fetchPaciente();
  }
}, [userId]);


const { isDark, toggleTheme, theme } = useTheme();
const { t } = useTranslation();


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
                    <Text style={[styles.tituloInicial, { textAlign: 'left', width: '100%' }, { color: theme.textColor }]}>
                        {t('hi')} {paciente?.nombre || '...'}!
                    </Text>
                    <Text style={[styles.subTexto, { textAlign: 'left', width: '100%' }, {color: theme.textColor}]}>
                        {t('helpTitle')}
                    </Text>
                </View>
            </View>


            <View style={styles.buttonContainer}>
                <ButtonHome title={t('turno')} onPress={goToTurnos} iconName="calendar"/>
                <ButtonHome title={t('history')} onPress={goToHistorial} iconName="archive"/>
                <ButtonHome title={t('myCredential')} onPress={goToCredencial} iconName="vcard" />
                <ButtonHome title={t('directory')} onPress={goToCartilla} iconName="users"/>
            </View>
       
        <Text style={[styles.proximoTurnoTitle, { alignItems: 'flex-start', width: '100%' }, {color: theme.textColor}]}>
            {t('next')}
        </Text>


        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cardScroll}>
            {turnosFiltrados.length > 0 ? (
                turnosFiltrados.map(turno => (
                    <CardsHome
                    key={turno.id}
                    especialidad={turno.profesional.matricula || "Sin matrícula"}
                    fecha={formatearFechaHora(turno.fecha, turno.hora)}
                    imagen={
                        turno.profesional.foto
                        ? { uri: `data:image/jpeg;base64,${turno.profesional.foto}` }
                        : require('../../assets/images/medicaSilvia.jpg')
                    }
                    medico={`${turno.profesional.nombre} ${turno.profesional.apellido}`}
                    />
                ))
                ) : (
                <Text style={{ color: theme.textColor, paddingLeft: 25 }}>{t("No scheduled appointments") || "No hay turnos agendados"}</Text>
            )}
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
