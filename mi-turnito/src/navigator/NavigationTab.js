import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../ui/screens/Home';
import Turnos from '../ui/screens/Turnos';
import Historial from '../ui/screens/Historial';
import Notificaciones from '../ui/screens/Notificaciones';
import Perfil from '../ui/screens/Perfil';
import SeleccionarHorario from '../ui/screens/SeleccionarHorario';
import SeleccionarMedico from '../ui/screens/SeleccionarMedico';
import Resultados from '../ui/screens/FiltroResultado';
import Filtro from '../ui/screens/Filtro';
import { useTheme } from '../../src/theme/ThemeContext';
import Cartilla from '../ui/screens/Cartilla';
import ConfirmarTurno from '../ui/screens/ConfirmarTurno';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ayuda from '../ui/screens/Ayuda';
import DetalleScreen from '../ui/screens/DetalleHistorial';
import ProximoTurno from '../ui/screens/ProximoTurno';

import { View } from 'react-native';
// Creación de los stacks individuales
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Stack de la tab Home
function HomeStack() {
return (
<Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeMain" component={Home}/>
    <Stack.Screen name="Cartilla" component={Cartilla} />
</Stack.Navigator>
);
}

// Stack de la tab Turnos
function TurnosStack() {
return (
<Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="TurnosMain" component={Turnos} />
    <Stack.Screen name="SeleccionarMedico" component={SeleccionarMedico} />
    <Stack.Screen name="Filtro" component={Filtro} />
    <Stack.Screen name="Resultados" component={Resultados} />       
    <Stack.Screen name="SeleccionarHorario" component={SeleccionarHorario} />
    <Stack.Screen name="ConfirmarTurno" component={ConfirmarTurno} />
    <Stack.Screen name="Historial" component={Historial} />
    <Stack.Screen name="ProximoTurno" component={ProximoTurno} />
</Stack.Navigator>
);
}

// Stack de la tab Historial
function HistorialStack() {
return (
<Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HistorialMain" component={Historial} />
    <Stack.Screen name="Detalle" component={DetalleScreen} />
</Stack.Navigator>
);
}

// Stack de la tab Notificaciones
function NotificacionesStack() {
return (
<Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="NotificacionesMain" component={Notificaciones} />
</Stack.Navigator>
);
}

// Stack de la tab Perfil
function PerfilStack() {
return (
<Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="PerfilMain" component={Perfil} />
    <Stack.Screen name="Ayuda" component={Ayuda} />
</Stack.Navigator>
);
}


// Tabs principales
export default function NavigationTab() {
    const { theme } = useTheme();
return (
<Tab.Navigator initialRouteName="Home" screenOptions={{
        headerShown: false,
        tabBarStyle: {
            backgroundColor: theme.tabBarBackground,
            height: 100,
            paddingTop: 13,
            paddingBottom:20,
        },
        tabBarActiveTintColor: theme.tabBarIconColor,
        tabBarInactiveTintColor: theme.tabBarIconColor,
    }}>

    <Tab.Screen name="Turnos" component={TurnosStack} options={{
        tabBarIcon: ({ color, size }) => (
            <View style={{ position: 'absolute'}}>
            <MaterialIcons name="event" color={color} size={32} />
            </View>),
        tabBarLabel: "Turnos",
    }}/>
    <Tab.Screen name="Historial" component={HistorialStack} 
    options={{
        tabBarIcon: ({ color, size }) => (
        <MaterialIcons name="history" color={color}size={32}/>),
        tabBarLabel: "Historial",
    }}/>
    <Tab.Screen name="Home" component={HomeStack} 
    options={{
        tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" color={color} size={32} />
        ),
        tabBarLabel: "Inicio",
        }}
    />
    <Tab.Screen name="Notificaciones" component={NotificacionesStack} 
    options={{
        tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="notifications" color={color} size={32} />
        ),
        tabBarLabel: "Notificaciones",
    }}
    />
    <Tab.Screen name="Perfil" component={PerfilStack} 
    options={{
        tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" color={color} size={32} />
        ),
        tabBarLabel: "Perfil",
    }}/>

</Tab.Navigator>
);
}
