import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { View } from 'react-native';
import { CardNotificacion } from '../src/ui/components/CardNotificacion';

// Mocks
jest.mock('react-i18next', () => ({
    useTranslation: () => ({
    t: (key) => key,
    }),
}));

jest.mock('../src/theme/ThemeContext', () => ({
    useTheme: () => ({
    theme: {
        colorBackgroundCard: '#fff',
        textColor: '#000',
    },
    isDark: false,
    }),
}));

jest.mock('@expo/vector-icons', () => {
    const { View } = require('react-native');
    return {
    MaterialIcons: () => <View testID="icon" />,
    };
});

jest.mock('react-native-vector-icons/MaterialIcons', () => {
    const { View } = require('react-native');
    return () => <View testID="icon" />;
});

describe('CardNotificacion', () => {
    const mockProps = {
        titulo: 'Turno confirmado',
        nombre: 'Dra. Silvia García',
        onDelete: jest.fn(),
    };

    it('Muestra correctamente el título y el nombre', () => {
        const { getByText } = render(<CardNotificacion {...mockProps} />);
        expect(getByText('Turno confirmado')).toBeTruthy();
        expect(getByText('Dra. Silvia García')).toBeTruthy();
    });


    it('Renderiza el ícono', () => {
        const { getByTestId } = render(<CardNotificacion {...mockProps} />);
        expect(getByTestId('icon')).toBeTruthy();
    });


    it('Llama a onDelete al tocar el ícono', () => {
        const onDeleteMock = jest.fn();
        const { getByTestId } = render(
        <CardNotificacion {...mockProps} onDelete={onDeleteMock} />
    );
    fireEvent.press(getByTestId('icon').parent);
    expect(onDeleteMock).toHaveBeenCalledTimes(1);
    expect(onDeleteMock).toHaveBeenCalledWith('Dra. Silvia García');
    });
});
