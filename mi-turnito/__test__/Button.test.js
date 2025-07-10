import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Button from '../src/ui/components/Button';

describe('Button', () => {
it('Muestra el título correctamente', () => {
const { getByText } = render(<Button title="Click me" onPress={() => {}} />);
expect(getByText('Click me')).toBeTruthy();
});

it('Llama a onPress al tocar el botón', () => {
const onPressMock = jest.fn();
const { getByText } = render(<Button title="Pulsar" onPress={onPressMock} />);
fireEvent.press(getByText('Pulsar'));
expect(onPressMock).toHaveBeenCalledTimes(1);
});

it('Que el botón tiene un color de fondo personalizado si se pasa la prop backgroundColor', () => {
const { getByTestId } = render(
    <Button title="Fondo Rojo" onPress={() => {}} backgroundColor="#FF0000" />
);
const touchable = getByTestId('button-touchable');
expect(touchable.props.style).toMatchObject({
    backgroundColor: '#FF0000',
});
});

it('Que el botón tiene un color de texto personalizado si se pasa la prop Color', () => {
const { getByText } = render(
    <Button title="Texto Verde" onPress={() => {}} color="#00FF00" />
);
const text = getByText('Texto Verde');
expect(text.props.style).toEqual(
    expect.arrayContaining([
    expect.objectContaining({ color: '#00FF00' }),
    ])
);
});
});
