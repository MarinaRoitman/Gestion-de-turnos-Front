import { View, StyleSheet, Text, Image, ScrollView,TouchableOpacity, SafeAreaView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../theme/ThemeContext.js';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import  ProximoCard from '../components/CardProximoTurno.js';
import { medicos } from '../../../medicos.js'; 
import ConfirmationModal from '../components/ConfirmacionModal.js';

export default function ProximoTurno({ navigation }) {
const { theme, isDark } = useTheme();
const { t } = useTranslation();

const [selectedMedico, setSelectedMedico] = useState(null);
const [showDeleteModal, setShowDeleteModal] = useState(false);

const [turnosProximos, setTurnosProximos] = useState(
    medicos.filter(m => m.nombre === "Silvia Domínguez")
);

const handleDelete = (nombre) => {
    setTurnosProximos(prev => prev.filter(item => item.nombre !== nombre));
};

return (
<SafeAreaView style={{ backgroundColor:theme.backgroundTertiary , flex: 1 }}>   

    <View style={styles.header}>
        <View style={[styles.contenedorHeader, { borderBottomColor: theme.borderBottomColor }]}>
            <TouchableOpacity style={styles.iconWrapper} onPress={() => navigation.goBack()}>
                <MaterialIcons 
                    name="arrow-back-ios-new" 
                    size={28} color="#4F3680" 
                    style={[{color: theme.textColor}, 
                    {textShadowRadius: 1}]} />
            </TouchableOpacity>
            <View style={styles.centrar}>
                <Text style={[styles.tituloInicial, { width: "49%"}, {color: theme.textColor}]}>{t("next")}</Text>
            </View>
        </View>
    </View>

    <ScrollView contentContainerStyle={styles.body}>
        {turnosProximos.length === 0 ? (
            <View style={styles.containerFoto}>
                <Image
                    source={
                        isDark
                            ? require('../../assets/images/NotificacionDMode.png')
                            : require('../../assets/images/NotificacionLMode.png')
                    }
                    style={styles.imagen}
                />
                <Text style={[styles.subTexto,{color: theme.textColor}]}>
                    {t("emptyAppointment")}
                </Text>
            </View>
        ) : (
            <View style={styles.contenedorCard}>
                {turnosProximos.map((medico) => (
                <ProximoCard 
                key={medico.id}
                nombre={medico.nombre}
                foto={medico.foto}
                fechaTurno={medico.fechaTurno}
                onDelete={() => {
                    setSelectedMedico(medico.nombre);
                    setShowDeleteModal(true);
                }}
                />
                ))}
            </View>
        )}
        
    </ScrollView>
        <ConfirmationModal 
        visible={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => {
            handleDelete(selectedMedico);
            setShowDeleteModal(false);
        }}
        title="¿Eliminar turno?"
        message="Esta acción no se puede deshacer"
        confirmText="Eliminar turno"
        icon="delete"
        actionType="delete"
        />
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
    paddingBottom:20,
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
paddingTop: 10 ,
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
    alignSelf:'center'
}
});
