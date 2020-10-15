import React, {useState} from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { auth } from '../../components/FirebaseProvider';

export default function ChatScreen() {
    const handleSignOut = async () => {
        await auth.signOut();
    }

    return (
        <View>
            <Text>Chat Screen</Text>
            <Button onPress={handleSignOut}>Log Out</Button>
        </View>
    )
}