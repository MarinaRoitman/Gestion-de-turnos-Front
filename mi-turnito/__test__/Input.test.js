import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import EmailInput from '../src/ui/components/Inputs';
import { ThemeProvider } from '../src/theme/ThemeContext';


const Wrapper = ({ children }) => <ThemeProvider>{children}</ThemeProvider>;


describe('EmailInput', () => {
it('muestra el label correctamente', () => {
const { getByText } = render(
    <EmailInput label="Correo" value="" onChangeText={() => {}} />,
    { wrapper: Wrapper }
);
expect(getByText('Correo')).toBeTruthy();
});


it('Muestra el valor correctamente en el input', () => {
const { getByDisplayValue } = render(
    <EmailInput label="Email" value="test@example.com" onChangeText={() => {}} />,
    { wrapper: Wrapper }
);
expect(getByDisplayValue('test@example.com')).toBeTruthy();
});


it('Llama a onChangeText cuando se escribe', () => {
const mockChange = jest.fn();
const { getByPlaceholderText } = render(
    <EmailInput
    label="Email"
    placeholder="Ingrese su email"
    value=""
    onChangeText={mockChange}
    />,
    { wrapper: Wrapper }
);
const input = getByPlaceholderText('Ingrese su email');
fireEvent.changeText(input, 'nuevo@mail.com');
expect(mockChange).toHaveBeenCalledWith('nuevo@mail.com');
});


it('Aplica estilos de borde y padding al input', () => {
const { getByPlaceholderText } = render(
    <EmailInput
    label="Email"
    placeholder="Email"
    value=""
    onChangeText={() => {}}
    />,
    { wrapper: Wrapper }
);
const input = getByPlaceholderText('Email');
expect(input.props.style).toEqual(
    expect.arrayContaining([
    expect.objectContaining({
        borderRadius: 16,
        padding: 15
    })
    ])
);
});
});
