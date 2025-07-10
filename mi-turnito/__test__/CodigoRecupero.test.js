import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import CodigoRecupero from '../src/ui/screens/CodigoRecupero';

jest.mock('react-i18next', () => ({
useTranslation: () => ({
t: (key) => key,
}),
}));

jest.mock('../src/theme/ThemeContext', () => ({
useTheme: () => ({
isDark: false,
toggleTheme: jest.fn(),
theme: {
    background: '#fff',
    textColor: '#000',
    borderBottomColor: '#ccc',
},
}),
}));

jest.mock('react-native-vector-icons/MaterialIcons', () => {
const { View } = require('react-native');
return () => <View testID="icon" />;
});


describe('CodigoRecupero screen', () => {
const mockNavigate = jest.fn();
const mockGoBack = jest.fn();
const route = {
params: {
    codigo: '1234',
    correo: 'test@example.com',
},
};
const navigation = {
navigate: mockNavigate,
goBack: mockGoBack,
};
beforeEach(() => {
jest.clearAllMocks();
});

it('Renderiza los textos y campos correctamente', () => {
const { getByText, getByPlaceholderText } = render(
    <CodigoRecupero navigation={navigation} route={route} />
);
expect(getByText('IngresaCodigo')).toBeTruthy();
expect(getByPlaceholderText('****')).toBeTruthy();
});

it('Muestra modal si el código no fue ingresado', async () => {
const { getByText } = render(<CodigoRecupero navigation={navigation} route={route} />);
fireEvent.press(getByText('send'));
await waitFor(() => {
    expect(getByText('codeEmpty')).toBeTruthy();
});
});

it('Muestra modal si el código es incorrecto', async () => {
const { getByText, getByPlaceholderText } = render(
    <CodigoRecupero navigation={navigation} route={route} />
);
fireEvent.changeText(getByPlaceholderText('****'), '0000');
fireEvent.press(getByText('send'));
await waitFor(() => {
    expect(getByText('errorCode')).toBeTruthy();
});
});

it('Navega a ContrasenaRecupero si el código es correcto', async () => {
const { getByText, getByPlaceholderText } = render(
    <CodigoRecupero navigation={navigation} route={route} />
);
fireEvent.changeText(getByPlaceholderText('****'), '1234');
fireEvent.press(getByText('send'));
await waitFor(() => {
    expect(mockNavigate).toHaveBeenCalledWith('ContrasenaRecupero', { correo: 'test@example.com' });
});
});

it('Vuelve atrás al presionar el ícono (Back)', () => {
const { getByTestId } = render(<CodigoRecupero navigation={navigation} route={route} />);
fireEvent.press(getByTestId('icon').parent);
expect(mockGoBack).toHaveBeenCalled();
});
});
