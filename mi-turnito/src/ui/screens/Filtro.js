import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    Image,
} from 'react-native';
import Button from '../components/Button.js';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from '../../theme/ThemeContext.js';
import { useTranslation } from 'react-i18next';
import { getEspecialidades } from '../../api/especialidad.js';
import ErrorModal from '../components/ErrorModal'; // Ajustá la ruta si está en otro lado

export default function Seleccionar({ navigation }) {
    const [especialidadSeleccionada, setEspecialidadSeleccionada] = useState(null);
    const [especialidades, setEspecialidades] = useState([]);
    const [showError, setShowError] = useState(false);
    const [errorVisible, setErrorVisible] = useState(false);

    const { theme, isDark } = useTheme();
    const { t } = useTranslation();

    useEffect(() => {
        const fetchEspecialidades = async () => {
            try {
                const data = await getEspecialidades();
                setEspecialidades(data);
            } catch (error) {
                console.error("Error al traer especialidades:", error);
            }
        };
        fetchEspecialidades();
    }, []);

    return (
        <SafeAreaView style={{ backgroundColor: theme.backgroundTertiary, flex: 1 }}>   
            <View style={styles.containerGlobal}>
                <View style={[styles.contenedorHeader, { borderBottomColor: theme.borderBottomColor }]}>
                    <TouchableOpacity style={styles.iconWrapper} onPress={() => navigation.goBack()}>
                        <MaterialIcons name="arrow-back-ios-new" size={28} style={{ color: theme.textColor }} />
                    </TouchableOpacity>
                    <Text style={[styles.tituloInicial, { color: theme.textColor, width: "70%", paddingLeft: 100 }]}>
                        {t('filters')}
                    </Text>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.body}>
                <View style={{ width: '100%', marginBottom: 20 }}>
                    <Text style={[styles.filtroLabel, { color: theme.textColor }]}>{t('specialty')}</Text>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={especialidadSeleccionada}
                            onValueChange={(value) => setEspecialidadSeleccionada(value)}
                            style={{ color: theme.modalButtonText, backgroundColor: theme.backgroundImput }}
                            dropdownIconColor={theme.modalButtonText}
                        >
                            <Picker.Item label={t("selectSpeciality")} value={null} />
                            {especialidades.map((esp) => (
                                <Picker.Item key={esp.id} label={esp.nombre} value={esp.nombre} />
                            ))}
                        </Picker>
                        {showError && (
                            <Text style={{ color: 'red', marginTop: 5 }}>
                                {t('pleaseSelectSpecialty') || 'Por favor seleccioná una especialidad'}
                            </Text>
                        )}
                    </View> 
                </View>
            </ScrollView>    

            <View style={styles.containerFoto}>
                <Image
                    source={isDark
                        ? require('../../assets/images/FiltroDMode.png')
                        : require('../../assets/images/FiltroLMode.png')}
                    style={styles.imagen}
                />
            </View>

            <View style={styles.botonFijo}>
                <Button
                    title={t('applyFilters')}
                    onPress={() => {
                    if (!especialidadSeleccionada) {
                        setErrorVisible(true);
                        return;
                    }

                    const especialidadObj = especialidades.find(e => e.nombre === especialidadSeleccionada);
                    navigation.navigate('Resultados', {
                        especialidad: especialidadSeleccionada,
                        especialidadId: especialidadObj?.id
                    });
                    }}
                    />
            </View>
            <ErrorModal
                visible={errorVisible}
                message={t('pleaseSelectSpecialty')}
                onClose={() => setErrorVisible(false)}
                type="error"
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    containerGlobal: {
        alignItems: 'center',
    },
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
        fontWeight: 'bold',
    },
    iconWrapper: {
        position: 'absolute',
        left: 30,
        top: 87,
    },
    body: {
        paddingHorizontal: 16,
        paddingTop: 20,
        paddingBottom: 40,
        alignItems: 'center',
    },
    filtroContainer: {
        width: '100%',
        marginBottom: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    filtroLabel: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 4,
    },
    botonFijo: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 20,
    left: 16,
    right: 16,
    paddingVertical: 10,
},
filtroText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
},
pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 10,
},
containerFoto: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 230, 
    left: 0,
    right: 0,
},
});