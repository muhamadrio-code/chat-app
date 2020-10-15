import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ChatScreen from './chat';

const Stack = createStackNavigator();

export default function PrivateNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name='chat' component={ChatScreen} />
        </Stack.Navigator>
    )
}