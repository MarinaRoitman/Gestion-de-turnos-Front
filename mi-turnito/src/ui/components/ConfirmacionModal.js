    import React from 'react';
    import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
    import { useTheme } from '../../theme/ThemeContext';
    import { useTranslation } from 'react-i18next';
    import { useNavigation } from '@react-navigation/native';
    import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
    


    export default function ConfirmationModal({ visible, onClose, onConfirm, title, message, confirmText, icon, actionType }) {
    const { theme } = useTheme();
    const { t } = useTranslation();
    const navigation = useNavigation();

    const goToLogin = () => {
    navigation.navigate("Login")
};
    const defaultIcon = icon || (actionType === 'delete' ? 'close' : actionType === 'logout' ? 'logout' : null);

    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.overlay}>
                <View style={[styles.modalContainer, { backgroundColor: theme.backgroundButtomHome }]}>
                    <View style={styles.titleRow}>
                        {defaultIcon && (
                            <View style={[styles.iconContainer, { backgroundColor: theme.textColor }]}>
                                <MaterialIcons name={defaultIcon} size={24} color={theme.backgroundTertiary} />
                            </View>
                        )}
                        <Text style={[styles.title, { color: theme.textColor }]}>{title}</Text>
                    </View>
                    <Text style={[styles.message, { color: theme.textColor }]}>{message}</Text>
                    <View style={[styles.buttonContainer, { justifyContent: 'center' }]}>
                        <TouchableOpacity onPress={onClose} style={[styles.button1, { backgroundColor: theme.backgroundImput }]}>
                            <Text style={styles.cancelText}>{t('cancel')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                if (actionType === 'delete') {
                                    onConfirm();
                                } else {
                                    goToLogin();
                                }
                            }}
                            style={[styles.button, { backgroundColor: theme.modalButton }]}
                        >
                            <Text style={[styles.confirmText, { color: theme.backgroundImput }]}>{confirmText}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

    const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '85%',
        borderRadius: 15,
        padding: 20,
        elevation: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    message: {
        fontSize: 16,
        marginBottom: 20,
        alignSelf:'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 10,
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        alignItems:'center',
        borderRadius: 8,
        width:140,
    },
        button1: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        alignItems:'center',
        borderRadius: 8,
        width:140,
        borderColor:'#ccc',
        borderWidth: 2,
    },
    cancelText: {
        color: '#333',
    },
    confirmText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    iconContainer: {
    marginBottom: 12,
    padding: 10,
    borderRadius: 40,
    width:45,
    },
    titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
},
    });
