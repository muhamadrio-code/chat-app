import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from './screens/landing'
import DaftarScreen from './screens/daftar';
import LoginScreen from './screens/login';
import LupaPassword from './screens/lupa-password';
import { useFirebase } from './components/FirebaseProvider';
import PrivateNavigator from './private/Navigator';

const Stack = createStackNavigator();

export default function Navigator() {
    const { user} = useFirebase()

    return (
        <Stack.Navigator
        headerMode="none"
        >
            {!user && <>
                <Stack.Screen name='landing' component={LandingScreen} />
                <Stack.Screen name='Daftar' component={DaftarScreen}/>
                <Stack.Screen name='Login' component={LoginScreen} />
                <Stack.Screen name='LupaPassword' component={LupaPassword} />
            </>}
            {user && <Stack.Screen name="private" component={PrivateNavigator} />}
        </Stack.Navigator>
    )
}