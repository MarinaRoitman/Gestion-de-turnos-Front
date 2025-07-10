import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ButtonHome } from '../src/ui/components/ButtonHome';
import { ThemeProvider } from '../src/theme/ThemeContext';

describe('ButtonHome', () => {
it('Renderiza el texto correctamente', () => {
const { getByText } = render(
    <ThemeProvider>
    <ButtonHome title="Ir a Cartilla" onPress={() => {}} />
    </ThemeProvider>
);
expect(getByText('Ir a Cartilla')).toBeTruthy();
});

it('Ejecuta onPress al tocar el botón', () => {
const mockPress = jest.fn();
const { getByText } = render(
    <ThemeProvider>
    <ButtonHome title="Cartilla" onPress={mockPress} />
    </ThemeProvider>
);
fireEvent.press(getByText('Cartilla'));
expect(mockPress).toHaveBeenCalled();
});
});
