jest.mock('react-i18next', () => ({
useTranslation: () => ({
t: (key) => (key === 'close' ? 'Cerrar' : key),
}),
}));

jest.mock('../src/theme/ThemeContext', () => ({
useTheme: () => ({
theme: {
    modalBackground: '#fff',
    modalButton: '#4F3680',
    textColor: '#000',
},
}),
}));

jest.mock('react-native-vector-icons/MaterialIcons', () => {
const { View } = require('react-native');
return () => <View testID="icon" />;
});

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ErrorModal from '../src/ui/components/ErrorModal';

describe('ErrorModal', () => {
it('Muestra el mensaje y el botón cuando visible es true', () => {
const { getByText } = render(
<ErrorModal visible={true} message="Error de prueba" onClose={() => {}} />
);
expect(getByText('Error de prueba')).toBeTruthy();
expect(getByText('Cerrar')).toBeTruthy();
});


it('No muestra el mensaje cuando visible es false', () => {
const { queryByText } = render(
<ErrorModal visible={false} message="No debería verse" onClose={() => {}} />
);
expect(queryByText('No debería verse')).toBeNull();
});


it('Llama a onClose cuando se presiona el botón Cerrar', () => {
const onCloseMock = jest.fn();
const { getByText } = render(
<ErrorModal visible={true} message="Mensaje" onClose={onCloseMock} />
);
fireEvent.press(getByText('Cerrar'));
expect(onCloseMock).toHaveBeenCalledTimes(1);
});
});
