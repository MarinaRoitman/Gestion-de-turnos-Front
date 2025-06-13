import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ErrorModal from '../src/ui/components/ErrorModal';
import { ThemeProvider } from '../src/theme/ThemeContext';

describe('ErrorModal', () => {
it('se muestra correctamente cuando visible=true', () => {
const { getByText } = render(
    <ThemeProvider>
    <ErrorModal visible={true} message="Error de prueba" onClose={() => {}} />
    </ThemeProvider>
);
expect(getByText('Error de prueba')).toBeTruthy();
});

it('no se muestra cuando visible=false', () => {
const { queryByText } = render(
    <ThemeProvider>
    <ErrorModal visible={false} message="No debería mostrarse" onClose={() => {}} />
    </ThemeProvider>
);
expect(queryByText('No debería mostrarse')).toBeNull();
});

it('llama a onClose cuando se toca el botón Cerrar', () => {
const onCloseMock = jest.fn();
const { getByText } = render(
    <ThemeProvider>
    <ErrorModal visible={true} message="Cerrame" onClose={onCloseMock} />
    </ThemeProvider>
);

fireEvent.press(getByText('Cerrar'));
expect(onCloseMock).toHaveBeenCalled();
});
});
