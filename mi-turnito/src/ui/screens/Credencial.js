    import React from 'react';
    import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
    import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
    import { useTheme } from '../../theme/ThemeContext';
    import { useTranslation } from 'react-i18next';
    import { LinearGradient } from 'expo-linear-gradient';

    export default function Credencial({ navigation }) {
    const { theme } = useTheme();
    const { t } = useTranslation();

    const patient = {
        name: 'MACARENA LÓPEZ',
        credentialNumber: '20 006308 00 202',
        plan: 'O',
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.backgroundTertiary }}>
        {/* Header */}
        <View style={[styles.contenedorHeader, { borderBottomColor: theme.borderBottomColor }]}>
            <TouchableOpacity style={styles.iconWrapper} onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back-ios-new" size={28} style={[{ color: theme.textColor }]} />
            </TouchableOpacity>
            <Text style={[styles.tituloInicial, { color: theme.textColor }]}>{t('credential')}</Text>
        </View>

        {/* Tarjeta de credencial */}
        <View style={styles.container}>
            <LinearGradient
            colors={['#a47de5', '#4F3680']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.card}
            >
            {/* Líneas horizontales decorativas */}
            <View style={styles.lines}>
                {[...Array(14)].map((_, i) => (
                <View key={i} style={styles.line} />
                ))}
            </View>

            {/* Logo */}
            <Image
                source={require('../../assets/images/LogoTurnito.png')}
                style={styles.logo}
                resizeMode="contain"
            />

            {/* Info */}
            <Text style={styles.name}>{patient.name}</Text>
            <Text style={styles.label}>{t('numCredential')}</Text>
            <Text style={styles.credentialNumber}>{patient.credentialNumber}</Text>
            <Text style={styles.plan}>Plan "{patient.plan}"</Text>
            </LinearGradient>
        </View>
        </SafeAreaView>
    );
    }

    const styles = StyleSheet.create({
    contenedorHeader: {
        paddingTop: 80,
        paddingBottom: 16,
        borderBottomWidth: 5,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    iconWrapper: {
        position: 'absolute',
        left: 30,
        top: 87,
    },
    tituloInicial: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 200,
    },
    card: {
        borderRadius: 20,
        padding: 25,
        width: '85%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
        overflow: 'hidden',
        position: 'relative',
    },
    lines: {
        position: 'absolute',
        top: 20,
        left: 20,
        right: 20,
    },
    line: {
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        marginBottom: 4,
    },
    logo: {
        width: 50,
        height: 50,
        alignSelf: 'center',
        marginBottom: 20,
    },
    name: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 8,
    },
    label: {
        color: '#eee',
        fontSize: 12,
    },
    credentialNumber: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    dateRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    dateText: {
        color: '#fff',
        fontSize: 14,
    },
    plan: {
        color: '#fff',
        fontSize: 14,
        textAlign: 'right',
        fontStyle: 'italic',
    },
    });
