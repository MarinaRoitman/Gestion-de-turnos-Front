import { View, StyleSheet, Text, Image, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../theme/ThemeContext.js';
import { useTranslation } from 'react-i18next';
import { useEffect, useState, useContext } from 'react';
import { CardNotificacion } from '../components/CardNotificacion.js';
import { AuthContext } from '../../context/AuthContext.js';
import { getNotificacionesVisibles, eliminarNotificacion } from '../../api/notificacion.js';

export default function Notificaciones({ navigation }) {
  const { theme, isDark } = useTheme();
  const { t } = useTranslation();
  const { userId } = useContext(AuthContext);

  const [notificaciones, setNotificaciones] = useState([]);

  useEffect(() => {
    const fetchNotificaciones = async () => {
      try {
        const data = await getNotificacionesVisibles(userId);
        setNotificaciones(data);
      } catch (error) {
        console.error("Error al traer notificaciones:", error);
      }
    };
    fetchNotificaciones();
  }, []);

  const handleDelete = async (idNotificacion) => {
    try {
      await eliminarNotificacion(idNotificacion);
      setNotificaciones(prev => prev.filter(n => n.id !== idNotificacion));
    } catch (error) {
      console.error("Error al eliminar notificación:", error);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: theme.backgroundTertiary, flex: 1 }}>
      <View style={styles.header}>
        <View style={[styles.contenedorHeader, { borderBottomColor: theme.borderBottomColor }]}>
          <TouchableOpacity style={styles.iconWrapper} onPress={() => navigation.navigate('Home')}>
            <MaterialIcons
              name="arrow-back-ios-new"
              size={28}
              style={{ color: theme.textColor, textShadowRadius: 1 }}
            />
          </TouchableOpacity>
          <View style={styles.centrar}>
            <Text style={[styles.tituloInicial, { color: theme.textColor }]}>
              {t("notification")}
            </Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        {notificaciones.length === 0 ? (
          <View style={styles.containerFoto}>
            <Image
              source={isDark
                ? require('../../assets/images/NotificacionDMode.png')
                : require('../../assets/images/NotificacionLMode.png')}
              style={styles.imagen}
            />
            <Text style={[styles.subTexto, { color: theme.textColor }]}>
              {t("emptyNotis")}
            </Text>
          </View>
        ) : (
          <View style={styles.contenedorCard}>
            {notificaciones.map((noti) => (
              <CardNotificacion
                key={noti.id}
                // titulo={t("notiTitle")} // ver despues cómo hacer con cancelar turno
                nombre={noti.texto}
                onDelete={() => handleDelete(noti.id)}
              />
            ))}
          </View>
        )}
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
    fontSize: 18,
    color: '#655873',
    fontWeight: 500,
    alignSelf:'center',
},
iconWrapper: {
    position: 'absolute',
    left: 30,
    top: 87,
    borderColor: '#4F3680', 
},
centrar:{
    alignItems: 'center',
    justifyContent: 'center',
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

contenedorCard:{
margin: 10,
},
card: {
flexDirection: 'row',
alignItems: 'center',
margin: 20,
padding: 15,
borderRadius: 12,
shadowColor: '#000',
shadowOpacity: 0.1,
shadowRadius: 4,
elevation: 2,
},
avatar: {
width: 60,
height: 60,
borderRadius: 30,
marginRight: 15,
},
name: {
fontSize: 20,
fontWeight: 'bold',
},
specialty: {
fontSize: 16,
color: '#655873',
},
body: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
},

imagen:{
    marginTop:'200',
}
});
