import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from './screens/landing'
import DaftarScreen from './screens/daftar';

const Stack = createStackNavigator();

export default function Navigator() {
    return (
        <Stack.Navigator
        headerMode="none"
        >
            <Stack.Screen name='landing' component={LandingScreen}/>
            <Stack.Screen name='Daftar' component={DaftarScreen}/>
        </Stack.Navigator>
    )
}