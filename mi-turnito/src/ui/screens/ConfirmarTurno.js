import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { CardsMedicos } from '../components/CardsMedicos';
import { useTheme } from '../../../src/theme/ThemeContext';
import ButtonSecondary from '../components/ButtonSecondary';

export default function ConfirmarTurno({ route, navigation }) {
  const { medico, horario } = route.params;
  const { isDark, toggleTheme, theme } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.backgroundSecondary }}>
        <View style={[styles.containerGlobal, { backgroundColor: theme.backgroundSecondary }]}>
            <View style={[styles.contenedorHeader, { borderBottomColor: theme.borderBottomColor }]}>
                <TouchableOpacity style={[styles.iconWrapper]} onPress={() => navigation.navigate('Home')}>
                    <MaterialIcons name="arrow-back-ios-new" size={28} style={[{textShadowColor: theme.textColor}, {textShadowRadius: 1}, {color: theme.textColor}]} />
                </TouchableOpacity>
                <Text style={[styles.tituloInicial, { width: "60%"}, {color: theme.textColor}]}>Confirmar Turno</Text>
            </View>
        </View>

      <View style={styles.card}>
        <CardsMedicos
          nombre={medico.nombre}
          especialidad={medico.especialidad}
          direccion={medico.direccion}
          imagen={medico.imagen}
      />

      </View>

      <View style={[styles.infoContainer, {color: theme.colorIconBackground}]}>
        <MaterialIcons name="calendar-today" size={25} style={{color: theme.colorIconBackground}} />
        <View style={styles.infoText}>
          <Text style={[styles.infoLabel,{color: theme.textColor}]}>Día y horario</Text>
          <Text style={[styles.infoLabelSecundario,{color: theme.textColor}]}>{horario}</Text>
        </View>
      </View>

      <View style={[styles.infoContainer, {color: theme.colorIconBackground}]}>
        <MaterialIcons name="location-on" size={25} style={{color: theme.colorIconBackground}} />
        <View style={styles.infoText}>
          <Text style={[styles.infoLabel,{color: theme.textColor}]}>Lugar</Text>
          <Text style={[styles.infoLabelSecundario,{color: theme.textColor}]}>{medico.direccion}</Text>
        </View>
      </View>

      <View style={styles.botonContainer}>
        <ButtonSecondary
          title="Confirmar"
          onPress={() => navigation.popToTop()}
        />
      </View>
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
  card: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 15,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 30,
    gap: 12,
    marginLeft: 20,
  },
  infoText: {
    flexDirection: 'column',
  },
  infoLabel: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  infoLabelSecundario: {
        fontSize: 15,
  },
  infoValue: {
    color: 'white',
    fontSize: 15,
    marginTop: 4,
  },
  botonContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  botonContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 190,
  }
});
