import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "../../src/ui/screens/LoginScreen";
import Home from "../../src/ui/screens/Home";
import Registro from "../../src/ui/screens/Registro";
import Cartilla from "../ui/screens/Cartilla";
import Turnos from "../../src/ui/screens/Turnos";
import Seleccionar from '../ui/screens/SeleccionarMedico';
import Historial from '../ui/screens/Historial';
import NavigationTab from './NavigationTab'; 
import Filtro from '../ui/screens/Filtro';
import FiltroResultado from '../ui/screens/FiltroResultado'
import SeleccionarHorario from '../ui/screens/SeleccionarHorario';




const Stack = createNativeStackNavigator();

export default function MyStack() {
return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Registro" component={Registro}/>
        <Stack.Screen name="Cartilla" component={Cartilla}/>
        <Stack.Screen name="Turnos" component={Turnos} />
        <Stack.Screen name="Historial" component={Historial} />
        <Stack.Screen name="Tabs" component={NavigationTab} />
        <Stack.Screen name="SeleccionarMedico" component={Seleccionar} />
        <Stack.Screen name="Filtro" component={Filtro}/>
        <Stack.Screen name="Resultados" component={FiltroResultado} />       
        <Stack.Screen name="SeleccionarHorario" component={SeleccionarHorario} />
    </Stack.Navigator>
);
}